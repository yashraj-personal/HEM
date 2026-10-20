import React, { useEffect, useRef } from 'react';

interface CelestialStar {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  size: number;
  depth: number; // For parallax delay (0.01 to 0.05)
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  hasGlow: boolean;
}

const STAR_COLORS = [
  'rgba(251, 191, 36, ', // warm golden
  'rgba(253, 224, 71, ', // soft yellow
  'rgba(244, 114, 182, ', // pastel pink
  'rgba(248, 113, 113, ', // soft rose
  'rgba(255, 255, 255, ', // pure white
  'rgba(192, 132, 252, '  // gentle lilac
];

export const TwinklingCelestialCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Mouse coordinates and delayed lerp coordinates
    const targetOffset = { x: 0, y: 0 };
    const currentOffset = { x: 0, y: 0 };

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initStars();
    };

    const handlePointerMove = (e: MouseEvent | TouchEvent) => {
      let clientX = width / 2;
      let clientY = height / 2;

      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }

      // Calculate target offset relative to screen center (subtle displacement: -45px to +45px)
      targetOffset.x = ((clientX - width / 2) / (width / 2)) * 45;
      targetOffset.y = ((clientY - height / 2) / (height / 2)) * 45;
    };

    // Generate stars distributed across the screen
    let stars: CelestialStar[] = [];

    const initStars = () => {
      const starCount = Math.min(Math.floor((width * height) / 18000), 75);
      stars = [];

      for (let i = 0; i < starCount; i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        stars.push({
          x,
          y,
          baseX: x,
          baseY: y,
          size: Math.random() * 2.2 + 0.8, // 0.8px to 3.0px
          depth: Math.random() * 0.035 + 0.012, // depth factor for subtle delay
          twinkleSpeed: Math.random() * 0.02 + 0.008, // slow, gentle breathing
          twinklePhase: Math.random() * Math.PI * 2,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
          hasGlow: Math.random() > 0.65 // larger stars get a soft ethereal halo
        });
      }
    };

    initStars();

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    window.addEventListener('touchmove', handlePointerMove, { passive: true });

    // Render loop
    const render = () => {
      if (!ctx) return;

      // Smooth lag / delayed following of mouse movement
      currentOffset.x += (targetOffset.x - currentOffset.x) * 0.035;
      currentOffset.y += (targetOffset.y - currentOffset.y) * 0.035;

      ctx.clearRect(0, 0, width, height);

      // Render twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        // Update twinkle phase
        star.twinklePhase += star.twinkleSpeed;
        const alpha = Math.sin(star.twinklePhase) * 0.4 + 0.55; // 0.15 to 0.95

        // Position with delayed depth parallax
        const posX = star.baseX + currentOffset.x * (star.depth * 25);
        const posY = star.baseY + currentOffset.y * (star.depth * 25);

        // Soft outer glow for magical stars
        if (star.hasGlow) {
          ctx.beginPath();
          ctx.arc(posX, posY, star.size * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = `${star.color}${alpha * 0.25})`;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(posX, posY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha})`;
        ctx.fill();

        // Subtle 4-point cross shine on peak brightness
        if (alpha > 0.82 && star.size > 1.6) {
          ctx.strokeStyle = `${star.color}${alpha * 0.6})`;
          ctx.lineWidth = 0.75;

          const rayLen = star.size * 2.2;
          ctx.beginPath();
          ctx.moveTo(posX - rayLen, posY);
          ctx.lineTo(posX + rayLen, posY);
          ctx.moveTo(posX, posY - rayLen);
          ctx.lineTo(posX, posY + rayLen);
          ctx.stroke();
        }
      }

      animationId = requestAnimationFrame(render);
    };

    animationId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      window.removeEventListener('touchmove', handlePointerMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      style={{ opacity: 0.85 }}
      aria-hidden="true"
    />
  );
};
