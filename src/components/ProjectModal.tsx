import React from 'react';
import { ArrowUpRight, Github } from 'lucide-react';
import type { Project } from '../types/portfolio';
import { Modal } from './Modal';
import { Tag } from './ui';

export const ProjectModal: React.FC<{ project: Project | null; onClose: () => void }> = ({ project, onClose }) => (
  <Modal open={!!project} onClose={onClose} label={project?.title ?? 'Project'}>
    {project && (
      <article>
        {project.video ? (
          <div className="mb-8 mt-6 aspect-video w-full overflow-hidden rounded-2xl bg-black shadow-lg sm:mt-8">
            <video
              src={project.video}
              poster={project.image}
              controls
              playsInline
              preload="metadata"
              className="size-full object-contain"
            >
              Browser Anda tidak mendukung pemutar video HTML5.
            </video>
          </div>
        ) : (
          project.image && (
            <img
              src={project.image}
              alt={project.title}
              className="mb-8 mt-6 aspect-video w-full rounded-2xl object-cover sm:mt-8"
            />
          )
        )}

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

        {project.screenshots && project.screenshots.length > 0 && (
          <div className="mt-10 border-t border-line pt-8">
            <div className="flex items-center justify-between">
              <h4 className="text-xs uppercase tracking-[0.18em] text-muted">Tangkapan Layar Aplikasi</h4>
              <span className="text-xs text-muted">Geser untuk melihat ({project.screenshots.length} layar)</span>
            </div>
            <div className="mt-4 flex gap-4 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory">
              {project.screenshots.map((shot, idx) => (
                <div
                  key={shot}
                  className="relative shrink-0 snap-start overflow-hidden rounded-2xl border border-line bg-card shadow-sm transition-transform hover:scale-[1.02]"
                >
                  <img
                    src={shot}
                    alt={`${project.title} screenshot ${idx + 1}`}
                    loading="lazy"
                    className="h-72 w-auto object-contain sm:h-84"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

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
