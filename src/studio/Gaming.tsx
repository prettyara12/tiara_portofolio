import React, { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { useStudio } from './store';
import { Hotspot, damp, env } from './Hotspot';
import { Box } from './Room';

/* ------------------------------------------------------------------ */
/* RGB gaming PC — a glass-panel tower to the left of the desk         */
/* ------------------------------------------------------------------ */

const modes = ['Rainbow', 'Sakura pink', 'Ocean blue', 'Off'] as const;
const OFF = 3;
const labelFor = (m: number) => `RGB PC · ${modes[m]} — click to change`;

/** Colour of the i-th light at time t. `gain` > 1 pushes it past white so bloom picks it up. */
const rgb = (mode: number, i: number, t: number, out: THREE.Color, gain: number) => {
  switch (mode) {
    case 0:
      out.setHSL((t * 0.12 + i * 0.09) % 1, 1, 0.55);
      break;
    case 1:
      out.set('#ff5fa2').multiplyScalar(0.75 + 0.25 * Math.sin(t * 1.6 + i * 0.7));
      break;
    case 2:
      out.setHSL(0.5 + 0.1 * Math.sin(t * 0.8 + i * 0.6), 1, 0.55);
      break;
    default:
      return out.setRGB(0.015, 0.014, 0.02);
  }
  return out.multiplyScalar(gain);
};

let glowTex: THREE.Texture | null = null;
const getGlowTex = () => {
  if (!glowTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(64, 64, 2, 64, 64, 64);
    g.addColorStop(0, 'rgba(255,255,255,1)');
    g.addColorStop(0.45, 'rgba(255,255,255,0.35)');
    g.addColorStop(1, 'rgba(255,255,255,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    glowTex = new THREE.CanvasTexture(c);
    glowTex.colorSpace = THREE.SRGBColorSpace;
  }
  return glowTex;
};

const W = 0.66; // case width  (x)
const H = 1.3; // case height (y)
const DP = 1.1; // case depth  (z) — the front (fans) faces +z
const BASE = 0.07; // feet

const Fan: React.FC<{
  y: number;
  material: THREE.Material;
  mode: React.MutableRefObject<number>;
}> = ({ y, material, mode }) => {
  const blades = useRef<THREE.Group>(null);
  const speed = useRef(8);
  useFrame((_, dt) => {
    speed.current = damp(speed.current, mode.current === OFF ? 0 : 8, 2.5, dt);
    if (blades.current) blades.current.rotation.z -= dt * speed.current;
  });
  return (
    <group position={[0, y, DP / 2 + 0.012]}>
      <mesh material={material}>
        <torusGeometry args={[0.145, 0.013, 8, 44]} />
      </mesh>
      <mesh position-z={0.004} material={material}>
        <torusGeometry args={[0.062, 0.008, 8, 28]} />
      </mesh>
      <group ref={blades}>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <mesh
              key={i}
              position={[Math.cos(a) * 0.1, Math.sin(a) * 0.1, 0]}
              rotation={[0.5, 0, a + 0.35]}
            >
              <planeGeometry args={[0.1, 0.05]} />
              <meshStandardMaterial
                color="#2b2736"
                roughness={0.4}
                transparent
                opacity={0.9}
                side={THREE.DoubleSide}
              />
            </mesh>
          );
        })}
      </group>
      <mesh position-z={0.006}>
        <circleGeometry args={[0.04, 20]} />
        <meshStandardMaterial color="#15121c" roughness={0.3} metalness={0.5} />
      </mesh>
    </group>
  );
};

export const GamingPC: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const [mode, setMode] = useState(0);
  const modeRef = useRef(0);
  modeRef.current = mode;

  // 0-2: fans · 3: light strips · 4: CPU pump ring · 5: RAM
  const mats = useMemo(
    () =>
      Array.from(
        { length: 6 },
        () => new THREE.MeshBasicMaterial({ color: '#ff5fa2', toneMapped: false })
      ),
    []
  );
  const glowFloor = useRef<THREE.MeshBasicMaterial>(null);
  const glowWall = useRef<THREE.MeshBasicMaterial>(null);
  const glowInner = useRef<THREE.MeshBasicMaterial>(null);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const m = modeRef.current;
    mats.forEach((mat, i) => rgb(m, i, t, mat.color, 3));
    const lit = m === OFF ? 0 : 1;
    const strength = lit * (0.2 + env.night * 0.55);
    if (glowFloor.current) {
      rgb(m, 1, t, glowFloor.current.color, 1);
      glowFloor.current.opacity = strength;
    }
    if (glowInner.current) {
      rgb(m, 2, t, glowInner.current.color, 1);
      glowInner.current.opacity = lit * (0.16 + env.night * 0.14);
    }
    if (glowWall.current) {
      rgb(m, 4, t, glowWall.current.color, 1);
      glowWall.current.opacity = strength * 0.9;
    }
  });

  const cycle = () => {
    const next = (modeRef.current + 1) % modes.length;
    setMode(next);
    // keep the cursor label in sync with the new mode name
    useStudio.getState().setHovered(labelFor(next));
  };

  const dark = '#17141f';
  const none = () => null;

  return (
    <group position={position}>
      {/* soft colour spill on the floor and the wall behind (never catches the pointer) */}
      <mesh rotation-x={-Math.PI / 2} position={[0.15, 0.025, 0.35]} raycast={none} renderOrder={1}>
        <planeGeometry args={[3.4, 3.4]} />
        <meshBasicMaterial
          ref={glowFloor}
          map={getGlowTex()}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>
      <mesh position={[0, 0.8, -DP / 2 - 0.2]} raycast={none}>
        <planeGeometry args={[2.8, 2.6]} />
        <meshBasicMaterial
          ref={glowWall}
          map={getGlowTex()}
          transparent
          opacity={0}
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          toneMapped={false}
        />
      </mesh>

      <Hotspot id="gaming-pc" label={labelFor(mode)} onSelect={cycle} lift={0.02}>
        {/* feet */}
        {[
          [-0.26, -0.45],
          [0.26, -0.45],
          [-0.26, 0.45],
          [0.26, 0.45]
        ].map(([x, z]) => (
          <Box
            key={`${x}${z}`}
            size={[0.09, BASE, 0.09]}
            position={[x, BASE / 2, z]}
            color="#0e0c14"
          />
        ))}

        {/* shell */}
        <Box size={[W, 0.05, DP]} position={[0, BASE + 0.025, 0]} color={dark} roughness={0.5} />
        <Box
          size={[W, 0.05, DP]}
          position={[0, BASE + H - 0.025, 0]}
          color={dark}
          roughness={0.5}
        />
        <Box
          size={[W, H, 0.04]}
          position={[0, BASE + H / 2, -DP / 2 + 0.02]}
          color={dark}
          roughness={0.5}
        />
        <Box
          size={[W, H, 0.05]}
          position={[0, BASE + H / 2, DP / 2 - 0.025]}
          color={dark}
          roughness={0.5}
        />
        <Box
          size={[0.04, H, DP]}
          position={[-W / 2 + 0.02, BASE + H / 2, 0]}
          color={dark}
          roughness={0.5}
        />

        {/* mesh front panel behind the fans */}
        <mesh position={[0, BASE + H / 2, DP / 2 + 0.003]}>
          <planeGeometry args={[W - 0.06, H - 0.12]} />
          <meshStandardMaterial color="#0a0910" roughness={0.6} />
        </mesh>
        {[0.4, 0.74, 1.08].map((y, i) => (
          <Fan key={y} y={BASE + y - 0.07} material={mats[i]} mode={modeRef} />
        ))}

        {/* ---- inside, seen through the glass side ---- */}
        {/* motherboard */}
        <Box
          size={[0.025, 0.95, 0.74]}
          position={[-0.2, BASE + 0.76, -0.12]}
          color="#2f2a44"
          roughness={0.4}
          cast={false}
        />
        {/* PSU shroud + light strip along its top edge */}
        <Box
          size={[0.46, 0.2, 0.92]}
          position={[-0.02, BASE + 0.17, -0.02]}
          color="#3b3649"
          roughness={0.35}
          cast={false}
        />
        <mesh position={[0.213, BASE + 0.265, -0.02]} material={mats[3]}>
          <boxGeometry args={[0.012, 0.014, 0.84]} />
        </mesh>
        {/* graphics card */}
        <Box
          size={[0.14, 0.2, 0.76]}
          position={[-0.03, BASE + 0.46, 0.0]}
          color="#4b4660"
          roughness={0.35}
          cast={false}
        />
        <mesh position={[0.047, BASE + 0.53, 0.0]} material={mats[3]}>
          <boxGeometry args={[0.012, 0.022, 0.52]} />
        </mesh>
        {/* CPU liquid cooler: pump block, glowing ring, two tubes up to the top */}
        <mesh position={[-0.13, BASE + 0.95, -0.3]} rotation-z={Math.PI / 2}>
          <cylinderGeometry args={[0.115, 0.115, 0.07, 28]} />
          <meshStandardMaterial color="#1f1b29" roughness={0.3} metalness={0.5} />
        </mesh>
        <mesh position={[-0.093, BASE + 0.95, -0.3]} rotation-y={Math.PI / 2} material={mats[4]}>
          <torusGeometry args={[0.088, 0.01, 8, 36]} />
        </mesh>
        <mesh position={[-0.094, BASE + 0.95, -0.3]} rotation-y={Math.PI / 2}>
          <circleGeometry args={[0.075, 28]} />
          <meshStandardMaterial color="#0b0a12" roughness={0.1} metalness={0.8} />
        </mesh>
        {[-0.05, 0.05].map((dz) => (
          <mesh key={dz} position={[-0.14, BASE + 1.13, -0.3 + dz]}>
            <cylinderGeometry args={[0.022, 0.022, 0.3, 10]} />
            <meshStandardMaterial color="#111017" roughness={0.6} />
          </mesh>
        ))}
        {/* RAM sticks with glowing tops */}
        {[0.02, 0.08].map((z) => (
          <group key={z} position={[-0.16, BASE + 0.9, z]}>
            <Box size={[0.025, 0.26, 0.034]} position={[0, 0, 0]} color="#2b2735" cast={false} />
            <mesh position={[0.002, 0.14, 0]} material={mats[5]}>
              <boxGeometry args={[0.03, 0.026, 0.038]} />
            </mesh>
          </group>
        ))}
        {/* vertical light strips on the glass edge */}
        {[-0.5, 0.5].map((z) => (
          <mesh key={z} position={[0.3, BASE + H / 2, z]} material={mats[3]}>
            <boxGeometry args={[0.012, H - 0.16, 0.012]} />
          </mesh>
        ))}

        {/* faint coloured haze inside the case */}
        <mesh position={[0.19, BASE + H / 2, 0]} rotation-y={Math.PI / 2} raycast={() => null}>
          <planeGeometry args={[DP - 0.12, H - 0.12]} />
          <meshBasicMaterial
            ref={glowInner}
            map={getGlowTex()}
            transparent
            opacity={0}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            toneMapped={false}
          />
        </mesh>

        {/* tempered glass side — last so it blends over the interior */}
        <mesh position={[W / 2 - 0.012, BASE + H / 2, 0]} rotation-y={Math.PI / 2} renderOrder={2}>
          <planeGeometry args={[DP - 0.1, H - 0.1]} />
          <meshStandardMaterial
            color="#241d36"
            transparent
            opacity={0.12}
            roughness={0.05}
            metalness={0.3}
            depthWrite={false}
          />
        </mesh>
      </Hotspot>
    </group>
  );
};
