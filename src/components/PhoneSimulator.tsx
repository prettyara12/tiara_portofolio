import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  ChevronRight,
  Bell,
  Calendar,
  Home,
  User,
  Compass,
  Ticket,
  QrCode,
  Activity,
  BarChart2,
  CheckCircle2,
  Clock,
  Sparkles,
  Smartphone
} from 'lucide-react';
import { projectsData } from '../data/portfolioData';
import { soundEngine } from '../utils/audio';

export const PhoneSimulator: React.FC = () => {
  // Allow switching between showcased apps
  const [selectedProjectIndex, setSelectedProjectIndex] = useState(0);
  const currentProject = projectsData[selectedProjectIndex] || projectsData[0];

  // Active tab screen inside the phone
  const [activeScreenIndex, setActiveScreenIndex] = useState(0);
  const activeScreen = currentProject.screens[activeScreenIndex] || currentProject.screens[0];

  // Simulated live clock
  const [currentTime, setCurrentTime] = useState('09:41');

  useEffect(() => {
    const updateTime = () => {
      const d = new Date();
      const hours = String(d.getHours()).padStart(2, '0');
      const mins = String(d.getMinutes()).padStart(2, '0');
      setCurrentTime(`${hours}:${mins}`);
    };
    updateTime();
    const timer = setInterval(updateTime, 10000);
    return () => clearInterval(timer);
  }, []);

  const handleScreenChange = (idx: number) => {
    soundEngine.playSwitch();
    setActiveScreenIndex(idx);
  };

  const handleProjectSwitch = (idx: number) => {
    soundEngine.playClick();
    setSelectedProjectIndex(idx);
    setActiveScreenIndex(0);
  };

  // Icon mapper helper
  const renderTabIcon = (iconName: string, active: boolean) => {
    const size = 18;
    const color = active ? 'var(--pink-primary)' : 'var(--text-muted)';
    switch (iconName) {
      case 'Home': return <Home size={size} color={color} />;
      case 'Calendar': return <Calendar size={size} color={color} />;
      case 'Bell': return <Bell size={size} color={color} />;
      case 'User': return <User size={size} color={color} />;
      case 'Compass': return <Compass size={size} color={color} />;
      case 'Ticket': return <Ticket size={size} color={color} />;
      case 'QrCode': return <QrCode size={size} color={color} />;
      case 'Activity': return <Activity size={size} color={color} />;
      case 'BarChart2': return <BarChart2 size={size} color={color} />;
      default: return <Smartphone size={size} color={color} />;
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '20px',
        position: 'relative'
      }}
    >
      {/* App Switcher Pills (Header of Simulator) */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          background: 'rgba(18, 18, 26, 0.8)',
          backdropFilter: 'blur(16px)',
          padding: '6px 8px',
          borderRadius: '999px',
          border: '1px solid var(--border-glass)',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.5)'
        }}
      >
        <span
          style={{
            fontSize: '0.75rem',
            fontWeight: '600',
            color: 'var(--text-muted)',
            paddingLeft: '8px',
            textTransform: 'uppercase',
            letterSpacing: '0.05em'
          }}
        >
          Demo App:
        </span>
        {projectsData.slice(0, 3).map((proj, idx) => {
          const isSelected = selectedProjectIndex === idx;
          return (
            <button
              key={proj.id}
              onClick={() => handleProjectSwitch(idx)}
              onMouseEnter={() => soundEngine.playHover()}
              style={{
                padding: '5px 12px',
                borderRadius: '999px',
                fontSize: '0.78rem',
                fontWeight: isSelected ? '700' : '500',
                color: isSelected ? '#ffffff' : 'var(--text-medium)',
                background: isSelected ? 'var(--pink-primary)' : 'transparent',
                boxShadow: isSelected ? '0 0 12px rgba(255, 46, 147, 0.4)' : 'none',
                transition: 'all 0.2s ease',
                cursor: 'pointer'
              }}
            >
              {proj.title.split(' ')[0]}
            </button>
          );
        })}
      </div>

      {/* Titanium Frame Mockup */}
      <div
        className="phone-mockup-frame"
        style={{
          width: '320px',
          height: '630px',
          background: '#0e0f17',
          borderRadius: '46px',
          padding: '12px',
          border: '2px solid rgba(255, 46, 147, 0.35)',
          boxShadow:
            '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 40px rgba(255, 46, 147, 0.2), inset 0 0 4px rgba(255, 255, 255, 0.2)',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          userSelect: 'none'
        }}
      >
        {/* Hardware Reflection Accent */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            borderRadius: '44px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            pointerEvents: 'none'
          }}
        />

        {/* Screen Bezel & Container */}
        <div
          style={{
            flex: 1,
            background: 'linear-gradient(180deg, #09090e 0%, #11111a 100%)',
            borderRadius: '36px',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative'
          }}
        >
          {/* Dynamic Island / Notch */}
          <div
            style={{
              height: '32px',
              padding: '0 16px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'relative',
              zIndex: 10
            }}
          >
            {/* Clock */}
            <span
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.75rem',
                fontWeight: '600',
                color: '#ffffff'
              }}
            >
              {currentTime}
            </span>

            {/* Dynamic Island Pill */}
            <div
              style={{
                width: '74px',
                height: '18px',
                background: '#000000',
                borderRadius: '12px',
                border: '1px solid rgba(255, 46, 147, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '5px'
              }}
            >
              <div
                style={{
                  width: '6px',
                  height: '6px',
                  borderRadius: '50%',
                  background: 'var(--status-active)',
                  boxShadow: '0 0 6px var(--status-active)'
                }}
              />
              <span style={{ fontSize: '0.55rem', color: '#a0a0b0', fontWeight: '600' }}>Expo</span>
            </div>

            {/* Status Icons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '5px', color: '#ffffff' }}>
              <Wifi size={13} />
              <Battery size={15} />
            </div>
          </div>

          {/* Screen Content Scrollable Area */}
          <div
            style={{
              flex: 1,
              padding: '12px 14px',
              display: 'flex',
              flexDirection: 'column',
              overflowY: 'auto',
              gap: '12px'
            }}
            className="phone-screen-scroll"
          >
            {/* App Header Banner */}
            <div
              style={{
                background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.15), rgba(157, 78, 221, 0.1))',
                border: '1px solid rgba(255, 46, 147, 0.25)',
                borderRadius: '16px',
                padding: '12px'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '0.7rem', color: 'var(--pink-secondary)', fontWeight: '600' }}>
                  {activeScreen.subtitle}
                </span>
                {activeScreen.badge && (
                  <span
                    style={{
                      fontSize: '0.65rem',
                      background: 'rgba(255, 46, 147, 0.2)',
                      color: '#ffffff',
                      padding: '2px 8px',
                      borderRadius: '999px',
                      fontWeight: '600'
                    }}
                  >
                    {activeScreen.badge}
                  </span>
                )}
              </div>
              <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff' }}>
                {activeScreen.headerTitle}
              </h4>
            </div>

            {/* Metric / Hero Card (if available) */}
            {activeScreen.mockContent.heroMetric && (
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.04)',
                  border: '1px solid var(--border-glass)',
                  borderRadius: '14px',
                  padding: '10px 12px'
                }}
              >
                <div style={{ fontSize: '0.68rem', color: 'var(--text-muted)' }}>
                  {activeScreen.mockContent.heroMetric.label}
                </div>
                <div
                  style={{
                    fontSize: '1rem',
                    fontWeight: '700',
                    color: '#ffffff',
                    margin: '2px 0'
                  }}
                >
                  {activeScreen.mockContent.heroMetric.value}
                </div>
                {activeScreen.mockContent.heroMetric.trend && (
                  <div
                    style={{
                      fontSize: '0.68rem',
                      color: 'var(--status-active)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <CheckCircle2 size={11} />
                    <span>{activeScreen.mockContent.heroMetric.trend}</span>
                  </div>
                )}
              </div>
            )}

            {/* Screen List Items */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <span
                style={{
                  fontSize: '0.7rem',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  color: 'var(--text-muted)',
                  fontWeight: '600'
                }}
              >
                Aktivitas & Data
              </span>
              {activeScreen.mockContent.listItems.map((item, idx) => (
                <div
                  key={idx}
                  onClick={() => soundEngine.playClick()}
                  onMouseEnter={() => soundEngine.playHover()}
                  style={{
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    borderRadius: '12px',
                    padding: '8px 10px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease'
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                    <span style={{ fontSize: '0.8rem', fontWeight: '600', color: '#ffffff' }}>
                      {item.title}
                    </span>
                    <span style={{ fontSize: '0.68rem', color: 'var(--text-medium)' }}>
                      {item.desc}
                    </span>
                  </div>
                  {item.status && (
                    <span
                      style={{
                        fontSize: '0.65rem',
                        padding: '2px 7px',
                        borderRadius: '6px',
                        background: item.badgeColor ? `${item.badgeColor}22` : 'rgba(255, 46, 147, 0.15)',
                        color: item.badgeColor || 'var(--pink-secondary)',
                        fontWeight: '600',
                        whiteSpace: 'nowrap'
                      }}
                    >
                      {item.status}
                    </span>
                  )}
                </div>
              ))}
            </div>

            {/* Quick Action in Phone */}
            {activeScreen.mockContent.actionLabel && (
              <button
                onClick={() => soundEngine.playClick()}
                style={{
                  width: '100%',
                  marginTop: 'auto',
                  padding: '9px 12px',
                  borderRadius: '10px',
                  background: 'linear-gradient(135deg, var(--pink-primary), #d90466)',
                  color: '#ffffff',
                  fontSize: '0.75rem',
                  fontWeight: '600',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  boxShadow: '0 4px 14px rgba(255, 46, 147, 0.35)'
                }}
              >
                <Sparkles size={13} />
                <span>{activeScreen.mockContent.actionLabel}</span>
              </button>
            )}
          </div>

          {/* Interactive Bottom Tab Bar */}
          <div
            style={{
              height: '56px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(11, 11, 17, 0.95)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-around',
              padding: '0 8px',
              position: 'relative'
            }}
          >
            {currentProject.screens.map((screen, idx) => {
              const isActive = activeScreenIndex === idx;
              return (
                <button
                  key={screen.id}
                  onClick={() => handleScreenChange(idx)}
                  onMouseEnter={() => soundEngine.playHover()}
                  title={screen.name}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '4px 8px',
                    borderRadius: '8px',
                    background: isActive ? 'rgba(255, 46, 147, 0.12)' : 'transparent',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer'
                  }}
                >
                  {renderTabIcon(screen.icon, isActive)}
                  <span
                    style={{
                      fontSize: '0.62rem',
                      fontWeight: isActive ? '700' : '500',
                      color: isActive ? 'var(--pink-secondary)' : 'var(--text-muted)'
                    }}
                  >
                    {screen.name}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Home Indicator Bar */}
          <div
            style={{
              height: '14px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'rgba(11, 11, 17, 0.95)'
            }}
          >
            <div
              style={{
                width: '90px',
                height: '4px',
                background: 'rgba(255, 255, 255, 0.3)',
                borderRadius: '999px'
              }}
            />
          </div>
        </div>
      </div>

      {/* Simulator Control Footnote */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          color: 'var(--text-muted)',
          fontSize: '0.78rem'
        }}
      >
        <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--pink-primary)' }} />
        <span>Interactive Live Simulator: Klik tab bar bawah ponsel untuk berganti layar</span>
      </div>
    </div>
  );
};
