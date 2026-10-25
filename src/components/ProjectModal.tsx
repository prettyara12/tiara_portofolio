import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { Modal } from './Modal';
import { Tag } from './ui';

export const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => (
  <Modal open={!!project} onClose={onClose} label={project?.title ?? 'Project'}>
    {project && (
      <article>
        {project.image && <img src={project.image} alt="" className="mb-8 aspect-video w-full rounded-2xl object-cover" />}
        <p className="text-xs uppercase tracking-[0.18em] text-muted">
          {[project.year, project.role].filter(Boolean).join(' · ')}
        </p>
        <h3 className="mt-2 pr-12 font-serif text-5xl leading-none md:text-6xl">{project.title}</h3>
        <p className="mt-6 whitespace-pre-line text-lg leading-relaxed">{project.description}</p>

        {project.highlights.length > 0 && (
          <ul className="mt-8 border-t border-line">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-3 border-b border-line py-3">
                <span className="text-accent">✦</span>
                {h}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-8 flex flex-wrap gap-2">
          {project.stack.map((s) => (
            <Tag key={s}>{s}</Tag>
          ))}
        </div>

        {(project.liveUrl || project.repoUrl) && (
          <div className="mt-8 flex flex-wrap gap-3">
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-accent"
              >
                Live demo <ArrowUpRight size={16} />
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 text-sm transition-colors hover:border-accent hover:text-accent"
              >
                <Github size={16} /> Source code
              </a>
            )}
          </div>
        )}
      </article>
    )}
  </Modal>
);
