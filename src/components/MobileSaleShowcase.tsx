import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { ChevronLeft, ChevronRight, ArrowRight, Tag, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { handleImageError, sanitizeImageUrl } from '../lib/imageUtils';

interface MobileSaleShowcaseProps {
  products: Product[];
  lang: 'ka' | 'en';
  onSelectProduct: (productId: string) => void;
}

export const MobileSaleShowcase: React.FC<MobileSaleShowcaseProps> = ({
  products,
  lang,
  onSelectProduct,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<number>(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartXRef = useRef<number | null>(null);

  const total = products.length;
  const current = products[currentIndex] || products[0];

  // Auto-play timer that is lightweight and easily paused
  useEffect(() => {
    if (total <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % total);
    }, 4000);

    return () => clearInterval(interval);
  }, [total, isPaused]);

  if (!current) return null;

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    if (info.offset.x < -40) {
      handleNext();
    } else if (info.offset.x > 40) {
      handlePrev();
    }
  };

  // Variants for super-fast, 60fps mobile hardware-accelerated transitions
  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.2 },
        scale: { duration: 0.2 },
      },
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
      transition: {
        x: { type: 'spring', stiffness: 350, damping: 30 },
        opacity: { duration: 0.15 },
        scale: { duration: 0.15 },
      },
    }),
  };

  return (
    <div
      className="w-full max-w-[340px] mx-auto flex flex-col items-center select-none"
      onTouchStart={() => setIsPaused(true)}
      onTouchEnd={() => setIsPaused(false)}
    >
      {/* Top Counter & Quick Controls */}
      <div className="w-full flex items-center justify-between px-2 mb-2 text-xs">
        <div className="flex items-center space-x-1.5 font-mono text-amber-400 font-bold">
          <Sparkles className="w-3.5 h-3.5" />
          <span>
            {String(currentIndex + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
          </span>
        </div>
        <div className="flex items-center space-x-1">
          <button
            onClick={handlePrev}
            className="w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center active:scale-95 transition"
            aria-label="Previous kit"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={handleNext}
            className="w-7 h-7 rounded-full bg-black/60 border border-white/20 text-white flex items-center justify-center active:scale-95 transition"
            aria-label="Next kit"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Interactive Mobile Card (Clean 2D hardware-accelerated swipe) */}
      <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-[#0d091a] border-2 border-amber-500/50 shadow-xl shadow-amber-500/10">
        <AnimatePresence custom={direction} mode="wait">
          <motion.div
            key={current.id}
            custom={direction}
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={handleDragEnd}
            className="absolute inset-0 cursor-grab active:cursor-grabbing will-change-transform"
          >
            {/* Jersey Image */}
            <img
              src={sanitizeImageUrl(current.imageFront)}
              alt={lang === 'ka' ? current.titleKa : current.titleEn}
              referrerPolicy="no-referrer"
              onError={handleImageError}
              className="w-full h-full object-cover pointer-events-none"
            />
            {/* Readability Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0614] via-[#0a0614]/40 to-transparent pointer-events-none" />

            {/* Top Badges */}
            <div className="absolute top-3 left-3 flex items-center space-x-1.5 pointer-events-none">
              <div className="px-2.5 py-1 bg-amber-500 text-black text-[10px] font-black uppercase tracking-wider rounded shadow flex items-center space-x-1">
                <Tag className="w-3 h-3" />
                <span>SALE</span>
              </div>
              {current.kitType && (
                <div className="px-2 py-0.5 bg-black/80 backdrop-blur-xs border border-amber-400/40 text-amber-300 text-[10px] font-mono font-bold rounded">
                  {current.kitType}
                </div>
              )}
            </div>

            {current.sizes && current.sizes.length > 0 && (
              <div className="absolute top-3 right-3 px-2 py-0.5 bg-black/80 border border-white/20 text-white text-[10px] font-mono font-bold rounded pointer-events-none">
                {current.sizes.join(', ')}
              </div>
            )}

            {/* Bottom Details & Direct CTA */}
            <div className="absolute bottom-3 left-3 right-3 space-y-1.5 text-left pointer-events-none">
              <p className="text-[10px] font-bold text-amber-400 uppercase tracking-wider">
                {lang === 'ka' ? current.nationalTeamKa : current.nationalTeamEn}
              </p>
              <h3 className="text-base font-black text-white uppercase tracking-tight line-clamp-1">
                {lang === 'ka' ? current.titleKa : current.titleEn}
              </h3>

              <div className="flex items-center justify-between pt-1.5 border-t border-white/10 pointer-events-auto">
                <div className="flex items-baseline space-x-2">
                  <span className="text-xl font-black text-amber-400 font-display">
                    {current.price} ₾
                  </span>
                  {current.originalPrice && (
                    <span className="text-xs text-zinc-400 line-through font-mono">
                      {current.originalPrice} ₾
                    </span>
                  )}
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectProduct(current.id);
                  }}
                  className="px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-black text-[11px] font-black uppercase tracking-wider rounded-lg flex items-center space-x-1 shadow-md active:scale-95 transition cursor-pointer"
                >
                  <span>{lang === 'ka' ? 'შეკვეთა' : 'View'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Interactive Thumbnail Strip (Tap any jersey to switch immediately) */}
      <div className="w-full flex items-center justify-center gap-1.5 mt-3 overflow-x-auto py-1 px-2 no-scrollbar">
        {products.map((prod, idx) => {
          const isActive = idx === currentIndex;
          return (
            <button
              key={prod.id}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`relative shrink-0 rounded-lg overflow-hidden transition-all duration-200 cursor-pointer ${
                isActive
                  ? 'w-10 h-10 ring-2 ring-amber-400 scale-105 shadow-md shadow-amber-500/30'
                  : 'w-7 h-7 opacity-50 hover:opacity-80 border border-white/10'
              }`}
              title={lang === 'ka' ? prod.titleKa : prod.titleEn}
            >
              <img
                src={sanitizeImageUrl(prod.imageFront)}
                alt=""
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
              {isActive && (
                <div className="absolute inset-0 bg-amber-500/10 pointer-events-none" />
              )}
            </button>
          );
        })}
      </div>

      {/* Swipe instruction hint */}
      <p className="text-[11px] text-amber-300/80 mt-1.5 flex items-center justify-center space-x-1.5 font-medium tracking-wide">
        <span>
          {lang === 'ka'
            ? 'გადაფურცლეთ ან შეეხეთ მაისურს'
            : 'Swipe or tap thumbnails to view sale kits'}
        </span>
      </p>
    </div>
  );
};
export default MobileSaleShowcase;
