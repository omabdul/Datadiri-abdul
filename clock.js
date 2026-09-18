/**
 * ==========================================================================
 * REAL-TIME COSMIC CLOCK & SLOT-MACHINE DATE SPINNER ENGINE
 * ==========================================================================
 */

let isDateSpinning = false;

function initCosmicClock() {
  const hoursEl = document.getElementById('clock-hours');
  const minutesEl = document.getElementById('clock-minutes');
  const secondsEl = document.getElementById('clock-seconds');
  const greetingEl = document.getElementById('clock-greeting-text');
  const dateContainer = document.getElementById('clock-date');

  const dayNameEl = document.getElementById('date-day-name');
  const dayNumEl = document.getElementById('date-day-num');
  const monthNameEl = document.getElementById('date-month-name');
  const yearEl = document.getElementById('date-year');

  const daysIndo = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
  const monthsIndo = [
    'Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
    'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'
  ];

  function updateClockTime() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    // Format with leading zeros
    const strHours = String(hours).padStart(2, '0');
    const strMinutes = String(minutes).padStart(2, '0');
    const strSeconds = String(seconds).padStart(2, '0');

    if (hoursEl) hoursEl.textContent = strHours;
    if (minutesEl) minutesEl.textContent = strMinutes;
    if (secondsEl) secondsEl.textContent = `:${strSeconds}`;

    // Indonesian Greetings based on hour
    let greeting = 'Selamat Datang';
    if (hours >= 4 && hours < 11) {
      greeting = 'Selamat Pagi 🌅';
    } else if (hours >= 11 && hours < 15) {
      greeting = 'Selamat Siang ☀️';
    } else if (hours >= 15 && hours < 18) {
      greeting = 'Selamat Sore 🌇';
    } else {
      greeting = 'Selamat Malam 🌌';
    }

    if (greetingEl) greetingEl.textContent = greeting;

    // Only update date text if not currently spinning
    if (!isDateSpinning) {
      const dayName = daysIndo[now.getDay()];
      const dateNum = now.getDate();
      const monthName = monthsIndo[now.getMonth()];
      const yearNum = now.getFullYear();

      if (dayNameEl && !dayNameEl.classList.contains('spinning')) dayNameEl.textContent = dayName;
      if (dayNumEl && !dayNumEl.classList.contains('spinning')) dayNumEl.textContent = String(dateNum).padStart(2, '0');
      if (monthNameEl && !monthNameEl.classList.contains('spinning')) monthNameEl.textContent = monthName;
      if (yearEl && !yearEl.classList.contains('spinning')) yearEl.textContent = String(yearNum);
    }
  }

  // --- Slot Machine Date Spin Scramble ---
  function spinCosmicDate(isManualClick = false) {
    if (isDateSpinning) return;
    isDateSpinning = true;

    const now = new Date();
    const targetDayName = daysIndo[now.getDay()];
    const targetDateNum = String(now.getDate()).padStart(2, '0');
    const targetMonthName = monthsIndo[now.getMonth()];
    const targetYear = String(now.getFullYear());

    const slots = [dayNameEl, dayNumEl, monthNameEl, yearEl].filter(Boolean);
    slots.forEach(slot => {
      slot.classList.remove('locked');
      slot.classList.add('spinning');
    });

    if (isManualClick && window.showToast) {
      window.showToast('🎲 Memutar acak tanggal kosmik...');
    }

    // 1. Day Name Spin (settles at ~750ms)
    let dayTimer = setInterval(() => {
      if (dayNameEl) {
        dayNameEl.textContent = daysIndo[Math.floor(Math.random() * daysIndo.length)];
      }
    }, 45);

    setTimeout(() => {
      clearInterval(dayTimer);
      if (dayNameEl) {
        dayNameEl.textContent = targetDayName;
        dayNameEl.classList.remove('spinning');
        dayNameEl.classList.add('locked');
      }
    }, 800);

    // 2. Day Number Spin (e.g., 01 to 31 -> settles on target 18 at ~1400ms)
    let numTimer = setInterval(() => {
      if (dayNumEl) {
        const randDay = Math.floor(Math.random() * 31) + 1;
        dayNumEl.textContent = String(randDay).padStart(2, '0');
      }
    }, 35);

    setTimeout(() => {
      clearInterval(numTimer);
      if (dayNumEl) {
        dayNumEl.textContent = targetDateNum;
        dayNumEl.classList.remove('spinning');
        dayNumEl.classList.add('locked');
        spawnSlotSparkle(dayNumEl);
      }
    }, 1450);

    // 3. Month Name Spin (cycles through months -> settles at ~2000ms)
    let monthTimer = setInterval(() => {
      if (monthNameEl) {
        monthNameEl.textContent = monthsIndo[Math.floor(Math.random() * monthsIndo.length)];
      }
    }, 45);

    setTimeout(() => {
      clearInterval(monthTimer);
      if (monthNameEl) {
        monthNameEl.textContent = targetMonthName;
        monthNameEl.classList.remove('spinning');
        monthNameEl.classList.add('locked');
        spawnSlotSparkle(monthNameEl);
      }
    }, 2050);

    // 4. Year Spin: starts from 0000 -> spins randomly -> settles on 2026 at ~2650ms
    if (yearEl) yearEl.textContent = '0000';
    let yearTimer = setInterval(() => {
      if (yearEl) {
        // Spin random 4 digits
        const randYear = Math.floor(Math.random() * 8999) + 1000;
        yearEl.textContent = String(randYear);
      }
    }, 35);

    setTimeout(() => {
      clearInterval(yearTimer);
      if (yearEl) {
        yearEl.textContent = targetYear;
        yearEl.classList.remove('spinning');
        yearEl.classList.add('locked');
        spawnSlotSparkle(yearEl);
      }
      isDateSpinning = false;
      if (dateContainer) {
        dateContainer.style.boxShadow = '0 0 20px rgba(56, 189, 248, 0.6)';
        setTimeout(() => {
          dateContainer.style.boxShadow = '';
        }, 800);
      }
    }, 2650);
  }

  function spawnSlotSparkle(el) {
    if (!el) return;
    const rect = el.getBoundingClientRect();
    for (let i = 0; i < 6; i++) {
      const dot = document.createElement('div');
      dot.style.cssText = `
        position: fixed;
        left: ${rect.left + rect.width / 2}px;
        top: ${rect.top + rect.height / 2}px;
        width: 5px;
        height: 5px;
        background: #38bdf8;
        border-radius: 50%;
        box-shadow: 0 0 8px #a855f7;
        pointer-events: none;
        z-index: 10000;
        transform: translate(-50%, -50%);
        transition: all 0.6s ease-out;
      `;
      document.body.appendChild(dot);
      const angle = (Math.PI * 2 * i) / 6;
      const dist = Math.random() * 25 + 15;
      requestAnimationFrame(() => {
        dot.style.transform = `translate(${Math.cos(angle) * dist}px, ${Math.sin(angle) * dist}px) scale(0)`;
        dot.style.opacity = '0';
      });
      setTimeout(() => dot.remove(), 600);
    }
  }

  // Click on date badge to re-trigger spin anytime!
  if (dateContainer) {
    dateContainer.addEventListener('click', () => {
      spinCosmicDate(true);
    });
  }

  // Initial updates & auto-spin
  updateClockTime();
  setInterval(updateClockTime, 1000);

  // Trigger spin on initial load (with slight delay so user sees the slots rolling)
  setTimeout(() => {
    spinCosmicDate(false);
  }, 400);

  // Expose global trigger
  window.spinCosmicDate = spinCosmicDate;
}

window.addEventListener('DOMContentLoaded', initCosmicClock);
