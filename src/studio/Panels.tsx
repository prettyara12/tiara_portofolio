import React, { useEffect, useState } from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin, Mail, MapPin, Youtube } from 'lucide-react';
import type { Certificate, Project } from '../types/portfolio';
import { useStudio, type Spot } from './store';
import { projects } from '../data/projects';
import { skills, profile, contact } from '../data/profile';
import { experience } from '../data/experience';
import { certificates } from '../data/certificates';
import { TechIcon } from '../components/TechIcon';

const Heading: React.FC<{ kicker: string; title: string; children?: React.ReactNode }> = ({
  kicker,
  title,
  children
}) => (
  <header className="mb-6">
    <p className="studio-kicker">{kicker}</p>
    <h2 className="mt-1 font-serif text-4xl leading-none">{title}</h2>
    {children && <p className="mt-3 text-sm opacity-75">{children}</p>}
  </header>
);

const ProjectsPanel: React.FC<{ onOpen: (p: Project) => void }> = ({ onOpen }) => {
  const index = useStudio((s) => s.projectIndex);
  const setIndex = useStudio((s) => s.setProjectIndex);
  return (
    <>
      <Heading kicker="On the monitor" title="Projects">
        Hover a project to put it on the desk monitor. Click to open the full case study.
      </Heading>
      <ul className="grid gap-3">
        {projects.map((p, i) => (
          <li key={p.id}>
            <button
              onMouseEnter={() => setIndex(i)}
              onFocus={() => setIndex(i)}
              onClick={() => onOpen(p)}
              className={`studio-card group w-full text-left ${index === i ? 'is-active' : ''}`}
            >
              {p.image && (
                <img
                  src={p.image}
                  alt=""
                  loading="lazy"
                  className="aspect-video w-full rounded-lg object-cover"
                />
              )}
              <div className="mt-3 flex items-baseline justify-between gap-3">
                <h3 className="font-serif text-2xl leading-tight">{p.title}</h3>
                <span className="text-xs opacity-60">{p.year}</span>
              </div>
              <p className="mt-1 line-clamp-2 text-sm opacity-75">{p.summary}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {p.stack.slice(0, 4).map((s) => (
                  <span key={s} className="studio-chip">
                    {s}
                  </span>
                ))}
              </div>
              <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-[var(--studio-accent)]">
                Open case study{' '}
                <ArrowUpRight
                  size={13}
                  className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                />
              </span>
            </button>
          </li>
        ))}
      </ul>
    </>
  );
};

const SkillsPanel: React.FC = () => (
  <>
    <Heading kicker="From the bookshelf" title="Skills">
      Every shelf holds one part of my toolbox.
    </Heading>
    <div className="grid gap-5">
      {skills.map((g, gi) => (
        <section key={g.label}>
          <h3 className="studio-kicker mb-2">
            Shelf {gi + 1} · {g.label}
          </h3>
          <ul className="grid grid-cols-2 gap-2">
            {g.items.map((item) => (
              <li key={item} className="studio-card flex items-center gap-2 !p-3 text-sm">
                <TechIcon name={item} className="size-5 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  </>
);

const ExperiencePanel: React.FC = () => (
  <>
    <Heading kicker="Pinned to the corkboard" title="Experience" />
    <ol className="relative grid gap-4 border-l border-[var(--studio-line)] pl-5">
      {experience.map((e) => (
        <li key={e.id} className="relative">
          <span className="absolute -left-[25px] top-2 size-2.5 rounded-full bg-[var(--studio-accent)] ring-4 ring-[var(--studio-bg-soft)]" />
          <p className="studio-kicker">{e.period}</p>
          <h3 className="mt-1 font-serif text-2xl leading-tight">{e.role}</h3>
          <p className="text-sm opacity-70">
            {e.organization}
            {e.location ? ` · ${e.location}` : ''}
          </p>
          <p className="mt-2 text-sm opacity-85">{e.description}</p>
        </li>
      ))}
    </ol>
  </>
);

const categoryLabel: Record<string, string> = {
  certifications: 'Certifications',
  competition: 'Competitions',
  organizational: 'Organizational',
  other: 'Other'
};

const AwardsPanel: React.FC<{ onOpen: (c: Certificate) => void }> = ({ onOpen }) => {
  const groups = Object.entries(
    certificates.reduce<Record<string, Certificate[]>>((acc, c) => {
      (acc[c.category ?? 'other'] ??= []).push(c);
      return acc;
    }, {})
  );
  return (
    <>
      <Heading kicker="Framed on the wall" title="Awards">
        {certificates.length} certificates & recognitions. Click one to view it full size.
      </Heading>
      {groups.map(([cat, list]) => (
        <section key={cat} className="mb-6">
          <h3 className="studio-kicker mb-2">{categoryLabel[cat] ?? cat}</h3>
          <ul className="grid grid-cols-2 gap-2">
            {list.map((c) => (
              <li key={c.id}>
                <button onClick={() => onOpen(c)} className="studio-card w-full !p-2 text-left">
                  {c.image && (
                    <img
                      src={c.image}
                      alt=""
                      loading="lazy"
                      className="aspect-[4/3] w-full rounded-md object-cover"
                    />
                  )}
                  <p className="mt-2 line-clamp-2 text-xs font-medium leading-snug">{c.title}</p>
                  <p className="mt-0.5 text-[11px] opacity-60">{c.date}</p>
                </button>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </>
  );
};

const socials = [
  { href: contact.github, label: 'GitHub', Icon: Github },
  { href: contact.linkedin, label: 'LinkedIn', Icon: Linkedin },
  { href: contact.instagram, label: 'Instagram', Icon: Instagram },
  { href: contact.youtube, label: 'YouTube', Icon: Youtube }
].filter((s) => s.href);

const AboutPanel: React.FC = () => (
  <>
    <div className="mb-5 flex items-center gap-4">
      <img
        src="/head/10_4.webp"
        alt=""
        className="size-20 rounded-2xl bg-[var(--studio-accent-soft)] object-cover"
      />
      <div>
        <p className="studio-kicker">Hello, I'm</p>
        <h2 className="font-serif text-4xl leading-none">{profile.name}</h2>
        <p className="mt-1 text-sm opacity-75">{profile.role}</p>
      </div>
    </div>
    <p className="mb-2 inline-flex items-center gap-1.5 text-xs opacity-70">
      <MapPin size={13} /> {profile.location}
    </p>
    {profile.bio.map((b) => (
      <p key={b} className="mt-3 text-sm leading-relaxed opacity-90">
        {b}
      </p>
    ))}
    <blockquote className="mt-5 border-l-2 border-[var(--studio-accent)] pl-4 font-serif text-xl italic">
      “{profile.motto}”
    </blockquote>
    <h3 className="studio-kicker mb-2 mt-6">Things I love</h3>
    <div className="flex flex-wrap gap-1.5">
      {profile.loves.map((l) => (
        <span key={l} className="studio-chip">
          {l}
        </span>
      ))}
    </div>
    <p className="mt-6 rounded-xl bg-[var(--studio-accent-soft)] p-3 text-sm">
      <span className="mr-2 inline-block size-2 animate-pulse rounded-full bg-[var(--studio-accent)]" />
      {profile.availability}
    </p>
    <div className="mt-5 flex flex-wrap gap-2">
      {contact.email && (
        <a href={`mailto:${contact.email}`} className="studio-btn studio-btn-primary">
          <Mail size={15} /> Email me
        </a>
      )}
      {socials.map(({ href, label, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          className="studio-btn"
          aria-label={label}
        >
          <Icon size={15} /> {label}
        </a>
      ))}
    </div>
  </>
);

/** Ticks once per second, right on the second boundary, so it lines up with the 3D second hand. */
const useNow = () => {
  const [now, setNow] = useState(() => new Date());
  useEffect(() => {
    let id = 0;
    const tick = () => {
      setNow(new Date());
      id = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
    };
    id = window.setTimeout(tick, 1000 - (Date.now() % 1000) + 8);
    return () => window.clearTimeout(id);
  }, []);
  return now;
};

// North Sulawesi is on WITA (UTC+8) all year round
const HOME_ZONE = 'Asia/Makassar';
const HOME_OFFSET_MIN = 8 * 60;

const greetingFor = (hour: number) =>
  hour < 5
    ? 'Late night'
    : hour < 11
      ? 'Good morning'
      : hour < 15
        ? 'Good afternoon'
        : hour < 19
          ? 'Good evening'
          : 'Good night';

const ClockPanel: React.FC = () => {
  const now = useNow();
  const zone = Intl.DateTimeFormat().resolvedOptions().timeZone;
  const time = (d: Date, timeZone?: string) =>
    d.toLocaleTimeString('en-GB', { hour12: false, timeZone });
  const [hh, mm, ss] = time(now).split(':');
  const homeHour = Number(
    now.toLocaleTimeString('en-GB', { hour12: false, hour: '2-digit', timeZone: HOME_ZONE })
  );
  const diffH = (HOME_OFFSET_MIN + now.getTimezoneOffset()) / 60;
  const diffText =
    diffH === 0
      ? 'Same time zone as you'
      : `${Math.abs(diffH)}h ${diffH > 0 ? 'ahead of' : 'behind'} you`;

  return (
    <>
      <Heading kicker="Hanging on the wall" title="Clock">
        The hands on my wall clock follow your device's time, second by second.
      </Heading>
      <div className="studio-card text-center">
        <p className="studio-kicker">Your time · {zone.replace('_', ' ')}</p>
        <p
          className="mt-2 font-serif text-6xl leading-none tabular-nums sm:text-7xl"
          aria-label={time(now)}
        >
          {hh}
          <span className="mx-0.5 inline-block animate-pulse text-[var(--studio-accent)]">:</span>
          {mm}
          <span className="ml-2 align-top text-3xl opacity-60">{ss}</span>
        </p>
        <p className="mt-3 text-sm opacity-80">
          {now.toLocaleDateString('en-GB', {
            weekday: 'long',
            day: 'numeric',
            month: 'long',
            year: 'numeric'
          })}
        </p>
      </div>
      <div className="studio-card mt-3">
        <div className="flex items-center justify-between gap-4">
          <div>
            <p className="studio-kicker">My time · {profile.location.split(',')[0]} (WITA)</p>
            <p className="mt-1 text-sm opacity-75">
              {greetingFor(homeHour)} from here · {diffText}
            </p>
          </div>
          <p className="font-serif text-3xl tabular-nums">{time(now, HOME_ZONE).slice(0, 5)}</p>
        </div>
      </div>
    </>
  );
};

export const PanelContent: React.FC<{
  spot: Spot;
  onOpenProject: (p: Project) => void;
  onOpenCertificate: (c: Certificate) => void;
}> = ({ spot, onOpenProject, onOpenCertificate }) => {
  switch (spot) {
    case 'projects':
      return <ProjectsPanel onOpen={onOpenProject} />;
    case 'skills':
      return <SkillsPanel />;
    case 'experience':
      return <ExperiencePanel />;
    case 'awards':
      return <AwardsPanel onOpen={onOpenCertificate} />;
    case 'about':
      return <AboutPanel />;
    case 'clock':
      return <ClockPanel />;
    default:
      return null;
  }
};
