import React from 'react';
import { profile } from '../data/profile';
import { Reveal, Section } from './ui';

const facts = [
  { label: 'Studying', value: `Informatics, ${profile.institution}` },
  { label: 'Focus', value: 'Cross-platform mobile apps (Android & iOS)' },
  { label: 'Based in', value: profile.location },
  { label: 'Loves', value: profile.loves.join(' · ') }
];

export const About: React.FC<{ index: string }> = ({ index }) => (
  <Section
    id="about"
    index={index}
    label="About"
    title={
      <>
        Building <em className="text-accent">smooth</em>, modern & engaging mobile experiences.
      </>
    }
  >
    <div className="grid gap-14 md:grid-cols-[1.2fr_1fr] md:gap-20">
      <Reveal className="space-y-5 text-lg leading-relaxed md:text-xl">
        {profile.bio.map((p) => (
          <p key={p}>{p}</p>
        ))}
        <blockquote className="border-l-2 border-accent pl-5 font-serif text-2xl italic text-muted md:text-3xl">
          “{profile.motto}”
        </blockquote>
      </Reveal>

      <Reveal delay={0.15}>
        <dl>
          {facts.map((f) => (
            <div key={f.label} className="grid grid-cols-[7rem_1fr] gap-4 border-t border-line py-5 last:border-b">
              <dt className="text-xs uppercase tracking-[0.18em] text-muted">{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>
    </div>
  </Section>
);
