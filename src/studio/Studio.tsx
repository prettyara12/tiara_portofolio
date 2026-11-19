import React, { useCallback, useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { useProgress } from '@react-three/drei';
import { ArrowLeft, Keyboard, Moon, Music2, Pause, Play, Sun, VolumeX, X } from 'lucide-react';
import type { Certificate, Project } from '../types/portfolio';
import { tabs, useStudio, type Spot } from './store';
import { Scene } from './Scene';
import { PanelContent } from './Panels';
import { LofiPlayer, blip } from './music';
import { ProjectModal } from '../components/ProjectModal';
import { CertificateLightbox } from '../components/CertificateLightbox';
import { profile } from '../data/profile';

const PANEL_W = 440;
const tourOrder: Spot[] = ['projects', 'skills', 'experience', 'awards', 'about', 'room'];

const useIsNarrow = () => {
  const [narrow, setNarrow] = useState(() => window.innerWidth < 768);
  useEffect(() => {
    const on = () => setNarrow(window.innerWidth < 768);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  return narrow;
};

/** Small label that follows the cursor and names whatever is under it. */
const CursorLabel: React.FC = () => {
  const hovered = useStudio((s) => s.hovered);
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: PointerEvent) => {
      if (ref.current)
        ref.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY + 18}px)`;
    };
    window.addEventListener('pointermove', move);
    return () => window.removeEventListener('pointermove', move);
  }, []);
  return (
    <div ref={ref} className="pointer-events-none fixed left-0 top-0 z-30 hidden md:block">
      <AnimatePresence>
        {hovered && (
          <motion.div
            key={hovered}
            initial={{ opacity: 0, scale: 0.9, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.15 }}
            className="studio-glass whitespace-nowrap rounded-full px-3 py-1.5 text-xs font-medium"
          >
            {hovered}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const Loader: React.FC<{ ready: boolean }> = ({ ready }) => {
  const { progress } = useProgress();
  return (
    <AnimatePresence>
      {!ready && (
        <motion.div
          className="studio-loader fixed inset-0 z-50 grid place-items-center"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <div className="text-center">
            <p className="font-serif text-5xl italic">{profile.firstName}'s studio</p>
            <div className="mx-auto mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/10">
              <motion.div
                className="h-full bg-[var(--studio-accent)]"
                animate={{ width: `${Math.max(8, progress)}%` }}
              />
            </div>
            <p className="studio-kicker mt-3 opacity-70">
              Setting up the room · {Math.round(progress)}%
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const IconButton: React.FC<{
  label: string;
  onClick: () => void;
  active?: boolean;
  children: React.ReactNode;
  kbd?: string;
}> = ({ label, onClick, active, children, kbd }) => (
  <button
    onClick={onClick}
    aria-label={label}
    title={kbd ? `${label} (${kbd})` : label}
    className={`studio-glass grid size-10 place-items-center rounded-full transition-colors ${active ? 'is-on' : ''}`}
  >
    {children}
  </button>
);

export const Studio: React.FC<{ onExit: () => void }> = ({ onExit }) => {
  const { spot, setSpot, night, toggleNight, music, toggleMusic, setModalOpen, hd } = useStudio();
  const narrow = useIsNarrow();
  const [ready, setReady] = useState(false);
  const [project, setProject] = useState<Project | null>(null);
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [touring, setTouring] = useState(false);
  const [help, setHelp] = useState(false);
  const player = useRef<LofiPlayer | null>(null);
  const onReady = useCallback(() => setReady(true), []);

  const panelOpen = spot !== 'room' && spot !== 'music';
  const panelOffset = !panelOpen
    ? { x: 0, y: 0 }
    : narrow
      ? { x: 0, y: window.innerHeight * 0.17 }
      : { x: PANEL_W / 2, y: 0 };

  // music engine follows the store
  useEffect(() => {
    if (music) (player.current ??= new LofiPlayer()).start();
    else player.current?.stop();
  }, [music]);
  useEffect(() => () => player.current?.dispose(), []);

  useEffect(() => setModalOpen(!!project || !!certificate), [project, certificate, setModalOpen]);

  // page chrome while the studio is open
  useEffect(() => {
    const prev = document.title;
    document.title = `3D Studio — ${profile.name}`;
    document.documentElement.style.overflow = 'hidden';
    return () => {
      document.title = prev;
      document.documentElement.style.overflow = '';
      document.body.style.cursor = '';
    };
  }, []);

  // guided tour
  useEffect(() => {
    if (!touring) return;
    let i = 0;
    setSpot(tourOrder[0]);
    const id = window.setInterval(() => {
      i++;
      if (i >= tourOrder.length) {
        setTouring(false);
        return;
      }
      setSpot(tourOrder[i]);
    }, 5200);
    return () => window.clearInterval(id);
  }, [touring, setSpot]);

  const go = useCallback(
    (s: Spot) => {
      setTouring(false);
      blip(520, 0.06);
      setSpot(s);
    },
    [setSpot]
  );

  // keyboard shortcuts
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (useStudio.getState().modalOpen) return;
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      const k = e.key.toLowerCase();
      if (k === 'escape') {
        if (help) setHelp(false);
        else if (useStudio.getState().spot !== 'room') go('room');
        else onExit();
      } else if (/^[1-6]$/.test(k)) go(tabs[Number(k) - 1].id);
      else if (k === 'n') toggleNight();
      else if (k === 'm') toggleMusic();
      else if (k === 't') setTouring((t) => !t);
      else if (k === '?' || k === 'h') setHelp((h) => !h);
      else if (k === 'arrowright' || k === 'arrowleft') {
        const i = tabs.findIndex((t) => t.id === useStudio.getState().spot);
        const n = (Math.max(0, i) + (k === 'arrowright' ? 1 : tabs.length - 1)) % tabs.length;
        go(tabs[n].id);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onExit, toggleNight, toggleMusic, help]);

  return (
    <div className={`studio-root fixed inset-0 overflow-hidden ${night ? 'is-night' : 'is-day'}`}>
      <div className="absolute inset-0" style={{ touchAction: 'none' }}>
        <Scene panelOffset={panelOffset} onReady={onReady} ready={ready} />
      </div>

      {/* top bar */}
      <header className="pointer-events-none absolute inset-x-0 top-0 z-20 flex items-start justify-between gap-3 p-3 sm:p-5">
        <div className="pointer-events-auto flex items-center gap-3">
          <button
            onClick={onExit}
            className="studio-glass inline-flex h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-[0.14em]"
          >
            <ArrowLeft size={15} /> SITE
          </button>
          <p className="studio-kicker hidden 2xl:block">{profile.firstName}'s 3D studio</p>
        </div>

        <nav
          aria-label="Studio sections"
          className="studio-glass pointer-events-auto absolute left-1/2 top-[64px] flex max-w-[calc(100vw-24px)] -translate-x-1/2 gap-1 overflow-x-auto rounded-full p-1 no-scrollbar lg:top-5"
        >
          {tabs.map((t, i) => (
            <button
              key={t.id}
              onClick={() => go(t.id)}
              title={`${t.label} (${i + 1})`}
              className={`relative shrink-0 rounded-full px-3.5 py-2 text-[11px] font-semibold tracking-[0.14em] transition-colors sm:px-4 ${
                spot === t.id ? 'text-[var(--studio-on-accent)]' : 'opacity-75 hover:opacity-100'
              }`}
            >
              {spot === t.id && (
                <motion.span
                  layoutId="studio-tab"
                  className="absolute inset-0 rounded-full bg-[var(--studio-accent)]"
                  transition={{ type: 'spring', damping: 30, stiffness: 400 }}
                />
              )}
              <span className="relative">{t.label.toUpperCase()}</span>
            </button>
          ))}
        </nav>

        <div className="pointer-events-auto flex items-center gap-2">
          <IconButton
            label={touring ? 'Stop tour' : 'Guided tour'}
            onClick={() => setTouring((t) => !t)}
            active={touring}
            kbd="T"
          >
            {touring ? <Pause size={16} /> : <Play size={16} />}
          </IconButton>
          <button
            onClick={() => {
              const st = useStudio.getState();
              st.setHd(!hd);
              if (!hd) st.setAo(true);
            }}
            title={
              hd ? 'HD graphics on — click for faster mode' : 'Faster mode — click for HD graphics'
            }
            className={`studio-glass hidden h-10 items-center rounded-full px-3 text-[11px] font-bold tracking-[0.12em] sm:inline-flex ${hd ? 'is-on' : ''}`}
          >
            HD
          </button>
          <IconButton
            label={night ? 'Switch to day' : 'Switch to night'}
            onClick={toggleNight}
            kbd="N"
          >
            {night ? <Sun size={16} /> : <Moon size={16} />}
          </IconButton>
          <IconButton
            label={music ? 'Mute music' : 'Play lo-fi music'}
            onClick={toggleMusic}
            active={music}
            kbd="M"
          >
            {music ? <Music2 size={16} /> : <VolumeX size={16} />}
          </IconButton>
          <button
            onClick={onExit}
            className="studio-glass hidden h-10 items-center gap-2 rounded-full px-4 text-xs font-semibold tracking-[0.14em] xl:inline-flex"
          >
            EXIT{' '}
            <kbd className="rounded border border-current/30 px-1.5 py-0.5 text-[10px] opacity-70">
              ESC
            </kbd>
          </button>
        </div>
      </header>

      {/* info panel */}
      <AnimatePresence mode="wait">
        {panelOpen && (
          <motion.aside
            key={spot}
            data-lenis-prevent
            className="studio-panel absolute z-20 overflow-y-auto no-scrollbar inset-x-2 bottom-2 max-h-[52svh] rounded-3xl p-5 md:inset-x-auto md:bottom-5 md:right-5 md:top-28 lg:top-24 md:max-h-none md:p-7"
            style={narrow ? undefined : { width: PANEL_W }}
            initial={narrow ? { y: 40, opacity: 0 } : { x: 40, opacity: 0 }}
            animate={{ x: 0, y: 0, opacity: 1 }}
            exit={narrow ? { y: 40, opacity: 0 } : { x: 40, opacity: 0 }}
            transition={{ type: 'spring', damping: 30, stiffness: 260 }}
          >
            <button
              onClick={() => go('room')}
              aria-label="Back to room"
              className="studio-glass sticky top-0 float-right -mr-1 -mt-1 grid size-9 place-items-center rounded-full"
            >
              <X size={15} />
            </button>
            <PanelContent
              spot={spot}
              onOpenProject={setProject}
              onOpenCertificate={setCertificate}
            />
          </motion.aside>
        )}
      </AnimatePresence>

      {/* hint */}
      <AnimatePresence>
        {ready && !panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="pointer-events-none absolute bottom-3 left-3 right-3 z-10 flex items-end justify-between gap-3 sm:bottom-5 sm:left-5 sm:right-5"
          >
            <p className="studio-glass rounded-full px-4 py-2 font-mono text-[11px] sm:text-xs">
              {narrow
                ? 'Drag to look · Pinch to zoom · Tap anything'
                : 'Drag to look around · Scroll to zoom · Click anything in the room'}
            </p>
            <button
              onClick={() => setHelp(true)}
              className="studio-glass pointer-events-auto hidden size-10 place-items-center rounded-full md:grid"
              aria-label="Keyboard shortcuts"
              title="Keyboard shortcuts (?)"
            >
              <Keyboard size={16} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* keyboard help */}
      <AnimatePresence>
        {help && (
          <motion.div
            className="absolute inset-0 z-40 grid place-items-center bg-black/30 p-4 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setHelp(false)}
          >
            <motion.div
              className="studio-panel w-full max-w-sm rounded-3xl p-6"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              onClick={(e) => e.stopPropagation()}
            >
              <p className="studio-kicker">Shortcuts</p>
              <h2 className="mb-4 font-serif text-3xl">Move like a pro</h2>
              <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-2 text-sm">
                {[
                  ['1 – 6', 'Jump to a section'],
                  ['← →', 'Previous / next section'],
                  ['T', 'Guided tour'],
                  ['N', 'Day / night'],
                  ['M', 'Music on / off'],
                  ['Esc', 'Back to room · exit'],
                  ['?', 'This help']
                ].map(([k, v]) => (
                  <React.Fragment key={k}>
                    <dt>
                      <kbd className="studio-chip font-mono">{k}</kbd>
                    </dt>
                    <dd className="opacity-80">{v}</dd>
                  </React.Fragment>
                ))}
              </dl>
              <p className="mt-4 text-xs opacity-60">
                Tip: click the window, the neon sign, the cat and the record player too.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <CursorLabel />
      <Loader ready={ready} />

      <ProjectModal project={project} onClose={() => setProject(null)} />
      <CertificateLightbox certificate={certificate} onClose={() => setCertificate(null)} />
    </div>
  );
};

export default Studio;
