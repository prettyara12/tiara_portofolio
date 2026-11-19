import React, { useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useLenis } from 'lenis/react';
import { X } from 'lucide-react';

export const Modal: React.FC<{ open: boolean; onClose: () => void; label: string; children: React.ReactNode }> = ({
  open,
  onClose,
  label,
  children
}) => {
  const lenis = useLenis();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    lenis?.stop();
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      lenis?.start();
      previous?.focus();
    };
  }, [open, onClose, lenis]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={label}
            data-lenis-prevent
            className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto no-scrollbar rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-10 [--paper:#f6f2ec] [--ink:#1c1917] [--muted:#6b635c] [--line:rgb(28_25_23/0.12)] [--card:#eee7de] [--accent:#b4235a] [--accent-ink:#f6f2ec] text-ink"
            initial={{ y: 40, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 28, stiffness: 300 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Close"
              className="absolute right-4 top-4 z-20 grid size-10 place-items-center rounded-full border border-line bg-paper/90 backdrop-blur-sm shadow-sm transition-colors hover:bg-ink hover:text-paper sm:right-6 sm:top-6"
            >
              <X size={18} />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
