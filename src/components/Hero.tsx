import React, { useState, useEffect } from 'react';
import { Sparkles, ArrowRight, Download, Github, Linkedin, MessageCircle, MapPin, GraduationCap } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { PhoneSimulator } from './PhoneSimulator';
import { soundEngine } from '../utils/audio';

const roles = [
  'Mobile Application Developer',
  'Informatics Student @ Universitas Klabat',
  'React Native & Expo Specialist',
  'Python Flask & Supabase Integrator',
  'Cross-Platform UI/UX Craftsman'
];

export const Hero: React.FC = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  // Typewriter effect
  useEffect(() => {
    const fullText = roles[currentRoleIndex];
    const typingSpeed = isDeleting ? 40 : 85;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(fullText.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === fullText.length) {
          // Pause at end
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(fullText.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [displayedText, isDeleting, currentRoleIndex]);

  const scrollToSection = (id: string) => {
    soundEngine.playClick();
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 'calc(var(--navbar-height) + 40px)',
        paddingBottom: '80px',
        position: 'relative',
        zIndex: 2
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '50px',
            alignItems: 'center'
          }}
        >
          {/* Left Column: Text & Bio */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Status Pill */}
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '6px 14px',
                borderRadius: '999px',
                background: 'rgba(0, 240, 118, 0.08)',
                border: '1px solid rgba(0, 240, 118, 0.25)',
                width: 'fit-content'
              }}
            >
              <span
                style={{
                  width: '8px',
                  height: '8px',
                  borderRadius: '50%',
                  background: 'var(--status-active)',
                  boxShadow: '0 0 10px var(--status-active)'
                }}
              />
              <span style={{ fontSize: '0.82rem', fontWeight: '600', color: 'var(--status-active)' }}>
                {personalInfo.availability}
              </span>
            </div>

            {/* University & Location Badges */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--pink-secondary)',
                  background: 'rgba(255, 46, 147, 0.08)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255, 46, 147, 0.18)'
                }}
              >
                <GraduationCap size={14} />
                <span>Universitas Klabat (UNKLAB)</span>
              </div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.8rem',
                  color: 'var(--text-medium)',
                  background: 'rgba(255, 255, 255, 0.04)',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  border: '1px solid var(--border-glass)'
                }}
              >
                <MapPin size={13} color="var(--pink-primary)" />
                <span>Informatika • Manado</span>
              </div>
            </div>

            {/* Main Greeting */}
            <div>
              <h1
                style={{
                  fontSize: 'clamp(2.5rem, 5vw, 4rem)',
                  fontWeight: '800',
                  lineHeight: 1.1,
                  letterSpacing: '-0.03em',
                  marginBottom: '10px'
                }}
              >
                Hi, I'm <span className="gradient-text">{personalInfo.name}</span>
              </h1>

              {/* Dynamic Animated Typing Role */}
              <div
                style={{
                  minHeight: '44px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'clamp(1.1rem, 2.5vw, 1.5rem)',
                    color: 'var(--pink-secondary)',
                    fontWeight: '600',
                    textShadow: '0 0 16px rgba(255, 46, 147, 0.4)'
                  }}
                >
                  &gt; {displayedText}
                </span>
                <span
                  style={{
                    display: 'inline-block',
                    width: '3px',
                    height: '24px',
                    background: 'var(--pink-primary)',
                    boxShadow: '0 0 8px var(--pink-primary)',
                    animation: 'pulse-pink 0.9s infinite'
                  }}
                />
              </div>
            </div>

            {/* Bio Paragraph */}
            <p
              style={{
                fontSize: '1.05rem',
                color: 'var(--text-medium)',
                lineHeight: 1.7,
                maxWidth: '560px'
              }}
            >
              {personalInfo.shortBio}
            </p>

            {/* Action Buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', marginTop: '10px' }}>
              <button
                onClick={() => scrollToSection('projects')}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-primary"
              >
                <span>Lihat Karya Mobile</span>
                <ArrowRight size={17} />
              </button>

              <button
                onClick={() => scrollToSection('contact')}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-secondary"
              >
                <span>Hubungi Tiara</span>
              </button>

              <a
                href={personalInfo.whatsapp}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-secondary"
                style={{ color: '#00f076', borderColor: 'rgba(0, 240, 118, 0.3)' }}
              >
                <MessageCircle size={16} />
                <span>Quick WhatsApp</span>
              </a>
            </div>

            {/* Mini Social Row */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginTop: '16px',
                paddingTop: '20px',
                borderTop: '1px solid var(--border-glass)'
              }}
            >
              <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Follow Tiara:
              </span>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-high)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Github size={17} />
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  color: 'var(--text-high)',
                  transition: 'all 0.2s ease'
                }}
              >
                <Linkedin size={17} />
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Smartphone Simulator */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <PhoneSimulator />
          </div>
        </div>
      </div>
    </section>
  );
};
