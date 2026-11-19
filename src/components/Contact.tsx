import React from 'react';
import { ArrowUpRight, Mail } from 'lucide-react';
import { contact } from '../data/profile';
import { Reveal, Section } from './ui';

const LinkedInIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="#0A66C2" className={className} aria-hidden="true">
    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.65 1.65 0 1 0 0-3.3 1.65 1.65 0 0 0 0 3.3m1.4 9.74v-8.37H5.06v8.37h2.8z" />
  </svg>
);

const GitHubIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
    />
  </svg>
);

const InstagramIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
    <defs>
      <linearGradient id="igGradient" x1="0%" y1="100%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#fdf497" />
        <stop offset="5%" stopColor="#fdf497" />
        <stop offset="45%" stopColor="#fd5949" />
        <stop offset="60%" stopColor="#d6249f" />
        <stop offset="90%" stopColor="#285AEB" />
      </linearGradient>
    </defs>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" fill="none" stroke="url(#igGradient)" strokeWidth="2.2" />
    <circle cx="12" cy="12" r="4.2" fill="none" stroke="url(#igGradient)" strokeWidth="2.2" />
    <circle cx="17.5" cy="6.5" r="1.2" fill="#d6249f" />
  </svg>
);

const YouTubeIcon: React.FC<{ className?: string }> = ({ className = 'size-4' }) => (
  <svg viewBox="0 0 24 24" fill="#FF0000" className={className} aria-hidden="true">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

const links = [
  { label: 'LinkedIn', href: contact.linkedin, Icon: LinkedInIcon },
  { label: 'GitHub', href: contact.github, Icon: GitHubIcon },
  { label: 'Instagram', href: contact.instagram, Icon: InstagramIcon },
  { label: 'YouTube', href: contact.youtube, Icon: YouTubeIcon }
].filter((l) => l.href);

export const Contact: React.FC<{ index: string }> = ({ index }) => (
  <Section
    id="contact"
    index={index}
    label="Contact"
    title={
      <>
        Let’s build something <em className="text-accent">lovely</em> together.
      </>
    }
  >
    <Reveal>
      <div className="inline-block">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">Direct Email</p>
        <a
          href={`mailto:${contact.email}`}
          className="group inline-flex items-center gap-3 font-serif text-2xl transition-colors hover:text-accent sm:text-3xl md:text-4xl"
          aria-label={`Send email to ${contact.email}`}
        >
          <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-line bg-card/60 transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink sm:size-12">
            <Mail className="size-5 sm:size-6" />
          </span>
          <span className="break-all">{contact.email}</span>
          <ArrowUpRight className="size-6 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
        </a>
      </div>
    </Reveal>

    {links.length > 0 && (
      <Reveal delay={0.1} className="mt-12 flex flex-wrap items-center gap-3.5">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="group inline-flex items-center gap-3 rounded-full border border-line bg-card/40 px-5 py-2.5 text-sm font-medium transition-all duration-300 hover:border-accent hover:bg-accent hover:text-accent-ink hover:shadow-sm"
          >
            <span className="grid size-7 shrink-0 place-items-center rounded-full bg-paper p-1 text-ink shadow-2xs transition-colors group-hover:bg-white group-hover:text-accent">
              <Icon className="size-4" />
            </span>
            <span>{label}</span>
            <ArrowUpRight className="size-3.5 text-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent-ink" />
          </a>
        ))}
      </Reveal>
    )}
  </Section>
);
