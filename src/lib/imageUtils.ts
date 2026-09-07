import type React from 'react';

export const FALLBACK_JERSEY_IMAGE = 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?auto=format&fit=crop&w=800&q=80';

export function handleImageError(e: React.SyntheticEvent<HTMLImageElement, Event>, fallback = FALLBACK_JERSEY_IMAGE) {
  const target = e.currentTarget;
  if (!target.dataset.failed) {
    target.dataset.failed = 'true';
    target.src = fallback;
  }
}

/**
 * Utility functions for compressing and optimizing image strings (Base64 data URIs)
 * to ensure Firestore documents stay well under the 1MB limit.
 */

export async function compressImage(src: string, maxDimension = 700, quality = 0.72): Promise<string> {
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

        let result = canvas.toDataURL('image/jpeg', quality);

        // If still > 150KB, compress further
        if (result.length > 200000) {
          const smallCanvas = document.createElement('canvas');
          const smallMax = 500;
          let sWidth = width;
          let sHeight = height;
          if (sWidth > sHeight) {
            sHeight = Math.round((sHeight * smallMax) / sWidth);
            sWidth = smallMax;
          } else {
            sWidth = Math.round((sWidth * smallMax) / sHeight);
            sHeight = smallMax;
          }
          smallCanvas.width = sWidth;
          smallCanvas.height = sHeight;
          const sCtx = smallCanvas.getContext('2d');
          if (sCtx) {
            sCtx.fillStyle = '#FFFFFF';
            sCtx.fillRect(0, 0, sWidth, sHeight);
            sCtx.drawImage(img, 0, 0, sWidth, sHeight);
            result = smallCanvas.toDataURL('image/jpeg', 0.65);
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

export async function optimizeProductImages<T extends Record<string, any>>(product: T): Promise<T> {
  const result = { ...product } as any;

  if (result.imageFront && typeof result.imageFront === 'string') {
    result.imageFront = await compressImage(result.imageFront, 700, 0.72);
  }

  if (result.imageBack && typeof result.imageBack === 'string') {
    result.imageBack = await compressImage(result.imageBack, 700, 0.72);
  }

  if (Array.isArray(result.images)) {
    const compressedList: string[] = [];
    for (const imgStr of result.images) {
      if (typeof imgStr === 'string' && imgStr.trim()) {
        compressedList.push(await compressImage(imgStr, 700, 0.72));
      }
    }
    result.images = Array.from(new Set(compressedList));
  }

  return result as T;
}
