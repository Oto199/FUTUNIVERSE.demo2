import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface ClickSparkProps {
  sparkColor?: string;
  sparkSize?: number;
  sparkRadius?: number;
  sparkCount?: number;
  duration?: number;
  children: React.ReactNode;
  className?: string;
}

interface Spark {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
}

export default function ClickSpark({
  sparkColor = '#00e5ff',
  sparkSize = 6,
  sparkRadius = 26,
  sparkCount = 8,
  duration = 400,
  children,
  className = ''
}: ClickSparkProps) {
  const [sparks, setSparks] = useState<Spark[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const newSparks: Spark[] = Array.from({ length: sparkCount }).map((_, i) => {
      const angle = (i * 2 * Math.PI) / sparkCount;
      return {
        id: Date.now() + Math.random() + i,
        x,
        y,
        dx: Math.cos(angle) * sparkRadius,
        dy: Math.sin(angle) * sparkRadius
      };
    });

    setSparks((prev) => [...prev, ...newSparks]);

    setTimeout(() => {
      setSparks((prev) => prev.filter((s) => !newSparks.includes(s)));
    }, duration);
  };

  return (
    <div className={`relative inline-block ${className}`} onClick={handleClick}>
      {children}
      <AnimatePresence>
        {sparks.map((spark) => (
          <motion.span
            key={spark.id}
            className="pointer-events-none absolute rounded-full z-50"
            initial={{
              x: spark.x - sparkSize / 2,
              y: spark.y - sparkSize / 2,
              scale: 1,
              opacity: 1
            }}
            animate={{
              x: spark.x + spark.dx - sparkSize / 2,
              y: spark.y + spark.dy - sparkSize / 2,
              scale: 0,
              opacity: 0
            }}
            transition={{ duration: duration / 1000, ease: 'easeOut' }}
            style={{
              width: sparkSize,
              height: sparkSize,
              backgroundColor: sparkColor,
              boxShadow: `0 0 8px ${sparkColor}`
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
