import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame, useLoader } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import { useStudio } from './store';
import { Hotspot, avatarState, damp, env } from './Hotspot';
import { Box, NightLight, palette } from './Room';
import {
  clockFaceTexture,
  corkboardTexture,
  glyphTexture,
  labelTexture,
  neonTexture,
  phoneTexture
} from './textures';
import { projects } from '../data/projects';
import { skills, profile } from '../data/profile';
import { experience } from '../data/experience';
import { certificates } from '../data/certificates';

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

/** Loads an image and downsizes it on a canvas so huge photos don't eat GPU memory. */
const useFittedTextures = (urls: string[], max = 1024) => {
  const images = useLoader(THREE.ImageLoader, urls) as HTMLImageElement[];
  return useMemo(
    () =>
      images.map((img) => {
        const s = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement('canvas');
        canvas.width = Math.round(img.width * s);
        canvas.height = Math.round(img.height * s);
        canvas.getContext('2d')!.drawImage(img, 0, 0, canvas.width, canvas.height);
        const tex = new THREE.CanvasTexture(canvas);
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.anisotropy = 8;
        return { tex, aspect: img.width / img.height };
      }),
    [images, max]
  );
};

export const Plant: React.FC<{
  position: [number, number, number];
  scale?: number;
  pot?: string;
  leaves?: number;
}> = ({ position, scale = 1, pot = palette.cream, leaves = 9 }) => {
  const ref = useRef<THREE.Group>(null);
  const seed = position[0] * 3 + position[2];
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.z = Math.sin(clock.elapsedTime * 0.9 + seed) * 0.025;
  });
  return (
    <group position={position} scale={scale}>
      <mesh castShadow receiveShadow position-y={0.3}>
        <cylinderGeometry args={[0.32, 0.24, 0.6, 24]} />
        <meshStandardMaterial color={pot} roughness={0.6} />
      </mesh>
      <mesh position-y={0.59}>
        <cylinderGeometry args={[0.3, 0.3, 0.02, 24]} />
        <meshStandardMaterial color="#4a3020" />
      </mesh>
      <group ref={ref} position-y={0.6}>
        {Array.from({ length: leaves }, (_, i) => {
          const a = (i / leaves) * Math.PI * 2 + seed;
          const tilt = 0.5 + (i % 3) * 0.22;
          const len = 0.55 + (i % 4) * 0.12;
          return (
            <group key={i} rotation={[0, a, 0]}>
              <group rotation={[tilt, 0, 0]}>
                <mesh castShadow position={[0, len * 0.9, 0]} scale={[0.22, len, 0.04]}>
                  <sphereGeometry args={[1, 12, 8]} />
                  <meshStandardMaterial color={i % 2 ? palette.sage : '#5f9a76'} roughness={0.7} />
                </mesh>
              </group>
            </group>
          );
        })}
      </group>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Desk — Projects                                                     */
/* ------------------------------------------------------------------ */

const Monitor: React.FC = () => {
  const covers = useFittedTextures(
    projects.map((p) => p.image ?? '/favicon.svg'),
    1280
  );
  const index = useStudio((s) => s.projectIndex);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  const flash = useRef(0);
  const shown = useRef(-1);

  useFrame((_, dt) => {
    const m = mat.current;
    if (!m) return;
    if (shown.current !== index) {
      shown.current = index;
      m.map = covers[index]?.tex ?? null;
      m.needsUpdate = true;
      flash.current = 1;
    }
    flash.current = damp(flash.current, 0, 6, dt);
    const v = 1.35 + flash.current * 0.6;
    m.color.setRGB(v, v, v);
  });

  return (
    <group position={[-0.25, 1.5, -0.25]}>
      <mesh castShadow position={[0, 0.02, 0]}>
        <boxGeometry args={[0.5, 0.04, 0.3]} />
        <meshStandardMaterial color={palette.ink} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.35, -0.05]}>
        <boxGeometry args={[0.08, 0.66, 0.05]} />
        <meshStandardMaterial color={palette.ink} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.95, 0]}>
        <boxGeometry args={[2.0, 1.18, 0.07]} />
        <meshStandardMaterial color="#1d1a24" roughness={0.35} metalness={0.2} />
      </mesh>
      <mesh position={[0, 0.97, 0.037]}>
        <planeGeometry args={[1.9, 1.07]} />
        <meshBasicMaterial ref={mat} toneMapped={false} />
      </mesh>
      {/* screen glow at night */}
    </group>
  );
};

const Mug: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const steam = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    steam.current?.children.forEach((c, i) => {
      const p = (t * 0.35 + i / 3) % 1;
      c.position.y = 0.2 + p * 0.45;
      c.position.x = Math.sin(t * 2 + i * 2) * 0.03;
      c.scale.setScalar(0.04 + p * 0.06);
      ((c as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
        Math.sin(p * Math.PI) * 0.45;
    });
  });
  return (
    <group position={position}>
      <mesh castShadow position-y={0.1}>
        <cylinderGeometry args={[0.09, 0.08, 0.2, 20]} />
        <meshStandardMaterial color={palette.pink} roughness={0.4} />
      </mesh>
      <mesh position={[0.1, 0.1, 0]} rotation-z={Math.PI / 2}>
        <torusGeometry args={[0.05, 0.015, 8, 16]} />
        <meshStandardMaterial color={palette.pink} roughness={0.4} />
      </mesh>
      <mesh position-y={0.19}>
        <cylinderGeometry args={[0.08, 0.08, 0.01, 20]} />
        <meshStandardMaterial color="#5b3420" roughness={0.2} />
      </mesh>
      <group ref={steam}>
        {[0, 1, 2].map((i) => (
          <mesh key={i}>
            <sphereGeometry args={[1, 10, 8]} />
            <meshBasicMaterial color="#ffffff" transparent depthWrite={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

const DeskLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const bulb = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => bulb.current?.color.setScalar(0.6 + env.night * 2.2));
  return (
    <group position={position} rotation-y={0.5}>
      <mesh castShadow position-y={0.03}>
        <cylinderGeometry args={[0.16, 0.18, 0.06, 20]} />
        <meshStandardMaterial color={palette.rose} roughness={0.4} />
      </mesh>
      <mesh castShadow position={[0, 0.4, -0.08]} rotation-x={-0.25}>
        <cylinderGeometry args={[0.02, 0.02, 0.8, 8]} />
        <meshStandardMaterial color={palette.rose} />
      </mesh>
      <group position={[0, 0.78, 0.05]} rotation-x={0.9}>
        <mesh castShadow>
          <coneGeometry args={[0.2, 0.26, 20, 1, true]} />
          <meshStandardMaterial color={palette.rose} side={THREE.DoubleSide} />
        </mesh>
        <mesh position-y={-0.08}>
          <sphereGeometry args={[0.07, 12, 10]} />
          <meshBasicMaterial ref={bulb} color="#ffe2a8" toneMapped={false} />
        </mesh>
      </group>
      <NightLight position={[0, 0.55, 0.35]} intensity={5} distance={4} />
    </group>
  );
};

const Chair: React.FC<{ position: [number, number, number]; rotation?: number }> = ({
  position,
  rotation = 0
}) => {
  const ref = useRef<THREE.Group>(null);
  useFrame(({ clock }, dt) => {
    if (!ref.current) return;
    const seated = avatarState.at === 'desk';
    const target = seated ? rotation : rotation + Math.sin(clock.elapsedTime * 0.4) * 0.12;
    ref.current.rotation.y = damp(ref.current.rotation.y, target, 4, dt);
  });
  return (
    <group position={position}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} castShadow rotation-y={(i / 5) * Math.PI * 2} position-y={0.08}>
          <boxGeometry args={[0.06, 0.05, 0.9]} />
          <meshStandardMaterial color={palette.ink} />
        </mesh>
      ))}
      <mesh castShadow position-y={0.5}>
        <cylinderGeometry args={[0.04, 0.04, 0.8, 10]} />
        <meshStandardMaterial color="#888" metalness={0.8} roughness={0.3} />
      </mesh>
      <group ref={ref} position-y={0.95}>
        <mesh castShadow receiveShadow>
          <boxGeometry args={[0.95, 0.14, 0.9]} />
          <meshStandardMaterial color={palette.cream} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 0.65, 0.42]} rotation-x={-0.08}>
          <boxGeometry args={[0.9, 1.1, 0.12]} />
          <meshStandardMaterial color={palette.cream} roughness={0.9} />
        </mesh>
        <mesh castShadow position={[0, 0.9, 0.36]} rotation-x={-0.08}>
          <boxGeometry args={[0.6, 0.3, 0.06]} />
          <meshStandardMaterial color={palette.pink} roughness={0.9} />
        </mesh>
      </group>
    </group>
  );
};

export const Desk: React.FC = () => {
  const setSpot = useStudio((s) => s.setSpot);
  const phone = useMemo(phoneTexture, []);
  return (
    <group position={[3.6, 0, -4.7]}>
      <Hotspot id="desk" label="Projects" onSelect={() => setSpot('projects')} lift={0.02}>
        <Box size={[3.3, 0.1, 1.3]} position={[0, 1.45, 0]} color={palette.wood} />
        {[-1.55, 1.55].map((x) => (
          <Box key={x} size={[0.1, 1.4, 1.2]} position={[x, 0.7, 0]} color={palette.woodDark} />
        ))}
        <Box size={[0.9, 0.9, 1.15]} position={[1.0, 0.95, 0]} color={palette.cream} />
        {[0.75, 1.15].map((y) => (
          <Box key={y} size={[0.25, 0.04, 0.02]} position={[1.0, y, 0.58]} color={palette.rose} />
        ))}
        <Monitor />
        {/* keyboard + mouse */}
        <Box size={[1.0, 0.04, 0.32]} position={[-0.25, 1.52, 0.3]} color="#f7f1ea" />
        <Box size={[0.12, 0.04, 0.18]} position={[0.5, 1.52, 0.3]} color="#f7f1ea" />
        {/* phone on a stand — mobile dev! */}
        <group position={[0.95, 1.5, 0.15]} rotation={[-0.3, -0.4, 0]}>
          <Box size={[0.28, 0.52, 0.03]} position={[0, 0.28, 0]} color="#222" />
          <mesh position={[0, 0.28, 0.017]}>
            <planeGeometry args={[0.25, 0.49]} />
            <meshBasicMaterial map={phone} toneMapped={false} />
          </mesh>
        </group>
        <Mug position={[-1.35, 1.5, 0.3]} />
        <DeskLamp position={[-1.3, 1.5, -0.3]} />
        {/* stack of notebooks */}
        {[0, 1, 2].map((i) => (
          <Box
            key={i}
            size={[0.5, 0.06, 0.36]}
            position={[0.95, 1.53 + i * 0.065, -0.35]}
            rotation-y={i * 0.15}
            color={['#f6c1cf', palette.sage, '#fff1a8'][i]}
          />
        ))}
      </Hotspot>
      <Chair position={[-0.25, 0, 1.15]} rotation={0} />
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Bookshelf — Skills                                                  */
/* ------------------------------------------------------------------ */

const bookColors = [
  '#e7799a',
  '#b4235a',
  '#7fae8f',
  '#f2c14e',
  '#6c8ecf',
  '#f3a3b8',
  '#9b7fd1',
  '#f08a5d',
  '#fff1d6'
];

export const Bookshelf: React.FC = () => {
  const setSpot = useStudio((s) => s.setSpot);
  const labels = useMemo(() => skills.slice(0, 4).map((g) => labelTexture(g.label)), []);
  const books = useMemo(() => {
    const out: { x: number; y: number; w: number; h: number; c: string; tilt: number }[] = [];
    let seed = 3;
    const r = () => ((seed = (seed * 9301 + 49297) % 233280), seed / 233280);
    [0.15, 1.0, 1.85, 2.7].forEach((y, shelf) => {
      const count = Math.max(6, (skills[3 - shelf]?.items.length ?? 4) * 2 + 2);
      let x = -0.95;
      for (let i = 0; i < count && x < 0.85; i++) {
        const w = 0.09 + r() * 0.07;
        const h = 0.5 + r() * 0.22;
        const tilt = i === count - 1 ? 0.25 : 0;
        out.push({
          x: x + w / 2,
          y,
          w,
          h,
          c: bookColors[Math.floor(r() * bookColors.length)],
          tilt
        });
        x += w + 0.01;
      }
    });
    return out;
  }, []);

  return (
    <group position={[-5.2, 0, -5.1]}>
      <Hotspot id="shelf" label="Skills" onSelect={() => setSpot('skills')} lift={0.02}>
        <Box size={[2.3, 0.1, 0.7]} position={[0, 3.6, 0]} color={palette.woodDark} />
        {[-1.1, 1.1].map((x) => (
          <Box key={x} size={[0.1, 3.6, 0.7]} position={[x, 1.8, 0]} color={palette.woodDark} />
        ))}
        <Box size={[2.2, 3.6, 0.05]} position={[0, 1.8, -0.33]} color="#f6d3da" cast={false} />
        {[0.1, 0.95, 1.8, 2.65].map((y, i) => (
          <group key={y}>
            <Box size={[2.2, 0.08, 0.68]} position={[0, y, 0]} color={palette.wood} />
            <mesh position={[0, y + 0.0, 0.345]}>
              <planeGeometry args={[0.9, 0.12]} />
              <meshStandardMaterial map={labels[3 - i]} roughness={0.5} metalness={0.3} />
            </mesh>
          </group>
        ))}
        {books.map((b, i) => (
          <mesh key={i} castShadow position={[b.x, b.y + 0.04 + b.h / 2, 0]} rotation-z={b.tilt}>
            <boxGeometry args={[b.w, b.h, 0.48]} />
            <meshStandardMaterial color={b.c} roughness={0.75} />
          </mesh>
        ))}
        {/* globe + plant on top */}
        <group position={[0.7, 3.65, 0]}>
          <mesh castShadow position-y={0.04}>
            <cylinderGeometry args={[0.12, 0.15, 0.08, 16]} />
            <meshStandardMaterial color={palette.woodDark} />
          </mesh>
          <mesh castShadow position-y={0.32} rotation-z={0.4}>
            <sphereGeometry args={[0.24, 24, 16]} />
            <meshStandardMaterial color="#7fb3d5" roughness={0.5} />
          </mesh>
        </group>
      </Hotspot>
      <Plant position={[-0.75, 3.65, 0.05]} scale={0.5} pot={palette.pink} />
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Neon sign + wall clock + portrait                                   */
/* ------------------------------------------------------------------ */

const neonColors = ['#ff5fa2', '#7cf3ff', '#c8ff6b', '#ffcf5c', '#b18cff'];

export const NeonSign: React.FC = () => {
  const [ci, setCi] = React.useState(0);
  const textures = useMemo(
    () => neonColors.map((c) => neonTexture(`${profile.firstName}'s studio`, c)),
    []
  );
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(({ clock }) => {
    const m = mat.current;
    if (!m) return;
    const t = clock.elapsedTime;
    const flicker = Math.sin(t * 40) > 0.97 ? 0.6 : 1;
    const base = 0.75 + env.night * 0.9;
    m.color.setScalar(base * flicker);
  });
  return (
    <group position={[-5.2, 4.95, -5.47]}>
      <Hotspot
        id="neon"
        label="Change neon colour"
        onSelect={() => setCi((c) => (c + 1) % neonColors.length)}
        lift={0.05}
      >
        <mesh>
          <planeGeometry args={[2.5, 0.62]} />
          <meshBasicMaterial
            ref={mat}
            map={textures[ci]}
            transparent
            toneMapped={false}
            depthWrite={false}
          />
        </mesh>
      </Hotspot>
    </group>
  );
};

export const Clock: React.FC = () => {
  const face = useMemo(clockFaceTexture, []);
  const h = useRef<THREE.Group>(null);
  const m = useRef<THREE.Group>(null);
  const s = useRef<THREE.Group>(null);
  useFrame(() => {
    const d = new Date();
    const sec = d.getSeconds() + d.getMilliseconds() / 1000;
    const min = d.getMinutes() + sec / 60;
    const hr = (d.getHours() % 12) + min / 60;
    if (s.current) s.current.rotation.z = -(sec / 60) * Math.PI * 2;
    if (m.current) m.current.rotation.z = -(min / 60) * Math.PI * 2;
    if (h.current) h.current.rotation.z = -(hr / 12) * Math.PI * 2;
  });
  const hands: [React.RefObject<THREE.Group>, number, number, string, number][] = [
    [h, 0.2, 0.035, palette.ink, 0.05],
    [m, 0.3, 0.025, palette.ink, 0.055],
    [s, 0.33, 0.01, palette.rose, 0.06]
  ];
  return (
    <group position={[1.2, 4.35, -5.47]}>
      <mesh rotation-x={Math.PI / 2} castShadow>
        <cylinderGeometry args={[0.46, 0.46, 0.08, 40]} />
        <meshStandardMaterial color={palette.rose} roughness={0.4} />
      </mesh>
      <mesh position-z={0.042}>
        <circleGeometry args={[0.41, 40]} />
        <meshBasicMaterial map={face} />
      </mesh>
      {hands.map(([ref, len, w, color, z], i) => (
        <group key={i} ref={ref} position-z={z}>
          {/* offset so the hand pivots around its end, not its middle */}
          <mesh position-y={len / 2 - 0.04}>
            <boxGeometry args={[w, len, 0.01]} />
            <meshBasicMaterial color={color} />
          </mesh>
        </group>
      ))}
    </group>
  );
};

export const Portrait: React.FC = () => {
  const setSpot = useStudio((s) => s.setSpot);
  const [{ tex }] = useFittedTextures(['/head/10_4.webp'], 512);
  return (
    <group position={[3.6, 4.3, -5.46]}>
      <Hotspot id="portrait" label="About me" onSelect={() => setSpot('about')} lift={0.05}>
        <Box size={[1.25, 1.4, 0.08]} color={palette.cream} />
        <mesh position-z={0.045}>
          <planeGeometry args={[1.05, 1.2]} />
          <meshStandardMaterial color="#f7c5d3" />
        </mesh>
        <mesh position={[0, -0.02, 0.05]}>
          <planeGeometry args={[1.05, 1.05]} />
          <meshStandardMaterial map={tex} transparent roughness={0.8} />
        </mesh>
      </Hotspot>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Corkboard — Experience                                              */
/* ------------------------------------------------------------------ */

export const Corkboard: React.FC = () => {
  const setSpot = useStudio((s) => s.setSpot);
  const tex = useMemo(() => corkboardTexture(experience), []);
  return (
    <group position={[-6.97, 3.25, 2.4]} rotation-y={Math.PI / 2}>
      <Hotspot id="cork" label="Experience" onSelect={() => setSpot('experience')} lift={0.03}>
        <Box size={[3.4, 2.4, 0.08]} color={palette.woodDark} />
        <mesh position-z={0.045}>
          <planeGeometry args={[3.2, 2.2]} />
          <meshStandardMaterial map={tex} roughness={0.95} />
        </mesh>
      </Hotspot>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Certificates wall — Awards                                          */
/* ------------------------------------------------------------------ */

const shownCerts = certificates.filter((c) => c.image).slice(0, 6);

export const AwardsWall: React.FC = () => {
  const setSpot = useStudio((s) => s.setSpot);
  const textures = useFittedTextures(
    shownCerts.map((c) => c.image!),
    900
  );
  const slots: [number, number][] = [
    [-3.95, 3.95],
    [-2.45, 3.95],
    [-0.95, 3.95],
    [-3.95, 2.55],
    [-2.45, 2.55],
    [-0.95, 2.55]
  ];
  return (
    <group>
      <group position={[-6.97, 0, 0]} rotation-y={Math.PI / 2}>
        <Hotspot
          id="awards"
          label="Awards & certificates"
          onSelect={() => setSpot('awards')}
          lift={0.015}
        >
          {textures.map(({ tex, aspect }, i) => {
            const [z, y] = slots[i];
            const maxW = 1.2;
            const maxH = 1.15;
            const w = Math.min(maxW, maxH * aspect);
            const h = w / aspect;
            return (
              <group key={i} position={[-z, y, 0]}>
                <Box
                  size={[w + 0.14, h + 0.14, 0.06]}
                  color={i % 2 ? palette.woodDark : '#2a2230'}
                />
                <mesh position-z={0.035}>
                  <planeGeometry args={[w + 0.06, h + 0.06]} />
                  <meshStandardMaterial color="#fff" />
                </mesh>
                <mesh position-z={0.037}>
                  <planeGeometry args={[w, h]} />
                  <meshStandardMaterial map={tex} roughness={0.6} />
                </mesh>
              </group>
            );
          })}
        </Hotspot>
      </group>
      {/* sideboard with a trophy */}
      <group position={[-6.6, 0, -2.45]}>
        <Box size={[0.65, 0.9, 3.6]} position={[0, 0.5, 0]} color={palette.cream} />
        <Box size={[0.7, 0.06, 3.7]} position={[0, 0.97, 0]} color={palette.wood} />
        {[-1.2, 0, 1.2].map((z) => (
          <Box key={z} size={[0.02, 0.6, 1.0]} position={[0.33, 0.5, z]} color="#f1e2d4" />
        ))}
        {[-1.2, 0, 1.2].map((z) => (
          <mesh key={z} position={[0.35, 0.55, z + 0.38]}>
            <sphereGeometry args={[0.03, 8, 8]} />
            <meshStandardMaterial color="#d4a373" metalness={0.8} roughness={0.3} />
          </mesh>
        ))}
        <Trophy position={[0, 1.0, -1.1]} />
        <Plant position={[0, 1.0, 1.25]} scale={0.45} pot={palette.rose} />
        <group position={[0, 1.0, 0.1]}>
          {[0, 1, 2].map((i) => (
            <Box
              key={i}
              size={[0.42, 0.08, 0.6]}
              position={[0, 0.04 + i * 0.085, 0]}
              rotation-y={i * 0.12}
              color={bookColors[i + 2]}
            />
          ))}
        </group>
      </group>
    </group>
  );
};

const Trophy: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const ref = useRef<THREE.Group>(null);
  const profile = useMemo(() => {
    const pts = [
      [0, 0],
      [0.2, 0],
      [0.2, 0.06],
      [0.08, 0.1],
      [0.05, 0.3],
      [0.08, 0.35],
      [0.22, 0.45],
      [0.25, 0.75],
      [0.24, 0.76]
    ];
    return pts.map(([x, y]) => new THREE.Vector2(x, y));
  }, []);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.elapsedTime * 0.6;
  });
  return (
    <group position={position} ref={ref}>
      <mesh castShadow>
        <latheGeometry args={[profile, 32]} />
        <meshStandardMaterial
          color="#f2c14e"
          metalness={0.85}
          roughness={0.22}
          side={THREE.DoubleSide}
        />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * 0.26, 0.6, 0]} rotation-z={(s * Math.PI) / 2}>
          <torusGeometry args={[0.08, 0.02, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#f2c14e" metalness={0.85} roughness={0.22} />
        </mesh>
      ))}
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Record player — Music                                               */
/* ------------------------------------------------------------------ */

export const RecordPlayer: React.FC = () => {
  const music = useStudio((s) => s.music);
  const toggleMusic = useStudio((s) => s.toggleMusic);
  const disc = useRef<THREE.Group>(null);
  const arm = useRef<THREE.Group>(null);
  const notes = useRef<THREE.Group>(null);
  const speakers = useRef<THREE.Group>(null);
  const noteTex = useMemo(() => [glyphTexture('♪', '#ff5fa2'), glyphTexture('♫', '#b18cff')], []);
  const speed = useRef(0);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    speed.current = damp(speed.current, music ? 3.5 : 0, 2, dt);
    if (disc.current) disc.current.rotation.y += speed.current * dt;
    if (arm.current)
      arm.current.rotation.y = damp(arm.current.rotation.y, music ? -0.45 : 0, 3, dt);
    const beat = music ? Math.pow(Math.max(0, Math.sin(t * Math.PI * 2.53)), 8) : 0;
    speakers.current?.children.forEach((s) => s.scale.setScalar(1 + beat * 0.04));
    notes.current?.children.forEach((n, i) => {
      const p = (t * 0.3 + i / 4) % 1;
      n.position.set(Math.sin(t + i * 2) * 0.35, 1.3 + p * 1.6, Math.cos(t * 0.7 + i) * 0.3);
      const mat = (n as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = damp(mat.opacity, music ? Math.sin(p * Math.PI) : 0, 4, dt);
    });
  });

  return (
    <group position={[-6.55, 0, 2.4]}>
      <Box size={[0.75, 1.0, 2.6]} position={[0, 0.5, 0]} color={palette.wood} />
      <Box size={[0.02, 0.35, 1.1]} position={[0.385, 0.35, -0.6]} color={palette.woodDark} />
      {/* records stored inside */}
      {Array.from({ length: 8 }, (_, i) => (
        <Box
          key={i}
          size={[0.5, 0.42, 0.03]}
          position={[0.05, 0.3, 0.35 + i * 0.09]}
          color={bookColors[i % bookColors.length]}
        />
      ))}
      <Hotspot
        id="record"
        label={music ? 'Pause music' : 'Play lo-fi music'}
        onSelect={toggleMusic}
        position={[0, 1.0, 0]}
        lift={0.06}
      >
        <Box size={[0.65, 0.12, 0.8]} position={[0, 0.06, 0]} color={palette.cream} />
        <group ref={disc} position={[0, 0.14, 0.05]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.28, 0.28, 0.02, 40]} />
            <meshStandardMaterial color="#141218" roughness={0.25} metalness={0.3} />
          </mesh>
          <mesh position-y={0.011}>
            <cylinderGeometry args={[0.09, 0.09, 0.005, 24]} />
            <meshStandardMaterial color={palette.pink} />
          </mesh>
          <mesh position={[0.05, 0.015, 0]}>
            <boxGeometry args={[0.03, 0.002, 0.01]} />
            <meshStandardMaterial color="#fff" />
          </mesh>
        </group>
        <group ref={arm} position={[0.22, 0.2, -0.28]}>
          <mesh position={[-0.02, 0, 0.18]} rotation-x={Math.PI / 2}>
            <cylinderGeometry args={[0.012, 0.012, 0.36, 8]} />
            <meshStandardMaterial color="#c9c9c9" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      </Hotspot>
      <group ref={speakers}>
        {[-0.95, 0.95].map((z) => (
          <group key={z} position={[0, 1.0, z]}>
            <Box size={[0.42, 0.62, 0.42]} position={[0, 0.31, 0]} color={palette.ink} />
            <mesh position={[0.215, 0.38, 0]} rotation-z={-Math.PI / 2}>
              <cylinderGeometry args={[0.13, 0.13, 0.02, 24]} />
              <meshStandardMaterial color="#3d3446" roughness={0.6} />
            </mesh>
            <mesh position={[0.215, 0.14, 0]} rotation-z={-Math.PI / 2}>
              <cylinderGeometry args={[0.05, 0.05, 0.02, 16]} />
              <meshStandardMaterial color="#3d3446" roughness={0.6} />
            </mesh>
          </group>
        ))}
      </group>
      <Billboard>
        <group ref={notes}>
          {[0, 1, 2, 3].map((i) => (
            <mesh key={i}>
              <planeGeometry args={[0.28, 0.28]} />
              <meshBasicMaterial
                map={noteTex[i % 2]}
                transparent
                opacity={0}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
      </Billboard>
    </group>
  );
};

/* ------------------------------------------------------------------ */
/* Cozy corner: bean bag, side table, floor lamp                       */
/* ------------------------------------------------------------------ */

export const CozyCorner: React.FC = () => {
  const shade = useRef<THREE.MeshStandardMaterial>(null);
  useFrame(() => {
    if (shade.current) shade.current.emissiveIntensity = 0.1 + env.night * 1.4;
  });
  return (
    <group>
      <group position={[5.0, 0, 0.3]} rotation-y={-0.6}>
        <mesh castShadow receiveShadow position-y={0.45} scale={[1.05, 0.62, 1]}>
          <sphereGeometry args={[0.85, 32, 24]} />
          <meshStandardMaterial color={palette.rose} roughness={0.9} />
        </mesh>
        <mesh
          castShadow
          position={[0.25, 0.85, 0.35]}
          rotation={[0.3, 0.6, 0.2]}
          scale={[0.4, 0.14, 0.3]}
        >
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={palette.cream} roughness={0.95} />
        </mesh>
      </group>
      <group position={[3.85, 0, 1.6]}>
        <mesh castShadow receiveShadow position-y={0.55}>
          <cylinderGeometry args={[0.42, 0.42, 0.06, 28]} />
          <meshStandardMaterial color={palette.wood} />
        </mesh>
        <mesh castShadow position-y={0.27}>
          <cylinderGeometry args={[0.05, 0.08, 0.54, 10]} />
          <meshStandardMaterial color={palette.woodDark} />
        </mesh>
        <Box size={[0.4, 0.06, 0.3]} position={[0, 0.61, 0]} color={palette.sage} />
        <Box size={[0.36, 0.06, 0.28]} position={[0, 0.67, 0]} rotation-y={0.3} color="#fff1a8" />
      </group>
      <group position={[6.3, 0, -1.4]}>
        <mesh castShadow position-y={0.03}>
          <cylinderGeometry args={[0.25, 0.28, 0.06, 24]} />
          <meshStandardMaterial color={palette.ink} />
        </mesh>
        <mesh castShadow position-y={1.3}>
          <cylinderGeometry args={[0.025, 0.025, 2.6, 8]} />
          <meshStandardMaterial color={palette.ink} />
        </mesh>
        <mesh castShadow position-y={2.75}>
          <cylinderGeometry args={[0.3, 0.42, 0.45, 28, 1, true]} />
          <meshStandardMaterial
            ref={shade}
            color="#fff1dc"
            emissive="#ffcf8a"
            emissiveIntensity={0.2}
            side={THREE.DoubleSide}
          />
        </mesh>
        <NightLight position={[0, 2.5, 0]} intensity={7} distance={7} />
      </group>
      <Plant position={[-6.2, 0, 4.6]} scale={1.25} pot={palette.cream} leaves={11} />
      <Guitar position={[-6.62, 0, 0.3]} />
      <Plant position={[6.4, 0, -2.9]} scale={0.95} pot={palette.pink} />
    </group>
  );
};

/** An acoustic guitar leaning on the wall — music & coffee, as the bio says. */
const Guitar: React.FC<{ position: [number, number, number] }> = ({ position }) => (
  <group position={position} rotation={[0, Math.PI / 2, -0.18]}>
    <group rotation-x={0}>
      <mesh castShadow position={[0, 0.42, 0]} scale={[1, 1, 0.32]}>
        <sphereGeometry args={[0.36, 32, 20]} />
        <meshStandardMaterial color="#d9934f" roughness={0.35} />
      </mesh>
      <mesh castShadow position={[0, 0.85, 0]} scale={[1, 1, 0.32]}>
        <sphereGeometry args={[0.27, 32, 20]} />
        <meshStandardMaterial color="#d9934f" roughness={0.35} />
      </mesh>
      <mesh position={[0, 0.75, 0.115]}>
        <circleGeometry args={[0.1, 24]} />
        <meshStandardMaterial color="#2a1a12" />
      </mesh>
      <Box size={[0.09, 0.95, 0.06]} position={[0, 1.5, 0.03]} color="#5a3420" />
      <Box size={[0.14, 0.22, 0.05]} position={[0, 2.05, 0.02]} color="#3a2416" />
      <Box size={[0.22, 0.05, 0.05]} position={[0, 0.42, 0.11]} color="#3a2416" />
    </group>
  </group>
);
