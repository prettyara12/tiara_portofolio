import React from 'react';
import { ArrowUpRight, Github, Instagram, Linkedin, MessageCircle } from 'lucide-react';
import { contact } from '../data/profile';
import { Reveal, Section } from './ui';

const links = [
  { label: 'WhatsApp', href: contact.whatsapp && `https://wa.me/${contact.whatsapp}`, Icon: MessageCircle },
  { label: 'LinkedIn', href: contact.linkedin, Icon: Linkedin },
  { label: 'GitHub', href: contact.github, Icon: Github },
  { label: 'Instagram', href: contact.instagram, Icon: Instagram }
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
      <a
        href={`mailto:${contact.email}`}
        className="group inline-flex items-center gap-3 break-all font-serif text-4xl transition-colors hover:text-accent sm:text-6xl md:text-7xl"
      >
        {contact.email}
        <ArrowUpRight className="size-10 shrink-0 transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 md:size-14" />
      </a>
    </Reveal>

    {links.length > 0 && (
      <Reveal delay={0.1} className="mt-12 flex flex-wrap gap-3">
        {links.map(({ label, href, Icon }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-line px-5 py-3 transition-colors hover:border-accent hover:bg-accent hover:text-accent-ink"
          >
            <Icon size={16} /> {label}
          </a>
        ))}
      </Reveal>
    )}
  </Section>
);
