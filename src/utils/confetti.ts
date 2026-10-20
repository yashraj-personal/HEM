// Lightweight, high-performance Canvas particle burst system

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
  decay: number;
  shape: 'rect' | 'circle' | 'heart' | 'star';
}

class ConfettiEngine {
  private canvas: HTMLCanvasElement | null = null;
  private ctx: CanvasRenderingContext2D | null = null;
  private particles: Particle[] = [];
  private animationId: number | null = null;

  private initCanvas() {
    if (this.canvas) return;
    this.canvas = document.createElement('canvas');
    this.canvas.style.position = 'fixed';
    this.canvas.style.top = '0';
    this.canvas.style.left = '0';
    this.canvas.style.width = '100vw';
    this.canvas.style.height = '100vh';
    this.canvas.style.pointerEvents = 'none';
    this.canvas.style.zIndex = '9999';
    document.body.appendChild(this.canvas);
    this.ctx = this.canvas.getContext('2d');
    this.resize();
    window.addEventListener('resize', this.handleResize);
  }

  private handleResize = () => {
    if (!this.canvas) return;
    this.resize();
  };

  private resize() {
    if (!this.canvas) return;
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  public burst(options?: {
    count?: number;
    origin?: { x: number; y: number };
    spread?: number;
    colors?: string[];
    shapes?: ('rect' | 'circle' | 'heart' | 'star')[];
  }) {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    this.initCanvas();
    if (!this.canvas) return;

    const count = options?.count || 55;
    const origin = options?.origin || {
      x: window.innerWidth / 2,
      y: window.innerHeight / 2
    };
    const colors = options?.colors || [
      '#F472B6', // pink
      '#FB7185', // rose
      '#C084FC', // purple
      '#FBBF24', // warm gold
      '#FDF2F8', // cream blush
      '#FDA4AF'  // soft peach
    ];
    const shapes = options?.shapes || ['heart', 'rect', 'star', 'circle'];

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 8 + 3;
      this.particles.push({
        x: origin.x,
        y: origin.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - (Math.random() * 3 + 2),
        size: Math.random() * 7 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1,
        decay: Math.random() * 0.015 + 0.01,
        shape: shapes[Math.floor(Math.random() * shapes.length)]
      });
    }

    if (!this.animationId) {
      this.loop();
    }
  }

  public burstHearts(origin?: { x: number; y: number }) {
    this.burst({
      count: 40,
      origin,
      colors: ['#F472B6', '#FB7185', '#EC4899', '#DB2777', '#FDA4AF'],
      shapes: ['heart']
    });
  }

  public burstStars(origin?: { x: number; y: number }) {
    this.burst({
      count: 35,
      origin,
      colors: ['#FBBF24', '#F59E0B', '#FEF08A', '#FDE047'],
      shapes: ['star']
    });
  }

  private drawHeart(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    const topCurveHeight = size * 0.3;
    ctx.moveTo(0, topCurveHeight);
    ctx.bezierCurveTo(0, 0, -size / 2, 0, -size / 2, topCurveHeight);
    ctx.bezierCurveTo(-size / 2, (size + topCurveHeight) / 2, 0, size, 0, size * 1.3);
    ctx.bezierCurveTo(0, size, size / 2, (size + topCurveHeight) / 2, size / 2, topCurveHeight);
    ctx.bezierCurveTo(size / 2, 0, 0, 0, 0, topCurveHeight);
    ctx.fill();
  }

  private drawStar(ctx: CanvasRenderingContext2D, size: number) {
    ctx.beginPath();
    const spikes = 5;
    const outerRadius = size;
    const innerRadius = size * 0.45;
    let rot = (Math.PI / 2) * 3;
    let x = 0;
    let y = 0;
    const step = Math.PI / spikes;

    ctx.moveTo(0, -outerRadius);
    for (let i = 0; i < spikes; i++) {
      x = Math.cos(rot) * outerRadius;
      y = Math.sin(rot) * outerRadius;
      ctx.lineTo(x, y);
      rot += step;

      x = Math.cos(rot) * innerRadius;
      y = Math.sin(rot) * innerRadius;
      ctx.lineTo(x, y);
      rot += step;
    }
    ctx.lineTo(0, -outerRadius);
    ctx.closePath();
    ctx.fill();
  }

  private loop = () => {
    if (!this.ctx || !this.canvas) return;

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.18; // gravity
      p.vx *= 0.98; // drag
      p.rotation += p.vRot;
      p.alpha -= p.decay;

      if (p.alpha <= 0 || p.y > this.canvas.height + 20) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, p.alpha);
      this.ctx.fillStyle = p.color;
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);

      if (p.shape === 'heart') {
        this.drawHeart(this.ctx, p.size);
      } else if (p.shape === 'star') {
        this.drawStar(this.ctx, p.size);
      } else if (p.shape === 'circle') {
        this.ctx.beginPath();
        this.ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      } else {
        this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 1.5);
      }

      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      this.animationId = requestAnimationFrame(this.loop);
    } else {
      this.animationId = null;
      if (this.ctx && this.canvas) {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      }
    }
  };

  public destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
      this.animationId = null;
    }
    this.particles = [];
    if (this.canvas) {
      window.removeEventListener('resize', this.handleResize);
      this.canvas.remove();
      this.canvas = null;
      this.ctx = null;
    }
  }
}

export const confetti = new ConfettiEngine();
