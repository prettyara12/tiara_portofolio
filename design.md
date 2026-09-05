# Design System Specification (`design.md`)
## Tiara Mamuaya — Cyber-Pink Developer Portfolio

---

## 1. Design Philosophy & Aesthetic Direction

### 1.1 Core Concept: "Sleek Cyber Noir & Vibrant Neon Pink"
Desain memadukan estetika teknologi tinggi (*cyberpunk / developer tech-space*) yang futuristik dengan kehangatan dan ketegasan aksen **Neon Pink**.
- **Dark Void Canvas**: Latar belakang hitam obsidian bertingkat menciptakan kontras maksimal, kedalaman ruang visual, dan efisiensi baterai layar OLED.
- **Vibrant Cyber Pink Accents**: Memberikan kepribadian kuat, feminin namun bertenaga, modern, dan tidak monoton.
- **Glassmorphism & Depth**: Penggunaan `backdrop-filter: blur()`, border tipis bercahaya (*glow borders*), dan bayangan bertingkat (*multi-layered neon drop-shadows*).
- **Interactive Micro-Engagements**: Setiap elemen merespons kursor mouse dan sentuhan layar (tilt 3D, pulse, hover state, suara klik futuristik halus).

---

## 2. Color Palette & Design Tokens

### 2.1 CSS Custom Properties
```css
:root {
  /* Core Backgrounds */
  --bg-dark-void: #07070a;        /* Dasar paling gelap */
  --bg-dark-surface: #0e0e14;     /* Latar belakang section & container */
  --bg-card: rgba(18, 18, 26, 0.75); /* Kartu bento & komponen kaca */
  --bg-card-hover: rgba(28, 24, 38, 0.85);

  /* Cyber Pink Brand Palette */
  --pink-primary: #ff2e93;        /* Neon Hot Pink utama untuk tombol & aksen kuat */
  --pink-secondary: #ff5da2;      /* Neon Rose untuk gradien & teks highlight */
  --pink-glow: rgba(255, 46, 147, 0.35); /* Glow bayangan utama */
  --pink-subtle: rgba(255, 46, 147, 0.12); /* Background tombol sekunder / badge */
  --pink-border: rgba(255, 46, 147, 0.28); /* Border garis neon halus */

  /* Neutral Texts */
  --text-pure: #ffffff;           /* Heading utama, title */
  --text-high: #f1f1f5;           /* Body teks utama */
  --text-medium: #a2a2b5;         /* Deskripsi, subjudul, metadata */
  --text-muted: #64647a;          /* Label non-aktif, footer footnote */

  /* Accent & Functional Colors */
  --accent-cyan: #00f2fe;         /* Sentuhan aksen cyber pelengkap */
  --accent-purple: #9d4edd;       /* Gradien pelengkap */
  --status-active: #00f076;       /* Badge status online / open for work */
  --status-warning: #ffb703;

  /* Glassmorphism Borders & Shadows */
  --border-glass: rgba(255, 255, 255, 0.08);
  --border-glass-hover: rgba(255, 46, 147, 0.45);
  --shadow-neon-sm: 0 0 12px rgba(255, 46, 147, 0.25);
  --shadow-neon-lg: 0 8px 32px rgba(255, 46, 147, 0.35);
  --shadow-card: 0 10px 30px -10px rgba(0, 0, 0, 0.7);

  /* Transitions & Curves */
  --ease-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);
  --duration-fast: 200ms;
  --duration-normal: 300ms;
  --duration-slow: 600ms;
}
```

---

## 3. Typography & Hierarchy

### 3.1 Typefaces
1. **Primary Display & Headings**: `'Outfit'`, sans-serif (Geometric, modern, ramah, dan futuristik).
2. **Body & Interface**: `'Inter'`, sans-serif (Legibilitas tinggi untuk teks deskripsi panjang dan form).
3. **Code & Technical Accents**: `'JetBrains Mono'`, monospace (Untuk terminal widget, tag nama file, dan code badge).

### 3.2 Typographic Hierarchy
| Role | Size (Desktop) | Size (Mobile) | Weight | Tracking / Leading |
| :--- | :--- | :--- | :--- | :--- |
| **Hero Title** | 3.75rem (60px) | 2.5rem (40px) | 800 (Extrabold) | -0.03em / 1.1 |
| **Section Title** | 2.5rem (40px) | 1.85rem (30px) | 700 (Bold) | -0.02em / 1.2 |
| **Card / Item Title** | 1.25rem (20px) | 1.15rem (18px) | 600 (Semibold) | -0.01em / 1.3 |
| **Body Primary** | 1.05rem (16.8px) | 0.95rem (15.2px) | 400 (Regular) | 0 / 1.65 |
| **Metadata / Badge**| 0.825rem (13.2px)| 0.75rem (12px) | 500 (Medium) | +0.02em / 1.4 |
| **Terminal / Monospace**| 0.9rem (14.4px) | 0.8rem (12.8px) | 500 (Medium) | 0 / 1.6 |

---

## 4. Layout Grid & Structural Principles

### 4.1 Grid & Spacing Units
- **Base Grid Unit**: 8px system (8px, 16px, 24px, 32px, 48px, 64px, 96px, 128px).
- **Max Content Width**: `1240px` (Container terpusat dengan padding samping `24px` di mobile, `48px` di desktop).
- **Bento Grid Architecture**:
  - Kolom fleksibel 12-kolom atau multi-span `grid-template-columns: repeat(auto-fit, minmax(320px, 1fr))`.
  - Gap default: `24px` (desktop), `16px` (mobile).

---

## 5. UI Component Specifications

### 5.1 Floating Cyber Navbar
- **Structure**: Floating rounded pill navigation bar dengan `backdrop-filter: blur(16px)` dan background semi-transparan.
- **Brand**: Avatar icon / monograf "TM" dengan pulsing pink ring.
- **Links**: Navigasi ke 7 section utama dengan indikator aktif berupa underline capsule neon pink.
- **Audio Toggle Widget**: Ikon equalizer beranimasi (atau speaker icon) dengan indikator ON / OFF.
- **Action Button**: Tombol "Contact Me" atau "Download CV" dengan efek glowing border.

### 5.2 Interactive Mobile Phone Simulator Mockup
- **Bezel**: Bingkai smartphone modern (rasio 9:19.5) dengan aksen bodi metalik gelap dan dynamic island / notch.
- **Screen Display**:
  - Tampilan nyata antarmuka aplikasi mobile karya Tiara (misal: UNKLAB Campus Hub).
  - Status bar atas (jam, wifi, sinyal, baterai).
  - Konten halaman aplikasi yang rapi dan menarik.
  - Tab bar bawah yang bisa diklik oleh pengunjung untuk mengganti tampilan layar simulator secara instan!
- **Interactive Controls**: Tombol navigasi "Previous Screen", "Next Screen", atau klik langsung tab bar bawah di dalam layar simulator.

### 5.3 Bento Cards & Project Cards
- **Border**: `1px solid var(--border-glass)` dengan transisi ke `1px solid var(--pink-border)` saat hover.
- **Hover Reaction**:
  - Kartu sedikit terangkat (`translateY(-6px)`).
  - Bayangan neon pink halus mengembang di belakang kartu (`box-shadow: 0 16px 36px var(--pink-glow)`).
  - Badge teknologi memiliki background `var(--pink-subtle)` dengan teks `var(--pink-secondary)`.

### 5.4 Interactive Cyber Terminal Widget
- **Visual**: Window header bergaya macOS/Linux dengan 3 tombol lingkaran (merah, kuning, hijau) dan judul window `tiara-profile.sh`.
- **Interaksi**:
  - Efek typing otomatis.
  - Tab selector untuk melihat perintah berbeda: `cat about.json`, `cat tech-stack.sh`, `neofetch tiara`.

### 5.5 Buttons & CTAs
1. **Primary Glowing Button**:
   - Background: Gradien linear `linear-gradient(135deg, var(--pink-primary), #d90466)`.
   - Warna teks: Putih tebal.
   - Efek: Cahaya pulsing lembut; saat hover membesar 1.03x dengan pantulan kilau shimmer.
2. **Glass Secondary Button**:
   - Background: `rgba(255, 255, 255, 0.05)`.
   - Border: `1px solid rgba(255, 255, 255, 0.15)`.
   - Hover: Border berubah menjadi `var(--pink-primary)` dengan warna teks `var(--pink-secondary)`.

### 5.6 Modals & Lightbox
- **Backdrop**: `rgba(7, 7, 10, 0.85)` dengan blur `12px`.
- **Modal Box**: Container bersudut bulat `20px` berhias border neon pink, tombol tutup `ESC` / silang di sudut kanan atas, scrolling lancar, dan tata letak dua kolom (media preview + deskripsi teknis).

---

## 6. Motion & Sound Guidelines

### 6.1 Motion Principles
- **Subtlety & Purpose**: Animasi bukan sekadar hiasan, tetapi memberi petunjuk hierarki dan merespons aksi pengunjung.
- **Timing**:
  - Hover & Active States: `200ms - 300ms` dengan `cubic-bezier(0.4, 0, 0.2, 1)`.
  - Modal Entrance / Drawers: `350ms` dengan spring physics `cubic-bezier(0.16, 1, 0.3, 1)`.
  - Continuous Ambience: Rotasi gradien mesh atau floating badges `4s - 8s infinite ease-in-out`.

### 6.2 Cyber Web Audio Synthesis
- Menggunakan browser Web Audio API oscillator murni (bebas lag dan tanpa ketergantungan file MP3 eksternal).
- Frekuensi audio:
  - **Click Event**: Nada segitiga (triangle wave) singkat frekuensi `880Hz` turun ke `440Hz` selama 45ms.
  - **Tab/Modal Open**: Nada sinus (sine wave) harmonik `587Hz` ke `880Hz` selama 70ms.
  - **Volume Default**: Rendah dan ramah di telinga (`gain: 0.04`).
  - **State Memory**: Pengaturan Mute/Unmute disimpan di `localStorage` dan tersinkronisasi di tombol navigasi.

---

## 7. Responsive Breakpoints

- **Desktop (Wide)**: `> 1200px` (Full 2-column bento & hero side-by-side with phone mockup).
- **Laptop / Tablet Landscape**: `992px - 1199px` (Optimized compact spacing).
- **Tablet Portrait**: `768px - 991px` (Single column flow, phone simulator centered).
- **Mobile Device**: `< 768px` (Mobile bottom drawer / hamburger nav, touch-optimized simulator, full-width bento cards).
