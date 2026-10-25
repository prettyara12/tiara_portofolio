import React from 'react';
import { motion } from 'motion/react';
import { ArrowDownRight, MapPin } from 'lucide-react';
import { profile } from '../data/profile';
import { Portrait } from './Portrait';

const ease = [0.22, 1, 0.36, 1] as const;

export const Hero: React.FC = () => (
  <section
    id="home"
    className="relative flex min-h-[100svh] flex-col overflow-hidden pt-20 [--pw:min(70svh,44vw)] md:block md:pt-0"
  >
    {/* Giant name, sits behind the portrait on desktop */}
    <h1
      aria-label={profile.name}
      className="pointer-events-none z-0 flex justify-center font-serif leading-[0.8] tracking-[-0.04em] text-[34vw] md:absolute md:inset-x-0 md:top-[9svh] md:text-[min(30vw,46svh)]"
    >
      {profile.firstName.split('').map((ch, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.06em]">
          <motion.span
            className="inline-block"
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1, ease, delay: 0.1 + i * 0.06 }}
          >
            {ch}
          </motion.span>
        </span>
      ))}
    </h1>

    <motion.div
      className="relative z-10 mx-auto -mt-[14vw] w-full max-w-md md:absolute md:bottom-0 md:left-1/2 md:mt-0 md:w-(--pw) md:max-w-none md:-translate-x-1/2"
      initial={{ opacity: 0, y: 60 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1.2, ease, delay: 0.35 }}
    >
      <Portrait />
    </motion.div>

    <motion.div
      className="relative z-20 grid w-full gap-8 px-5 pb-10 pt-8 sm:px-8 md:absolute md:inset-x-0 md:bottom-0 md:grid-cols-[1fr_auto_1fr] md:pb-12 md:pt-0"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.9 }}
    >
      <div className="max-w-xs self-end">
        <p className="mb-3 inline-flex items-center gap-2 rounded-full border border-line bg-paper/70 px-3 py-1 text-xs backdrop-blur">
          <span className="size-1.5 animate-pulse rounded-full bg-accent" />
          {profile.availability}
        </p>
        <p className="font-serif text-3xl leading-tight">
          {profile.role.split(' ').slice(0, -1).join(' ')} <em className="text-accent">{profile.role.split(' ').slice(-1)}</em>
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-sm text-muted">
          <MapPin size={14} /> {profile.location}
        </p>
      </div>

      {/* Spacer for the portrait column on desktop */}
      <div className="hidden w-(--pw) md:block" />

      <div className="max-w-xs self-end md:justify-self-end">
        <p className="text-sm leading-relaxed text-muted">
          {profile.department}, {profile.institution}. {profile.headline}
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <a
            href="#projects"
            className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-accent"
          >
            See my work
            <ArrowDownRight size={16} className="transition-transform group-hover:rotate-[-45deg]" />
          </a>
          <a
            href="#contact"
            data-smile
            className="inline-flex items-center rounded-full border border-ink/30 px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
          >
            Say hello
          </a>
        </div>
      </div>
    </motion.div>
  </section>
);
