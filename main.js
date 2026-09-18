/**
 * ==========================================================================
 * MAIN APP CONTROLLER - THEMES, LIQUID GLASS EFFECTS & INTERACTIONS
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  initCosmicPreloader();
  initThemeToggle();
  initLiquidGlassEffects();
  initNavigation();
  initScrollAnimations();
  initProjectFilters();
  initContactForm();
  initBackToTop();
  initCounterStats();
});

/* --- 0. COSMIC PRELOADER (1 - 100% DENGAN IKONIK BINTANG) --- */
function initCosmicPreloader() {
  const preloader = document.getElementById('cosmic-preloader');
  const counterEl = document.getElementById('preloader-counter');
  const fillEl = document.getElementById('preloader-bar-fill');
  const statusEl = document.getElementById('preloader-status-text');

  if (!preloader || !counterEl || !fillEl) return;

  let current = 1;
  const target = 100;

  // Status progression messages aligned with Bellatrix's IT skills
  const getStatusText = (val) => {
    if (val < 25) return '🌌 Menghubungkan ke Jaringan Kosmik...';
    if (val < 50) return '⚡ Mengonfigurasi Akses Poin & MikroTik...';
    if (val < 75) return '🖥️ Memuat Server Hosting & Sistem Windows...';
    if (val < 95) return '✨ Menyiapkan Antarmuka Liquid Glass...';
    return '🚀 Selamat Datang di Dimensi Bellatrix!';
  };

  const timer = setInterval(() => {
    // "Agak pelan tapi ga pelan banget" (~2.8 detik total durasi)
    let increment = 1;
    if (current < 30) {
      increment = Math.random() > 0.4 ? 2 : 1;
    } else if (current >= 30 && current < 70) {
      increment = Math.random() > 0.6 ? 2 : 1;
    } else if (current >= 70 && current < 90) {
      increment = 1;
    } else {
      increment = Math.random() > 0.5 ? 2 : 1;
    }

    current += increment;

    if (current >= target) {
      current = target;
      clearInterval(timer);

      counterEl.textContent = '100';
      fillEl.style.width = '100%';
      if (statusEl) statusEl.textContent = getStatusText(100);

      // Smooth exit transition
      setTimeout(() => {
        preloader.classList.add('loaded');
        // Trigger initial hero reveal
        document.querySelectorAll('#home .smooth-reveal').forEach((el) => {
          el.classList.add('revealed');
        });
        // Trigger cosmic date spin when user enters the hero section!
        if (window.spinCosmicDate) {
          setTimeout(() => window.spinCosmicDate(false), 250);
        }
      }, 450);
    } else {
      counterEl.textContent = current;
      fillEl.style.width = `${current}%`;
      if (statusEl) statusEl.textContent = getStatusText(current);
    }
  }, 32);
}

/* --- 1. THEME SWITCHER (Dark Galaxy / Light Celestial) --- */
function initThemeToggle() {
  const toggleBtn = document.getElementById('theme-toggle-btn');
  const themeIcon = document.getElementById('theme-icon');
  const htmlRoot = document.documentElement;

  // Retrieve saved preference or system theme
  const savedTheme = localStorage.getItem('bellatrix_theme') || 'dark';
  applyTheme(savedTheme);

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const currentTheme = htmlRoot.getAttribute('data-theme') || 'dark';
      const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
      applyTheme(newTheme);
      showToast(newTheme === 'light' ? '☀️ Mode Terang (Celestial Dawn) Diaktifkan' : '🌌 Mode Gelap (Cosmic Void) Diaktifkan');
    });
  }

  function applyTheme(theme) {
    htmlRoot.setAttribute('data-theme', theme);
    localStorage.setItem('bellatrix_theme', theme);

    if (themeIcon) {
      if (theme === 'light') {
        themeIcon.className = 'fas fa-sun';
        themeIcon.style.color = '#f59e0b';
      } else {
        themeIcon.className = 'fas fa-moon';
        themeIcon.style.color = '#c084fc';
      }
    }

    // Update galaxy canvas engine palette if initialized
    if (window.galaxyInstance) {
      window.galaxyInstance.setTheme(theme);
    }
  }
}

/* --- 2. LIQUID GLASS MOUSE TRACKING & RIPPLE --- */
function initLiquidGlassEffects() {
  // Track mouse coordinates for liquid specular reflection on buttons & cards
  const liquidElements = document.querySelectorAll('.liquid-btn, .liquid-card');

  liquidElements.forEach((el) => {
    el.addEventListener('mousemove', (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;

      el.style.setProperty('--mouse-x', `${x}%`);
      el.style.setProperty('--mouse-y', `${y}%`);
    });

    // Liquid ripple wave on click
    el.addEventListener('click', (e) => {
      const ripple = document.createElement('span');
      ripple.classList.add('liquid-ripple');

      const rect = el.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = `${size}px`;
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      el.appendChild(ripple);
      setTimeout(() => ripple.remove(), 700);
    });
  });
}

/* --- 3. NAVIGATION & MOBILE DRAWER --- */
function initNavigation() {
  const navbar = document.querySelector('.navbar');
  const mobileToggle = document.getElementById('mobile-toggle-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  const navLinks = document.querySelectorAll('.nav-link');

  // Sticky blur effect on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar?.classList.add('scrolled');
    } else {
      navbar?.classList.remove('scrolled');
    }
  });

  // Mobile menu toggle
  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('active');
      const isOpen = mobileDrawer.classList.contains('active');
      mobileToggle.innerHTML = isOpen ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('active');
        mobileToggle.innerHTML = '<i class="fas fa-bars"></i>';
      });
    });
  }

  // Active section spy
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset + 120;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  });
}

/* --- 4. SCROLL ANIMATIONS & SKILL BARS --- */
function initScrollAnimations() {
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.12
  };

  // 4a. Smooth Reveal on Scroll
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.smooth-reveal, .smooth-reveal-left, .smooth-reveal-right');
  revealElements.forEach((el) => revealObserver.observe(el));

  // 4b. Animate skill progress bars when visible
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-bar-fill');
        fills.forEach((fill) => {
          const width = fill.getAttribute('data-level') || '85%';
          fill.style.width = width;
        });
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const skillsSection = document.getElementById('keahlian');
  if (skillsSection) skillObserver.observe(skillsSection);
}

/* --- 5. STATS COUNTER ANIMATION --- */
function initCounterStats() {
  const counters = document.querySelectorAll('.stat-number');
  let hasAnimated = false;

  const countObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !hasAnimated) {
      hasAnimated = true;
      counters.forEach((counter) => {
        const target = +counter.getAttribute('data-target');
        const duration = 1800;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;
        let current = 0;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            counter.textContent = target + (counter.getAttribute('data-suffix') || '');
            clearInterval(timer);
          } else {
            counter.textContent = Math.floor(current) + (counter.getAttribute('data-suffix') || '');
          }
        }, stepTime);
      });
    }
  }, { threshold: 0.3 });

  const aboutSection = document.getElementById('tentang');
  if (aboutSection) countObserver.observe(aboutSection);
}

/* --- 6. PROJECT FILTERS --- */
function initProjectFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'scale(0.9)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });
}

/* --- 7. CONTACT FORM SUBMISSION --- */
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const nameInput = document.getElementById('contact-name');
    const emailInput = document.getElementById('contact-email');
    const messageInput = document.getElementById('contact-message');
    const submitBtn = form.querySelector('button[type="submit"]');

    if (!nameInput?.value.trim() || !emailInput?.value.trim() || !messageInput?.value.trim()) {
      showToast('⚠️ Mohon lengkapi semua kolom pesan.');
      return;
    }

    // Loading state
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Mengirimkan Pesan Kosmik...';
    submitBtn.disabled = true;

    setTimeout(() => {
      submitBtn.innerHTML = '<i class="fas fa-check"></i> Pesan Terkirim!';
      submitBtn.style.background = 'linear-gradient(135deg, #10b981 0%, #06b6d4 100%)';
      showToast(`✨ Terima kasih ${nameInput.value}! Pesan Anda telah diterima oleh Bellatrix.`);
      form.reset();

      setTimeout(() => {
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
        submitBtn.style.background = '';
      }, 3500);
    }, 1200);
  });
}

/* --- 8. BACK TO TOP BUTTON --- */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('visible');
    } else {
      backToTopBtn.classList.remove('visible');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

/* --- 9. GLOBAL TOAST NOTIFICATION --- */
window.showToast = function (message) {
  let toast = document.getElementById('cosmic-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'cosmic-toast';
    toast.className = 'cosmic-toast';
    document.body.appendChild(toast);
  }

  toast.innerHTML = `<i class="fas fa-meteor"></i> <span>${message}</span>`;
  toast.classList.add('show');

  clearTimeout(window.toastTimer);
  window.toastTimer = setTimeout(() => {
    toast.classList.remove('show');
  }, 4000);
};
