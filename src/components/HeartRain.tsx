import React, { useEffect, useState } from 'react';

interface HeartRainProps {
  isActive: boolean;
  onFinish?: () => void;
  durationMs?: number;
}

interface RainHeart {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  symbol: string;
  rotation: number;
  drift: number;
  opacity: number;
}

const HEART_SYMBOLS = ['💗', '💖', '💕', '💓', '🌸', '✨', '💝', '🎀'];

export const HeartRain: React.FC<HeartRainProps> = ({
  isActive,
  onFinish,
  durationMs = 9000
}) => {
  const [hearts, setHearts] = useState<RainHeart[]>([]);

  useEffect(() => {
    if (!isActive) {
      setHearts([]);
      return;
    }

    // Generate 45 randomized falling hearts
    const newHearts: RainHeart[] = Array.from({ length: 45 }).map((_, i) => ({
      id: i,
      left: Math.random() * 96 + 2, // 2% to 98%
      size: Math.random() * 18 + 14, // 14px to 32px
      duration: Math.random() * 2.5 + 3.2, // 3.2s to 5.7s
      delay: Math.random() * 2.8, // 0 to 2.8s
      symbol: HEART_SYMBOLS[Math.floor(Math.random() * HEART_SYMBOLS.length)],
      rotation: Math.random() * 60 - 30,
      drift: Math.random() * 60 - 30, // px drift left or right
      opacity: Math.random() * 0.4 + 0.6 // 0.6 to 1.0
    }));

    setHearts(newHearts);

    const timer = setTimeout(() => {
      if (onFinish) {
        onFinish();
      }
    }, durationMs);

    return () => clearTimeout(timer);
  }, [isActive, durationMs, onFinish]);

  if (!isActive && hearts.length === 0) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute -top-10 select-none animate-fall"
          style={{
            left: `${h.left}%`,
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animationDuration: `${h.duration}s`,
            animationDelay: `${h.delay}s`,
            animationTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            animationFillMode: 'forwards',
            transform: `rotate(${h.rotation}deg)`,
            filter: 'drop-shadow(0 2px 8px rgba(244, 114, 182, 0.4))'
          }}
        >
          {h.symbol}
        </div>
      ))}
    </div>
  );
};
