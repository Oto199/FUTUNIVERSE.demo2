import type React from 'react';

// Bulletproof zero-network inline SVG fallback jersey with gold and dark-purple accents
export const INLINE_SVG_JERSEY = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 500" width="100%" height="100%"><rect width="400" height="500" fill="%230d091a"/><path d="M120,40 L160,80 L240,80 L280,40 L340,90 L300,160 L270,140 L270,440 L130,440 L130,140 L100,160 L60,90 Z" fill="%231a1233" stroke="%23f59e0b" stroke-width="3"/><path d="M160,80 Q200,110 240,80 Z" fill="%23f59e0b" opacity="0.6"/><rect x="180" y="110" width="40" height="15" rx="3" fill="%23f59e0b" opacity="0.9"/><text x="200" y="270" fill="%23ffffff" font-family="sans-serif" font-weight="900" font-size="64" text-anchor="middle">10</text><text x="200" y="360" fill="%23f59e0b" font-family="sans-serif" font-weight="900" font-size="16" letter-spacing="3" text-anchor="middle">FUT UNIVERSE</text></svg>`;

export const FALLBACK_JERSEY_IMAGE = INLINE_SVG_JERSEY;

export function isBrokenImageUrl(url?: string): boolean {
  if (!url || typeof url !== 'string' || !url.trim()) return true;
  const lower = url.toLowerCase();
  return (
    lower.includes('unsplash.com') ||
    lower.includes('picsum.photos') ||
    lower.includes('placeholder') ||
    lower.includes('loremflickr') ||
    lower.includes('source.unsplash') ||
    lower.startsWith('/uploads/')
  );
}

export function sanitizeImageUrl(url?: string, defaultFallback = FALLBACK_JERSEY_IMAGE): string {
  if (!url || typeof url !== 'string' || !url.trim() || isBrokenImageUrl(url)) {
    return defaultFallback;
  }
  return url;
}

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallback = FALLBACK_JERSEY_IMAGE) {
  const target = e.currentTarget;
  if (!target.dataset.failed) {
    target.dataset.failed = '1';
    target.src = fallback;
  } else if (target.dataset.failed === '1') {
    target.dataset.failed = '2';
    target.src = INLINE_SVG_JERSEY;
  }
}

/**
 * Utility functions for compressing and optimizing image strings (Base64 data URIs)
 * to ensure Firestore documents stay well under the 1MB limit (typically 50KB - 110KB).
 */

export async function compressImage(src: string, maxDimension = 960, quality = 0.78): Promise<string> {
  if (!src || !src.startsWith('data:image/')) {
    return src;
  }

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';

    img.onload = () => {
      try {
        let width = img.width;
        let height = img.height;

        if (width > maxDimension || height > maxDimension) {
          if (width > height) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          } else {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;

        const ctx = canvas.getContext('2d');
        if (!ctx) {
          resolve(src);
          return;
        }

        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, width, height);
        ctx.drawImage(img, 0, 0, width, height);

        // Prefer modern WebP format for 35%+ better compression at crystal clear quality
        let format = 'image/webp';
        let result = canvas.toDataURL(format, quality);

        // If browser doesn't support WebP export, fallback to JPEG
        if (!result.startsWith('data:image/webp')) {
          format = 'image/jpeg';
          result = canvas.toDataURL(format, 0.75);
        }

        // Adaptive Safety Fallback: If still > 180KB, downscale further to 720px and lower quality
        if (result.length > 180000) {
          const smallCanvas = document.createElement('canvas');
          const safeMax = 720;
          let sWidth = width;
          let sHeight = height;
          if (sWidth > sHeight) {
            sHeight = Math.round((sHeight * safeMax) / sWidth);
            sWidth = safeMax;
          } else {
            sWidth = Math.round((sWidth * safeMax) / sHeight);
            sHeight = safeMax;
          }
          smallCanvas.width = sWidth;
          smallCanvas.height = sHeight;
          const sCtx = smallCanvas.getContext('2d');
          if (sCtx) {
            sCtx.fillStyle = '#FFFFFF';
            sCtx.fillRect(0, 0, sWidth, sHeight);
            sCtx.drawImage(img, 0, 0, sWidth, sHeight);
            result = smallCanvas.toDataURL(format, 0.68);
          }
        }

        resolve(result);
      } catch (err) {
        console.warn('Image compression fallback:', err);
        resolve(src);
      }
    };

    img.onerror = () => {
      resolve(src);
    };

    img.src = src;
  });
}

export async function uploadImageToServer(dataUrl: string, prefix = 'shirt'): Promise<string> {
  if (!dataUrl || !dataUrl.startsWith('data:image/')) return dataUrl;
  try {
    const res = await fetch('/api/upload', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ image: dataUrl, prefix })
    });
    if (res.ok) {
      const data = await res.json();
      if (data?.url) return data.url;
    }
  } catch (e) {
    console.warn('Upload to server failed, preserving compressed base64:', e);
  }
  return dataUrl;
}

export async function optimizeProductImages<T extends Record<string, any>>(product: T): Promise<T> {
  const result = { ...product } as any;

  if (result.imageFront && typeof result.imageFront === 'string') {
    const compressed = await compressImage(result.imageFront, 700, 0.72);
    result.imageFront = await uploadImageToServer(compressed, 'shirt_front');
  }

  if (result.imageBack && typeof result.imageBack === 'string') {
    const compressed = await compressImage(result.imageBack, 700, 0.72);
    result.imageBack = await uploadImageToServer(compressed, 'shirt_back');
  }

  if (Array.isArray(result.images)) {
    const finalImages: string[] = [];
    for (let i = 0; i < result.images.length; i++) {
      const imgStr = result.images[i];
      if (typeof imgStr === 'string' && imgStr.trim()) {
        const compressed = await compressImage(imgStr, 700, 0.72);
        const uploaded = await uploadImageToServer(compressed, `shirt_detail_${i + 1}`);
        finalImages.push(uploaded);
      }
    }
    result.images = Array.from(new Set(finalImages));
  }

  return result as T;
}
