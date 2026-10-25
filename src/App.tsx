import React from 'react';
import { useReducedMotion } from 'motion/react';
import { ReactLenis } from 'lenis/react';
import { Navbar, NavLink } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Skills } from './components/Skills';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Certificates } from './components/Certificates';
import { Contact } from './components/Contact';
import { Footer } from './components/Footer';
import { skills } from './data/profile';
import { projects } from './data/projects';
import { experience } from './data/experience';
import { certificates } from './data/certificates';

// Sections with no data are hidden along with their nav link.
const sections = [
  { id: 'about', label: 'About', show: true, Component: About },
  { id: 'skills', label: 'Skills', show: skills.length > 0, Component: Skills },
  { id: 'projects', label: 'Projects', show: projects.length > 0, Component: Projects },
  { id: 'experience', label: 'Experience', show: experience.length > 0, Component: Experience },
  { id: 'certificates', label: 'Certificates', show: certificates.length > 0, Component: Certificates },
  { id: 'contact', label: 'Contact', show: true, Component: Contact }
].filter((s) => s.show);

const links: NavLink[] = sections.map(({ id, label }) => ({ id, label }));
const pad = (n: number) => String(n).padStart(2, '0');

export const App: React.FC = () => {
  const reduced = useReducedMotion();

  return (
    <ReactLenis root options={{ anchors: { offset: -64, immediate: !!reduced }, smoothWheel: !reduced }}>
      <Navbar links={links} />
      <main>
        <Hero />
        {sections.map(({ id, Component }, i) => (
          <Component key={id} index={pad(i + 1)} />
        ))}
      </main>
      <Footer />
    </ReactLenis>
  );
};

export default App;
