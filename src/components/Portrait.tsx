import React, { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'motion/react';

const POSES = [
  'depan', 'kiri', 'kanan', 'atas', 'bawah',
  'kiri-atas', 'kanan-atas', 'kiri-bawah', 'kanan-bawah',
  'sedikit-kiri', 'sedikit-kanan', 'sedikit-atas', 'sedikit-bawah',
  'senyum', 'kedip'
] as const;
type Pose = (typeof POSES)[number];

// The "sedikit-kiri/kanan" photos face the opposite side to "kiri/kanan", so they are swapped here.
const SLIGHT_LEFT: Pose = 'sedikit-kanan';
const SLIGHT_RIGHT: Pose = 'sedikit-kiri';

// -2..2: centre, a little off, far off. Negative = left/up from the viewer's side.
const zone = (v: number) => (Math.abs(v) < 0.12 ? 0 : Math.abs(v) < 0.45 ? Math.sign(v) : 2 * Math.sign(v));

/** Maps a cursor offset from the face (each axis normalised to -1..1) to the photo that looks at it. */
export const poseFor = (nx: number, ny: number): Pose => {
  const c = zone(nx);
  const r = zone(ny);
  if (c === 0 && r === 0) return 'depan';
  if (r === 0 && Math.abs(c) === 1) return c < 0 ? SLIGHT_LEFT : SLIGHT_RIGHT;
  if (c === 0 && Math.abs(r) === 1) return r < 0 ? 'sedikit-atas' : 'sedikit-bawah';
  const h = c < 0 ? 'kiri' : c > 0 ? 'kanan' : '';
  const v = r < 0 ? 'atas' : r > 0 ? 'bawah' : '';
  return [h, v].filter(Boolean).join('-') as Pose;
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));
const GLANCES: Pose[] = ['depan', 'depan', SLIGHT_LEFT, SLIGHT_RIGHT, 'sedikit-atas', 'kiri', 'kanan', 'senyum'];

/**
 * Photo of Tiara that turns her head toward the cursor (or the last tap on touch screens),
 * smiles over [data-smile] elements, and blinks now and then.
 */
export const Portrait: React.FC<{ className?: string }> = ({ className = '' }) => {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const [look, setLook] = useState<Pose>('depan');
  const [smile, setSmile] = useState(false);
  const [blink, setBlink] = useState(false);

  useEffect(() => {
    if (reduced) return;
    let lastTouch = 0;
    let smileTimer = 0;
    let blinkTimer = 0;

    const lookAt = (x: number, y: number) => {
      const r = ref.current?.getBoundingClientRect();
      if (!r) return;
      // Eyes sit roughly 38% down the photo.
      const nx = (x - (r.left + r.width / 2)) / (window.innerWidth / 2);
      const ny = (y - (r.top + r.height * 0.38)) / (window.innerHeight / 2);
      setLook(poseFor(clamp(nx), clamp(ny)));
    };
    const overSmile = (t: EventTarget | null) => !!(t instanceof Element && t.closest('[data-smile]'));

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      lookAt(e.clientX, e.clientY);
      setSmile(overSmile(e.target));
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType === 'mouse') return;
      lastTouch = Date.now();
      lookAt(e.clientX, e.clientY);
      if (overSmile(e.target)) {
        setSmile(true);
        clearTimeout(smileTimer);
        smileTimer = window.setTimeout(() => setSmile(false), 1500);
      }
    };
    const onLeave = () => {
      setLook('depan');
      setSmile(false);
    };

    // Touch screens have no cursor: glance around on her own while idle.
    const glance = window.setInterval(() => {
      if (!matchMedia('(hover: none)').matches || Date.now() - lastTouch < 3000) return;
      const next = GLANCES[Math.floor(Math.random() * GLANCES.length)];
      setSmile(next === 'senyum');
      if (next !== 'senyum') setLook(next);
    }, 2600);

    const scheduleBlink = () => {
      blinkTimer = window.setTimeout(() => {
        setBlink(true);
        window.setTimeout(() => setBlink(false), 140);
        scheduleBlink();
      }, 2500 + Math.random() * 3500);
    };
    scheduleBlink();

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    document.documentElement.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onDown);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      clearInterval(glance);
      clearTimeout(smileTimer);
      clearTimeout(blinkTimer);
    };
  }, [reduced]);

  const shown: Pose = smile ? 'senyum' : blink && look === 'depan' ? 'kedip' : look;

  // Keep the previous photo fully opaque underneath while the new one fades in,
  // otherwise two half-transparent cutouts let the page show through mid-fade.
  const [prev, setPrev] = useState<Pose | null>(null);
  const last = useRef<Pose>(shown);
  useEffect(() => {
    if (last.current === shown) return;
    setPrev(last.current);
    last.current = shown;
    const t = window.setTimeout(() => setPrev(null), 200);
    return () => clearTimeout(t);
  }, [shown]);

  return (
    <div ref={ref} data-smile className={`relative aspect-square select-none ${className}`}>
      {POSES.map((p) => (
        <img
          key={p}
          src={`/poses/${p}.webp`}
          alt={p === 'depan' ? 'Portrait of Tiara Mamuaya' : ''}
          aria-hidden={p !== 'depan'}
          draggable={false}
          decoding="async"
          className={`absolute inset-0 size-full object-contain object-bottom ${
            p === shown ? 'z-20 opacity-100 transition-opacity duration-150' : p === prev ? 'z-10 opacity-100' : 'opacity-0'
          }`}
        />
      ))}
    </div>
  );
};
