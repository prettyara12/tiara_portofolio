import React, { useRef, useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../types/portfolio';
import { Reveal, Section, Tag } from './ui';
import { ProjectModal } from './ProjectModal';

const ProjectCard: React.FC<{ project: Project; onSelect: () => void }> = ({ project, onSelect }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  const handleMouseEnter = () => {
    if (project.video && videoRef.current) {
      videoRef.current.muted = false;
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Fallback jika browser membatasi audio autoplay sebelum interaksi klik pertama
          if (videoRef.current) {
            videoRef.current.muted = true;
            videoRef.current.play().catch(() => {});
          }
        });
      }
    }
  };

  const handleMouseLeave = () => {
    if (project.video && videoRef.current) {
      videoRef.current.pause();
    }
  };

  const handleClick = () => {
    if (project.video && videoRef.current) {
      videoRef.current.pause();
    }
    onSelect();
  };

  return (
    <button
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className="group block w-full text-left"
      aria-label={`Open ${project.title}`}
    >
      <motion.div className="relative mb-5 aspect-video overflow-hidden rounded-3xl bg-card" whileHover={{ y: -6 }}>
        {project.video ? (
          <video
            ref={videoRef}
            src={project.video}
            poster={project.image}
            loop
            playsInline
            preload="metadata"
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : project.image ? (
          <img
            src={project.image}
            alt={project.title}
            className="size-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--accent),transparent_60%)] opacity-90">
            <span className="font-serif text-7xl italic text-paper/90 transition-transform duration-700 group-hover:scale-110">
              {project.title}
            </span>
          </div>
        )}
      </motion.div>
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="font-serif text-4xl leading-none">{project.title}</h3>
          <p className="mt-2 text-muted">{project.summary}</p>
        </div>
        <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
          <ArrowUpRight size={18} />
        </span>
      </div>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.year && <Tag>{project.year}</Tag>}
        {project.video && <Tag>Video Promo</Tag>}
        {project.stack.map((s) => (
          <Tag key={s}>{s}</Tag>
        ))}
      </div>
    </button>
  );
};

export const Projects: React.FC<{ index: string }> = ({ index }) => {
  const [selected, setSelected] = useState<Project | null>(null);

  return (
    <Section
      id="projects"
      index={index}
      label="Projects"
      title={
        <>
          Selected <em className="text-accent">work</em>.
        </>
      }
    >
      <div className={projects.length === 1 ? 'max-w-2xl' : 'grid gap-x-8 gap-y-16 md:grid-cols-2'}>
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.12} className={projects.length > 1 && i % 2 ? 'md:mt-24' : ''}>
            <ProjectCard project={p} onSelect={() => setSelected(p)} />
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
};
