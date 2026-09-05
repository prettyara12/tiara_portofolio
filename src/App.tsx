import React, { useState, useEffect } from 'react';
import { CyberBackground } from './components/CyberBackground';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { ProjectModal } from './components/ProjectModal';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { CertificateLightbox } from './components/CertificateLightbox';
import { Contact } from './components/Contact';
import { QuickDock } from './components/QuickDock';
import { Footer } from './components/Footer';
import { Project, Certificate } from './types/portfolio';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedCertificate, setSelectedCertificate] = useState<Certificate | null>(null);

  // Scroll spy observer to highlight active section in Navbar
  useEffect(() => {
    const sections = ['home', 'about', 'skills', 'projects', 'experience', 'certificates', 'contact'];

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i]);
        if (el) {
          const top = el.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sections[i]);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="app-layout" style={{ position: 'relative', minHeight: '100vh' }}>
      {/* 1. Interactive HTML5 Canvas Background */}
      <CyberBackground />

      {/* 2. Floating Cyber Navbar with Scroll-Spy & Audio Toggle */}
      <Navbar activeSection={activeSection} />

      {/* 3. Main Content Sections */}
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />
        <Certificates onSelectCertificate={(cert) => setSelectedCertificate(cert)} />
        <Contact />
      </main>

      {/* 4. Quick Dock & Footer */}
      <QuickDock />
      <Footer />

      {/* 5. Modals & Lightbox Overlays */}
      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />

      <CertificateLightbox
        certificate={selectedCertificate}
        onClose={() => setSelectedCertificate(null)}
      />
    </div>
  );
};

export default App;
