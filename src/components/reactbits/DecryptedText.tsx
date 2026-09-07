import React, { useState, useEffect } from 'react';

interface DecryptedTextProps {
  text: string;
  speed?: number;
  maxIterations?: number;
  sequential?: boolean;
  characters?: string;
  className?: string;
  animateOn?: 'view' | 'hover' | 'always';
}

export default function DecryptedText({
  text,
  speed = 30,
  maxIterations = 8,
  sequential = true,
  characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789#@!$%&',
  className = '',
  animateOn = 'always'
}: DecryptedTextProps) {
  const [displayText, setDisplayText] = useState('');
  const [isTriggered, setIsTriggered] = useState(animateOn === 'always');

  useEffect(() => {
    if (!isTriggered) {
      setDisplayText(text);
      return;
    }

    let iteration = 0;
    const interval = setInterval(() => {
      setDisplayText(
        text
          .split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (sequential && index < iteration) {
              return text[index];
            }
            if (!sequential && iteration >= maxIterations) {
              return text[index];
            }
            return characters[Math.floor(Math.random() * characters.length)];
          })
          .join('')
      );

      iteration += 1;
      if (iteration > text.length + maxIterations) {
        setDisplayText(text);
        clearInterval(interval);
      }
    }, speed);

    return () => clearInterval(interval);
  }, [text, speed, maxIterations, sequential, isTriggered, characters]);

  return (
    <span
      className={`inline-block ${className}`}
      onMouseEnter={() => {
        if (animateOn === 'hover') {
          setIsTriggered(true);
        }
      }}
    >
      {displayText || text}
    </span>
  );
}
