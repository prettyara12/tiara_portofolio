import React, { useState } from 'react';
import {
  Smartphone,
  ExternalLink,
  Github,
  Sparkles,
  ArrowUpRight,
  Layers,
  ChevronRight
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { Project, ProjectCategory } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

interface ProjectsProps {
  onSelectProject: (project: Project) => void;
}

export const Projects: React.FC<ProjectsProps> = ({ onSelectProject }) => {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory>('all');

  const filteredProjects = projectsData.filter((p) =>
    activeCategory === 'all' ? true : p.category === activeCategory
  );

  const handleCategoryChange = (cat: ProjectCategory) => {
    soundEngine.playSwitch();
    setActiveCategory(cat);
  };

  return (
    <section id="projects" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Smartphone size={14} />
            <span>Featured Portfolio Works</span>
          </div>
          <h2 className="section-title">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="section-subtitle">
            Koleksi aplikasi mobile dan solusi perangkat lunak yang dirancang dan dibangun oleh Tiara, memadukan performa native dan estetika visual tingkat tinggi.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '44px'
          }}
        >
          <button
            onClick={() => handleCategoryChange('all')}
            onMouseEnter={() => soundEngine.playHover()}
            style={{
              padding: '9px 20px',
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'all' ? '700' : '500',
              color: activeCategory === 'all' ? '#ffffff' : 'var(--text-medium)',
              background: activeCategory === 'all' ? 'var(--pink-primary)' : 'rgba(255, 255, 255, 0.04)',
              border: activeCategory === 'all' ? '1px solid var(--pink-primary)' : '1px solid var(--border-glass)',
              boxShadow: activeCategory === 'all' ? '0 0 16px rgba(255, 46, 147, 0.4)' : 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            All Projects ({projectsData.length})
          </button>
          <button
            onClick={() => handleCategoryChange('mobile')}
            onMouseEnter={() => soundEngine.playHover()}
            style={{
              padding: '9px 20px',
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'mobile' ? '700' : '500',
              color: activeCategory === 'mobile' ? '#ffffff' : 'var(--text-medium)',
              background: activeCategory === 'mobile' ? 'var(--pink-primary)' : 'rgba(255, 255, 255, 0.04)',
              border: activeCategory === 'mobile' ? '1px solid var(--pink-primary)' : '1px solid var(--border-glass)',
              boxShadow: activeCategory === 'mobile' ? '0 0 16px rgba(255, 46, 147, 0.4)' : 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            Mobile Apps (React Native)
          </button>
          <button
            onClick={() => handleCategoryChange('fullstack')}
            onMouseEnter={() => soundEngine.playHover()}
            style={{
              padding: '9px 20px',
              borderRadius: '999px',
              fontSize: '0.88rem',
              fontWeight: activeCategory === 'fullstack' ? '700' : '500',
              color: activeCategory === 'fullstack' ? '#ffffff' : 'var(--text-medium)',
              background: activeCategory === 'fullstack' ? 'var(--pink-primary)' : 'rgba(255, 255, 255, 0.04)',
              border: activeCategory === 'fullstack' ? '1px solid var(--pink-primary)' : '1px solid var(--border-glass)',
              boxShadow: activeCategory === 'fullstack' ? '0 0 16px rgba(255, 46, 147, 0.4)' : 'none',
              transition: 'all 0.2s ease',
              cursor: 'pointer'
            }}
          >
            Fullstack & Cloud
          </button>
        </div>

        {/* Projects Bento Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px'
          }}
        >
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="cyber-card"
              onMouseEnter={() => soundEngine.playHover()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                padding: '30px',
                border: '1px solid rgba(255, 255, 255, 0.09)',
                minHeight: '440px'
              }}
            >
              <div>
                {/* Top Card Bar */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '18px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '10px',
                        background: 'rgba(255, 46, 147, 0.12)',
                        border: '1px solid rgba(255, 46, 147, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--pink-secondary)'
                      }}
                    >
                      <Smartphone size={18} />
                    </div>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontWeight: '600',
                        color: 'var(--pink-secondary)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em'
                      }}
                    >
                      {project.category === 'mobile' ? 'Mobile App' : 'Cloud Sync'}
                    </span>
                  </div>

                  {project.featured && (
                    <span
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        fontSize: '0.72rem',
                        padding: '3px 8px',
                        borderRadius: '999px',
                        background: 'rgba(255, 46, 147, 0.2)',
                        color: '#ffffff',
                        fontWeight: '600',
                        border: '1px solid rgba(255, 46, 147, 0.4)'
                      }}
                    >
                      <Sparkles size={11} />
                      <span>Featured</span>
                    </span>
                  )}
                </div>

                {/* Title & Subtitle */}
                <h3
                  style={{
                    fontSize: '1.4rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    lineHeight: 1.25,
                    marginBottom: '8px'
                  }}
                >
                  {project.title}
                </h3>
                <div
                  style={{
                    fontSize: '0.86rem',
                    color: 'var(--pink-secondary)',
                    fontWeight: '500',
                    marginBottom: '14px'
                  }}
                >
                  {project.subtitle}
                </div>

                {/* Short Description */}
                <p style={{ fontSize: '0.92rem', color: 'var(--text-medium)', lineHeight: 1.6, marginBottom: '20px' }}>
                  {project.shortDescription}
                </p>

                {/* Key Metrics Pills */}
                {project.metrics && (
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '20px' }}>
                    {project.metrics.slice(0, 2).map((m, idx) => (
                      <span
                        key={idx}
                        style={{
                          fontSize: '0.72rem',
                          background: 'rgba(255, 255, 255, 0.03)',
                          border: '1px solid rgba(255, 255, 255, 0.08)',
                          borderRadius: '6px',
                          padding: '3px 8px',
                          color: '#e2e8f0',
                          fontWeight: '500'
                        }}
                      >
                        ⚡ {m}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div>
                {/* Tech Pills */}
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '22px' }}>
                  {project.tags.slice(0, 4).map((tag, idx) => (
                    <span key={idx} className="tech-pill" style={{ fontSize: '0.75rem', padding: '3px 9px' }}>
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 4 && (
                    <span
                      style={{
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                        alignSelf: 'center',
                        marginLeft: '4px'
                      }}
                    >
                      +{project.tags.length - 4} more
                    </span>
                  )}
                </div>

                {/* Card Action Row */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingTop: '16px',
                    borderTop: '1px solid var(--border-glass)'
                  }}
                >
                  {/* Case Study Trigger */}
                  <button
                    onClick={() => onSelectProject(project)}
                    onMouseEnter={() => soundEngine.playHover()}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      fontSize: '0.88rem',
                      fontWeight: '600',
                      color: '#ffffff',
                      transition: 'color 0.2s',
                      cursor: 'pointer'
                    }}
                  >
                    <span>Detail Studi Kasus</span>
                    <ChevronRight size={16} color="var(--pink-primary)" />
                  </button>

                  {/* External Links */}
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Source Code"
                        onClick={() => soundEngine.playClick()}
                        onMouseEnter={() => soundEngine.playHover()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: 'rgba(255, 255, 255, 0.04)',
                          border: '1px solid var(--border-glass)',
                          color: 'var(--text-high)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <Github size={15} />
                      </a>
                    )}

                    {project.demoUrl && (
                      <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noreferrer"
                        title="Live Demo / Expo Preview"
                        onClick={() => soundEngine.playClick()}
                        onMouseEnter={() => soundEngine.playHover()}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: '34px',
                          height: '34px',
                          borderRadius: '8px',
                          background: 'rgba(255, 46, 147, 0.15)',
                          border: '1px solid var(--pink-border)',
                          color: 'var(--pink-secondary)',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        <ArrowUpRight size={16} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
