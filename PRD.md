# Product Requirements Document (PRD)
## Tiara Mamuaya — Cyber-Pink Interactive Developer Portfolio

---

## 1. Executive Summary & Overview

### 1.1 Purpose & Vision
Portofolio web modern, interaktif, dan beranimasi tinggi yang dirancang khusus untuk **Tiara Mamuaya**, mahasiswi Program Studi Informatika di **Universitas Klabat (UNKLAB)** yang berfokus sebagai **Mobile Application Developer** (React Native, Expo Go, Python Flask, Supabase).

Situs ini bertujuan untuk:
- Memamerkan keahlian teknis Tiara dalam mobile app development dan fullstack integration secara memukau kepada recruiter, klien freelance, dan komunitas tech.
- Menghadirkan identitas visual yang khas: **Sleek Cyber Tech** berlatar dark mode murni dengan aksen **Vibrant Neon Pink**, efek partikel canvas interaktif, dan simulator smartphone interaktif.
- Memberikan pengalaman pengguna (UX) yang sangat responsif, fluid 60fps, dan kaya akan micro-interactions.

---

## 2. Target Audience & Personas

1. **Tech Recruiters & HR Talent Acquisition**: Mencari bukti nyata kemampuan coding, portofolio proyek mobile yang berjalan, kejelasan skill stack, serta kemudahan mengunduh CV dan menghubungi via WhatsApp/LinkedIn/Email.
2. **Engineering Leads & Senior Developers**: Mengevaluasi arsitektur kode, teknologi yang digunakan (React Native, Supabase, Flask, Git), estetika antarmuka, dan kualitas eksekusi produk.
3. **Dosen, Rekan Mahasiswa & Komunitas UNKLAB**: Mengapresiasi prestasi akademik, proyek kampus, dan kontribusi organisasi.
4. **Potensial Klien Freelance**: Membutuhkan solusi pembuatan aplikasi mobile Android/iOS dengan UI/UX yang memikat.

---

## 3. Core Features & Scope

### 3.1 Navigasi & Global Layout
- **Floating Cyber Navbar**:
  - Sticky glassmorphism bar dengan indikator section aktif (*scroll-spy*).
  - Quick links: `Home`, `About`, `Skills`, `Projects`, `Experience`, `Certificates`, `Contact`.
  - Tombol Audio Toggle (Cyber SFX Mute/Unmute).
  - Tombol Quick Action "Hire Me" / "Download CV".
- **Floating Quick Dock / Social Rail**:
  - Akses cepat ke GitHub, LinkedIn, WhatsApp, Email, dan Instagram.
- **Interactive Cursor & Canvas Glow**:
  - Partikel cyber neon pink interaktif di latar belakang canvas yang merespons gerak kursor.
- **Synthesized Audio Engine (Cyber SFX)**:
  - SFX interaktif ringan berbasis Web Audio API (tanpa aset audio eksternal) untuk klik, hover, dan switch tab, lengkap dengan tombol kontrol suara on/off yang tersimpan di `localStorage`.

### 3.2 Page Sections

#### Section 1: Hero Section (`#home`)
- **Headline**: "Hi, I'm Tiara Mamuaya" dengan glitch/neon gradient glow effect.
- **Dynamic Typing Sub-headline**: "Mobile Application Developer", "Informatics Student at Universitas Klabat", "React Native & Expo Specialist", "UI/UX & Tech Enthusiast".
- **Status Badge**: "🟢 Open for Internship & Mobile Projects".
- **Hero Interactive Showcase**:
  - **Interactive 3D/Tilt Smartphone Simulator**: Mockup smartphone berbingkai titanium/glassmorphism yang menampilkan preview aplikasi mobile karya Tiara. Pengunjung dapat menekan tombol navigasi di dalam layar smartphone untuk berganti preview screen (Home, Feed, Detail, Profile).
- **Call-to-Action (CTA)**: "Explore Projects", "Get in Touch", dan "Download CV".

#### Section 2: About Me Section (`#about`)
- **Profil Akademik**: Mahasiswi Informatika Universitas Klabat (UNKLAB) dengan dedikasi tinggi pada mobile development.
- **Interactive Cyber Terminal / Bio Widget**:
  - Terminal interaktif bergaya Unix/Hacker (`tiara.config.json` atau `cat about_tiara.sh`) yang menampilkan ringkasan fakta, hobi coding, filosofi kerja, dan statistik utama.
- **Bento Stats Grid**:
  - Jumlah Proyek Selesai, Baris Kode/Komit Git, Jam Coding, Indeks Prestasi / Repositori Aktif.

#### Section 3: Skills Matrix (`#skills`)
- **Kategori Terorganisir**:
  - **Mobile App Development**: React Native, Expo Go, Mobile UI/UX, Cross-Platform Deployment.
  - **Programming & Scripting**: JavaScript (ES6+), Python, HTML5, Modern CSS3.
  - **Backend & Database**: Supabase (PostgreSQL, Auth, Storage), Flask (RESTful APIs), Firebase basics.
  - **Tools & Workflow**: Git, GitHub, VS Code, Figma, Postman, Terminal / Bash.
- **Interactive Level Bars & Badges**:
  - Hover glow effect dengan detail tingkat penguasaan dan kartu interaktif dengan filter kategori (All, Mobile, Frontend, Backend & Database, Tools).

#### Section 4: Projects Showcase (`#projects`)
- **Proyek Unggulan Realistis**:
  1. **UNKLAB Campus Hub Mobile**: Aplikasi mobile mahasiswa Universitas Klabat (Jadwal kuliah, pengumuman kampus, kalender akademik, dan forum mahasiswa). Stack: *React Native, Expo Go, Supabase*.
  2. **Klabat Event Tracker & Ticketing**: Aplikasi pelacak acara seminar, webinar, dan registrasi tiket kampus dengan integrasi scan QR code. Stack: *React Native, Flask API, Python, SQLite/PostgreSQL*.
  3. **CarePulse - Smart Health & Vital Tracker**: Aplikasi pelacak kebugaran dan rekam medis pribadi dengan grafik interaktif. Stack: *React Native, Supabase Auth, Chart Kit*.
  4. **TaskFlow Mobile & Cloud Sync**: Aplikasi manajemen tugas dan kolaborasi tim dengan real-time sync. Stack: *JavaScript, Vite, Supabase Realtime*.
- **Fitur Proyek**:
  - Filter kategori (*All*, *Mobile Apps*, *Fullstack & API*).
  - Kartu proyek dengan 3D perspective tilt effect.
  - **Interactive Project Modal / Drawer**: Menampilkan deskripsi lengkap, arsitektur sistem, tantangan teknis, galeri screenshot, link GitHub, dan tombol Live Demo / APK preview.

#### Section 5: Experience Timeline (`#experience`)
- Garis waktu vertikal dengan node beranimasi pulsing neon pink.
- Konten pengalaman meliputi:
  - Mobile App Developer Intern / Freelance Project.
  - Asisten Laboratorium / Academic Project Leader di Universitas Klabat.
  - Anggota / Koordinator Divisi Komputer & Kreatif di Himpunan Mahasiswa Informatika UNKLAB.
- Kartu pengalaman dengan tag pencapaian dan teknologi yang digunakan.

#### Section 6: Certificates & Achievements (`#certificates`)
- Tampilan grid sertifikat profesional:
  - Sertifikasi React Native / Mobile App Development.
  - Sertifikasi Python & Data/API Development.
  - Penghargaan Hackathon / Kompetisi Ilmiah Mahasiswa Informatika.
- **Interactive Lightbox**: Pengunjung dapat mengklik sertifikat untuk melihat tampilan fullscreen resolusi tinggi lengkap dengan nomor credential, penerbit, dan tanggal verifikasi.

#### Section 7: Contact & Connect (`#contact`)
- **Interactive Contact Form**:
  - Input: Nama, Email, Subjek, Pesan.
  - Validasi form real-time dengan feedback visual neon pink & notifikasi toast sukses.
  - Opsi pengiriman direct via mailto / WhatsApp message generator otomatis.
- **Direct Channels**:
  - Email: direct link.
  - WhatsApp: direct chat link dengan pesan pembuka otomatis.
  - LinkedIn & GitHub profile links.
  - Lokasi: Airmadidi, Manado, Sulawesi Utara (Universitas Klabat Campus).
- **Footer**:
  - Copyright © 2026 Tiara Mamuaya. Crafted with passion & Cyber-Pink aesthetic.

---

## 4. Technical Architecture & Tech Stack

### 4.1 Development Stack
- **Framework & Bundler**: Vite + React 18 / TypeScript (`strict: true`)
- **Type Definitions**: `@types/react`, `@types/react-dom`, `@types/canvas-confetti`
- **Styling**: Vanilla Modern CSS (CSS Variables, Grid, Flexbox, Glassmorphism Backdrop-filters, Neon Box Shadows, Keyframe Animations)
- **Icons**: Lucide Icons (`lucide-react`)
- **Sound Engine**: Web Audio API (Native browser synthesizer oscillator for low-latency futuristic clicks)
- **Effects**: HTML5 Canvas Particle Engine (Custom lightweight TypeScript canvas, reactive to mouse coordinates)

### 4.2 Non-Functional Requirements
- **Performance**: Skoring performa tinggi, zero lag, smooth 60fps animations.
- **Responsiveness**: 100% Mobile, Tablet, dan Desktop friendly.
- **Accessibility**: Keyboard navigable, kontras warna yang nyaman dibaca pada teks utama, tombol kontrol audio.
- **Code Quality**: Struktur komponen modular, clean code, mudah dikustomisasi data teks dan gambarnya.

---

## 5. Success Metrics
1. Kesan pertama "WOW" dari segi visual cyber pink, glassmorphism, dan fluiditas interaksi.
2. Kejelasan informasi skill & proyek Tiara Mamuaya sebagai calon Mobile Application Developer lulusan Universitas Klabat.
3. Seluruh interaksi (simulator smartphone, modal detail, filter proyek, contact form, sound effects) berfungsi tanpa error.
