document.addEventListener('DOMContentLoaded', () => {
    // Navigasi & Router Sederhana Berbasis Hash
    const navLinks = document.querySelectorAll('.nav-link, .secret-login-link, [data-target]');
    const sections = document.querySelectorAll('.page-section');

    function switchPage(targetId) {
        sections.forEach(section => {
            if (section.id === targetId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            if (link.getAttribute('data-target') === targetId) {
                link.classList.add('active');
            } else if (link.classList.contains('nav-link')) {
                link.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Tangani klik navigasi
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const target = link.getAttribute('data-target');
            if (target) {
                e.preventDefault();
                window.location.hash = target;
                switchPage(target);
            }
        });
    });

    // Periksa hash saat halaman dimuat atau diubah
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchPage(hash);
        } else {
            switchPage('home');
        }
    }

    window.addEventListener('hashchange', handleHashChange);
    handleHashChange();

    // Jam Real-Time & Tanggal
    function updateClock() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');
        
        const clockEl = document.getElementById('realtime-clock');
        if (clockEl) {
            clockEl.textContent = `${hours}:${minutes}:${seconds}`;
        }

        const options = { weekday: 'long', day: 'numeric', month: 'short', year: 'numeric' };
        const dateStr = now.toLocaleDateString('id-ID', options);
        const dateEl = document.getElementById('realtime-date');
        if (dateEl) {
            dateEl.textContent = dateStr;
        }
    }

    setInterval(updateClock, 1000);
    updateClock();

    // Toggle Mode Gelap & Terang
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;

    themeToggleBtn.addEventListener('click', () => {
        if (htmlElement.classList.contains('dark')) {
            htmlElement.classList.remove('dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            htmlElement.classList.add('dark');
            themeToggleBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
});