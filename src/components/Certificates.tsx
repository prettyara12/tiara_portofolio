import React from 'react';
import { Award, ExternalLink, Calendar, ShieldCheck, Sparkles, ChevronRight } from 'lucide-react';
import { certificatesData } from '../data/portfolioData';
import { Certificate } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

interface CertificatesProps {
  onSelectCertificate: (cert: Certificate) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ onSelectCertificate }) => {
  return (
    <section id="certificates" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Award size={14} />
            <span>Honors & Certifications</span>
          </div>
          <h2 className="section-title">
            Certificates & <span className="gradient-text">Achievements</span>
          </h2>
          <p className="section-subtitle">
            Kredensial tersertifikasi dari institusi global, akademi teknologi, serta penghargaan kehormatan akademik dari Universitas Klabat.
          </p>
        </div>

        {/* Certificates Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '24px'
          }}
        >
          {certificatesData.map((cert) => (
            <div
              key={cert.id}
              className="cyber-card"
              onMouseEnter={() => soundEngine.playHover()}
              style={{
                padding: '28px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '20px'
              }}
            >
              <div>
                {/* Card Top: Category Badge & Issuer */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
                  <div
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px',
                      padding: '4px 10px',
                      borderRadius: '8px',
                      background: cert.badgeColor ? `${cert.badgeColor}18` : 'rgba(255, 46, 147, 0.15)',
                      border: `1px solid ${cert.badgeColor || 'var(--pink-border)'}`,
                      color: cert.badgeColor || 'var(--pink-secondary)',
                      fontSize: '0.75rem',
                      fontWeight: '700'
                    }}
                  >
                    <Award size={13} />
                    <span>{cert.category}</span>
                  </div>

                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {cert.issuedDate}
                  </span>
                </div>

                {/* Title */}
                <h3 style={{ fontSize: '1.2rem', fontWeight: '700', color: '#ffffff', lineHeight: 1.3, marginBottom: '8px' }}>
                  {cert.title}
                </h3>

                {/* Issuer */}
                <div style={{ fontSize: '0.88rem', color: 'var(--pink-secondary)', fontWeight: '500', marginBottom: '14px' }}>
                  {cert.issuer}
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.88rem', color: 'var(--text-medium)', lineHeight: 1.6, marginBottom: '18px' }}>
                  {cert.description}
                </p>

                {/* Skills tags */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                  {cert.skillsCovered.map((skill, idx) => (
                    <span
                      key={idx}
                      style={{
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '6px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid var(--border-glass)',
                        color: 'var(--text-high)'
                      }}
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Bottom Action Row */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: '16px',
                  borderTop: '1px solid var(--border-glass)'
                }}
              >
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  ID: {cert.credentialId}
                </div>

                <button
                  onClick={() => onSelectCertificate(cert)}
                  onMouseEnter={() => soundEngine.playHover()}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    fontSize: '0.85rem',
                    fontWeight: '600',
                    color: 'var(--pink-secondary)',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  <span>Lihat Kredensial</span>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
