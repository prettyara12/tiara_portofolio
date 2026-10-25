import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Menu, Moon, Sun, X } from 'lucide-react';
import { profile } from '../data/profile';

export interface NavLink {
  id: string;
  label: string;
}

const useTheme = () => {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'));
  const toggle = () => {
    const next = !dark;
    document.documentElement.classList.toggle('dark', next);
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light');
    } catch {
      // storage blocked (private mode): theme still applies for this visit
    }
    setDark(next);
  };
  return { dark, toggle };
};

const useActiveSection = (ids: string[]) => {
  const [active, setActive] = useState('');
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [ids.join()]);
  return active;
};

export const Navbar: React.FC<{ links: NavLink[] }> = ({ links }) => {
  const { dark, toggle } = useTheme();
  const active = useActiveSection(links.map((l) => l.id));
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-[background-color,border-color] duration-300 ${
        scrolled || open ? 'border-b border-line bg-paper/80 backdrop-blur-md' : 'border-b border-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="font-serif text-2xl tracking-tight" onClick={() => setOpen(false)}>
          {profile.name}
          <span className="text-accent">.</span>
        </a>

        <ul className="hidden items-center gap-8 text-sm md:flex">
          {links.map((l) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`relative py-1 transition-colors hover:text-ink ${active === l.id ? 'text-ink' : 'text-muted'}`}
              >
                {l.label}
                {active === l.id && (
                  <motion.span layoutId="nav-dot" className="absolute -bottom-1 left-1/2 size-1 -translate-x-1/2 rounded-full bg-accent" />
                )}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-paper"
          >
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button
            onClick={() => setOpen((o) => !o)}
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            className="grid size-10 place-items-center rounded-full border border-line md:hidden"
          >
            {open ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.ul
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden px-5 md:hidden"
          >
            {links.map((l) => (
              <li key={l.id} className="border-t border-line">
                <a href={`#${l.id}`} onClick={() => setOpen(false)} className="block py-4 font-serif text-3xl">
                  {l.label}
                </a>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
};
