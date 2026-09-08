import { initializeApp } from 'firebase/app';
import { 
  getFirestore, 
  initializeFirestore,
  memoryLocalCache,
  setLogLevel,
  getDocFromServer,
  collection, 
  doc, 
  setDoc, 
  deleteDoc, 
  onSnapshot, 
  getDocs, 
  query, 
  orderBy, 
  writeBatch,
  deleteField
} from 'firebase/firestore';
import firebaseConfig from '../../firebase-applet-config.json';
import { Product, PlayerInfo, TeamInfo, BlogPost } from '../types';
import { INITIAL_PRODUCTS, INITIAL_PLAYERS, INITIAL_TEAMS, INITIAL_BLOG_POSTS } from '../data/initialData';
import { optimizeProductImages } from './imageUtils';

// Suppress noisy Firestore internal connection warnings in sandboxed preview environments
try {
  setLogLevel('silent');
} catch (e) {
  // Ignore if unsupported
}

let app: any = null;
let dbInstance: any = null;

try {
  if (firebaseConfig && (firebaseConfig as any).apiKey && (firebaseConfig as any).projectId) {
    app = initializeApp(firebaseConfig);
    const dbId = (firebaseConfig as any).firestoreDatabaseId;
    const settings = {
      experimentalForceLongPolling: true,
      localCache: memoryLocalCache()
    };
    dbInstance = dbId 
      ? initializeFirestore(app, settings, dbId)
      : initializeFirestore(app, settings);
  }
} catch (e) {
  try {
    const dbId = (firebaseConfig as any)?.firestoreDatabaseId;
    dbInstance = dbId ? getFirestore(app, dbId) : getFirestore(app);
  } catch (err) {
    console.warn('Firebase initialization note:', err);
  }
}

export const db = dbInstance;

/**
 * Validate connection to Firestore as recommended by Firebase guidelines
 */
export async function validateFirestoreConnection(): Promise<boolean> {
  if (!db) return false;
  try {
    await getDocFromServer(doc(db, '_connection_test_', 'ping'));
    return true;
  } catch {
    // Expected when running with offline fallback or limited permissions
    return false;
  }
}

export enum OperationType {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
  LIST = 'list',
  GET = 'get',
  WRITE = 'write',
}

export interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null) {
  const errMsg = error instanceof Error ? error.message : String(error);
  // Don't clutter console if backend is offline or in disconnected sandbox state
  if (errMsg.includes('unavailable') || errMsg.includes('offline') || errMsg.includes('permission')) {
    return;
  }
  const errInfo: FirestoreErrorInfo = {
    error: errMsg,
    operationType,
    path
  };
  console.warn('Firestore Operation Notice:', errInfo);
}

// Helper to get collection safely
function getCollectionRef(name: string) {
  if (!db) return null;
  try {
    return collection(db, name);
  } catch (e) {
    return null;
  }
}

/**
 * Real-time Product Listener with Auto-Seeding & Offline Fallback
 */
export function subscribeProducts(onData: (products: Product[]) => void) {
  const productsRef = getCollectionRef('products');
  if (!db || !productsRef) {
    onData(INITIAL_PRODUCTS);
    return () => {};
  }
  try {
    return onSnapshot(productsRef, async (snapshot) => {
      if (snapshot.empty) {
        if (!snapshot.metadata.fromCache) {
          try {
            const batch = writeBatch(db);
            INITIAL_PRODUCTS.forEach((prod) => {
              const ref = doc(db, 'products', prod.id);
              batch.set(ref, prod);
            });
            await batch.commit();
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'products');
          }
        }
        onData(INITIAL_PRODUCTS);
      } else {
        const items: Product[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as Product);
        });
        if (items.length > 0) {
          onData(items);
        } else {
          onData(INITIAL_PRODUCTS);
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'products');
      onData(INITIAL_PRODUCTS);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'products');
    onData(INITIAL_PRODUCTS);
    return () => {};
  }
}

/**
 * Real-time Players Listener with Auto-Seeding & Offline Fallback
 */
export function subscribePlayers(onData: (players: PlayerInfo[]) => void) {
  const playersRef = getCollectionRef('players');
  if (!db || !playersRef) {
    onData(INITIAL_PLAYERS);
    return () => {};
  }
  try {
    return onSnapshot(playersRef, async (snapshot) => {
      if (snapshot.empty) {
        if (!snapshot.metadata.fromCache) {
          try {
            const batch = writeBatch(db);
            INITIAL_PLAYERS.forEach((pl) => {
              const ref = doc(db, 'players', pl.slug);
              batch.set(ref, pl);
            });
            await batch.commit();
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'players');
          }
        }
        onData(INITIAL_PLAYERS);
      } else {
        const items: PlayerInfo[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as PlayerInfo);
        });
        if (items.length > 0) {
          onData(items);
        } else {
          onData(INITIAL_PLAYERS);
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'players');
      onData(INITIAL_PLAYERS);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'players');
    onData(INITIAL_PLAYERS);
    return () => {};
  }
}

/**
 * Real-time Teams Listener with Auto-Seeding & Offline Fallback
 */
export function subscribeTeams(onData: (teams: TeamInfo[]) => void) {
  const teamsRef = getCollectionRef('teams');
  if (!db || !teamsRef) {
    onData(INITIAL_TEAMS);
    return () => {};
  }
  try {
    return onSnapshot(teamsRef, async (snapshot) => {
      if (snapshot.empty) {
        if (!snapshot.metadata.fromCache) {
          try {
            const batch = writeBatch(db);
            INITIAL_TEAMS.forEach((tm) => {
              const ref = doc(db, 'teams', tm.slug);
              batch.set(ref, tm);
            });
            await batch.commit();
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'teams');
          }
        }
        onData(INITIAL_TEAMS);
      } else {
        const items: TeamInfo[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as TeamInfo);
        });
        if (items.length > 0) {
          onData(items);
        } else {
          onData(INITIAL_TEAMS);
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'teams');
      onData(INITIAL_TEAMS);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'teams');
    onData(INITIAL_TEAMS);
    return () => {};
  }
}

/**
 * Real-time Blog Listener with Auto-Seeding & Offline Fallback
 */
export function subscribeBlogPosts(onData: (posts: BlogPost[]) => void) {
  const blogPostsRef = getCollectionRef('blogPosts');
  if (!db || !blogPostsRef) {
    onData(INITIAL_BLOG_POSTS);
    return () => {};
  }
  try {
    return onSnapshot(blogPostsRef, async (snapshot) => {
      if (snapshot.empty) {
        if (!snapshot.metadata.fromCache) {
          try {
            const batch = writeBatch(db);
            INITIAL_BLOG_POSTS.forEach((bp) => {
              const ref = doc(db, 'blogPosts', bp.slug);
              batch.set(ref, bp);
            });
            await batch.commit();
          } catch (err) {
            handleFirestoreError(err, OperationType.WRITE, 'blogPosts');
          }
        }
        onData(INITIAL_BLOG_POSTS);
      } else {
        const items: BlogPost[] = [];
        snapshot.forEach((docSnap) => {
          items.push(docSnap.data() as BlogPost);
        });
        if (items.length > 0) {
          onData(items);
        } else {
          onData(INITIAL_BLOG_POSTS);
        }
      }
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'blogPosts');
      onData(INITIAL_BLOG_POSTS);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'blogPosts');
    onData(INITIAL_BLOG_POSTS);
    return () => {};
  }
}

/**
 * Real-time Contact Messages Listener
 */
export function subscribeContactMessages(onData: (messages: any[]) => void) {
  const contactMessagesRef = getCollectionRef('contactMessages');
  if (!db || !contactMessagesRef) {
    onData([]);
    return () => {};
  }
  try {
    return onSnapshot(contactMessagesRef, (snapshot) => {
      const items: any[] = [];
      snapshot.forEach((docSnap) => {
        items.push(docSnap.data());
      });
      onData(items);
    }, (err) => {
      handleFirestoreError(err, OperationType.LIST, 'contactMessages');
      onData([]);
    });
  } catch (err) {
    handleFirestoreError(err, OperationType.LIST, 'contactMessages');
    onData([]);
    return () => {};
  }
}

// Write Operations
export async function dbAddProduct(prod: Product) {
  if (!db) return;
  try {
    const optimizedProd = await optimizeProductImages(prod);
    const docData: any = { ...optimizedProd };
    if (!docData.originalPrice || docData.originalPrice <= docData.price) {
      docData.originalPrice = deleteField();
    }
    const ref = doc(db, 'products', optimizedProd.id);
    await setDoc(ref, docData, { merge: true });

    if (optimizedProd.playerSlug) {
      const plRef = doc(db, 'players', optimizedProd.playerSlug);
      const stubPlayer: PlayerInfo = {
        slug: optimizedProd.playerSlug,
        nameKa: optimizedProd.playerKa,
        nameEn: optimizedProd.playerEn,
        teamKa: optimizedProd.nationalTeamKa,
        teamEn: optimizedProd.nationalTeamEn,
        teamSlug: optimizedProd.teamSlug,
        position: 'მოთამაშე',
        number: optimizedProd.number,
        bioKa: `${optimizedProd.playerKa} — FUT Universe-ის ბიბლიოთეკაში წარმოდგენილი ნიშური მოთამაშე.`,
        bioEn: `${optimizedProd.playerEn} — Featured player in FUT Universe library.`,
        wc26Role: 'WC26 ნაკრების წევრი',
        image: optimizedProd.imageFront
      };
      await setDoc(plRef, stubPlayer, { merge: true });
    }
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `products/${prod.id}`);
  }
}

export async function dbUpdateProduct(productId: string, data: Partial<Product>) {
  if (!db) return;
  try {
    const optimizedData = await optimizeProductImages(data);
    const docData: any = { ...optimizedData };
    if ('originalPrice' in docData) {
      if (!docData.originalPrice || (docData.price && docData.originalPrice <= docData.price)) {
        docData.originalPrice = deleteField();
      }
    }
    const ref = doc(db, 'products', productId);
    await setDoc(ref, docData, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `products/${productId}`);
  }
}

export async function dbDeleteProduct(productId: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'products', productId);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `products/${productId}`);
  }
}

export async function dbAddBlogPost(post: BlogPost) {
  if (!db) return;
  try {
    const ref = doc(db, 'blogPosts', post.slug);
    await setDoc(ref, post, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `blogPosts/${post.slug}`);
  }
}

export async function dbUpdateBlogPost(slug: string, data: Partial<BlogPost>) {
  if (!db) return;
  try {
    const ref = doc(db, 'blogPosts', slug);
    await setDoc(ref, data, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.UPDATE, `blogPosts/${slug}`);
  }
}

export async function dbDeleteBlogPost(slug: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'blogPosts', slug);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `blogPosts/${slug}`);
  }
}

export async function dbAddContactMessage(msg: { id: string; name: string; contact: string; message: string; date: string }) {
  if (!db) return;
  try {
    const ref = doc(db, 'contactMessages', msg.id);
    await setDoc(ref, msg, { merge: true });
  } catch (err) {
    handleFirestoreError(err, OperationType.WRITE, `contactMessages/${msg.id}`);
  }
}

export async function dbDeleteContactMessage(messageId: string) {
  if (!db) return;
  try {
    const ref = doc(db, 'contactMessages', messageId);
    await deleteDoc(ref);
  } catch (err) {
    handleFirestoreError(err, OperationType.DELETE, `contactMessages/${messageId}`);
  }
}

