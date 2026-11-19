import type { Project } from '../types/portfolio';

export const projects: Project[] = [
  {
    id: 'ballaxy',
    title: 'Ballaxy Game',
    summary: 'Game petualangan 3D roll-a-ball berbasis fisika nyata dengan 7 variasi rintangan dan grafika Universal Render Pipeline.',
    description: `Ballaxy Game adalah game petualangan 3D roll-a-ball yang dikembangkan dengan Unity dan Universal Render Pipeline (URP) untuk tugas akhir mata kuliah Grafika Komputer. Pemain mengendalikan bola sci-fi melintasi serangkaian pulau terapung yang menantang dengan dinamika pergerakan berbasis fisika nyata.

Gameplay berfokus pada ketepatan kontrol melalui gaya dorong AddForce, momentum gravitasi, serta deteksi pijakan presisi dengan SphereCast. Pemain harus melewati 7 variasi rintangan mekanik aktif seperti palu berayun, bilah gergaji gerigi luncur, pilar berputar berduri, dan paku lantai.

Tersedia sistem koleksi bernilai tinggi (koin emas, emas batangan, dan piala kemenangan) dengan batas waktu hitung mundur 10 menit serta kamera orbit adaptif SmoothDamp yang mengikuti pergerakan bola secara mulus.`,
    year: '2024',
    role: 'Unity & 3D Graphics Developer',
    stack: ['Unity', 'C#', 'Universal Render Pipeline (URP)', '3D Physics', 'Game Design'],
    highlights: [
      'Simulasi dinamika bola sci-fi presisi menggunakan AddForce, SphereCast, dan Continuous Dynamic Collision',
      'Tantangan 7 variasi rintangan aktif: palu berayun, gergaji luncur, pilar berputar, dan paku lantai',
      'Sistem skor dan koleksi 3 tingkat: koin emas, emas batangan, dan piala kemenangan',
      'Kamera orbit adaptif SmoothDamp otomatis serta tantangan batas waktu hitung mundur 10 menit',
      'Lingkungan pulau terapung modular dengan pencahayaan dan shader grafika Universal Render Pipeline (URP)'
    ],
    image: '/projects/ballaxy/cover.png',
    video: '/projects/ballaxy/promo.mp4',
    screenshots: [
      '/projects/ballaxy/screenshots/menu-utama.png',
      '/projects/ballaxy/screenshots/karakter-bola.png',
      '/projects/ballaxy/screenshots/rintangan-trap.png',
      '/projects/ballaxy/screenshots/koleksi-koin.png',
      '/projects/ballaxy/screenshots/platform-melayang.png',
      '/projects/ballaxy/screenshots/dinamika-jembatan.png',
      '/projects/ballaxy/screenshots/variasi-jebakan.png',
      '/projects/ballaxy/screenshots/sistem-skor.png',
      '/projects/ballaxy/screenshots/kamera-timer.png',
      '/projects/ballaxy/screenshots/grafika-urp.png'
    ],
    repoUrl: '',
    liveUrl: ''
  },
  {
    id: 'flooddetec-ai',
    title: 'FloodDetec AI',
    summary: 'Sistem segmentasi citra udara berbasis Attention U-Net untuk memetakan genangan banjir, menghitung luasnya, dan menentukan tingkat risiko dalam hitungan detik.',
    description: `FloodDetec AI adalah sistem segmentasi semantik untuk mendeteksi dan menghitung luas genangan banjir pada citra udara (drone dan satelit). Model Attention U-Net dilatih pada dataset Kaggle Flood Area Segmentation, lalu menghasilkan peta probabilitas air 256 × 256 yang diubah menjadi masker, overlay, dan persentase area tergenang.

Arsitektur Attention U-Net menambahkan empat attention gate pada setiap skip connection, sehingga fitur permukaan air diperkuat sementara atap, pepohonan, dan bayangan diredam sebelum digabung ke decoder. Inferensi berjalan lokal di CPU melalui ONNX Runtime dan dapat beralih ke TensorFlow/Keras, dilayani oleh backend FastAPI.

Studio Analisis menyediakan pembanding sebelum/sesudah, ambang batas probabilitas yang dapat diatur tanpa inferensi ulang, klasifikasi risiko (Aman, Waspada, Siaga, Awas), riwayat analisis di browser, serta laporan otomatis dan asisten AI untuk rekomendasi mitigasi. Proyek ini juga dilengkapi dokumentasi PRD, system design, dan model card lengkap.`,
    year: '2026',
    role: 'Machine Learning & Fullstack Developer',
    stack: ['Attention U-Net', 'TensorFlow / Keras', 'ONNX Runtime', 'FastAPI', 'OpenCV', 'Google Gemini', 'JavaScript'],
    highlights: [
      'Segmentasi piksel air pada citra udara dengan Attention U-Net (4 attention gate, bottleneck 512 filter)',
      'Inferensi lokal berbasis ONNX Runtime di CPU dengan dukungan alternatif TensorFlow/Keras',
      'Ambang batas probabilitas 0,05 – 0,95 yang menghitung ulang luas genangan tanpa inferensi ulang',
      'Klasifikasi risiko otomatis: Aman (< 5%), Waspada, Siaga, hingga Awas (≥ 50% area)',
      'Studio Analisis dengan pembanding sebelum/sesudah, unduh masker PNG, laporan PDF, dan riwayat analisis',
      'Laporan situasi otomatis dan asisten AI Gemini untuk rekomendasi mitigasi, dengan fallback saat API tidak tersedia'
    ],
    image: '/projects/flooddetec/cover.png',
    video: '/projects/flooddetec/promo.mp4',
    screenshots: [
      '/projects/flooddetec/screenshots/01-beranda.png',
      '/projects/flooddetec/screenshots/02-hasil-bandingkan.png',
      '/projects/flooddetec/screenshots/03-mode-overlay.png',
      '/projects/flooddetec/screenshots/04-mode-masker.png',
      '/projects/flooddetec/screenshots/05-ambang-probabilitas.png',
      '/projects/flooddetec/screenshots/06-riwayat-analisis.png',
      '/projects/flooddetec/screenshots/07-asisten-ai.png',
      '/projects/flooddetec/screenshots/08-model-api.png',
      '/projects/flooddetec/screenshots/09-tema-terang.png'
    ],
    repoUrl: 'https://github.com/prettyara12/FloodDetec-AI',
    liveUrl: ''
  },
  {
    id: 'edupartner-ai',
    title: 'EduPartner AI',
    summary: 'Aplikasi mobile tutoring cerdas yang menghubungkan pelajar dan tutor dengan asisten AI terintegrasi.',
    description: `EduPartner AI adalah platform tutoring mobile yang menghubungkan pelajar dengan tutor secara cerdas menggunakan kecerdasan buatan. Dibangun dengan React Native (Expo) dan Convex sebagai backend real-time, aplikasi ini menyediakan pengalaman belajar yang personal, interaktif, dan terstruktur.

Fitur AI didukung oleh Google Gemini (Gemma 3 27B IT) untuk asisten chat akademik, rekomendasi tutor otomatis berdasarkan kebutuhan belajar, generator jadwal belajar harian (AI Study Planner), serta pemindai soal (AI Scanner).

Aplikasi mendukung peran ganda (Pelajar dan Tutor) dengan fitur lengkap mulai dari pencarian tutor, pemesanan sesi, komunikasi chat real-time, hingga pemantauan progres belajar.`,
    year: '2024',
    role: 'Mobile Developer',
    stack: ['React Native', 'Expo', 'Expo Router', 'TypeScript', 'Convex', 'Gemini AI'],
    highlights: [
      'AI Chat Assistant akademik terintegrasi dengan Google Gemini',
      'Rekomendasi tutor otomatis berbasis analisis gaya dan kebutuhan belajar',
      'AI Study Planner otomatis serta pemindai materi/soal (AI Scanner)',
      'Backend real-time, autentikasi terintegrasi, dan chat langsung menggunakan Convex',
      'Alur kerja terpisah dan optimal untuk peran Pelajar dan Tutor'
    ],
    image: '/projects/edupartner-ai/cover.png',
    video: '/projects/edupartner-ai/promo.mp4',
    screenshots: [
      '/projects/edupartner-ai/screenshots/pelajar-1.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-2.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-3.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-4.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-5.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-6.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-7.jpeg',
      '/projects/edupartner-ai/screenshots/pelajar-8.jpeg',
      '/projects/edupartner-ai/screenshots/tutor-1.jpeg',
      '/projects/edupartner-ai/screenshots/tutor-2.jpeg',
      '/projects/edupartner-ai/screenshots/tutor-3.jpeg',
      '/projects/edupartner-ai/screenshots/tutor-4.jpeg',
      '/projects/edupartner-ai/screenshots/tutor-5.jpeg'
    ],
    repoUrl: '',
    liveUrl: ''
  },
  {
    id: 'interview-ai',
    title: 'Interview AI',
    summary: 'Platform simulasi wawancara elisitasi kebutuhan interaktif dengan karakter avatar 3D realtime, integrasi voice AI, dan evaluasi transkrip otomatis.',
    description: `Interview AI adalah platform edukasi inovatif untuk melatih keterampilan elisitasi kebutuhan perangkat lunak dan analisis bisnis melalui simulasi wawancara interaktif. Pelajar dapat mewawancarai karakter klien virtual 3D realtime yang mengekspresikan reaksi suara, emosi, dan gerak bibir (lip-sync).

Setiap skenario menyimpan fakta-fakta tersembunyi dengan bobot kesulitan dinamis: semakin tepat dan mendalam pertanyaan yang diajukan oleh pelajar, semakin banyak informasi kebutuhan bisnis yang akan terungkap. Percakapan didukung oleh arsitektur audio dua arah (two-way voice pipeline) menggunakan Gemini Live API dan Web Speech API.

Setelah sesi selesai, engine evaluasi berbasis rubrik secara instan menilai transkrip wawancara berdasarkan cakupan fakta dan teknik bertanya, memberikan umpan balik komprehensif baik untuk pelajar maupun pengajar.`,
    year: '2026',
    role: 'Fullstack & Frontend Developer',
    stack: ['Next.js', 'React Three Fiber', 'Three-VRM', 'TypeScript', 'Gemini Live API', 'Tailwind CSS', 'Supabase'],
    highlights: [
      'Interaksi karakter avatar 3D interaktif bertenaga React Three Fiber dan @pixiv/three-vrm',
      'Komunikasi suara dua arah secara realtime dengan integrasi Gemini Live API dan Web Speech API',
      'Mekanisme fakta tersembunyi dinamis untuk menguji kedalaman pertanyaan elisitasi kebutuhan',
      'Sistem penilaian otomatis transkrip wawancara berbasis rubrik pedagogis dalam hitungan detik',
      'Portal manajemen terpadu bagi pengajar untuk membuat skenario kustom dan memantau progres kelas'
    ],
    image: '/projects/interview-ai/cover.png',
    video: '/projects/interview-ai/promo.mp4',
    screenshots: [
      '/projects/interview-ai/screenshots/01-ruang-wawancara-3d.png',
      '/projects/interview-ai/screenshots/02-klien-virtual-avatar.png',
      '/projects/interview-ai/screenshots/03-alur-tiga-langkah.png',
      '/projects/interview-ai/screenshots/04-laporan-penilaian-rubrik.png',
      '/projects/interview-ai/screenshots/05-manajemen-kelas-pengajar.png',
      '/projects/interview-ai/screenshots/06-overview-platform.png'
    ],
    repoUrl: '',
    liveUrl: 'https://interview-ai-id.vercel.app'
  },
  {
    id: 'dentavision-ai',
    title: 'DentaVision AI',
    summary: 'Sistem AI deteksi otomatis 31 kondisi & anomali penyakit gigi pada citra X-ray panoramik (OPG) berbasis YOLOv8 ResNet dan Grad-CAM.',
    description: `DentaVision AI adalah platform kecerdasan buatan klinis untuk deteksi dan lokalisasi otomatis 31 jenis kondisi patologis dan anomali gigi pada citra radiograf panoramik (OPG). Proyek ini dikembangkan sebagai penelitian Tugas Akhir / Skripsi di Fakultas Ilmu Komputer, Universitas Klabat.

Pipeline inferensi dibangun menggunakan arsitektur Ultralytics YOLOv8 dengan varian backbone ResNet pretrained (ResNet-18 hingga ResNet-152) yang diintegrasikan dengan SPPF dan PAN-FPN neck. Untuk menjamin transparansi keputusan medis (Explainable AI), sistem mengimplementasikan Grad-CAM overlay heatmap langsung dari feature maps.

Sistem juga dilengkapi dengan asisten chatbot interaktif berbasis Google Gemini AI untuk menerjemahkan ringkasan temuan teknis radiografi ke dalam penjelasan klinis bahasa sehari-hari yang mudah dipahami oleh pasien dan dokter gigi.`,
    year: '2026',
    role: 'Lead Machine Learning & Fullstack Developer',
    stack: ['PyTorch', 'YOLOv8', 'ResNet', 'Grad-CAM', 'Flask', 'Google Gemini', 'OpenCV', 'Supabase'],
    highlights: [
      'Deteksi dan klasifikasi otomatis 31 kelas kondisi patologi gigi pada citra panoramik X-ray (OPG)',
      'Arsitektur YOLOv8 yang diintegrasikan dengan varian backbone ResNet dan PAN-FPN neck',
      'Explainable AI (XAI) berbasis visualisasi Grad-CAM heatmap overlay untuk akuntabilitas medis',
      'Konsultasi klinis interaktif menggunakan AI Chatbot bertenaga Google Gemini',
      'Web application responsif berbasis Flask dengan sistem validasi citra real-time'
    ],
    image: '/projects/dentavision/cover.png',
    video: '/projects/dentavision/promo.mp4',
    screenshots: [
      '/projects/dentavision/screenshots/01-upload-xray.png',
      '/projects/dentavision/screenshots/02-deteksi-impaksi.png',
      '/projects/dentavision/screenshots/03-hasil-scan-temuan.png',
      '/projects/dentavision/screenshots/04-ringkasan-chat-dokter.png',
      '/projects/dentavision/screenshots/05-validasi-akurasi.png',
      '/projects/dentavision/screenshots/06-tampilan-aplikasi.png'
    ],
    repoUrl: 'https://github.com/prettyara12/DentaVision-AI',
    liveUrl: ''
  }
];
