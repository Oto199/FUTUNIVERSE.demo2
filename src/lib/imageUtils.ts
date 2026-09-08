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
