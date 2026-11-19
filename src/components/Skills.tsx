import React from 'react';
import { skills } from '../data/profile';
import { Reveal, Section } from './ui';
import { TechIcon } from './TechIcon';

export const Skills: React.FC<{ index: string }> = ({ index }) => (
  <Section
    id="skills"
    index={index}
    label="Skills"
    variant="pink"
    title={
      <>
        The tools I <em className="text-accent">build</em> with.
      </>
    }
  >
    <div className="grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-4">
      {skills.map((group, i) => (
        <Reveal key={group.label} delay={i * 0.08}>
          <h3 className="mb-5 border-b border-line pb-3 text-xs uppercase tracking-[0.18em] text-muted">{group.label}</h3>
          <ul className="space-y-3.5">
            {group.items.map((item) => (
              <li
                key={item}
                className="group flex items-center gap-3.5 transition-[translate] duration-300 hover:translate-x-1.5"
              >
                <span className="grid size-9 shrink-0 place-items-center rounded-xl bg-white/10 ring-1 ring-white/20 p-2 text-white shadow-xs transition-transform duration-300 group-hover:scale-110 group-hover:bg-white/20">
                  <TechIcon name={item} className="size-5" />
                </span>
                <span className="font-serif text-2xl sm:text-3xl leading-tight transition-colors group-hover:text-white">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  </Section>
);
