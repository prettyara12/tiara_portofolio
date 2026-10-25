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
            className="relative max-h-[90svh] w-full max-w-3xl overflow-y-auto rounded-t-3xl bg-paper p-6 shadow-2xl sm:rounded-3xl sm:p-10"
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
              className="absolute right-4 top-4 grid size-10 place-items-center rounded-full border border-line transition-colors hover:bg-ink hover:text-paper"
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
