import React from 'react';
import { experience } from '../data/experience';
import { Reveal, Section } from './ui';

export const Experience: React.FC<{ index: string }> = ({ index }) => (
  <Section
    id="experience"
    index={index}
    label="Experience"
    title={
      <>
        Where I’ve <em className="text-accent">grown</em>.
      </>
    }
  >
    <ol className="relative border-l border-line md:border-l-0">
      {experience.map((e, i) => (
        <li key={e.id} className="relative pb-14 pl-8 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-12 md:pl-0">
          <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent md:hidden" />
          <Reveal delay={i * 0.05}>
            <p className="font-serif text-2xl text-muted md:text-right">{e.period}</p>
          </Reveal>
          <Reveal delay={i * 0.05 + 0.1} className="md:border-l md:border-line md:pl-12">
            <div className="relative">
              <span className="absolute -left-[3.33rem] top-2 hidden size-2.5 rounded-full bg-accent md:block" />
              <h3 className="font-serif text-4xl leading-tight">{e.role}</h3>
              <p className="mt-1 text-muted">
                {e.organization}
                {e.location && ` · ${e.location}`}
              </p>
              <p className="mt-4 max-w-2xl leading-relaxed">{e.description}</p>
              {e.highlights.length > 0 && (
                <ul className="mt-4 space-y-2 text-muted">
                  {e.highlights.map((h) => (
                    <li key={h} className="flex gap-3">
                      <span className="text-accent">—</span>
                      {h}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        </li>
      ))}
    </ol>
  </Section>
);
