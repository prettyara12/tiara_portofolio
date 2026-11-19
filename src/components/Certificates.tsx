import React, { useState } from 'react';
import { Award, ChevronDown } from 'lucide-react';
import { certificates } from '../data/certificates';
import type { Certificate } from '../types/portfolio';
import { Reveal, Section } from './ui';
import { CertificateLightbox } from './CertificateLightbox';

type CategoryFilter = 'all' | 'certifications' | 'competition' | 'organizational' | 'other';

const categories: { key: CategoryFilter; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'certifications', label: 'Certifications' },
  { key: 'competition', label: 'Competition' },
  { key: 'organizational', label: 'Organizational' },
  { key: 'other', label: 'Other' }
];

export const Certificates: React.FC<{ index: string }> = ({ index }) => {
  const [selected, setSelected] = useState<Certificate | null>(null);
  const [activeTab, setActiveTab] = useState<CategoryFilter>('all');
  const [expanded, setExpanded] = useState(false);

  const filtered =
    activeTab === 'all'
      ? certificates
      : certificates.filter((c) => c.category === activeTab);

  const shouldShowSeeMore = filtered.length > 6;
  const visibleCertificates = shouldShowSeeMore && !expanded ? filtered.slice(0, 6) : filtered;

  const handleTabChange = (key: CategoryFilter) => {
    setActiveTab(key);
    setExpanded(false);
  };

  return (
    <Section
      id="certificates"
      index={index}
      label="Certificates"
      variant="pink"
      title={
        <>
          Always <em className="text-accent">learning</em>.
        </>
      }
    >
      {/* Category Tabs */}
      <Reveal delay={0.05} className="mb-10 flex flex-wrap items-center gap-2.5 sm:gap-3">
        {categories.map(({ key, label }) => {
          const count =
            key === 'all'
              ? certificates.length
              : certificates.filter((c) => c.category === key).length;
          const isActive = activeTab === key;

          return (
            <button
              key={key}
              type="button"
              onClick={() => handleTabChange(key)}
              className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 text-xs font-medium uppercase tracking-[0.16em] transition-all duration-300 ${
                isActive
                  ? 'border-white bg-white text-[#b4235a] shadow-xs'
                  : 'border-white/20 bg-white/10 text-white/85 hover:border-white/40 hover:bg-white/20 hover:text-white'
              }`}
            >
              <span>{label}</span>
              <span
                className={`rounded-full px-1.5 py-0.5 text-[10px] leading-none ${
                  isActive ? 'bg-[#b4235a]/15 text-[#b4235a]' : 'bg-white/15 text-white/90'
                }`}
              >
                {count}
              </span>
            </button>
          );
        })}
      </Reveal>

      {/* Grid of Certificates */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {visibleCertificates.map((c, i) => (
          <Reveal key={c.id} delay={(i % 3) * 0.08}>
            <button
              onClick={() => setSelected(c)}
              className="group block w-full text-left"
              aria-label={`View ${c.title}`}
            >
              <div className="mb-4 aspect-[4/3] overflow-hidden rounded-2xl border border-line bg-card shadow-xs">
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
              <h3 className="font-serif text-2xl leading-tight transition-colors group-hover:text-accent">
                {c.title}
              </h3>
              <p className="mt-1 text-sm text-muted">
                {c.issuer} · {c.date}
              </p>
            </button>
          </Reveal>
        ))}
      </div>

      {/* See More Button */}
      {shouldShowSeeMore && (
        <div className="mt-12 flex justify-center">
          <button
            type="button"
            onClick={() => setExpanded((prev) => !prev)}
            className="group inline-flex items-center gap-2.5 rounded-full border border-line bg-white/10 px-6 py-3 text-xs uppercase tracking-[0.2em] text-white transition-all duration-300 hover:border-white hover:bg-white hover:text-accent-ink"
            aria-expanded={expanded}
          >
            <span>{expanded ? 'See Less' : 'See More'}</span>
            <ChevronDown
              className={`size-4 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`}
            />
          </button>
        </div>
      )}

      <CertificateLightbox certificate={selected} onClose={() => setSelected(null)} />
    </Section>
  );
};
