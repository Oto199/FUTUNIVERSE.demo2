/**
 * IndexedDB Local Client Cache for FUT Universe
 * Ensures offline capability, instant load times, and eliminates redundant Firestore reads,
 * preserving Google Cloud Firestore's free tier quotas.
 */

const DB_NAME = 'fut_universe_cache_v4';
const DB_VERSION = 1;

// Self-healing: automatically clear legacy v1, v2 & v3 IndexedDB if present
if (typeof window !== 'undefined' && window.indexedDB && window.indexedDB.deleteDatabase) {
  try {
    window.indexedDB.deleteDatabase('fut_universe_cache_v1');
    window.indexedDB.deleteDatabase('fut_universe_cache_v2');
    window.indexedDB.deleteDatabase('fut_universe_cache_v3');
  } catch (e) {}
}

function openDB(): Promise<IDBDatabase | null> {
  if (typeof window === 'undefined' || !window.indexedDB) {
    return Promise.resolve(null);
  }

  return new Promise((resolve) => {
    try {
      const request = indexedDB.open(DB_NAME, DB_VERSION);

      request.onupgradeneeded = (event: any) => {
        const db = event.target?.result as IDBDatabase;
        if (!db.objectStoreNames.contains('cache')) {
          db.createObjectStore('cache', { keyPath: 'key' });
        }
      };

      request.onsuccess = () => {
        resolve(request.result);
      };

      request.onerror = () => {
        console.warn('[Cache] IndexedDB open error');
        resolve(null);
      };
    } catch (e) {
      console.warn('[Cache] IndexedDB not available:', e);
      resolve(null);
    }
  });
}

export async function getCachedData<T>(key: string): Promise<T | null> {
  const db = await openDB();
  if (!db) {
    try {
      const item = localStorage.getItem(`fut_cache_${key}`);
      return item ? JSON.parse(item) : null;
    } catch {
      return null;
    }
  }

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction('cache', 'readonly');
      const store = transaction.objectStore('cache');
      const request = store.get(key);

      request.onsuccess = () => {
        if (request.result && request.result.value) {
          resolve(request.result.value as T);
        } else {
          resolve(null);
        }
      };

      request.onerror = () => {
        resolve(null);
      };
    } catch (e) {
      resolve(null);
    }
  });
}

export async function setCachedData<T>(key: string, value: T): Promise<void> {
  const db = await openDB();
  if (!db) {
    try {
      localStorage.setItem(`fut_cache_${key}`, JSON.stringify(value));
    } catch {
      // ignore localStorage quota errors
    }
    return;
  }

  return new Promise((resolve) => {
    try {
      const transaction = db.transaction('cache', 'readwrite');
      const store = transaction.objectStore('cache');
      store.put({ key, value, updatedAt: Date.now() });

      transaction.oncomplete = () => {
        resolve();
      };

      transaction.onerror = () => {
        resolve();
      };
    } catch (e) {
      resolve();
    }
  });
}
