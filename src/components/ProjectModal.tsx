import React, { useEffect } from 'react';
import { X, ExternalLink, Github, CheckCircle2, Cpu, AlertCircle, Sparkles, Layers } from 'lucide-react';
import { Project } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  useEffect(() => {
    if (!project) return;
    soundEngine.playChime();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    // Lock background scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.playClick();
          onClose();
        }
      }}
    >
      <div
        className="modal-content-box cyber-card"
        style={{
          width: '100%',
          maxWidth: '820px',
          background: 'rgba(13, 14, 21, 0.96)',
          border: '1px solid rgba(255, 46, 147, 0.45)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 46, 147, 0.25)',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          onMouseEnter={() => soundEngine.playHover()}
          title="Tutup (Esc)"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div style={{ paddingRight: '40px', marginBottom: '24px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
            <span
              style={{
                fontSize: '0.78rem',
                padding: '4px 12px',
                borderRadius: '999px',
                background: 'rgba(255, 46, 147, 0.15)',
                color: 'var(--pink-secondary)',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.05em'
              }}
            >
              {project.category === 'mobile' ? 'Mobile App Project' : 'Fullstack & Cloud'}
            </span>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• Case Study</span>
          </div>

          <h2 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.2rem)', fontWeight: '800', lineHeight: 1.2 }}>
            {project.title}
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--pink-secondary)', marginTop: '4px', fontWeight: '500' }}>
            {project.subtitle}
          </p>
        </div>

        {/* Metrics Row */}
        {project.metrics && project.metrics.length > 0 && (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '12px',
              marginBottom: '24px'
            }}
          >
            {project.metrics.map((metric, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.03)',
                  border: '1px solid rgba(255, 46, 147, 0.2)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <Sparkles size={16} color="var(--pink-primary)" />
                <span style={{ fontSize: '0.85rem', fontWeight: '600', color: '#ffffff' }}>
                  {metric}
                </span>
              </div>
            ))}
          </div>
        )}

        {/* Full Overview Description */}
        <div style={{ marginBottom: '28px' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: '700', marginBottom: '8px', color: '#ffffff' }}>
            Overview & Problem Statement
          </h3>
          <p style={{ color: 'var(--text-medium)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {project.fullDescription}
          </p>
        </div>

        {/* System Architecture */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Cpu size={18} color="var(--pink-primary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>
              System Architecture & Tech Choices
            </h3>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {project.architecture.map((arch, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '10px',
                  padding: '10px 14px',
                  fontSize: '0.9rem',
                  color: 'var(--text-high)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px'
                }}
              >
                <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--pink-primary)' }} />
                <span>{arch}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Key Features */}
        <div style={{ marginBottom: '28px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '12px' }}>
            <Layers size={18} color="var(--pink-secondary)" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: '700', color: '#ffffff' }}>
              Core Features Implemented
            </h3>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '10px' }}>
            {project.features.map((feat, idx) => (
              <div
                key={idx}
                style={{
                  background: 'rgba(255, 255, 255, 0.02)',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '12px',
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: '10px'
                }}
              >
                <CheckCircle2 size={16} color="var(--status-active)" style={{ flexShrink: 0, marginTop: '2px' }} />
                <span style={{ fontSize: '0.88rem', color: 'var(--text-high)', lineHeight: 1.5 }}>
                  {feat}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Technical Challenge */}
        {project.challenges && (
          <div
            style={{
              background: 'rgba(255, 46, 147, 0.06)',
              borderLeft: '4px solid var(--pink-primary)',
              borderRadius: '0 12px 12px 0',
              padding: '16px 20px',
              marginBottom: '28px'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
              <AlertCircle size={17} color="var(--pink-secondary)" />
              <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#ffffff' }}>
                Engineering Challenge & Resolution:
              </span>
            </div>
            <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6 }}>
              {project.challenges}
            </p>
          </div>
        )}

        {/* Tech Badges */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '32px' }}>
          {project.tags.map((tag, idx) => (
            <span key={idx} className="tech-pill">
              #{tag}
            </span>
          ))}
        </div>

        {/* Footer Actions */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-glass)'
          }}
        >
          <div style={{ display: 'flex', gap: '10px' }}>
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-secondary"
                style={{ fontSize: '0.88rem', padding: '10px 18px' }}
              >
                <Github size={16} />
                <span>Source Repository</span>
              </a>
            )}

            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noreferrer"
                onClick={() => soundEngine.playClick()}
                onMouseEnter={() => soundEngine.playHover()}
                className="btn-primary"
                style={{ fontSize: '0.88rem', padding: '10px 20px' }}
              >
                <ExternalLink size={16} />
                <span>Open Preview / Demo</span>
              </a>
            )}
          </div>

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '10px 16px' }}
          >
            Close Modal
          </button>
        </div>
      </div>
    </div>
  );
};
