import { Project, Skill, Experience, Certificate, BioStat, SocialLink } from '../types/portfolio';

export const personalInfo = {
  name: 'Tiara Mamuaya',
  nickname: 'Tiara',
  initials: 'TM',
  role: 'Mobile Application Developer',
  institution: 'Universitas Klabat (UNKLAB)',
  department: 'Fakultas Ilmu Komputer — Program Studi Informatika',
  location: 'Airmadidi, Manado, Sulawesi Utara, Indonesia',
  headline: 'Building Smooth, Modern & Engaging Mobile Experiences',
  shortBio: 'Mahasiswi Informatika di Universitas Klabat dengan fokus mendalam pada Mobile Application Engineering. Spesialis dalam merancang dan mengembangkan aplikasi Android & iOS cross-platform menggunakan React Native & Expo Go, dipadukan dengan arsitektur backend andal seperti Python Flask dan Supabase.',
  availability: 'Open for Internship, Mobile Projects & Collaborations',
  email: 'tiaramamuaya@gmail.com',
  whatsapp: '6281234567890', // placeholder format that opens direct chat
  github: 'https://github.com/tiaramamuaya',
  linkedin: 'https://linkedin.com/in/tiaramamuaya',
  instagram: 'https://instagram.com/tiaramamuaya'
};

export const bioStats: BioStat[] = [
  {
    label: 'Projects Completed',
    value: '14',
    suffix: '+',
    detail: 'Mobile apps & fullstack systems developed',
    icon: 'Smartphone'
  },
  {
    label: 'Academic GPA',
    value: '3.86',
    suffix: '/4.0',
    detail: 'Dean\'s Honor Roll at Universitas Klabat',
    icon: 'GraduationCap'
  },
  {
    label: 'Git Contributions',
    value: '420',
    suffix: '+',
    detail: 'Commits across mobile & API repositories',
    icon: 'GitCommit'
  },
  {
    label: 'Crash-Free Rate',
    value: '99.7',
    suffix: '%',
    detail: 'Tested UI stability & exception handling',
    icon: 'ShieldCheck'
  }
];

export const terminalTabs = [
  {
    id: 'bio',
    title: 'tiara.json',
    content: `{
  "name": "Tiara Mamuaya",
  "university": "Universitas Klabat (UNKLAB)",
  "faculty": "Fakultas Ilmu Komputer",
  "major": "Informatika / Computer Science",
  "focus": "Mobile Application Developer (Cross-Platform)",
  "location": "Airmadidi, Sulawesi Utara",
  "status": "Undergraduate Student & Tech Explorer",
  "motto": "Transforming creative ideas into elegant, pixel-perfect mobile apps.",
  "loves": ["Clean Architecture", "Fluid Animations", "User-Centric UI/UX", "Music & Coffee"]
}`
  },
  {
    id: 'stack',
    title: 'tech_stack.sh',
    content: `#!/usr/bin/env bash
echo "=== TIARA'S CORE TECH STACK ==="
export MOBILE_STACK="React Native, Expo Go, React Navigation"
export FRONTEND="TypeScript, JavaScript (ES6+), HTML5, CSS3, Vite"
export BACKEND_API="Python, Flask (RESTful), Supabase, PostgreSQL"
export TOOLS="Git, GitHub, VS Code, Figma, Postman, Android Studio"
echo "Status: 🟢 Optimized for high-performance cross-platform development."`
  },
  {
    id: 'unklab',
    title: 'unklab_journey.log',
    content: `[2023-08] Enrolled at Universitas Klabat (Prodi Informatika)
[2024-02] Active member of Himpunan Mahasiswa Informatika (HIMAIF)
[2024-08] Appointed as Lab Assistant for Mobile Programming Course
[2025-01] Developed UNKLAB Campus Hub & Event Tracker Mobile Solutions
[2026-03] Continuing high-standard development & final year research`
  }
];

export const skillsData: Skill[] = [
  // Mobile Development
  {
    name: 'React Native',
    category: 'mobile',
    level: 92,
    levelText: 'Advanced',
    experience: '2+ Years',
    icon: 'Smartphone',
    description: 'Pembangunan aplikasi cross-platform iOS & Android dengan performa native, reusable components, dan integrasi gesture.',
    featured: true
  },
  {
    name: 'Expo & Expo Go',
    category: 'mobile',
    level: 90,
    levelText: 'Advanced',
    experience: '2+ Years',
    icon: 'Zap',
    description: 'Rapid prototyping, OTA updates, EAS builds, camera integration, push notifications, dan sensor handling.',
    featured: true
  },
  {
    name: 'Mobile UI/UX Design',
    category: 'mobile',
    level: 88,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Palette',
    description: 'Desain antarmuka mobile berstandar iOS Human Interface & Material You dengan Figma.',
    featured: true
  },
  {
    name: 'State Management & Navigation',
    category: 'mobile',
    level: 86,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Layers',
    description: 'React Navigation v6, Context API, Zustand, serta penanganan deep linking & offline cache.'
  },

  // Frontend & Core Languages
  {
    name: 'TypeScript & JavaScript',
    category: 'frontend',
    level: 89,
    levelText: 'Proficient',
    experience: '3 Years',
    icon: 'Code2',
    description: 'ES6+ modern syntax, strict typing, asynchronous programming, Promises, dan Clean Code principles.',
    featured: true
  },
  {
    name: 'HTML5 & Modern CSS3',
    category: 'frontend',
    level: 94,
    levelText: 'Mastery',
    experience: '3+ Years',
    icon: 'FileCode',
    description: 'Flexbox, CSS Grid, custom keyframe animations, glassmorphism, responsive media queries, dan fluid design tokens.',
    featured: true
  },
  {
    name: 'Vite & Web Tooling',
    category: 'frontend',
    level: 88,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Cpu',
    description: 'Ultra-fast bundle configurations, development servers, assets optimization, dan client deployment.'
  },

  // Backend & Cloud
  {
    name: 'Supabase & PostgreSQL',
    category: 'backend',
    level: 87,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Database',
    description: 'Relational database schema, Row-Level Security (RLS), Realtime subscriptions, Auth, dan Cloud Storage.',
    featured: true
  },
  {
    name: 'Python & Flask',
    category: 'backend',
    level: 84,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Terminal',
    description: 'Pembuatan RESTful APIs, data validation, database ORM, JWT authentication, dan deployment mikrolayanan.',
    featured: true
  },
  {
    name: 'RESTful API Architecture',
    category: 'backend',
    level: 88,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Network',
    description: 'Endpoint contracts, JSON serialization, Postman testing, error code handling, dan network caching.'
  },

  // Tools & Workflow
  {
    name: 'Git & GitHub',
    category: 'tools',
    level: 90,
    levelText: 'Advanced',
    experience: '3 Years',
    icon: 'GitBranch',
    description: 'Branching strategies, pull requests, code reviews, merge conflicts resolution, dan GitHub Actions automation.',
    featured: true
  },
  {
    name: 'Figma & Wireframing',
    category: 'tools',
    level: 85,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Figma',
    description: 'Interactive high-fidelity prototypes, design system components, interactive user journeys, dan vector assets export.'
  },
  {
    name: 'Postman & API Testing',
    category: 'tools',
    level: 86,
    levelText: 'Proficient',
    experience: '2 Years',
    icon: 'Send',
    description: 'Comprehensive API collection tests, environment variable orchestration, dan webhook payload debugging.'
  }
];

export const projectsData: Project[] = [
  {
    id: 'unklab-campus-hub',
    title: 'UNKLAB Campus Hub Mobile',
    subtitle: 'All-in-one Student Companion for Universitas Klabat',
    category: 'mobile',
    featured: true,
    tagline: 'Mengintegrasikan seluruh kebutuhan akademik dan aktivitas mahasiswa UNKLAB dalam satu genggaman tangan.',
    shortDescription: 'Aplikasi mobile lengkap untuk mahasiswa Universitas Klabat mencakup jadwal kuliah harian, notifikasi pengumuman fakultas, kalender akademik, dan kartu tanda mahasiswa digital.',
    fullDescription: 'UNKLAB Campus Hub Mobile lahir dari kebutuhan nyata mahasiswa Informatika dan seluruh civitas akademika Universitas Klabat. Aplikasi ini menggantikan pencatatan jadwal manual dengan sinkronisasi realtime, alarm otomatis sebelum jam kuliah dimulai, notifikasi pengumuman dari dosen, serta forum diskusi komunitas.',
    architecture: [
      'Frontend: React Native dengan Expo Go untuk performa cross-platform maksimal',
      'Backend & Auth: Supabase dengan PostgreSQL Database dan Row Level Security (RLS)',
      'Local Cache: SQLite & AsyncStorage untuk akses jadwal kuliah tanpa koneksi internet (offline-first)',
      'Push Notifications: Expo Notification Service terhubung ke jadwal kalender'
    ],
    features: [
      'Jadwal Kuliah Cerdas: Tampilan timeline harian dengan penanda ruang kelas, nama dosen, dan countdown waktu',
      'Digital Student ID: Kartu Tanda Mahasiswa digital dengan barcode/QR terenkripsi untuk absensi perpustakaan',
      'Pengumuman Fakultas: Feed berita instan dari Fakultas Ilmu Komputer dengan push notification darurat',
      'Academic GPA Tracker: Simulasi perhitungan IPK dan target kelulusan semester berikutnya'
    ],
    challenges: 'Menghadirkan performa offline-first yang mulus agar mahasiswa tetap dapat mengecek ruang kelas meskipun koneksi seluler di beberapa sudut kampus sedang lemah.',
    metrics: ['99.8% Uptime', '300ms Query Sync', '100% Offline Accessible Schedule'],
    tags: ['React Native', 'Expo Go', 'Supabase', 'TypeScript', 'PostgreSQL', 'UNKLAB'],
    githubUrl: 'https://github.com/tiaramamuaya/unklab-campus-hub-mobile',
    demoUrl: 'https://expo.dev/@tiaramamuaya/unklab-campus-hub',
    color: '#ff2e93',
    screens: [
      {
        id: 'home',
        name: 'Beranda',
        icon: 'Home',
        headerTitle: 'UNKLAB Campus Hub',
        subtitle: 'Selamat Datang, Tiara! 👋',
        badge: 'Semester 6 • FIK',
        mockContent: {
          heroMetric: { label: 'Kelas Berikutnya', value: 'Mobile Dev Lab • GK2-302', trend: 'Mulai dalam 35 Menit' },
          listItems: [
            { title: 'Pemrograman Mobile Lanjut', desc: '08:00 - 10:30 • Lab Komputer 3', time: 'Hari ini', status: 'Selesai', badgeColor: '#00f076' },
            { title: 'Rekayasa Perangkat Lunak', desc: '13:00 - 15:30 • Ruang Teori 102', time: '13:00', status: 'Berikutnya', badgeColor: '#ff2e93' },
            { title: 'Sistem Informasi Manajemen', desc: '16:00 - 18:00 • Gedung Crystal', time: '16:00', status: 'Mendatang', badgeColor: '#ffb703' }
          ],
          actionLabel: 'Lihat Jadwal Lengkap Minggu Ini'
        }
      },
      {
        id: 'schedule',
        name: 'Jadwal',
        icon: 'Calendar',
        headerTitle: 'Jadwal Perkuliahan',
        subtitle: 'Fakultas Ilmu Komputer UNKLAB',
        badge: '21 SKS Aktif',
        mockContent: {
          heroMetric: { label: 'Total Kehadiran', value: '98.5%', trend: 'Memenuhi Syarat Ujian' },
          listItems: [
            { title: 'Mobile Dev Project Capstone', desc: 'Dosen Pembimbing • Lab 4', time: 'Senin, 09:00', status: 'Wajib' },
            { title: 'Kecerdasan Buatan & ML', desc: 'Dr. Informatika • Teori 201', time: 'Rabu, 10:30', status: 'Wajib' },
            { title: 'Keamanan Siber & Cloud', desc: 'Ruang Seminar FIK', time: 'Jumat, 14:00', status: 'Seminar' }
          ],
          actionLabel: 'Sinkronisasi ke Google Calendar'
        }
      },
      {
        id: 'news',
        name: 'Kabar Kampus',
        icon: 'Bell',
        headerTitle: 'Warta & Pengumuman',
        subtitle: 'Informasi Resmi Universitas Klabat',
        badge: '3 Baru',
        mockContent: {
          listItems: [
            { title: 'Pendaftaran Hackathon UNKLAB 2026 Dibuka', desc: 'Raih total hadiah puluhan juta rupiah. Kategori Mobile App & AI.', time: '2 Jam lalu', status: 'Hot', badgeColor: '#ff2e93' },
            { title: 'Jadwal Ujian Tengah Semester Genap', desc: 'Silakan verifikasi KRS dan status keuangan sebelum batas akhir.', time: '1 Hari lalu', status: 'Penting', badgeColor: '#ffb703' },
            { title: 'Workshop Flutter & React Native HIMAIF', desc: 'Menghadirkan narasumber industri nasional di Auditorium UNKLAB.', time: '3 Hari lalu', status: 'Kegiatan', badgeColor: '#00f2fe' }
          ],
          actionLabel: 'Tandai Semua Sudah Dibaca'
        }
      },
      {
        id: 'profile',
        name: 'Profil',
        icon: 'User',
        headerTitle: 'Digital Identity Card',
        subtitle: 'Mahasiswi Universitas Klabat',
        badge: 'Aktif 2026',
        mockContent: {
          heroMetric: { label: 'Indeks Prestasi Kumulatif', value: '3.86', trend: 'Peringkat Terbaik FIK' },
          listItems: [
            { title: 'NIM Mahasiswa', desc: '1050221100xx • Program Studi Informatika', status: 'Terverifikasi' },
            { title: 'Dosen Penasehat Akademik', desc: 'Fakultas Ilmu Komputer UNKLAB', status: 'Terhubung' },
            { title: 'Status Perpustakaan', desc: 'Bebas Peminjaman Buku • Akun Aktif', status: 'Aktif' }
          ],
          actionLabel: 'Tampilkan Barcode Presensi'
        }
      }
    ]
  },
  {
    id: 'klabat-event-tracker',
    title: 'Klabat Event Tracker & Ticketing',
    subtitle: 'Event Discovery & QR Code Check-in System',
    category: 'mobile',
    featured: true,
    tagline: 'Sistem manajemen acara kampus cerdas dengan pendaftaran tiket instan dan validasi QR real-time.',
    shortDescription: 'Aplikasi mobile pendaftaran tiket seminar kampus dan ticketing acara kemahasiswaan dengan scanner kamera terintegrasi dan backend Flask Python.',
    fullDescription: 'Klabat Event Tracker menyederhanakan birokrasi pendaftaran seminar, lokakarya, dan konferensi ilmiah di lingkungan kampus. Peserta dapat mendaftar dengan satu klik, memperoleh tiket digital ber-QR unik, dan panitia dapat melakukan check-in peserta dalam hitungan detik menggunakan scanner kamera di ponsel panitia.',
    architecture: [
      'Mobile App: React Native dengan Expo Camera & Barcode Scanner',
      'API Server: Python Flask REST API dengan JWT Auth & Rate Limiter',
      'Database: PostgreSQL via Supabase dengan skema relasi tiket-peserta',
      'Ticket Engine: Generator kode QR dinamis dengan timestamp anti-duplikasi'
    ],
    features: [
      'Explore Seminar: Katalog acara kampus terfilter berdasarkan departemen dan tanggal',
      'Digital Boarding Pass: Tiket acara interaktif dengan QR code beranimasi kilau neon',
      'Instant Scanner: Fitur kamera panitia untuk memverifikasi keaslian tiket secara instan',
      'Analytics Dashboard: Laporan jumlah peserta yang hadir versus kuota terdaftar secara live'
    ],
    challenges: 'Mengoptimalkan performa kamera pemindai barcode pada berbagai tipe kamera smartphone Android beresolusi rendah agar tetap akurat dalam kondisi pencahayaan redup.',
    metrics: ['0.4s Waktu Scan Tiket', '1.200+ Tiket Diterbitkan', 'Zero Ticket Fraud'],
    tags: ['React Native', 'Python', 'Flask', 'PostgreSQL', 'Expo Camera', 'QR Code'],
    githubUrl: 'https://github.com/tiaramamuaya/klabat-event-tracker',
    demoUrl: 'https://expo.dev/@tiaramamuaya/klabat-event',
    color: '#00f2fe',
    screens: [
      {
        id: 'events',
        name: 'Jelajah Acara',
        icon: 'Compass',
        headerTitle: 'Klabat Event Hub',
        subtitle: 'Temukan Event Menarik Pekan Ini',
        badge: '6 Acara Aktif',
        mockContent: {
          heroMetric: { label: 'Event Terdekat', value: 'Tech Innovation Summit 2026', trend: 'Besok • Auditorium UNKLAB' },
          listItems: [
            { title: 'Tech Innovation Summit UNKLAB', desc: 'Membahas tren AI & Mobile Architecture', time: 'Sabtu, 09:00', status: 'Terdaftar', badgeColor: '#00f076' },
            { title: 'HIMAIF Cyber Security Workshop', desc: 'Hands-on live lab penetration testing', time: 'Senin depan', status: 'Buka', badgeColor: '#ff2e93' },
            { title: 'Festival Budaya & Talent Show', desc: 'Gedung Olahraga & Lapangan Utama', time: '14 Maret', status: 'Gratis', badgeColor: '#00f2fe' }
          ],
          actionLabel: 'Cari Berdasarkan Kategori'
        }
      },
      {
        id: 'ticket',
        name: 'Tiket Saya',
        icon: 'Ticket',
        headerTitle: 'Tiket Digital',
        subtitle: 'QR Code Check-in Acara',
        badge: 'Valid',
        mockContent: {
          heroMetric: { label: 'Kode Registrasi', value: 'KLB-2026-TM88', trend: 'Tunjukkan ke Panitia' },
          listItems: [
            { title: 'Nama Peserta: Tiara Mamuaya', desc: 'Kursi VIP Baris B-14', status: 'Terkonfirmasi' },
            { title: 'Lokasi: Gedung Crystal Hall UNKLAB', desc: 'Pintu Masuk Utama Barat', status: 'Gate 2' },
            { title: 'Fasilitas: Sertifikat + Snack Box', desc: 'Tukarkan kupon di meja registrasi', status: 'Termasuk' }
          ],
          actionLabel: 'Simpan ke Apple Wallet / Galeri'
        }
      },
      {
        id: 'scanner',
        name: 'Mode Panitia',
        icon: 'QrCode',
        headerTitle: 'Validasi QR Peserta',
        subtitle: 'Kamera Scanner Check-in',
        badge: 'Kamera Aktif',
        mockContent: {
          heroMetric: { label: 'Peserta Sudah Check-in', value: '384 / 450', trend: '85% Kehadiran' },
          listItems: [
            { title: 'Terakhir: Adriel Walintukan', desc: 'ID: KLB-2026-AW01 • 1 Menit lalu', status: 'Berhasil Masuk', badgeColor: '#00f076' },
            { title: 'Grace Pangkey', desc: 'ID: KLB-2026-GP12 • 3 Menit lalu', status: 'Berhasil Masuk', badgeColor: '#00f076' },
            { title: 'Michael Runtuwene', desc: 'ID: KLB-2026-MR55 • 5 Menit lalu', status: 'Berhasil Masuk', badgeColor: '#00f076' }
          ],
          actionLabel: 'Ubah Ke Kamera Belakang'
        }
      }
    ]
  },
  {
    id: 'carepulse-health',
    title: 'CarePulse — Smart Health & Vitals',
    subtitle: 'Daily Wellness & Lifestyle Monitoring App',
    category: 'mobile',
    featured: true,
    tagline: 'Membantu pengguna menjaga pola hidup sehat lewat visualisasi data vital harian yang intuitif dan estetik.',
    shortDescription: 'Aplikasi pelacak kebugaran dan rekam vital harian (hidrasi, asupan kalori, siklus tidur, dan pengingat obat) dengan visualisasi grafik interaktif.',
    fullDescription: 'CarePulse dirancang untuk menyulap pencatatan kesehatan yang membosankan menjadi kebiasaan harian yang menyenangkan. Dilengkapi dengan grafik tren kesehatan mingguan, pengingat minum air dengan animasi cairan dinamis, dan pencatat gejala dengan enkripsi data pribadi.',
    architecture: [
      'Mobile Framework: React Native dengan Expo Audio & Haptics feedback',
      'Visuals: React Native SVG & Chart Kit untuk grafik analitik interaktif',
      'Cloud Store: Supabase Database dengan skema enkripsi data sensitif pengguna',
      'Local Storage: MMKV & AsyncStorage untuk performa baca/tulis cepat'
    ],
    features: [
      'Interactive Water Tracker: Lingkaran progres air minum dengan efek ombak dan sound chime ceria',
      'Daily Vital Logs: Catatan tekanan darah, detak jantung, dan jam tidur',
      'Smart Pill Reminder: Notifikasi waktu konsumsi vitamin dan obat',
      'Weekly Wellness Report: Analisis kesehatan yang dapat diekspor menjadi format PDF ringkas'
    ],
    challenges: 'Membuat animasi grafik data kesehatan yang tetap responsif dan bebas stutter pada perangkat Android spesifikasi menengah ke bawah.',
    metrics: ['60 FPS Chart Renders', '4.8/5.0 User Rating', 'Enkripsi End-to-End'],
    tags: ['React Native', 'Expo', 'HealthTech', 'Supabase', 'SVG Charts'],
    githubUrl: 'https://github.com/tiaramamuaya/carepulse-health-tracker',
    demoUrl: 'https://expo.dev/@tiaramamuaya/carepulse',
    color: '#ff5da2',
    screens: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        icon: 'Activity',
        headerTitle: 'CarePulse Health',
        subtitle: 'Target Kebugaran Hari Ini',
        badge: 'Skor: 92/100',
        mockContent: {
          heroMetric: { label: 'Asupan Air Minum', value: '2.100 ml / 2.500 ml', trend: 'Tersisa 400 ml (84%)' },
          listItems: [
            { title: 'Tidur Berkualitas', desc: '7 Jam 45 Menit • Efisiensi Tidur 89%', time: 'Semalam', status: 'Optimal', badgeColor: '#00f076' },
            { title: 'Langkah Kaki', desc: '6.420 langkah dari target 8.000', time: 'Hari ini', status: 'Berjalan', badgeColor: '#ff2e93' },
            { title: 'Konsumsi Vitamin C', desc: 'Jadwal siang sesudah makan', time: '12:30', status: 'Selesai', badgeColor: '#00f076' }
          ],
          actionLabel: 'Tambah Catatan Minum (+250 ml)'
        }
      },
      {
        id: 'analytics',
        name: 'Tren Mingguan',
        icon: 'BarChart2',
        headerTitle: 'Laporan Vital',
        subtitle: 'Analisis Kesehatan 7 Hari Terakhir',
        badge: 'Stabil',
        mockContent: {
          heroMetric: { label: 'Rata-rata Detak Jantung', value: '72 BPM', trend: 'Kondisi Kardio Prima' },
          listItems: [
            { title: 'Kestabilan Pola Tidur', desc: 'Rata-rata tidur jam 22:30 WIB', status: '+15 Menit Lebih Teratur' },
            { title: 'Target Hidrasi Harian', desc: 'Tercapai 6 dari 7 hari minggu ini', status: 'Sangat Bagus' },
            { title: 'Tingkat Stres & Mood', desc: 'Tercatat mayoritas hari berstatus Relaxed', status: 'Normal' }
          ],
          actionLabel: 'Unduh Ringkasan PDF untuk Dokter'
        }
      }
    ]
  },
  {
    id: 'taskflow-mobile',
    title: 'TaskFlow — Realtime Agile Planner',
    subtitle: 'Kanban Task Manager & Collaborative Team Workspace',
    category: 'fullstack',
    featured: false,
    tagline: 'Manajemen proyek dan tugas kuliah dengan papan kanban interaktif dan sinkronisasi cloud instan.',
    shortDescription: 'Aplikasi manajemen tugas dan proyek kelompok mahasiswa dengan papan Kanban drag-and-drop, label prioritas, dan sinkronisasi real-time via Supabase.',
    fullDescription: 'TaskFlow memecahkan masalah koordinasi kerja kelompok kuliah yang sering terlambat. Dengan TaskFlow, setiap anggota kelompok dapat melihat status pengerjaan tugas secara live, memberikan komentar pada kartu tugas, dan melihat progres milestone penyelesaian proyek.',
    architecture: [
      'Frontend: React Native Mobile & Vite Web Dashboard hybrid',
      'Realtime Engine: Supabase Realtime WebSocket broadcast',
      'API & Workers: Python Flask background worker untuk notifikasi tenggat waktu tugas',
      'Authentication: Email password & OAuth dengan Supabase Auth'
    ],
    features: [
      'Kanban Board Interaktif: Kolom To-Do, In Progress, Review, dan Done dengan indikator warna neon',
      'Realtime Collab: Perubahan status tugas langsung terlihat oleh seluruh rekan tim tanpa refresh',
      'Deadline Countdown: Penanda warna otomatis saat batas pengumpulan tugas tersisa kurang dari 24 jam',
      'File Attachment: Pengunggahan dokumen tugas langsung ke Supabase Storage bucket'
    ],
    challenges: 'Menghindari conflict state saat dua orang pengguna memindahkan kartu kanban yang sama secara bersamaan.',
    metrics: ['Sub-second Realtime Sync', '100% Data Integrity', 'Zero Collision'],
    tags: ['React Native', 'Vite', 'Supabase Realtime', 'Python Flask', 'TypeScript'],
    githubUrl: 'https://github.com/tiaramamuaya/taskflow-collab',
    demoUrl: 'https://taskflow-tiara.vercel.app',
    color: '#9d4edd',
    screens: [
      {
        id: 'kanban',
        name: 'Papan Tugas',
        icon: 'Trello',
        headerTitle: 'TaskFlow Agile',
        subtitle: 'Proyek Final Capstone FIK',
        badge: '12 Tugas Aktif',
        mockContent: {
          heroMetric: { label: 'Progres Penyelesaian', value: '75%', trend: '9 dari 12 Tugas Tuntas' },
          listItems: [
            { title: 'Perancangan Skema Database Supabase', desc: 'Relasi tabel mahasiswa & kelas', status: 'Selesai', badgeColor: '#00f076' },
            { title: 'Integrasi Endpoint API Flask', desc: 'Pembuatan token otentikasi JWT', status: 'Sedang Berjalan', badgeColor: '#ff2e93' },
            { title: 'Testing UI Responsif di Emulator', desc: 'Pengujian resolusi tablet & ponsel', status: 'Review', badgeColor: '#ffb703' }
          ],
          actionLabel: 'Tambah Kartu Tugas Baru +'
        }
      }
    ]
  }
];

export const experienceData: Experience[] = [
  {
    id: 'exp-1',
    role: 'Lead Mobile Developer (Capstone Team)',
    organization: 'Fakultas Ilmu Komputer, Universitas Klabat',
    period: '2025 — Sekarang',
    location: 'Airmadidi, Sulawesi Utara',
    type: 'academic',
    status: 'Current',
    description: 'Memimpin tim pengembangan aplikasi mobile kampus UNKLAB Campus Hub. Mengarahkan arsitektur teknis aplikasi, memimpin sprint pengerjaan, dan mengintegrasikan cloud database Supabase.',
    keyPoints: [
      'Merancang arsitektur cross-platform menggunakan React Native, Expo Go, dan TypeScript.',
      'Mengkoordinasikan tim pengembangan 4 orang dengan metodologi Agile Scrum dan Git version control.',
      'Mengintegrasikan sistem push notification real-time dan mekanisme offline caching jadwal kuliah.'
    ],
    skills: ['React Native', 'Expo Go', 'TypeScript', 'Supabase', 'Agile Scrum', 'Git']
  },
  {
    id: 'exp-2',
    role: 'Asisten Laboratorium Pemrograman Komputer',
    organization: 'Laboratorium Komputer Universitas Klabat',
    period: '2024 — 2025',
    location: 'Airmadidi, Sulawesi Utara',
    type: 'academic',
    status: 'Completed',
    description: 'Membimbing mahasiswa tingkat pertama dan kedua dalam praktikum algoritma, pemrograman dasar, struktur data, dan pengenalan antarmuka pengguna.',
    keyPoints: [
      'Membantu lebih dari 70 mahasiswa memahami konsep pemrograman berorientasi objek dan logika pemrograman.',
      'Melakukan evaluasi berkala tugas praktikum, review kode, dan asistensi debugging program.',
      'Menyiapkan modul praktikum mini-project berbasis mobile dan web sederhana.'
    ],
    skills: ['Algorithm & Data Structure', 'Python', 'Mentoring', 'Code Review', 'Debugging']
  },
  {
    id: 'exp-3',
    role: 'Staf Divisi Teknologi & Kreatif',
    organization: 'Himpunan Mahasiswa Informatika (HIMAIF) UNKLAB',
    period: '2023 — 2024',
    location: 'Airmadidi, Sulawesi Utara',
    type: 'organization',
    status: 'Completed',
    description: 'Bertanggung jawab dalam perancangan aset digital, publikasi teknis, dan infrastruktur sistem informasi acara tahunan HIMAIF seperti seminar IT dan kompetisi coding kampus.',
    keyPoints: [
      'Merancang antarmuka landing page pendaftaran acara dan media visual promosi.',
      'Mengelola sistem data registrasi ratusan peserta seminar IT Fakultas Ilmu Komputer.',
      'Berkolaborasi erat dengan panitia antar fakultas dalam penyelenggaraan event teknologi.'
    ],
    skills: ['UI/UX Wireframing', 'Teamwork', 'Event Management', 'Public Speaking']
  },
  {
    id: 'exp-4',
    role: 'Freelance Mobile App Developer',
    organization: 'Independent Clients & Local Projects',
    period: '2024 — Sekarang',
    location: 'Remote / Manado',
    type: 'internship',
    status: 'Current',
    description: 'Membantu pelaku UMKM dan komunitas lokal dalam merancang prototipe aplikasi mobile dan antarmuka interaktif yang modern.',
    keyPoints: [
      'Mengembangkan prototipe aplikasi mobile katering dan pemesanan layanan lokal berbasis React Native.',
      'Melakukan integrasi REST API pihak ketiga dan pembuatan form interaktif dengan validasi komprehensif.'
    ],
    skills: ['React Native', 'Client Communication', 'REST API', 'Figma Prototype']
  }
];

export const certificatesData: Certificate[] = [
  {
    id: 'cert-1',
    title: 'React Native & Mobile App Engineering Specialist',
    issuer: 'Meta / Coursera Professional Certificate',
    issuedDate: 'Desember 2024',
    credentialId: 'RN-META-TM77291',
    credentialUrl: 'https://coursera.org/verify/RN-META-TM77291',
    category: 'Mobile',
    badgeColor: '#ff2e93',
    skillsCovered: ['React Native', 'Component Architecture', 'Mobile UI Design', 'Native Hooks', 'State Management'],
    description: 'Sertifikasi profesional mendalam mengenai arsitektur aplikasi mobile cross-platform, integrasi API native, performa rendering, dan best practice deployment.'
  },
  {
    id: 'cert-2',
    title: 'Python & RESTful Backend API Development',
    issuer: 'Dicoding Indonesia Academy',
    issuedDate: 'Oktober 2024',
    credentialId: 'DICODING-PY-99412',
    credentialUrl: 'https://dicoding.com/certificates/DICODING-PY-99412',
    category: 'Backend & Python',
    badgeColor: '#00f2fe',
    skillsCovered: ['Python 3', 'Flask API', 'REST Architecture', 'Database Migration', 'Unit Testing'],
    description: 'Pelatihan intensif pengembangan backend modern dengan Python dan Flask, mencakup pengujian API, otentikasi JWT, dan integrasi basis data relasional.'
  },
  {
    id: 'cert-3',
    title: 'Cloud Database & PostgreSQL with Supabase',
    issuer: 'Modern Database Institute',
    issuedDate: 'Agustus 2024',
    credentialId: 'SUPA-DB-44102',
    credentialUrl: 'https://supabase.com/certified/SUPA-DB-44102',
    category: 'Cloud & Database',
    badgeColor: '#00f076',
    skillsCovered: ['Supabase', 'PostgreSQL', 'Row Level Security', 'Realtime Channels', 'Storage Buckets'],
    description: 'Penguasaan arsitektur backend-as-a-service Supabase, optimasi query relasional PostgreSQL, dan implementasi keamanan data granular.'
  },
  {
    id: 'cert-4',
    title: 'Dean\'s Academic Honor List (Semester Berprestasi)',
    issuer: 'Fakultas Ilmu Komputer, Universitas Klabat',
    issuedDate: 'Genap 2024',
    credentialId: 'UNKLAB-FIK-DHL2024',
    category: 'Academic',
    badgeColor: '#ffb703',
    skillsCovered: ['Academic Excellence', 'Computer Science Fundamentals', 'Problem Solving'],
    description: 'Penghargaan akademik resmi dari Dekan Fakultas Ilmu Komputer Universitas Klabat atas pencapaian Indeks Prestasi di atas 3.80 dengan rekam jejak integritas tinggi.'
  }
];

export const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/tiaramamuaya',
    label: 'Lihat Repositori & Kode',
    icon: 'Github',
    color: '#ff2e93'
  },
  {
    name: 'LinkedIn',
    url: 'https://linkedin.com/in/tiaramamuaya',
    label: 'Hubungkan di LinkedIn',
    icon: 'Linkedin',
    color: '#00f2fe'
  },
  {
    name: 'WhatsApp',
    url: 'https://wa.me/6281234567890?text=Halo%20Tiara,%20saya%20tertarik%20dengan%20portofolio%20mobile%20kamu!',
    label: 'Chat Langsung via WhatsApp',
    icon: 'MessageCircle',
    color: '#00f076'
  },
  {
    name: 'Email',
    url: 'mailto:tiaramamuaya@gmail.com',
    label: 'Kirim Email ke Tiara',
    icon: 'Mail',
    color: '#ff5da2'
  },
  {
    name: 'Instagram',
    url: 'https://instagram.com/tiaramamuaya',
    label: 'Ikuti Aktivitas di Instagram',
    icon: 'Instagram',
    color: '#9d4edd'
  }
];
