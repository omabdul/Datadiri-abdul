// =========================================================
// 1. SESSION & LOGIN HANDLER (MAX 24 JAM)
// =========================================================
const SESSION_LIMIT = 24 * 60 * 60 * 1000; // 24 jam dalam milidetik

function checkSession() {
    const currentPage = window.location.pathname;
    const isLoginPage = currentPage.includes("login.html");
    const sessionData = localStorage.getItem("userSession");
    const loginMenu = document.getElementById("loginMenu");

    if (sessionData) {
        const { timestamp, username } = JSON.parse(sessionData);
        const now = new Date().getTime();

        if (now - timestamp > SESSION_LIMIT) {
            // Sesi lebih dari 24 jam, hapus data sesi secara diam-diam
            localStorage.removeItem("userSession");
            if (loginMenu) {
                loginMenu.textContent = "Login";
                loginMenu.href = "login.html";
            }
        } else {
            // Sesi masih aktif (kurang dari 24 jam)
            if (isLoginPage) {
                // Jika sudah login tapi iseng buka halaman login, kembalikan ke home
                window.location.href = "index.html";
            }
            
            // Ubah teks menu "Login" menjadi nama pengunjung & fungsikan sebagai Logout
            if (loginMenu) {
                loginMenu.textContent = `👤 ${username} (Logout)`;
                loginMenu.href = "#";
                loginMenu.onclick = (e) => {
                    e.preventDefault();
                    localStorage.removeItem("userSession");
                    alert("Kamu telah keluar!");
                    window.location.reload();
                };
            }
        }
    } else {
        // Tidak ada data sesi (belum login)
        if (loginMenu) {
            loginMenu.textContent = "Login";
            loginMenu.href = "login.html";
        }
    }
}

// Eksekusi pengecekan sesi secara instan
checkSession();

// Handle aksi submit form login di halaman login.html
document.addEventListener("DOMContentLoaded", () => {
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const usernameInput = document.getElementById("username").value;
            const now = new Date().getTime();
            
            // Simpan nama pengunjung dan waktu login ke localStorage
            localStorage.setItem("userSession", JSON.stringify({
                username: usernameInput,
                timestamp: now
            }));
            
            // Masuk ke halaman utama setelah sukses login
            window.location.href = "index.html";
        });
    }
});


// =========================================================
// 2. LOADING SCREEN & AUTO-PLAY HANDLER
// =========================================================
window.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const progressCounter = document.getElementById("progress-counter");
    const bgMusic = document.getElementById("bgMusic");
    const playBtn = document.getElementById("playBtn");
    const musicWidget = document.getElementById("musicWidget");
    
    let currentProgress = 0;
    const interval = setInterval(() => {
        currentProgress += Math.floor(Math.random() * 3) + 1; 
        
        if (currentProgress >= 100) {
            currentProgress = 100;
            clearInterval(interval);
            
            setTimeout(() => {
                if(loadingScreen) loadingScreen.classList.add("fade-out");
                
                // Coba jalankan musik secara otomatis
                if (bgMusic) {
                    bgMusic.volume = 0.3;
                    bgMusic.play().then(() => {
                        if (playBtn) playBtn.textContent = "⏸";
                    }).catch(error => {
                        // Jika dicegah browser, pasang event klik pertama
                        const unlockAudio = () => {
                            bgMusic.play().then(() => {
                                if (playBtn) playBtn.textContent = "⏸";
                                window.removeEventListener("click", unlockAudio);
                                window.removeEventListener("touchstart", unlockAudio);
                            });
                        };
                        window.addEventListener("click", unlockAudio);
                        window.addEventListener("touchstart", unlockAudio);
                    });
                }
                
                // Otomatis minimize widget musik saat halaman terbuka
                if (musicWidget) {
                    musicWidget.classList.add("minimized");
                    const minimizeBtn = document.getElementById("minimizeBtn");
                    if (minimizeBtn) minimizeBtn.textContent = "+";
                }
                
            }, 400);
        }
        if (progressCounter) {
            progressCounter.textContent = currentProgress + "%";
        }
    }, 60);
});


// =========================================================
// 3. MENU TOGGLE & YEAR
// =========================================================
const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector("nav");
if(toggle){
    toggle.addEventListener("click", () => nav.classList.toggle("open"));
}
document.querySelectorAll("nav a").forEach(a => {
    a.addEventListener("click", () => nav.classList.remove("open"));
});

const yearEl = document.querySelector("#year");
if(yearEl) {
    yearEl.textContent = new Date().getFullYear();
}


// =========================================================
// 4. MUSIC PLAYER MANUAL CONTROLS
// =========================================================
const bgMusicPlayer = document.getElementById("bgMusic");
const playBtnControl = document.getElementById("playBtn");
const minimizeBtnControl = document.getElementById("minimizeBtn");
const musicWidgetContainer = document.getElementById("musicWidget");

if (playBtnControl && bgMusicPlayer) {
    playBtnControl.addEventListener("click", () => {
        if (bgMusicPlayer.paused) {
            bgMusicPlayer.play();
            playBtnControl.textContent = "⏸";
        } else {
            bgMusicPlayer.pause();
            playBtnControl.textContent = "▶";
        }
    });
}

if (minimizeBtnControl && musicWidgetContainer) {
    minimizeBtnControl.addEventListener("click", () => {
        musicWidgetContainer.classList.toggle("minimized");
        minimizeBtnControl.textContent = musicWidgetContainer.classList.contains("minimized") ? "+" : "−";
    });
}