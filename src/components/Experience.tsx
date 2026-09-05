import React from 'react';
import { Briefcase, Calendar, MapPin, CheckCircle2, ChevronRight, Sparkles } from 'lucide-react';
import { experienceData } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const Experience: React.FC = () => {
  return (
    <section id="experience" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Briefcase size={14} />
            <span>Career & Academic Milestones</span>
          </div>
          <h2 className="section-title">
            Experience & <span className="gradient-text">Journey</span>
          </h2>
          <p className="section-subtitle">
            Perjalanan akademik di Universitas Klabat, kepemimpinan proyek capstone, peran sebagai asisten laboratorium, dan pengalaman freelance mobile development.
          </p>
        </div>

        {/* Vertical Neon Timeline */}
        <div
          style={{
            maxWidth: '860px',
            margin: '0 auto',
            position: 'relative',
            paddingLeft: '32px'
          }}
        >
          {/* Vertical Glowing Line */}
          <div
            style={{
              position: 'absolute',
              top: '10px',
              bottom: '10px',
              left: '9px',
              width: '2px',
              background: 'linear-gradient(180deg, var(--pink-primary) 0%, rgba(255, 46, 147, 0.2) 100%)',
              boxShadow: '0 0 12px rgba(255, 46, 147, 0.5)'
            }}
          />

          <div style={{ display: 'flex', flexDirection: 'column', gap: '36px' }}>
            {experienceData.map((exp) => (
              <div key={exp.id} style={{ position: 'relative' }}>
                {/* Glowing Node Dot */}
                <div
                  style={{
                    position: 'absolute',
                    top: '20px',
                    left: '-32px',
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    background: '#07070a',
                    border: '3px solid var(--pink-primary)',
                    boxShadow: '0 0 14px var(--pink-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 3
                  }}
                >
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: 'var(--pink-secondary)'
                    }}
                  />
                </div>

                {/* Card */}
                <div
                  className="cyber-card"
                  onMouseEnter={() => soundEngine.playHover()}
                  style={{
                    padding: '28px 32px',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '14px'
                  }}
                >
                  {/* Top Bar */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '10px'
                    }}
                  >
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: '700', color: '#ffffff' }}>
                        {exp.role}
                      </h3>
                      <div
                        style={{
                          fontSize: '0.95rem',
                          color: 'var(--pink-secondary)',
                          fontWeight: '600',
                          marginTop: '2px'
                        }}
                      >
                        {exp.organization}
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <span
                        style={{
                          fontSize: '0.72rem',
                          padding: '3px 10px',
                          borderRadius: '999px',
                          background: exp.status === 'Current' ? 'rgba(0, 240, 118, 0.15)' : 'rgba(255, 255, 255, 0.05)',
                          color: exp.status === 'Current' ? 'var(--status-active)' : 'var(--text-muted)',
                          border: exp.status === 'Current' ? '1px solid rgba(0, 240, 118, 0.3)' : '1px solid var(--border-glass)',
                          fontWeight: '600'
                        }}
                      >
                        {exp.status === 'Current' ? '● Aktif Saat Ini' : 'Selesai'}
                      </span>
                    </div>
                  </div>

                  {/* Metadata line: Period & Location */}
                  <div
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      alignItems: 'center',
                      gap: '16px',
                      fontSize: '0.82rem',
                      color: 'var(--text-muted)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <Calendar size={14} color="var(--pink-primary)" />
                      <span>{exp.period}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                      <MapPin size={14} color="var(--pink-primary)" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Description */}
                  <p style={{ fontSize: '0.92rem', color: 'var(--text-medium)', lineHeight: 1.6 }}>
                    {exp.description}
                  </p>

                  {/* Key points bullets */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '4px' }}>
                    {exp.keyPoints.map((point, idx) => (
                      <div
                        key={idx}
                        style={{
                          display: 'flex',
                          alignItems: 'flex-start',
                          gap: '10px',
                          fontSize: '0.88rem',
                          color: 'var(--text-high)',
                          lineHeight: 1.5
                        }}
                      >
                        <CheckCircle2
                          size={15}
                          color="var(--pink-secondary)"
                          style={{ flexShrink: 0, marginTop: '3px' }}
                        />
                        <span>{point}</span>
                      </div>
                    ))}
                  </div>

                  {/* Tech stack tags */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginTop: '8px' }}>
                    {exp.skills.map((skill, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.75rem',
                          padding: '3px 8px',
                          borderRadius: '6px',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-medium)'
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
