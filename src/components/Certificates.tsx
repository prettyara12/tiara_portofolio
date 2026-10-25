import React, { useState } from 'react';
import { Award } from 'lucide-react';
import { certificates } from '../data/certificates';
import type { Certificate } from '../types/portfolio';
import { Reveal, Section } from './ui';
import { CertificateLightbox } from './CertificateLightbox';

export const Certificates: React.FC<{ index: string }> = ({ index }) => {
  const [selected, setSelected] = useState<Certificate | null>(null);

  return (
    <Section
      id="certificates"
      index={index}
      label="Certificates"
      title={
        <>
          Always <em className="text-accent">learning</em>.
        </>
      }
    >
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {certificates.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08}>
            <button onClick={() => setSelected(c)} className="group block w-full text-left" aria-label={`View ${c.title}`}>
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card">
                {c.image ? (
                  <img
                    src={c.image}
                    alt=""
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="grid size-full place-items-center text-muted transition-colors group-hover:text-accent">
                    <Award size={48} strokeWidth={1} />
                  </div>
                )}
              </div>
              <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-accent">{c.title}</h3>
              <p className="mt-1 text-sm text-muted">
                {c.issuer} · {c.date}
              </p>
            </button>
          </Reveal>
        ))}
      </div>

      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </Section>
  );
};
