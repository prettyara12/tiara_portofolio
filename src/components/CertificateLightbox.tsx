import React, { useEffect } from 'react';
import { X, Award, ExternalLink, Calendar, CheckCircle2, ShieldCheck, Hash } from 'lucide-react';
import { Certificate } from '../types/portfolio';
import { soundEngine } from '../utils/audio';

interface CertificateLightboxProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export const CertificateLightbox: React.FC<CertificateLightboxProps> = ({ certificate, onClose }) => {
  useEffect(() => {
    if (!certificate) return;
    soundEngine.playChime();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        soundEngine.playClick();
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [certificate, onClose]);

  if (!certificate) return null;

  return (
    <div
      className="modal-backdrop"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          soundEngine.playClick();
          onClose();
        }
      }}
    >
      <div
        className="modal-content-box cyber-card"
        style={{
          width: '100%',
          maxWidth: '700px',
          background: 'rgba(12, 13, 20, 0.97)',
          border: '1px solid rgba(255, 46, 147, 0.45)',
          boxShadow: '0 25px 60px rgba(0, 0, 0, 0.9), 0 0 35px rgba(255, 46, 147, 0.3)',
          borderRadius: '24px',
          padding: '32px',
          position: 'relative'
        }}
      >
        {/* Close Button */}
        <button
          onClick={() => {
            soundEngine.playClick();
            onClose();
          }}
          onMouseEnter={() => soundEngine.playHover()}
          title="Tutup (Esc)"
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            width: '38px',
            height: '38px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid var(--border-glass)',
            color: 'var(--text-medium)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <X size={20} />
        </button>

        {/* Certificate Decorative Header */}
        <div
          style={{
            background: 'linear-gradient(135deg, rgba(255, 46, 147, 0.15), rgba(157, 78, 221, 0.12))',
            border: '1px solid rgba(255, 46, 147, 0.25)',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '18px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              width: '60px',
              height: '60px',
              borderRadius: '16px',
              background: 'rgba(255, 46, 147, 0.2)',
              border: '2px solid var(--pink-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 0 20px rgba(255, 46, 147, 0.4)',
              flexShrink: 0
            }}
          >
            <Award size={32} color="var(--pink-secondary)" />
          </div>

          <div>
            <span
              style={{
                fontSize: '0.75rem',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'var(--pink-secondary)',
                fontWeight: '700'
              }}
            >
              Verified Certification • {certificate.category}
            </span>
            <h3 style={{ fontSize: '1.25rem', fontWeight: '800', color: '#ffffff', marginTop: '2px' }}>
              {certificate.title}
            </h3>
            <div style={{ fontSize: '0.9rem', color: 'var(--text-medium)', marginTop: '2px' }}>
              Penerbit: <strong style={{ color: '#ffffff' }}>{certificate.issuer}</strong>
            </div>
          </div>
        </div>

        {/* Credential Details Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px',
            marginBottom: '24px'
          }}
        >
          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Calendar size={18} color="var(--pink-primary)" />
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Tanggal Penerbitan</div>
              <div style={{ fontSize: '0.88rem', fontWeight: '600', color: '#ffffff' }}>
                {certificate.issuedDate}
              </div>
            </div>
          </div>

          <div
            style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-glass)',
              borderRadius: '12px',
              padding: '12px',
              display: 'flex',
              alignItems: 'center',
              gap: '10px'
            }}
          >
            <Hash size={18} color="var(--pink-primary)" />
            <div>
              <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>Credential ID</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', fontWeight: '600', color: 'var(--pink-secondary)' }}>
                {certificate.credentialId}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: '24px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginBottom: '8px' }}>
            Deskripsi & Kompetensi Diuji:
          </h4>
          <p style={{ fontSize: '0.92rem', color: 'var(--text-medium)', lineHeight: 1.6 }}>
            {certificate.description}
          </p>
        </div>

        {/* Skills Covered */}
        <div style={{ marginBottom: '28px' }}>
          <h4 style={{ fontSize: '0.95rem', fontWeight: '700', color: '#ffffff', marginBottom: '10px' }}>
            Keahlian Terverifikasi:
          </h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {certificate.skillsCovered.map((skill, idx) => (
              <span
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '5px',
                  fontSize: '0.8rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: 'rgba(255, 46, 147, 0.1)',
                  border: '1px solid rgba(255, 46, 147, 0.25)',
                  color: 'var(--pink-secondary)'
                }}
              >
                <CheckCircle2 size={13} />
                <span>{skill}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '12px',
            paddingTop: '20px',
            borderTop: '1px solid var(--border-glass)'
          }}
        >
          {certificate.credentialUrl ? (
            <a
              href={certificate.credentialUrl}
              target="_blank"
              rel="noreferrer"
              onClick={() => soundEngine.playClick()}
              onMouseEnter={() => soundEngine.playHover()}
              className="btn-primary"
              style={{ fontSize: '0.88rem', padding: '10px 20px' }}
            >
              <ExternalLink size={15} />
              <span>Verifikasi Online di Situs Penerbit</span>
            </a>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--status-active)', fontSize: '0.85rem' }}>
              <ShieldCheck size={16} />
              <span>Sertifikat Terverifikasi Fakultas</span>
            </div>
          )}

          <button
            onClick={() => {
              soundEngine.playClick();
              onClose();
            }}
            className="btn-secondary"
            style={{ fontSize: '0.85rem', padding: '9px 16px' }}
          >
            Tutup
          </button>
        </div>
      </div>
    </div>
  );
};
