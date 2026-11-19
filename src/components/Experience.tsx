import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { experience } from '../data/experience';
import { Reveal, Section } from './ui';

export const Experience: React.FC<{ index: string }> = ({ index }) => {
  const [expanded, setExpanded] = useState(false);
  const visibleExperience = expanded ? experience : experience.slice(0, 3);

  return (
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
        {visibleExperience.map((e, i) => (
          <li key={e.id} className="relative pb-14 pl-8 last:pb-0 md:grid md:grid-cols-[12rem_1fr] md:gap-12 md:pl-0">
            <span className="absolute -left-[5px] top-2 size-2.5 rounded-full bg-accent md:hidden" />
            <Reveal delay={Math.min(i, 3) * 0.05}>
              <p className="font-serif text-2xl text-muted md:text-right">{e.period}</p>
            </Reveal>
            <Reveal delay={Math.min(i, 3) * 0.05 + 0.1} className="md:border-l md:border-line md:pl-12">
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
                      <li key={h} className="flex items-start gap-3">
                        <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent" />
                        <span>{h}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Reveal>
          </li>
        ))}
      </ol>

      {experience.length > 3 && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-card/50 px-6 py-3 text-xs uppercase tracking-[0.2em] text-muted transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'See Less' : 'See More'}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}
    </Section>
  );
};
