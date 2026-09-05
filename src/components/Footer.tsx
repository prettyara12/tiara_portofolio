import React from 'react';
import { ArrowUp, Heart, Sparkles, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    soundEngine.playClick();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer
      style={{
        position: 'relative',
        zIndex: 2,
        background: '#07070a',
        borderTop: '1px solid rgba(255, 46, 147, 0.2)',
        paddingTop: '60px',
        paddingBottom: '40px'
      }}
    >
      {/* Top Gradient Mesh Accent */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: '20%',
          right: '20%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, var(--pink-primary), transparent)',
          boxShadow: '0 0 16px var(--pink-primary)'
        }}
      />

      <div className="container">
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '30px',
            marginBottom: '40px'
          }}
        >
          {/* Brand & Faculty Info */}
          <div style={{ maxWidth: '420px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px' }}>
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255, 46, 147, 0.15)',
                  border: '1.5px solid var(--pink-primary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--pink-secondary)',
                  fontWeight: '800',
                  fontSize: '0.9rem',
                  boxShadow: '0 0 12px rgba(255, 46, 147, 0.35)'
                }}
              >
                TM
              </div>
              <span style={{ fontSize: '1.2rem', fontWeight: '800', color: '#ffffff' }}>
                Tiara Mamuaya
              </span>
            </div>

            <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6, marginBottom: '10px' }}>
              Mobile Application Developer berfokus pada React Native, Expo Go, Supabase, dan Python Flask.
            </p>

            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.78rem',
                color: 'var(--pink-secondary)',
                background: 'rgba(255, 46, 147, 0.08)',
                padding: '4px 10px',
                borderRadius: '6px',
                border: '1px solid rgba(255, 46, 147, 0.2)'
              }}
            >
              <GraduationCap size={14} />
              <span>Universitas Klabat • Prodi Informatika</span>
            </div>
          </div>

          {/* Quick Links */}
          <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Navigasi
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-medium)' }}>
                <a href="#home" onClick={() => soundEngine.playClick()}>Home</a>
                <a href="#about" onClick={() => soundEngine.playClick()}>About</a>
                <a href="#skills" onClick={() => soundEngine.playClick()}>Skills</a>
                <a href="#projects" onClick={() => soundEngine.playClick()}>Projects</a>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '0.8rem', fontWeight: '700', color: '#ffffff', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '12px' }}>
                Dokumentasi
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.88rem', color: 'var(--text-medium)' }}>
                <a href="#experience" onClick={() => soundEngine.playClick()}>Experience</a>
                <a href="#certificates" onClick={() => soundEngine.playClick()}>Certificates</a>
                <a href="#contact" onClick={() => soundEngine.playClick()}>Contact</a>
                <a href={personalInfo.github} target="_blank" rel="noreferrer" onClick={() => soundEngine.playClick()}>GitHub</a>
              </div>
            </div>
          </div>

          {/* Back to top button */}
          <div>
            <button
              onClick={scrollToTop}
              onMouseEnter={() => soundEngine.playHover()}
              title="Kembali ke atas"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                borderRadius: '12px',
                background: 'rgba(255, 46, 147, 0.1)',
                border: '1px solid var(--pink-border-glow)',
                color: 'var(--pink-secondary)',
                fontSize: '0.88rem',
                fontWeight: '600',
                boxShadow: '0 0 16px rgba(255, 46, 147, 0.25)',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              <span>Back to Top</span>
              <ArrowUp size={16} />
            </button>
          </div>
        </div>

        {/* Bottom Sub-row */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '24px',
            borderTop: '1px solid var(--border-glass)',
            fontSize: '0.8rem',
            color: 'var(--text-muted)'
          }}
        >
          <div>
            © {new Date().getFullYear()} Tiara Mamuaya. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span>Crafted with</span>
            <Heart size={14} color="var(--pink-primary)" fill="var(--pink-primary)" />
            <span>& Cyber-Pink Aesthetics for UNKLAB</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
