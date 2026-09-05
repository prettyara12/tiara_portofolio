import React from 'react';
import { Github, Linkedin, MessageCircle, Mail, Instagram } from 'lucide-react';
import { socialLinks } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const QuickDock: React.FC = () => {
  const renderIcon = (name: string) => {
    const size = 18;
    switch (name) {
      case 'Github': return <Github size={size} />;
      case 'Linkedin': return <Linkedin size={size} />;
      case 'MessageCircle': return <MessageCircle size={size} />;
      case 'Mail': return <Mail size={size} />;
      case 'Instagram': return <Instagram size={size} />;
      default: return <MessageCircle size={size} />;
    }
  };

  return (
    <aside
      aria-label="Quick Social Links"
      style={{
        position: 'fixed',
        bottom: '28px',
        right: '28px',
        zIndex: 90,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '10px',
        background: 'rgba(13, 14, 21, 0.85)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        border: '1px solid rgba(255, 46, 147, 0.3)',
        borderRadius: '999px',
        padding: '10px 8px',
        boxShadow: '0 12px 36px rgba(0, 0, 0, 0.8), 0 0 20px rgba(255, 46, 147, 0.2)'
      }}
      className="desktop-quick-dock"
    >
      {socialLinks.map((link) => (
        <a
          key={link.name}
          href={link.url}
          target="_blank"
          rel="noreferrer"
          title={link.label}
          onClick={() => soundEngine.playClick()}
          onMouseEnter={() => soundEngine.playHover()}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.04)',
            border: '1px solid var(--border-glass)',
            color: link.color || 'var(--pink-secondary)',
            transition: 'all 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
          }}
          onMouseOver={(e) => {
            e.currentTarget.style.transform = 'scale(1.15)';
            e.currentTarget.style.boxShadow = `0 0 14px ${link.color || 'var(--pink-primary)'}`;
          }}
          onMouseOut={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          {renderIcon(link.icon)}
        </a>
      ))}

      <style>{`
        @media (max-width: 768px) {
          .desktop-quick-dock {
            display: none !important;
          }
        }
      `}</style>
    </aside>
  );
};
