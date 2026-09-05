import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Mail,
  MessageCircle,
  MapPin,
  Send,
  Download,
  Github,
  Linkedin,
  CheckCircle2,
  Sparkles,
  PhoneCall,
  Clock
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    soundEngine.playClick();
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      soundEngine.playChime();

      // Confetti burst
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#ff2e93', '#ff5da2', '#00f2fe', '#ffffff']
      });

      // Clear form
      setFormData({ name: '', email: '', subject: '', message: '' });

      setTimeout(() => {
        setSubmitted(false);
      }, 5000);
    }, 600);
  };

  const handleWhatsAppDirect = () => {
    soundEngine.playClick();
    const encoded = encodeURIComponent(
      `Halo Tiara Mamuaya, perkenalkan saya melihat web portofolio Anda. Saya tertarik untuk mendiskusikan peluang kolaborasi proyek mobile / kesempatan magang!`
    );
    window.open(`https://wa.me/${personalInfo.whatsapp}?text=${encoded}`, '_blank');
  };

  const handleDownloadCV = () => {
    soundEngine.playChime();
    // Creates a simulated professional CV download prompt
    const blob = new Blob([
      `CURRICULUM VITAE - TIARA MAMUAYA
===================================
Role: Mobile Application Developer (React Native & Expo)
Pendidikan: Universitas Klabat (UNKLAB) - Prodi Informatika
IPK: 3.86 / 4.00
Email: ${personalInfo.email}
WhatsApp: +${personalInfo.whatsapp}
Lokasi: Airmadidi, Manado, Sulawesi Utara
GitHub: ${personalInfo.github}
LinkedIn: ${personalInfo.linkedin}

KEAHLIAN UTAMA:
- React Native, Expo Go, Mobile UI/UX, TypeScript, JavaScript
- Supabase (PostgreSQL, Auth, Realtime, Storage)
- Python & Flask (RESTful APIs)
- Git & GitHub, Figma, VS Code

PROYEK UNGGULAN:
1. UNKLAB Campus Hub Mobile (React Native + Supabase)
2. Klabat Event Tracker & Ticketing (React Native + Flask API)
3. CarePulse Health & Daily Vitals (React Native + Supabase)
4. TaskFlow Agile Planner (Fullstack Collaboration)

PENGALAMAN:
- Lead Mobile Developer Capstone Team (UNKLAB, 2025 - Sekarang)
- Asisten Laboratorium Pemrograman Komputer (UNKLAB, 2024 - 2025)
- Divisi Teknologi & Kreatif HIMAIF UNKLAB (2023 - 2024)
`
    ], { type: 'text/plain;charset=utf-8' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CV_Tiara_Mamuaya_Mobile_Developer.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Mail size={14} />
            <span>Connect & Collaborate</span>
          </div>
          <h2 className="section-title">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="section-subtitle">
            Tertarik bekerja sama untuk proyek mobile app, internship, atau sekadar berdiskusi seputar teknologi di Universitas Klabat? Jangan ragu untuk menyapa Tiara!
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '36px',
            alignItems: 'start'
          }}
        >
          {/* Left Column: Contact Cards & Quick Direct Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Campus & Location Card */}
            <div
              className="cyber-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '16px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(255, 46, 147, 0.1)',
                    border: '1px solid rgba(255, 46, 147, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--pink-secondary)'
                  }}
                >
                  <MapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>
                    Lokasi Kampus
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-medium)' }}>
                    Universitas Klabat (UNKLAB)
                  </p>
                </div>
              </div>
              <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6 }}>
                Jl. Arnold Mononutu, Airmadidi Bawah, Kec. Airmadidi, Kabupaten Minahasa Utara, Sulawesi Utara 95371.
              </p>
            </div>

            {/* Direct Email Card */}
            <div
              className="cyber-card"
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div
                  style={{
                    width: '46px',
                    height: '46px',
                    borderRadius: '12px',
                    background: 'rgba(0, 242, 254, 0.1)',
                    border: '1px solid rgba(0, 242, 254, 0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--accent-cyan)'
                  }}
                >
                  <Mail size={22} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>
                    Email Resmi
                  </h3>
                  <a
                    href={`mailto:${personalInfo.email}`}
                    style={{ fontSize: '0.9rem', color: 'var(--pink-secondary)', fontWeight: '600' }}
                  >
                    {personalInfo.email}
                  </a>
                </div>
              </div>
            </div>

            {/* Quick WhatsApp Action Banner */}
            <div
              className="cyber-card"
              style={{
                background: 'linear-gradient(135deg, rgba(0, 240, 118, 0.08), rgba(18, 18, 26, 0.8))',
                border: '1px solid rgba(0, 240, 118, 0.28)',
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                gap: '14px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <MessageCircle size={24} color="var(--status-active)" />
                <h4 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
                  Respon Cepat via WhatsApp
                </h4>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-medium)', lineHeight: 1.5 }}>
                Kirim pesan langsung ke WhatsApp Tiara dengan template pesan yang telah disiapkan secara otomatis.
              </p>
              <button
                onClick={handleWhatsAppDirect}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-primary"
                style={{
                  background: 'linear-gradient(135deg, #00c853, #009624)',
                  boxShadow: '0 0 16px rgba(0, 240, 118, 0.35)',
                  fontSize: '0.88rem',
                  padding: '10px 18px'
                }}
              >
                <PhoneCall size={16} />
                <span>Buka Chat WhatsApp Sekarang</span>
              </button>
            </div>

            {/* CV Download Card */}
            <div
              className="cyber-card"
              style={{
                padding: '20px 24px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: '12px'
              }}
            >
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#ffffff' }}>
                  Curriculum Vitae (CV)
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                  Format ringkasan profil Tiara Mamuaya
                </div>
              </div>
              <button
                onClick={handleDownloadCV}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-secondary"
                style={{ fontSize: '0.82rem', padding: '8px 14px' }}
              >
                <Download size={14} />
                <span>Unduh CV</span>
              </button>
            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div
            className="cyber-card"
            style={{
              padding: '36px',
              border: '1px solid rgba(255, 46, 147, 0.35)',
              boxShadow: '0 16px 40px rgba(0, 0, 0, 0.8), 0 0 25px rgba(255, 46, 147, 0.15)'
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: '800', color: '#ffffff', marginBottom: '8px' }}>
              Kirim Pesan ke Tiara
            </h3>
            <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', marginBottom: '24px' }}>
              Form ini dilengkapi validasi langsung dan simulasi feedback interaktif.
            </p>

            {submitted ? (
              <div
                style={{
                  background: 'rgba(0, 240, 118, 0.1)',
                  border: '1px solid rgba(0, 240, 118, 0.35)',
                  borderRadius: '16px',
                  padding: '32px',
                  textAlign: 'center',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <div
                  style={{
                    width: '56px',
                    height: '56px',
                    borderRadius: '50%',
                    background: 'rgba(0, 240, 118, 0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--status-active)'
                  }}
                >
                  <CheckCircle2 size={32} />
                </div>
                <h4 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff' }}>
                  Pesan Berhasil Terkirim!
                </h4>
                <p style={{ fontSize: '0.9rem', color: 'var(--text-medium)', maxWidth: '380px' }}>
                  Terima kasih atas pesannya. Tiara akan segera meninjau dan merespon kembali secepatnya.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: 'var(--text-medium)',
                      marginBottom: '6px'
                    }}
                  >
                    Nama Lengkap *
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alexander Kairupan"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--pink-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: 'var(--text-medium)',
                      marginBottom: '6px'
                    }}
                  >
                    Alamat Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="nama@perusahaan.com"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--pink-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: 'var(--text-medium)',
                      marginBottom: '6px'
                    }}
                  >
                    Subjek / Topik
                  </label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Kolaborasi Proyek Mobile App / Internship"
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--pink-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <div>
                  <label
                    style={{
                      display: 'block',
                      fontSize: '0.82rem',
                      fontWeight: '600',
                      color: 'var(--text-medium)',
                      marginBottom: '6px'
                    }}
                  >
                    Pesan Anda *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tuliskan detail pertanyaan atau kebutuhan proyek aplikasi Anda di sini..."
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid var(--border-glass)',
                      borderRadius: '10px',
                      color: '#ffffff',
                      fontSize: '0.92rem',
                      outline: 'none',
                      resize: 'vertical',
                      fontFamily: 'inherit',
                      transition: 'border-color 0.2s'
                    }}
                    onFocus={(e) => (e.target.style.borderColor = 'var(--pink-primary)')}
                    onBlur={(e) => (e.target.style.borderColor = 'var(--border-glass)')}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  onMouseEnter={() => soundEngine.playHover()}
                  className="btn-primary"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontSize: '0.95rem',
                    marginTop: '8px'
                  }}
                >
                  <Send size={16} />
                  <span>{loading ? 'Mengirim Pesan...' : 'Kirim Pesan Sekarang'}</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
