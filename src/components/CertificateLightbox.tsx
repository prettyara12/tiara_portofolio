import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Certificate } from '../types/portfolio';
import { Modal } from './Modal';

export const CertificateLightbox: React.FC<{ certificate: Certificate | null; onClose: () => void }> = ({
  certificate,
  onClose
}) => (
  <Modal open={!!certificate} onClose={onClose} label={certificate?.title ?? 'Certificate'}>
    {certificate && (
      <figure>
        {certificate.image && (
          <img src={certificate.image} alt={certificate.title} className="mb-6 w-full rounded-xl border border-line" />
        )}
        <figcaption>
          <h3 className="pr-12 font-serif text-4xl leading-tight">{certificate.title}</h3>
          <p className="mt-2 text-muted">
            {certificate.issuer} · {certificate.date}
          </p>
          {certificate.credentialUrl && (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm text-paper transition-colors hover:bg-accent"
            >
              Verify credential <ArrowUpRight size={16} />
            </a>
          )}
        </figcaption>
      </figure>
    )}
  </Modal>
);
