import React, { useState } from 'react';
import {
  Code2,
  Smartphone,
  Layers,
  Database,
  Wrench,
  Zap,
  Palette,
  FileCode,
  Cpu,
  Terminal,
  Network,
  GitBranch,
  Send,
  Sparkles
} from 'lucide-react';
import { skillsData } from '../data/portfolioData';
import { SkillCategory, Skill } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

const categories: { id: SkillCategory; label: string; icon: string }[] = [
  { id: 'all', label: 'All Skills', icon: 'Sparkles' },
  { id: 'mobile', label: 'Mobile Engineering', icon: 'Smartphone' },
  { id: 'frontend', label: 'Frontend & Web', icon: 'Layers' },
  { id: 'backend', label: 'Backend & Cloud', icon: 'Database' },
  { id: 'tools', label: 'Tools & Workflow', icon: 'Wrench' }
];

export const Skills: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<SkillCategory>('all');

  const filteredSkills = skillsData.filter((skill) =>
    activeCategory === 'all' ? true : skill.category === activeCategory
  );

  const handleCategoryChange = (cat: SkillCategory) => {
    soundEngine.playSwitch();
    setActiveCategory(cat);
  };

  const renderSkillIcon = (iconName: string) => {
    const size = 20;
    const color = 'var(--pink-secondary)';
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={size} color={color} />;
      case 'Zap': return <Zap size={size} color={color} />;
      case 'Palette': return <Palette size={size} color={color} />;
      case 'Layers': return <Layers size={size} color={color} />;
      case 'Code2': return <Code2 size={size} color={color} />;
      case 'FileCode': return <FileCode size={size} color={color} />;
      case 'Cpu': return <Cpu size={size} color={color} />;
      case 'Database': return <Database size={size} color={color} />;
      case 'Terminal': return <Terminal size={size} color={color} />;
      case 'Network': return <Network size={size} color={color} />;
      case 'GitBranch': return <GitBranch size={size} color={color} />;
      case 'Send': return <Send size={size} color={color} />;
      default: return <Code2 size={size} color={color} />;
    }
  };

  return (
    <section id="skills" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-badge">
            <Zap size={14} />
            <span>Tech Stack & Arsenal</span>
          </div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-subtitle">
            Kumpulan teknologi, bahasa pemrograman, dan alat pengembangan yang dikuasai Tiara untuk menciptakan aplikasi mobile dan web berstandar industri.
          </p>
        </div>

        {/* Category Tabs */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '10px',
            marginBottom: '40px'
          }}
        >
          {categories.map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategoryChange(cat.id)}
                onMouseEnter={() => soundEngine.playHover()}
                style={{
                  padding: '9px 18px',
                  borderRadius: '999px',
                  fontSize: '0.88rem',
                  fontWeight: isSelected ? '700' : '500',
                  color: isSelected ? '#ffffff' : 'var(--text-medium)',
                  background: isSelected ? 'var(--pink-primary)' : 'rgba(255, 255, 255, 0.04)',
                  border: isSelected ? '1px solid var(--pink-primary)' : '1px solid var(--border-glass)',
                  boxShadow: isSelected ? '0 0 16px rgba(255, 46, 147, 0.4)' : 'none',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Skills Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '20px'
          }}
        >
          {filteredSkills.map((skill, idx) => (
            <div
              key={idx}
              className="cyber-card"
              onMouseEnter={() => soundEngine.playHover()}
              style={{
                padding: '24px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                gap: '16px'
              }}
            >
              <div>
                {/* Header row with icon & experience */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '42px',
                        height: '42px',
                        borderRadius: '12px',
                        background: 'rgba(255, 46, 147, 0.1)',
                        border: '1px solid rgba(255, 46, 147, 0.25)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                      }}
                    >
                      {renderSkillIcon(skill.icon)}
                    </div>
                    <div>
                      <h3 style={{ fontSize: '1.05rem', fontWeight: '700', color: '#ffffff' }}>
                        {skill.name}
                      </h3>
                      <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                        {skill.experience} Experience
                      </span>
                    </div>
                  </div>

                  {/* Level text badge */}
                  <span
                    style={{
                      fontSize: '0.72rem',
                      padding: '3px 8px',
                      borderRadius: '6px',
                      background: 'rgba(255, 46, 147, 0.15)',
                      color: 'var(--pink-secondary)',
                      fontWeight: '600'
                    }}
                  >
                    {skill.levelText}
                  </span>
                </div>

                {/* Description */}
                <p style={{ fontSize: '0.86rem', color: 'var(--text-medium)', lineHeight: 1.55 }}>
                  {skill.description}
                </p>
              </div>

              {/* Progress Bar */}
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    Proficiency
                  </span>
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      fontWeight: '600',
                      color: 'var(--pink-secondary)'
                    }}
                  >
                    {skill.level}%
                  </span>
                </div>
                <div
                  style={{
                    width: '100%',
                    height: '6px',
                    borderRadius: '999px',
                    background: 'rgba(255, 255, 255, 0.06)',
                    overflow: 'hidden',
                    position: 'relative'
                  }}
                >
                  <div
                    style={{
                      width: `${skill.level}%`,
                      height: '100%',
                      borderRadius: '999px',
                      background: 'linear-gradient(90deg, var(--pink-primary), var(--pink-secondary))',
                      boxShadow: '0 0 10px rgba(255, 46, 147, 0.5)',
                      transition: 'width 0.8s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
