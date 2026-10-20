import React, { useEffect, useState, useRef } from 'react';

interface TrailParticle {
  id: number;
  x: number;
  y: number;
  symbol: string;
  size: number;
  rotation: number;
  driftX: number;
  driftY: number;
}

const TRAIL_SYMBOLS = ['💗', '✨', '⭐', '💕', '🌸'];

export const CursorTrail: React.FC = () => {
  const [particles, setParticles] = useState<TrailParticle[]>([]);
  const lastSpawnRef = useRef<{ x: number; y: number; time: number }>({
    x: 0,
    y: 0,
    time: 0
  });
  const idCounterRef = useRef(0);

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      } else {
        return;
      }

      const now = performance.now();
      const last = lastSpawnRef.current;
      const dist = Math.hypot(clientX - last.x, clientY - last.y);

      // Only spawn when actively moving (distance > 14px and at least 45ms since last)
      if (dist < 14 && now - last.time < 50) {
        return;
      }

      lastSpawnRef.current = { x: clientX, y: clientY, time: now };

      const newId = ++idCounterRef.current;
      const newParticle: TrailParticle = {
        id: newId,
        x: clientX,
        y: clientY,
        symbol: TRAIL_SYMBOLS[Math.floor(Math.random() * TRAIL_SYMBOLS.length)],
        size: Math.random() * 5 + 11, // 11px to 16px (subtle and delicate)
        rotation: Math.random() * 40 - 20,
        driftX: (Math.random() - 0.5) * 18,
        driftY: Math.random() * -14 - 4 // gentle upward drift
      };

      setParticles((prev) => {
        // Keep maximum 20 active trail particles at any moment for high performance
        const updated = prev.length > 18 ? prev.slice(prev.length - 18) : prev;
        return [...updated, newParticle];
      });

      // Remove after 650ms animation duration
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newId));
      }, 650);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <div
      className="fixed inset-0 pointer-events-none z-50 overflow-hidden"
      aria-hidden="true"
    >
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute select-none pointer-events-none transform-gpu animate-trail-fade"
          style={{
            left: `${p.x}px`,
            top: `${p.y}px`,
            fontSize: `${p.size}px`,
            transform: `translate(-50%, -50%) rotate(${p.rotation}deg)`,
            filter: 'drop-shadow(0 1px 4px rgba(244, 114, 182, 0.45))'
          }}
        >
          {p.symbol}
        </span>
      ))}
    </div>
  );
};
