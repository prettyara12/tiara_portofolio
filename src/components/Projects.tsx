import React, { useState } from 'react';
import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import { projects } from '../data/projects';
import type { Project } from '../types/portfolio';
import { Reveal, Section, Tag } from './ui';
import { ProjectModal } from './ProjectModal';

const Cover: React.FC<{ project: Project }> = ({ project }) =>
  project.image ? (
    <img src={project.image} alt="" className="size-full object-cover transition-transform duration-700 group-hover:scale-105" />
  ) : (
    <div className="grid size-full place-items-center bg-[radial-gradient(circle_at_30%_20%,var(--accent),transparent_60%)] opacity-90">
      <span className="font-serif text-7xl italic text-paper/90 transition-transform duration-700 group-hover:scale-110">
        {project.title}
      </span>
    </div>
  );

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
      <div className="grid gap-x-8 gap-y-16 md:grid-cols-2">
        {projects.map((p, i) => (
          <Reveal key={p.id} delay={(i % 2) * 0.12} className={i % 2 ? 'md:mt-24' : ''}>
            <button onClick={() => setSelected(p)} className="group block w-full text-left" aria-label={`Open ${p.title}`}>
              <motion.div className="mb-5 aspect-[4/3] overflow-hidden rounded-3xl bg-card" whileHover={{ y: -6 }}>
                <Cover project={p} />
              </motion.div>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <h3 className="font-serif text-4xl leading-none">{p.title}</h3>
                  <p className="mt-2 text-muted">{p.summary}</p>
                </div>
                <span className="grid size-11 shrink-0 place-items-center rounded-full border border-line transition-colors group-hover:border-accent group-hover:bg-accent group-hover:text-accent-ink">
                  <ArrowUpRight size={18} />
                </span>
              </div>
              <div className="mt-4 flex flex-wrap gap-2">
                {p.year && <Tag>{p.year}</Tag>}
                {p.stack.map((s) => (
                  <Tag key={s}>{s}</Tag>
                ))}
              </div>
            </button>
          </Reveal>
        ))}
      </div>

      <ProjectModal project={selected} onClose={() => setSelected(null)} />
    </Section>
  );
};
