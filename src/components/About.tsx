import React, { useState } from 'react';
import {
  Smartphone,
  GraduationCap,
  GitCommit,
  ShieldCheck,
  Terminal as TerminalIcon,
  Copy,
  Check,
  Code2,
  Heart,
  Compass,
  Cpu
} from 'lucide-react';
import { personalInfo, bioStats, terminalTabs } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const About: React.FC = () => {
  const [activeTab, setActiveTab] = useState(terminalTabs[0].id);
  const [copied, setCopied] = useState(false);

  const currentTab = terminalTabs.find((t) => t.id === activeTab) || terminalTabs[0];

  const handleTabClick = (tabId: string) => {
    soundEngine.playSwitch();
    setActiveTab(tabId);
  };

  const handleCopy = () => {
    soundEngine.playClick();
    navigator.clipboard.writeText(currentTab.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStatIcon = (iconName: string) => {
    const size = 24;
    const color = 'var(--pink-primary)';
    switch (iconName) {
      case 'Smartphone': return <Smartphone size={size} color={color} />;
      case 'GraduationCap': return <GraduationCap size={size} color={color} />;
      case 'GitCommit': return <GitCommit size={size} color={color} />;
      case 'ShieldCheck': return <ShieldCheck size={size} color={color} />;
      default: return <Cpu size={size} color={color} />;
    }
  };

  return (
    <section id="about" className="section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-badge">
            <Code2 size={14} />
            <span>Profile & Journey</span>
          </div>
          <h2 className="section-title">
            About <span className="gradient-text">Tiara Mamuaya</span>
          </h2>
          <p className="section-subtitle">
            Mahasiswi Program Studi Informatika Universitas Klabat yang berfokus pada arsitektur aplikasi mobile modern, performa tinggi, dan estetika visual menawan.
          </p>
        </div>

        {/* Bento Stats Row */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '20px',
            marginBottom: '40px'
          }}
        >
          {bioStats.map((stat, idx) => (
            <div
              key={idx}
              className="cyber-card"
              onMouseEnter={() => soundEngine.playHover()}
              style={{
                padding: '24px',
                display: 'flex',
                alignItems: 'flex-start',
                gap: '16px'
              }}
            >
              <div
                style={{
                  width: '50px',
                  height: '50px',
                  borderRadius: '14px',
                  background: 'rgba(255, 46, 147, 0.1)',
                  border: '1px solid rgba(255, 46, 147, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0
                }}
              >
                {renderStatIcon(stat.icon)}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <div style={{ display: 'flex', alignItems: 'baseline', gap: '2px' }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '2rem',
                      fontWeight: '800',
                      color: '#ffffff',
                      lineHeight: 1
                    }}
                  >
                    {stat.value}
                  </span>
                  {stat.suffix && (
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--pink-secondary)' }}>
                      {stat.suffix}
                    </span>
                  )}
                </div>
                <span style={{ fontSize: '0.92rem', fontWeight: '600', color: '#ffffff', marginTop: '6px' }}>
                  {stat.label}
                </span>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-medium)', marginTop: '2px' }}>
                  {stat.detail}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Bento Grid: Story & Interactive Cyber Terminal */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '28px',
            alignItems: 'stretch'
          }}
        >
          {/* Story Card */}
          <div
            className="cyber-card"
            style={{
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '24px'
            }}
          >
            <div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  color: 'var(--pink-secondary)',
                  fontSize: '0.85rem',
                  fontWeight: '600',
                  marginBottom: '12px'
                }}
              >
                <Heart size={16} />
                <span>Passion & Dedication</span>
              </div>

              <h3 style={{ fontSize: '1.6rem', marginBottom: '16px', lineHeight: 1.3 }}>
                Menghidupkan ide melalui antarmuka mobile yang anggun dan bertenaga.
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', color: 'var(--text-medium)', fontSize: '0.98rem' }}>
                <p>
                  Sebagai mahasiswi di <strong>Universitas Klabat (UNKLAB)</strong>, saya percaya bahwa aplikasi mobile yang baik bukan hanya tentang baris kode yang berjalan, melainkan jembatan emosi antara pengguna dan teknologi.
                </p>
                <p>
                  Spesialisasi saya berada pada ekosistem <strong>React Native</strong> dan <strong>Expo Go</strong>, dikombinasikan dengan backend cloud seperti <strong>Supabase</strong> dan <strong>Python Flask</strong>. Saya senang mengeksplorasi state management efisien, micro-animations yang fluid, serta arsitektur offline-first.
                </p>
                <p>
                  Selain perkuliahan, saya aktif berbagi ilmu sebagai <strong>Asisten Laboratorium</strong> pemrograman dan berkontribusi dalam proyek-proyek teknologi kemahasiswaan di Fakultas Ilmu Komputer UNKLAB.
                </p>
              </div>
            </div>

            {/* Quote Pill */}
            <div
              style={{
                background: 'rgba(255, 46, 147, 0.08)',
                borderLeft: '3px solid var(--pink-primary)',
                padding: '12px 18px',
                borderRadius: '0 12px 12px 0',
                fontStyle: 'italic',
                color: '#ffffff',
                fontSize: '0.9rem'
              }}
            >
              "Code with precision, design with empathy, and never stop building."
            </div>
          </div>

          {/* Interactive Cyber Terminal Card */}
          <div
            className="cyber-card"
            style={{
              background: '#0a0b10',
              border: '1px solid rgba(255, 46, 147, 0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Terminal Top Chrome Bar */}
            <div
              style={{
                background: '#12131c',
                padding: '12px 16px',
                borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between'
              }}
            >
              {/* Traffic Light Dots */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '7px' }}>
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ff5f56' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#ffbd2e' }} />
                <span style={{ width: '11px', height: '11px', borderRadius: '50%', background: '#27c93f' }} />
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.78rem',
                    color: 'var(--text-muted)',
                    marginLeft: '8px'
                  }}
                >
                  tiara@unklab-desktop: ~
                </span>
              </div>

              {/* Copy Code Action */}
              <button
                onClick={handleCopy}
                title="Salin isi terminal"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.75rem',
                  color: copied ? 'var(--status-active)' : 'var(--text-muted)',
                  transition: 'color 0.2s'
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
                <span>{copied ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Terminal File Tabs */}
            <div
              style={{
                display: 'flex',
                background: '#0d0e16',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                padding: '4px 8px',
                gap: '6px'
              }}
            >
              {terminalTabs.map((tab) => {
                const isSelected = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => handleTabClick(tab.id)}
                    onMouseEnter={() => soundEngine.playHover()}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      background: isSelected ? 'rgba(255, 46, 147, 0.15)' : 'transparent',
                      color: isSelected ? 'var(--pink-secondary)' : 'var(--text-muted)',
                      border: isSelected ? '1px solid rgba(255, 46, 147, 0.3)' : '1px solid transparent',
                      transition: 'all 0.2s ease',
                      cursor: 'pointer'
                    }}
                  >
                    <TerminalIcon size={12} />
                    <span>{tab.title}</span>
                  </button>
                );
              })}
            </div>

            {/* Terminal Code Body */}
            <div
              style={{
                padding: '20px',
                flex: 1,
                overflowX: 'auto',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                lineHeight: 1.6,
                color: '#e2e8f0',
                background: '#090a0f',
                position: 'relative'
              }}
            >
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
                <code>{currentTab.content}</code>
              </pre>

              {/* Glowing cursor indicator at bottom */}
              <div
                style={{
                  display: 'inline-block',
                  width: '8px',
                  height: '15px',
                  background: 'var(--pink-primary)',
                  boxShadow: '0 0 8px var(--pink-primary)',
                  marginTop: '10px',
                  animation: 'pulse-pink 1s infinite'
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
