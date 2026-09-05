// --- DASHBOARD SESSION & LOGOUT HANDLER ---
document.addEventListener("DOMContentLoaded", () => {
    const sessionData = localStorage.getItem("userSession");
    
    if (!sessionData) {
        // Jika belum login, tendang balik ke halaman login
        window.location.href = "login.html";
    } else {
        const data = JSON.parse(sessionData);
        
        // Tampilkan nama user di elemen yang sesuai
        const welcomeTitle = document.getElementById("welcomeTitle");
        const displayUser = document.getElementById("displayUser");
        
        if (welcomeTitle) welcomeTitle.textContent = `Halo, ${data.username}!`;
        if (displayUser) displayUser.textContent = data.username;
    }

    // Fungsi Tombol Logout
    const handleLogout = (e) => {
        e.preventDefault();
        localStorage.removeItem("userSession");
        window.location.href = "login.html";
    };

    const logoutBtn = document.getElementById("logoutBtn");
    const btnActionLogout = document.getElementById("btnActionLogout");

    if (logoutBtn) logoutBtn.addEventListener("click", handleLogout);
    if (btnActionLogout) btnActionLogout.addEventListener("click", handleLogout);
});