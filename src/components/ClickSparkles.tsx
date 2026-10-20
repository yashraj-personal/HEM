import React, { useEffect, useState } from 'react';

interface ClickParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const SPARKLE_ICONS = ['💗', '✨', '🌸', '💖', '⭐', '🎀', '💕'];

export const ClickSparkles: React.FC = () => {
  const [particles, setParticles] = useState<ClickParticle[]>([]);

  useEffect(() => {
    let idCounter = 0;

    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      // Don't spawn on form inputs
      const target = e.target as HTMLElement;
      if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
        return;
      }

      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      const count = 6;
      const newBatch: ClickParticle[] = [];

      for (let i = 0; i < count; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 45 + 20;
        newBatch.push({
          id: ++idCounter,
          x: clientX,
          y: clientY,
          symbol: SPARKLE_ICONS[Math.floor(Math.random() * SPARKLE_ICONS.length)],
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed - 20,
          size: Math.random() * 6 + 14,
          color: '#F472B6'
        });
      }

      setParticles((prev) => [...prev.slice(-24), ...newBatch]);

      // Remove after animation completes
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => !newBatch.some((nb) => nb.id === p.id)));
      }, 700);
    };

    window.addEventListener('mousedown', handlePointerDown);
    window.addEventListener('touchstart', handlePointerDown, { passive: true });

    return () => {
      window.removeEventListener('mousedown', handlePointerDown);
      window.removeEventListener('touchstart', handlePointerDown);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden" aria-hidden="true">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none pointer-events-none"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: `translate(${p.vx}px, ${p.vy}px) scale(0)`,
            transition: 'transform 0.65s cubic-bezier(0.2, 0.8, 0.2, 1), opacity 0.65s ease-out',
            opacity: 0,
            filter: 'drop-shadow(0 2px 4px rgba(244, 114, 182, 0.4))'
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};
