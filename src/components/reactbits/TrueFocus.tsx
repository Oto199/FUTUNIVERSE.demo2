import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface TrueFocusProps {
  sentence?: string;
  manualMode?: boolean;
  blurAmount?: number;
  borderColor?: string;
  glowColor?: string;
  animationDuration?: number;
  pauseBetweenAnimations?: number;
  className?: string;
}

export default function TrueFocus({
  sentence = 'FUT UNIVERSE MATCH WORN',
  manualMode = false,
  blurAmount = 3,
  borderColor = '#00e5ff',
  glowColor = 'rgba(0, 229, 255, 0.6)',
  animationDuration = 0.4,
  pauseBetweenAnimations = 2500,
  className = ''
}: TrueFocusProps) {
  const words = sentence.split(' ');
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [focusRect, setFocusRect] = useState({ x: 0, y: 0, width: 0, height: 0 });

  useEffect(() => {
    if (manualMode) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % words.length);
    }, pauseBetweenAnimations);
    return () => clearInterval(interval);
  }, [manualMode, words.length, pauseBetweenAnimations]);

  useEffect(() => {
    const updateRect = () => {
      if (!containerRef.current) return;
      const activeEl = containerRef.current.querySelector<HTMLElement>(`[data-index="${currentIndex}"]`);
      if (activeEl) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const elRect = activeEl.getBoundingClientRect();
        setFocusRect({
          x: elRect.left - containerRect.left,
          y: elRect.top - containerRect.top,
          width: elRect.width,
          height: elRect.height
        });
      }
    };

    const timer = setTimeout(updateRect, 30);
    window.addEventListener('resize', updateRect);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateRect);
    };
  }, [currentIndex, sentence]);

  return (
    <div ref={containerRef} className={`relative inline-flex flex-wrap items-center gap-x-2.5 gap-y-1.5 ${className}`}>
      {words.map((word, index) => {
        const isActive = index === currentIndex;
        return (
          <span
            key={index}
            data-index={index}
            onMouseEnter={() => {
              if (manualMode) {
                setCurrentIndex(index);
              }
            }}
            className={`cursor-pointer font-black tracking-tight transition-all duration-300 ${
              isActive ? 'scale-105 z-10 text-[#00e5ff]' : 'text-zinc-200 opacity-80'
            }`}
            style={{
              filter: isActive ? 'none' : `blur(${blurAmount}px)`,
              transition: `all ${animationDuration}s ease`
            }}
          >
            {word}
          </span>
        );
      })}

      {/* Focus Frame */}
      {focusRect.width > 0 && (
        <motion.div
          className="pointer-events-none absolute border-2 rounded-lg"
          animate={{
            x: focusRect.x - 6,
            y: focusRect.y - 4,
            width: focusRect.width + 12,
            height: focusRect.height + 8
          }}
          transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          style={{
            borderColor: borderColor,
            boxShadow: `0 0 15px ${glowColor}`
          }}
        >
          <span className="absolute -top-1 -left-1 w-2 h-2 bg-[#00e5ff]" />
          <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00e5ff]" />
          <span className="absolute -bottom-1 -left-1 w-2 h-2 bg-[#00e5ff]" />
          <span className="absolute -bottom-1 -right-1 w-2 h-2 bg-[#00e5ff]" />
        </motion.div>
      )}
    </div>
  );
}
