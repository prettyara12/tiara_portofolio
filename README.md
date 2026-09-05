# Tiara Mamuaya — Interactive Cyber-Pink Portfolio

> Modern, interactive, and high-performance developer portfolio website for **Tiara Mamuaya**, Mobile Application Developer & Informatics Student at **Universitas Klabat (UNKLAB)**.

Built with **React 18 (TypeScript)**, **Vite**, and **Vanilla Modern CSS**, featuring a sleek **Cyber Noir & Vibrant Neon Pink** aesthetic with rich animations and interactive widgets.

---

## ✨ Key Features

- **📱 Interactive 3D Smartphone Simulator**: Live interactive phone mockup in the Hero section allowing visitors to switch between application screens (*Beranda*, *Jadwal Kuliah UNKLAB*, *Kabar Kampus*, and *Digital ID Card*).
- **🌌 Reactive HTML5 Canvas Background**: Neon pink particle network that dynamically links and reacts to mouse coordinates.
- **🔊 Cyber Audio Synthesizer**: Low-latency synth sounds built directly on the browser's native Web Audio API (no external MP3 assets needed) with Mute/Unmute state persistence.
- **💻 Interactive Cyber Terminal**: Bio and tech stack viewer styled as a Unix terminal (`tiara@unklab-inf:~$`) with multiple interactive tabs.
- **⚡ Filterable Skills Matrix**: Categorized tech stack (Mobile, Frontend, Backend & Database, Tools) with animated neon proficiency meters.
- **🚀 Featured Projects & Case Study Modals**: In-depth architecture breakdown, challenges, metrics, and repository links for key mobile applications.
- **🏆 Certificates Lightbox**: Verified credentials from Meta, Dicoding, and Universitas Klabat with credential IDs and instant preview modals.
- **💬 Interactive Contact & WhatsApp Generator**: Real-time form validation, confetti burst, pre-filled WhatsApp chat link, and direct CV download.

---

## 🛠️ Tech Stack

- **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/) (`strict: true`)
- **Bundler & Dev Server**: [Vite 6](https://vitejs.dev/)
- **Styling**: Vanilla Modern CSS (CSS custom properties, glassmorphism, responsive grid & flexbox, keyframe animations)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Effects**: [canvas-confetti](https://www.npmjs.com/package/canvas-confetti)
- **Sound Engine**: Native Web Audio API Synthesizer

---

## 📁 Project Structure

```
portofolio_tiara/
├── .vscode/
│   ├── extensions.json
│   └── settings.json
├── public/
│   ├── favicon.svg
│   └── robots.txt
├── src/
│   ├── components/
│   │   ├── About.tsx
│   │   ├── CertificateLightbox.tsx
│   │   ├── Certificates.tsx
│   │   ├── Contact.tsx
│   │   ├── CyberBackground.tsx
│   │   ├── Experience.tsx
│   │   ├── Footer.tsx
│   │   ├── Hero.tsx
│   │   ├── Navbar.tsx
│   │   ├── PhoneSimulator.tsx
│   │   ├── ProjectModal.tsx
│   │   ├── Projects.tsx
│   │   ├── QuickDock.tsx
│   │   └── Skills.tsx
│   ├── data/
│   │   └── portfolioData.ts
│   ├── types/
│   │   └── portfolio.ts
│   ├── utils/
│   │   └── audio.ts
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── .gitignore
├── .prettierrc
├── eslint.config.js
├── index.html
├── package.json
├── package-lock.json
├── PRD.md
├── design.md
├── README.md
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher recommended)
- npm (v9 or higher)

### Installation

```bash
# Clone the repository (or navigate to workspace)
cd portofolio_tiara

# Install dependencies
npm install
```

### Available Scripts

```bash
# Run local development server (http://localhost:3000)
npm run dev

# Build for production with strict TypeScript check
npm run build

# Preview production build locally
npm run preview
```

---

## 📄 Documentation

- **[PRD.md](PRD.md)** — Product Requirements Document detailing goals, audience, and features.
- **[design.md](design.md)** — Design System specification detailing color tokens, typography, and component specifications.

---

## 👩‍💻 Author

**Tiara Mamuaya**  
Program Studi Informatika, Fakultas Ilmu Komputer  
Universitas Klabat (UNKLAB), Airmadidi, Sulawesi Utara, Indonesia  
- GitHub: [@tiaramamuaya](https://github.com/tiaramamuaya)
- LinkedIn: [tiaramamuaya](https://linkedin.com/in/tiaramamuaya)
- Email: tiaramamuaya@gmail.com
