# 🌌 Portofolio Modern Galaksi - Bellatrix Abdul Rahman

Website portofolio modern, futuristik, dan interaktif dengan nuansa latar belakang galaksi (canvas nebula & bintang 3D), tombol dan kartu **Liquid Glass** (Glassmorphism), jam digital real-time, pengubah tema Gelap & Terang, serta animasi gestur interaktif saat digeser (*slide / swipe reveal*).

---

## ✨ Fitur Unggulan

1. **Latar Belakang Galaksi Interaktif (Canvas 60 FPS)**
   - Sistem partikel bintang berlapis dengan kedalaman 3D (*multi-depth twinkling stars*).
   - Efek awan gas nebula kosmik (*dynamic drifting nebula clouds*).
   - Bintang jatuh / meteor berkala (*shooting stars with glowing tails*).
   - Efek gravitasi interaktif: Bintang-bintang meliuk dan bereaksi mengikuti gerakan kursor mouse atau sentuhan jari di layar HP.
   - Adaptasi palet warna otomatis saat berpindah antara **Dark Cosmic Void** dan **Light Celestial Dawn**.

2. **Liquid Glassmorphism UI (Kaca Cair Berkauil)**
   - Tombol dan kartu bertekstur kaca transparan dengan `backdrop-filter: blur(20px) saturate(190%)`.
   - Refleksi kilau specular (*mouse-tracking specular light*) yang mengikuti sudut kursor pengguna.
   - Efek gelombang riak (*liquid ripple*) saat tombol diklik.

3. **Jam Digital Kosmik Real-Time**
   - Menampilkan jam, menit, dan detik secara langsung (*live ticking*).
   - Ucapan otomatis menyesuaikan waktu lokal Indonesia:
     - 🌅 *Selamat Pagi* (04:00 - 10:59)
     - ☀️ *Selamat Siang* (11:00 - 14:59)
     - 🌇 *Selamat Sore* (15:00 - 18:29)
     - 🌌 *Selamat Malam* (18:30 - 03:59)
   - Indikator status live pulsasi hijau dan penanggalan lengkap.

4. **Fitur "Pas di Geser Muncul Animasi" (Cosmic Slide/Swipe Reveal)**
   - Slider interaktif khusus di bagian *Selamat Datang*:
     - Tarik tombol orb ke kanan (mouse drag atau sentuhan touch di layar sentuh).
     - Memunculkan jejak partikel stardust berkilau (*sparkle particles trail*).
     - Mengisi lintasan dengan gradasi cairan kosmik.
   - Saat digeser penuh / terbuka:
     - Memicu ledakan kembang api stardust (*confetti explosion*).
     - Membuka panel rahasia (*Secret Dimension Banner*).
     - Mengaktifkan aura hologram berpendar pada kartu profil 3D Bellatrix Abdul Rahman.
     - Memunculkan notifikasi kosmik toast.

5. **Kartu Identitas 3D Tilt Interaktif**
   - Kartu profil Bellatrix yang bereaksi terhadap gerakan kursor (*3D Parallax Tilt*) dengan avatar berelemen kosmik, orbit berputar, dan badge mengambang (*floating badges*).

6. **Pengalih Tema Gelap & Terang (Theme Toggle)**
   - **Mode Gelap (*Dark Cosmic Void*)**: Nuansa ruang angkasa obsidian dengan pendaran neon cyan, violet, dan magenta.
   - **Mode Terang (*Light Celestial Dawn*)**: Nuansa fajar kosmik lembut dengan warna lavender, mutiara, dan emas stardust.
   - Preferensi tema tersimpan secara otomatis di `localStorage`.

7. **Bagian Portofolio Komprehensif**
   - **Tentang Saya**: Narasi visi, prinsip rekayasa web, dan metrik counter beranimasi (Tahun Pengalaman, Proyek, Klien, Performa Web).
   - **Keahlian (Skills)**: Bar kemahiran animasi dan tag konstelasi teknologi (Frontend, Backend & Cloud, UI/UX).
   - **Proyek (Portofolio)**: Filter kategori instan (Semua, Web App, Mobile UI, Creative 3D) dengan kartu liquid glass.
   - **Pengalaman (Linimasa)**: Linimasa jejak karier dan studi kosmik.
   - **Kontak**: Formulir pesan interaktif dengan feedback pengiriman dan tautan langsung ke WhatsApp, Email, LinkedIn, GitHub.

---

## 📁 Struktur Berkas

```
bellatrix-galaxy-portfolio/
├── index.html              # Halaman web utama
├── css/
│   ├── style.css           # Styling utama, tipografi, tata letak, dan responsif
│   ├── galaxy.css          # Styling canvas latar belakang galaksi & animasi kosmik
│   └── liquid-glass.css    # Definisi efek visual liquid glass & tombol kaca cair
├── js/
│   ├── galaxy.js           # Mesin canvas galaksi interaktif & sistem partikel
│   ├── clock.js            # Jam real-time, tanggal, dan ucapan otomatis
│   ├── slider-reveal.js    # Logika gestur geser/swipe untuk memicu animasi
│   └── main.js             # Kontroler tema, filter proyek, scroll spy, dan notifikasi
└── README.md               # Dokumentasi proyek
```

---

## 🚀 Cara Menjalankan

Website ini dibangun menggunakan **Vanilla HTML5, Modern CSS3, dan Vanilla JavaScript**, sehingga **tidak memerlukan instalasi dependensi, bundler, atau runtime Node.js**.

1. Buka berkas `index.html` langsung menggunakan peramban web favorit Anda (Google Chrome, Microsoft Edge, Mozilla Firefox, Safari).
2. Atau jalankan via Visual Studio Code dengan ekstensi *Live Server*.
