/**
 * ==========================================================================
 * GALAXY CANVAS ENGINE - INTERACTIVE COSMIC STARFIELD & NEBULA
 * ==========================================================================
 */

class GalaxyEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.stars = [];
    this.shootingStars = [];
    this.nebulaClouds = [];
    this.starCount = 220;
    this.mouse = { x: -1000, y: -1000, radius: 160, isDown: false };
    this.theme = document.documentElement.getAttribute('data-theme') || 'dark';

    this.init();
    this.setupListeners();
    this.animate();
  }

  init() {
    this.resize();
    this.createStars();
    this.createNebula();
  }

  resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.dpr = Math.min(window.devicePixelRatio || 1, 2);

    this.canvas.width = this.width * this.dpr;
    this.canvas.height = this.height * this.dpr;
    this.ctx.scale(this.dpr, this.dpr);
  }

  setTheme(theme) {
    this.theme = theme;
    this.createNebula(); // Refresh color palette for light/dark mode
  }

  createStars() {
    this.stars = [];
    const colors = this.theme === 'light'
      ? ['#6366f1', '#8b5cf6', '#ec4899', '#0ea5e9', '#3b82f6']
      : ['#ffffff', '#bae6fd', '#ddd6fe', '#fbcfe8', '#a5f3fc'];

    for (let i = 0; i < this.starCount; i++) {
      this.stars.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        originX: 0,
        originY: 0,
        size: Math.random() * 1.8 + 0.5,
        speedX: (Math.random() - 0.5) * 0.25,
        speedY: (Math.random() - 0.5) * 0.25,
        baseAlpha: Math.random() * 0.7 + 0.3,
        alpha: 0.5,
        twinkleSpeed: Math.random() * 0.03 + 0.008,
        color: colors[Math.floor(Math.random() * colors.length)]
      });
      this.stars[i].originX = this.stars[i].x;
      this.stars[i].originY = this.stars[i].y;
    }
  }

  createNebula() {
    this.nebulaClouds = [];
    const isLight = this.theme === 'light';

    const palettes = isLight
      ? [
          { r: 99, g: 102, b: 241, a: 0.08 },
          { r: 168, g: 85, b: 247, a: 0.06 },
          { r: 236, g: 72, b: 153, a: 0.05 },
          { r: 14, g: 165, b: 233, a: 0.07 }
        ]
      : [
          { r: 79, g: 70, b: 229, a: 0.16 },
          { r: 147, g: 51, b: 234, a: 0.14 },
          { r: 219, g: 39, b: 119, a: 0.12 },
          { r: 2, g: 132, b: 199, a: 0.15 }
        ];

    const cloudCount = 5;
    for (let i = 0; i < cloudCount; i++) {
      this.nebulaClouds.push({
        x: (this.width / cloudCount) * i + Math.random() * 100,
        y: (this.height / 2) + (Math.random() - 0.5) * (this.height * 0.6),
        radius: Math.random() * 250 + 200,
        color: palettes[i % palettes.length],
        driftX: (Math.random() - 0.5) * 0.15,
        driftY: (Math.random() - 0.5) * 0.15
      });
    }
  }

  createShootingStar() {
    if (this.shootingStars.length >= 2) return;
    const startX = Math.random() * this.width;
    const startY = Math.random() * (this.height * 0.5);

    this.shootingStars.push({
      x: startX,
      y: startY,
      length: Math.random() * 120 + 80,
      speed: Math.random() * 10 + 12,
      angle: Math.PI / 4 + (Math.random() - 0.5) * 0.2, // ~45 deg
      opacity: 1,
      trail: []
    });
  }

  setupListeners() {
    window.addEventListener('resize', () => this.init());

    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener('mouseleave', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    window.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (e.touches.length > 0) {
        this.mouse.x = e.touches[0].clientX;
        this.mouse.y = e.touches[0].clientY;
      }
    }, { passive: true });

    window.addEventListener('touchend', () => {
      this.mouse.x = -1000;
      this.mouse.y = -1000;
    });

    // Random shooting star scheduler
    setInterval(() => {
      if (Math.random() > 0.4) {
        this.createShootingStar();
      }
    }, 4500);
  }

  drawNebula() {
    this.nebulaClouds.forEach((cloud) => {
      cloud.x += cloud.driftX;
      cloud.y += cloud.driftY;

      if (cloud.x < -cloud.radius) cloud.x = this.width + cloud.radius;
      if (cloud.x > this.width + cloud.radius) cloud.x = -cloud.radius;
      if (cloud.y < -cloud.radius) cloud.y = this.height + cloud.radius;
      if (cloud.y > this.height + cloud.radius) cloud.y = -cloud.radius;

      const grad = this.ctx.createRadialGradient(
        cloud.x, cloud.y, 0,
        cloud.x, cloud.y, cloud.radius
      );
      const c = cloud.color;
      grad.addColorStop(0, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})`);
      grad.addColorStop(0.5, `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a * 0.4})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.fillStyle = grad;
      this.ctx.beginPath();
      this.ctx.arc(cloud.x, cloud.y, cloud.radius, 0, Math.PI * 2);
      this.ctx.fill();
    });
  }

  drawStars() {
    for (let i = 0; i < this.stars.length; i++) {
      const star = this.stars[i];

      // Base twinkle
      star.alpha = star.baseAlpha + Math.sin(Date.now() * star.twinkleSpeed) * 0.3;
      star.alpha = Math.max(0.1, Math.min(1, star.alpha));

      // Constant cosmic drift
      star.x += star.speedX;
      star.y += star.speedY;

      // Wrap edges
      if (star.x < 0) star.x = this.width;
      if (star.x > this.width) star.x = 0;
      if (star.y < 0) star.y = this.height;
      if (star.y > this.height) star.y = 0;

      // Gravitational warp / Liquid displacement on mouse proximity
      const dx = this.mouse.x - star.x;
      const dy = this.mouse.y - star.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < this.mouse.radius) {
        const force = (1 - dist / this.mouse.radius) * 15;
        const angle = Math.atan2(dy, dx);
        star.x -= Math.cos(angle) * force;
        star.y -= Math.sin(angle) * force;
        star.alpha = Math.min(1, star.alpha + 0.5);
      }

      // Render Star
      this.ctx.fillStyle = star.color;
      this.ctx.globalAlpha = star.alpha;
      this.ctx.beginPath();
      this.ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
      this.ctx.fill();

      // Extra starlight cross for larger stars
      if (star.size > 1.6) {
        this.ctx.strokeStyle = star.color;
        this.ctx.lineWidth = 0.5;
        this.ctx.beginPath();
        this.ctx.moveTo(star.x - star.size * 2, star.y);
        this.ctx.lineTo(star.x + star.size * 2, star.y);
        this.ctx.moveTo(star.x, star.y - star.size * 2);
        this.ctx.lineTo(star.x, star.y + star.size * 2);
        this.ctx.stroke();
      }
    }
    this.ctx.globalAlpha = 1;
  }

  drawShootingStars() {
    for (let i = this.shootingStars.length - 1; i >= 0; i--) {
      const s = this.shootingStars[i];

      s.x += Math.cos(s.angle) * s.speed;
      s.y += Math.sin(s.angle) * s.speed;
      s.opacity -= 0.015;

      const tailX = s.x - Math.cos(s.angle) * s.length;
      const tailY = s.y - Math.sin(s.angle) * s.length;

      const grad = this.ctx.createLinearGradient(s.x, s.y, tailX, tailY);
      grad.addColorStop(0, `rgba(255, 255, 255, ${Math.max(0, s.opacity)})`);
      grad.addColorStop(0.3, `rgba(168, 85, 247, ${Math.max(0, s.opacity * 0.7)})`);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');

      this.ctx.strokeStyle = grad;
      this.ctx.lineWidth = 2.5;
      this.ctx.lineCap = 'round';

      this.ctx.beginPath();
      this.ctx.moveTo(s.x, s.y);
      this.ctx.lineTo(tailX, tailY);
      this.ctx.stroke();

      if (s.opacity <= 0 || s.x > this.width + 100 || s.y > this.height + 100) {
        this.shootingStars.splice(i, 1);
      }
    }
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawNebula();
    this.drawStars();
    this.drawShootingStars();

    requestAnimationFrame(() => this.animate());
  }
}

// Global instance export
let galaxyInstance = null;
window.addEventListener('DOMContentLoaded', () => {
  galaxyInstance = new GalaxyEngine('galaxy-canvas');
});
