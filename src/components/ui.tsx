import React from 'react';
import { motion } from 'motion/react';

const ease = [0.22, 1, 0.36, 1] as const;

/** Fades + lifts children in once they scroll into view. */
export const Reveal: React.FC<{ children: React.ReactNode; delay?: number; className?: string }> = ({
  children,
  delay = 0,
  className
}) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 28 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: '-10% 0px' }}
    transition={{ duration: 0.8, ease, delay }}
  >
    {children}
  </motion.div>
);

export const Section: React.FC<{
  id: string;
  index: string;
  label: string;
  title: React.ReactNode;
  children: React.ReactNode;
}> = ({ id, index, label, title, children }) => (
  <section id={id} className="mx-auto max-w-6xl px-5 py-24 sm:px-8 md:py-36">
    <Reveal>
      <p className="mb-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-muted">
        <span className="text-accent">{index}</span>
        <span className="h-px w-10 bg-line" />
        {label}
      </p>
      <h2 className="mb-14 max-w-3xl font-serif text-5xl leading-[0.95] tracking-tight md:mb-20 md:text-7xl">{title}</h2>
    </Reveal>
    {children}
  </section>
);

export const Tag: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <span className="rounded-full border border-line px-3 py-1 text-xs text-muted">{children}</span>
);
