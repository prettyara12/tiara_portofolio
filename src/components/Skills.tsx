import React from 'react';
import { skills } from '../data/profile';
import { Reveal, Section } from './ui';

export const Skills: React.FC<{ index: string }> = ({ index }) => (
  <Section
    id="skills"
    index={index}
    label="Skills"
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
          <ul className="space-y-2">
            {group.items.map((item) => (
              <li
                key={item}
                className="font-serif text-3xl leading-tight transition-[color,translate] duration-300 hover:translate-x-2 hover:text-accent"
              >
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      ))}
    </div>
  </Section>
);
