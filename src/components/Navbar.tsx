import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Download, Sparkles } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface NavbarProps {
  activeSection: string;
}

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'certificates', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

export const Navbar: React.FC<NavbarProps> = ({ activeSection }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMuted, setIsMuted] = useState(soundEngine.getIsMuted());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    const unsubscribe = soundEngine.subscribe((muted) => setIsMuted(muted));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      unsubscribe();
    };
  }, []);

  const handleNavClick = (id: string) => {
    soundEngine.playClick();
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleAudioToggle = () => {
    soundEngine.toggleMute();
  };

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'center',
        padding: isScrolled ? '12px 20px' : '20px 24px',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
      }}
    >
      <nav
        style={{
          width: '100%',
          maxWidth: '1180px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          background: isScrolled ? 'rgba(13, 14, 21, 0.85)' : 'rgba(18, 18, 26, 0.65)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 46, 147, 0.22)',
          boxShadow: isScrolled
            ? '0 12px 36px -10px rgba(0, 0, 0, 0.8), 0 0 24px rgba(255, 46, 147, 0.25)'
            : '0 8px 24px -10px rgba(0, 0, 0, 0.6)',
          borderRadius: '999px',
          padding: '8px 16px',
          transition: 'all 0.3s ease'
        }}
      >
        {/* Monogram Brand */}
        <a
          href="#home"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
          onMouseEnter={() => soundEngine.playHover()}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            textDecoration: 'none'
          }}
        >
          <div
            style={{
              width: '38px',
              height: '38px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.2), rgba(255, 93, 162, 0.05))',
              border: '1.5px solid var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--pink-secondary)',
              fontWeight: '800',
              fontSize: '0.95rem',
              letterSpacing: '0.05em',
              boxShadow: '0 0 14px rgba(255, 46, 147, 0.4)'
            }}
          >
            TM
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontWeight: '700',
                fontSize: '1rem',
                color: '#ffffff',
                letterSpacing: '-0.01em',
                lineHeight: 1.1
              }}
            >
              Tiara Mamuaya
            </span>
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.72rem',
                color: 'var(--pink-secondary)',
                letterSpacing: '0.02em'
              }}
            >
              UNKLAB • Mobile Dev
            </span>
          </div>
        </a>

        {/* Desktop Navigation Links */}
        <ul
          style={{
            display: 'none',
            alignItems: 'center',
            gap: '6px',
            listStyle: 'none'
          }}
          className="desktop-nav-links"
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  onMouseEnter={() => soundEngine.playHover()}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '999px',
                    fontSize: '0.88rem',
                    fontWeight: isActive ? '600' : '500',
                    color: isActive ? '#ffffff' : 'var(--text-medium)',
                    background: isActive ? 'rgba(255, 46, 147, 0.18)' : 'transparent',
                    border: isActive ? '1px solid rgba(255, 46, 147, 0.5)' : '1px solid transparent',
                    boxShadow: isActive ? '0 0 14px rgba(255, 46, 147, 0.3)' : 'none',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>

        {/* Right Actions: Audio Toggle & Hire CTA */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {/* Cyber Audio Synthesizer Button */}
          <button
            onClick={handleAudioToggle}
            onMouseEnter={() => soundEngine.playHover()}
            title={isMuted ? 'Nyalakan Efek Suara Cyber' : 'Matikan Efek Suara'}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              background: isMuted ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 46, 147, 0.15)',
              border: isMuted ? '1px solid var(--border-glass)' : '1px solid var(--pink-border-glow)',
              color: isMuted ? 'var(--text-muted)' : 'var(--pink-secondary)',
              boxShadow: isMuted ? 'none' : '0 0 12px rgba(255, 46, 147, 0.35)',
              transition: 'all 0.2s ease'
            }}
          >
            {isMuted ? <VolumeX size={17} /> : <Volume2 size={17} />}
          </button>

          {/* Quick CV / Contact Button */}
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('contact');
            }}
            onMouseEnter={() => soundEngine.playHover()}
            className="btn-primary desktop-cta"
            style={{
              padding: '8px 18px',
              fontSize: '0.85rem',
              borderRadius: '999px',
              textDecoration: 'none'
            }}
          >
            <Sparkles size={15} />
            <span>Connect</span>
          </a>

          {/* Mobile Hamburger Toggle */}
          <button
            onClick={() => {
              soundEngine.playClick();
              setMobileMenuOpen(!mobileMenuOpen);
            }}
            className="mobile-menu-btn"
            style={{
              display: 'none',
              alignItems: 'center',
              justifyContent: 'center',
              width: '38px',
              height: '38px',
              borderRadius: '10px',
              background: 'rgba(255, 46, 147, 0.1)',
              border: '1px solid var(--pink-border)',
              color: 'var(--pink-secondary)'
            }}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div
          style={{
            position: 'fixed',
            top: '74px',
            left: '20px',
            right: '20px',
            background: 'rgba(13, 14, 21, 0.96)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255, 46, 147, 0.3)',
            borderRadius: '24px',
            padding: '24px',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 46, 147, 0.2)',
            zIndex: 99,
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}
        >
          {navItems.map((item) => {
            const isActive = activeSection === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                style={{
                  textAlign: 'left',
                  padding: '12px 18px',
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: isActive ? '700' : '500',
                  color: isActive ? '#ffffff' : 'var(--text-medium)',
                  background: isActive ? 'rgba(255, 46, 147, 0.2)' : 'transparent',
                  border: isActive ? '1px solid var(--pink-primary)' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <span>{item.label}</span>
                {isActive && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--pink-primary)' }} />}
              </button>
            );
          })}

          <div style={{ marginTop: '12px', paddingTop: '16px', borderTop: '1px solid var(--border-glass)' }}>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('contact');
              }}
              className="btn-primary"
              style={{ width: '100%', textDecoration: 'none' }}
            >
              <Sparkles size={16} />
              <span>Contact Tiara</span>
            </a>
          </div>
        </div>
      )}

      {/* Responsive media query styling injection */}
      <style>{`
        @media (min-width: 900px) {
          .desktop-nav-links {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
        @media (max-width: 899px) {
          .desktop-nav-links {
            display: none !important;
          }
          .desktop-cta {
            display: none !important;
          }
          .mobile-menu-btn {
            display: flex !important;
          }
        }
      `}</style>
    </header>
  );
};
