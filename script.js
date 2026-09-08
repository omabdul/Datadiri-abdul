/* ========================================================
   Portofolio Modern - Abdul (SMK PGRI 01 Sukorejo)
   Built with Passion, Liquid Glass Theme & Coffee ☕
   ======================================================== */

document.addEventListener('DOMContentLoaded', () => {

    /* === 1. REAL-TIME CLOCK & DATE WIDGET === */
    const clockText = document.getElementById('clock-text');

    function updateRealtimeClock() {
        if (!clockText) return;

        const now = new Date();
        const days = ['Minggu', 'Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu'];
        const dayName = days[now.getDay()];

        const date = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const seconds = String(now.getSeconds()).padStart(2, '0');

        clockText.textContent = `${dayName}, ${date}-${month}-${year} | ${hours}:${minutes}:${seconds} WIB`;
    }

    updateRealtimeClock();
    setInterval(updateRealtimeClock, 1000);

    /* === 2. SPOTIFY PLAYER CONTROLLER === */
    const spotifyTracks = [
        "https://open.spotify.com/embed/track/4xoY4lZNoTjEuHsSmhgF1G?utm_source=generator", // 1. Sesi Potret
        "https://open.spotify.com/embed/track/3rXS2AEXNADrIFyuY3F6RJ?utm_source=generator", // 2. Last Child - Duka
        "https://open.spotify.com/embed/track/19gpjGEqIwwTzhc9wbRitw?utm_source=generator"  // 3. Surat Cinta Untuk Starla
    ];

    let currentTrackIndex = 0;

    const spotifyIframePlayer = document.getElementById('spotify-iframe-player');
    const widgetSongNumber = document.getElementById('widget-song-number');
    const widgetPrevBtn = document.getElementById('widget-prev-btn');
    const widgetNextBtn = document.getElementById('widget-next-btn');
    const miniWidget = document.getElementById('spotify-mini-widget');
    const widgetToggleBtn = document.getElementById('widget-toggle-btn');

    function updateSpotifyTrack() {
        if (spotifyIframePlayer) {
            spotifyIframePlayer.src = spotifyTracks[currentTrackIndex];
        }

        if (widgetSongNumber) {
            widgetSongNumber.textContent = `Lagu ${currentTrackIndex + 1} dari ${spotifyTracks.length}`;
        }
    }

    if (widgetNextBtn) {
        widgetNextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentTrackIndex = (currentTrackIndex + 1) % spotifyTracks.length;
            updateSpotifyTrack();
        });
    }

    if (widgetPrevBtn) {
        widgetPrevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            currentTrackIndex = (currentTrackIndex - 1 + spotifyTracks.length) % spotifyTracks.length;
            updateSpotifyTrack();
        });
    }

    // Toggle Minimize / Expand Floating Player
    if (widgetToggleBtn && miniWidget) {
        widgetToggleBtn.addEventListener('click', () => {
            miniWidget.classList.toggle('minimized');
        });
    }

    /* === 3. RESPONSIVE MOBILE HAMBURGER MENU === */
    const menuToggleBtn = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuIcon = menuToggleBtn ? menuToggleBtn.querySelector('i') : null;

    if (menuToggleBtn && navMenu) {
        menuToggleBtn.addEventListener('click', () => {
            navMenu.classList.toggle('show');
            if (menuIcon) {
                if (navMenu.classList.contains('show')) {
                    menuIcon.className = 'fa-solid fa-xmark';
                } else {
                    menuIcon.className = 'fa-solid fa-bars';
                }
            }
        });

        document.querySelectorAll('.nav-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                navMenu.classList.remove('show');
                if (menuIcon) menuIcon.className = 'fa-solid fa-bars';
            });
        });
    }

    /* === 4. FITUR AUTO & MANUAL LIGHT/DARK THEME SWITCHER === */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;
    
    const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
    
    function applyTheme(theme) {
        if (theme === 'light') {
            document.documentElement.setAttribute('data-theme', 'light');
            if (themeIcon) themeIcon.className = 'fa-solid fa-sun';
        } else {
            document.documentElement.removeAttribute('data-theme');
            if (themeIcon) themeIcon.className = 'fa-solid fa-moon';
        }
    }

    applyTheme(currentTheme);

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                applyTheme('dark');
                localStorage.setItem('theme', 'dark');
            } else {
                applyTheme('light');
                localStorage.setItem('theme', 'light');
            }
        });
    }

    prefersDarkScheme.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    /* === 5. NAVIGATION ACTIVE HIGHLIGHT ON SCROLL === */
    const sections = document.querySelectorAll('section');
    const navButtons = document.querySelectorAll('.nav-btn');

    function highlightNavOnScroll() {
        let scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150;
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navButtons.forEach(btn => {
                    btn.classList.remove('active');
                    if (btn.getAttribute('href') === `#${sectionId}`) {
                        btn.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll);

    /* === 6. EFEK TALI LIQUID BERGERAK SAAT SCROLL === */
    const path = document.getElementById('liquid-path');
    let currentScroll = window.scrollY;
    let waveAmplitude = 0;

    function updateStringPath() {
        const width = window.innerWidth;
        const height = window.innerHeight;
        
        const startX = width * 0.85; 
        const startY = 0;
        const endY = height;

        const controlX = startX + waveAmplitude;
        const controlY = height / 2;

        const d = `M ${startX} ${startY} Q ${controlX} ${controlY} ${startX} ${endY}`;
        if (path) path.setAttribute('d', d);

        waveAmplitude *= 0.92;

        requestAnimationFrame(updateStringPath);
    }

    window.addEventListener('scroll', () => {
        const newScroll = window.scrollY;
        const delta = newScroll - currentScroll;
        
        waveAmplitude += delta * 0.8;
        
        if(waveAmplitude > 150) waveAmplitude = 150;
        if(waveAmplitude < -150) waveAmplitude = -150;

        currentScroll = newScroll;
    });

    updateStringPath();

    /* === 7. ANIMATION REVEAL ON SCROLL === */
    const revealElements = document.querySelectorAll('.reveal');

    function checkReveal() {
        const triggerBottom = window.innerHeight * 0.85;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;

            if (elementTop < triggerBottom) {
                element.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', checkReveal);
    checkReveal();

    /* === 8. EFEK 3D TILT & PRESS SAAT DIKLIK === */
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        let isPressed = false;

        card.addEventListener('mousemove', (e) => {
            if (isPressed) return;

            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = (centerY - y) / 22;
            const rotateY = (x - centerX) / 22;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });

        card.addEventListener('mouseleave', () => {
            isPressed = false;
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });

        card.addEventListener('mousedown', () => {
            isPressed = true;
            card.style.transform = 'perspective(1000px) scale(0.96) translateY(6px)';
        });

        card.addEventListener('mouseup', () => {
            isPressed = false;
            card.style.transform = 'perspective(1000px) scale(1) translateY(-5px)';
        });
    });

    /* === 9. FITUR KOTAK SARAN & KOMENTAR === */
    const commentForm = document.getElementById('commentForm');
    const commentsList = document.getElementById('commentsList');

    if (commentForm) {
        commentForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const usernameInput = document.getElementById('username');
            const commentInput = document.getElementById('comment');

            const nameValue = usernameInput.value.trim();
            const commentValue = commentInput.value.trim();

            if (nameValue !== "" && commentValue !== "") {
                const newComment = document.createElement('div');
                newComment.className = 'comment-item';
                
                newComment.innerHTML = `
                    <div class="author"><i class="fa-regular fa-circle-user"></i> ${escapeHTML(nameValue)}</div>
                    <div class="text">${escapeHTML(commentValue)}</div>
                `;

                commentsList.prepend(newComment);

                usernameInput.value = '';
                commentInput.value = '';
            }
        });
    }

    function escapeHTML(str) {
        return str.replace(/[&<>'"]/g, 
            tag => ({
                '&': '&amp;',
                '<': '&lt;',
                '>': '&gt;',
                "'": '&#39;',
                '"': '&quot;'
            }[tag] || tag)
        );
    }
});