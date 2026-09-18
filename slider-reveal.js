/**
 * ==========================================================================
 * INTERACTIVE SLIDE / SWIPE REVEAL ANIMATION ENGINE
 * "Pas di Geser Muncul Animasi"
 * ==========================================================================
 */

class CosmicSliderReveal {
  constructor() {
    this.track = document.getElementById('cosmic-slide-track');
    this.thumb = document.getElementById('slide-orb-thumb');
    this.fillTrail = document.getElementById('slide-fill-trail');
    this.hintText = document.getElementById('slide-hint-text');
    this.statusTag = document.getElementById('slider-status-tag');
    this.secretBanner = document.getElementById('slide-secret-banner');
    this.identityCard = document.getElementById('cosmic-identity-card');

    if (!this.track || !this.thumb) return;

    this.isDragging = false;
    this.startX = 0;
    this.currentX = 0;
    this.maxSlide = 0;
    this.isUnlocked = false;

    this.init();
  }

  init() {
    this.updateDimensions();
    window.addEventListener('resize', () => this.updateDimensions());
    this.setupGestureEvents();
    this.setupTiltEffect();
  }

  updateDimensions() {
    const trackRect = this.track.getBoundingClientRect();
    const thumbRect = this.thumb.getBoundingClientRect();
    this.maxSlide = Math.max(0, trackRect.width - thumbRect.width - 12);
  }

  setupGestureEvents() {
    // Mouse Events
    this.thumb.addEventListener('mousedown', (e) => this.onDragStart(e.clientX));
    window.addEventListener('mousemove', (e) => this.onDragMove(e.clientX));
    window.addEventListener('mouseup', () => this.onDragEnd());

    // Touch Events (Mobile/Tablet Swipe)
    this.thumb.addEventListener('touchstart', (e) => {
      if (e.touches.length > 0) this.onDragStart(e.touches[0].clientX);
    }, { passive: true });

    window.addEventListener('touchmove', (e) => {
      if (this.isDragging && e.touches.length > 0) {
        this.onDragMove(e.touches[0].clientX);
      }
    }, { passive: true });

    window.addEventListener('touchend', () => this.onDragEnd());

    // Click track to snap/explore
    this.track.addEventListener('click', (e) => {
      if (e.target === this.thumb || this.thumb.contains(e.target)) return;
      const trackRect = this.track.getBoundingClientRect();
      const clickPos = e.clientX - trackRect.left - 24;
      if (clickPos > this.maxSlide * 0.6) {
        this.triggerUnlock();
      }
    });
  }

  onDragStart(clientX) {
    this.isDragging = true;
    this.startX = clientX - this.currentX;
    this.updateDimensions();
    this.track.style.transition = 'none';
  }

  onDragMove(clientX) {
    if (!this.isDragging) return;

    let deltaX = clientX - this.startX;
    deltaX = Math.max(0, Math.min(deltaX, this.maxSlide));
    this.currentX = deltaX;

    const progress = this.maxSlide > 0 ? this.currentX / this.maxSlide : 0;

    // Move thumb & fill trail
    this.thumb.style.transform = `translateX(${this.currentX}px)`;
    if (this.fillTrail) {
      this.fillTrail.style.width = `${Math.min(100, (this.currentX / this.maxSlide) * 100)}%`;
    }

    // Fade hint text as user drags
    if (this.hintText) {
      this.hintText.style.opacity = `${1 - progress * 1.5}`;
    }

    // Spawn stardust particles along drag path
    this.spawnDragParticle(this.thumb.getBoundingClientRect());

    // Status update
    if (this.statusTag) {
      this.statusTag.textContent = `${Math.round(progress * 100)}%`;
    }

    // Auto unlock if reached near end (> 88%)
    if (progress >= 0.88 && !this.isUnlocked) {
      this.triggerUnlock();
      this.onDragEnd();
    }
  }

  onDragEnd() {
    if (!this.isDragging) return;
    this.isDragging = false;

    const progress = this.maxSlide > 0 ? this.currentX / this.maxSlide : 0;
    if (progress >= 0.8) {
      this.triggerUnlock();
    } else {
      // Snap back smoothly
      this.currentX = 0;
      this.thumb.style.transition = 'transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)';
      this.thumb.style.transform = `translateX(0px)`;
      if (this.fillTrail) {
        this.fillTrail.style.transition = 'width 0.4s ease';
        this.fillTrail.style.width = '0%';
      }
      if (this.hintText) {
        this.hintText.style.opacity = '1';
      }
      if (this.statusTag && !this.isUnlocked) {
        this.statusTag.textContent = 'SIAP DIGESER';
      }
      setTimeout(() => {
        if (this.thumb) this.thumb.style.transition = '';
        if (this.fillTrail) this.fillTrail.style.transition = '';
      }, 400);
    }
  }

  triggerUnlock() {
    this.isUnlocked = true;
    this.currentX = this.maxSlide;
    this.thumb.style.transform = `translateX(${this.maxSlide}px)`;
    if (this.fillTrail) this.fillTrail.style.width = '100%';
    this.track.classList.add('unlocked');

    // Change icon in thumb
    this.thumb.innerHTML = '<i class="fas fa-check"></i>';
    this.thumb.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';

    if (this.statusTag) {
      this.statusTag.textContent = '🌟 AKTIF!';
      this.statusTag.style.color = '#38bdf8';
    }

    // Reveal the secret animated banner
    if (this.secretBanner) {
      this.secretBanner.style.display = 'block';
    }

    // Animate identity card
    if (this.identityCard) {
      this.identityCard.style.boxShadow = '0 0 50px rgba(168, 85, 247, 0.6), 0 0 100px rgba(56, 189, 248, 0.3)';
      this.identityCard.classList.add('hologram-effect');
    }

    // Stardust confetti explosion!
    this.createStardustConfetti();

    // Show toast notification
    if (window.showToast) {
      window.showToast('🌌 Animasi Kosmik Diaktifkan! Selamat Datang di Dunia Bellatrix!');
    }
  }

  spawnDragParticle(rect) {
    const particle = document.createElement('div');
    particle.className = 'stardust-sparkle';
    particle.style.cssText = `
      position: fixed;
      left: ${rect.left + rect.width / 2}px;
      top: ${rect.top + rect.height / 2}px;
      width: ${Math.random() * 8 + 4}px;
      height: ${Math.random() * 8 + 4}px;
      background: radial-gradient(circle, #ffffff, #a855f7, transparent);
      border-radius: 50%;
      pointer-events: none;
      z-index: 9999;
      transform: translate(-50%, -50%);
      animation: sparkleFloat 0.7s ease-out forwards;
    `;
    document.body.appendChild(particle);
    setTimeout(() => particle.remove(), 700);
  }

  createStardustConfetti() {
    const rect = this.track.getBoundingClientRect();
    const count = 45;

    for (let i = 0; i < count; i++) {
      const p = document.createElement('div');
      const colors = ['#818cf8', '#c084fc', '#f472b6', '#38bdf8', '#34d399', '#fbbf24'];
      const color = colors[Math.floor(Math.random() * colors.length)];
      const size = Math.random() * 9 + 4;
      const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
      const velocity = Math.random() * 120 + 60;
      const vx = Math.cos(angle) * velocity;
      const vy = Math.sin(angle) * velocity;

      p.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: ${size}px;
        height: ${size}px;
        background: ${color};
        border-radius: ${Math.random() > 0.5 ? '50%' : '3px'};
        box-shadow: 0 0 10px ${color};
        pointer-events: none;
        z-index: 10000;
        transition: transform 0.9s cubic-bezier(0.25, 1, 0.5, 1), opacity 0.9s ease;
      `;

      document.body.appendChild(p);

      requestAnimationFrame(() => {
        p.style.transform = `translate(${vx}px, ${vy}px) scale(0)`;
        p.style.opacity = '0';
      });

      setTimeout(() => p.remove(), 1000);
    }
  }

  setupTiltEffect() {
    if (!this.identityCard) return;

    this.identityCard.addEventListener('mousemove', (e) => {
      const rect = this.identityCard.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -12;
      const rotateY = ((x - centerX) / centerX) * 12;

      this.identityCard.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    this.identityCard.addEventListener('mouseleave', () => {
      this.identityCard.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
    });
  }
}

// Sparkle CSS Keyframe injector
const sparkleStyle = document.createElement('style');
sparkleStyle.textContent = `
  @keyframes sparkleFloat {
    0% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1);
    }
    100% {
      opacity: 0;
      transform: translate(calc(-50% + ${(Math.random() - 0.5) * 60}px), calc(-50% - 40px)) scale(0.2);
    }
  }
`;
document.head.appendChild(sparkleStyle);

window.addEventListener('DOMContentLoaded', () => {
  new CosmicSliderReveal();
});
