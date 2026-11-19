import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Sparkles } from '@react-three/drei';
import { RoundedBoxGeometry } from 'three-stdlib';
import { useStudio } from './store';
import { Hotspot, damp, env } from './Hotspot';
import { floorTexture, plasterTexture, skyTexture } from './textures';

/** Room footprint: floor spans x ∈ [-W/2, W/2], z ∈ [-D/2, D/2]. Back wall at -D/2, left wall at -W/2. */
export const ROOM = { W: 14, D: 11, H: 6.4 };
export const BACK = -ROOM.D / 2;
export const LEFT = -ROOM.W / 2;

export const palette = {
  wall: '#f3dfd6',
  wainscot: '#c96a80',
  trim: '#fff5ec',
  wood: '#9a6240',
  woodDark: '#6e4329',
  pink: '#e7799a',
  rose: '#b4235a',
  cream: '#fff6ee',
  sage: '#7fae8f',
  ink: '#2a2230'
};

const dayHemi = new THREE.Color('#fff3e8');
const nightHemi = new THREE.Color('#4f5390');
const daySun = new THREE.Color('#ffe6c9');
const nightSun = new THREE.Color('#7f92ff');

/** Drives the day ↔ night blend and every light that depends on it. */
export const Lights: React.FC<{ hd: boolean }> = ({ hd }) => {
  const hemi = useRef<THREE.HemisphereLight>(null);
  const sun = useRef<THREE.DirectionalLight>(null);
  const fill = useRef<THREE.AmbientLight>(null);

  useFrame(({ scene }, dt) => {
    const target = useStudio.getState().night ? 1 : 0;
    env.night = damp(env.night, target, 2.2, dt);
    const n = env.night;
    // reflections/ambient from the environment dim with the sun
    scene.environmentIntensity = THREE.MathUtils.lerp(0.35, 0.07, n);
    if (hemi.current) {
      hemi.current.intensity = THREE.MathUtils.lerp(0.75, 0.3, n);
      hemi.current.color.lerpColors(dayHemi, nightHemi, n);
    }
    if (sun.current) {
      sun.current.intensity = THREE.MathUtils.lerp(2.8, 0.45, n);
      sun.current.color.lerpColors(daySun, nightSun, n);
    }
    if (fill.current) fill.current.intensity = THREE.MathUtils.lerp(0.15, 0.08, n);
  });

  const size = hd ? 4096 : 2048;
  return (
    <>
      <hemisphereLight ref={hemi} args={['#fff3e8', '#a07a70', 1.0]} />
      <ambientLight ref={fill} intensity={0.3} />
      <directionalLight
        key={size}
        ref={sun}
        position={[10, 15, 9]}
        intensity={2.6}
        castShadow
        shadow-mapSize={[size, size]}
        shadow-bias={-0.0003}
        shadow-normalBias={0.025}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={45}
      />
    </>
  );
};

/** A warm point light that only shines at night. `hdOnly` lights are skipped in fast mode to save GPU. */
export const NightLight: React.FC<{
  position: [number, number, number];
  intensity?: number;
  distance?: number;
  color?: string;
  hdOnly?: boolean;
}> = ({ position, intensity = 6, distance = 6, color = '#ffb878', hdOnly = false }) => {
  const hd = useStudio((s) => s.hd);
  const ref = useRef<THREE.PointLight>(null);
  useFrame(() => {
    if (ref.current) ref.current.intensity = intensity * (0.04 + env.night * 0.96);
  });
  if (hdOnly && !hd) return null;
  return <pointLight ref={ref} position={position} color={color} distance={distance} decay={1.6} />;
};

/** Material colour that glows (and blooms) at night. */
export const useGlow = (
  ref: React.RefObject<THREE.MeshBasicMaterial | THREE.MeshStandardMaterial>,
  day = 0.9,
  night = 3.2
) =>
  useFrame(() => {
    const m = ref.current;
    if (!m) return;
    const v = THREE.MathUtils.lerp(day, night, env.night);
    if ('emissiveIntensity' in m) m.emissiveIntensity = v;
    else {
      // keep the tint: scale the original colour rather than replacing it
      const base = (m.userData.base ??= m.color.clone()) as THREE.Color;
      m.color.copy(base).multiplyScalar(v);
    }
  });

/* Rounded boxes catch light along their edges — the single biggest step up from flat cubes.
   Geometries are cached by size so identical pieces share one buffer. */
const geoCache = new Map<string, THREE.BufferGeometry>();
const roundedGeo = (w: number, h: number, d: number) => {
  const key = `${w}|${h}|${d}`;
  let g = geoCache.get(key);
  if (!g) {
    const r = Math.min(0.035, Math.min(w, h, d) * 0.3);
    g = r < 0.006 ? new THREE.BoxGeometry(w, h, d) : new RoundedBoxGeometry(w, h, d, 2, r);
    geoCache.set(key, g);
  }
  return g;
};

export const Box: React.FC<
  {
    size: [number, number, number];
    color: string;
    position?: [number, number, number];
    cast?: boolean;
    receive?: boolean;
    roughness?: number;
    map?: THREE.Texture;
  } & Omit<React.ComponentProps<'mesh'>, 'position'>
> = ({ size, color, position, cast = true, receive = true, roughness = 0.75, map, ...rest }) => (
  <mesh
    position={position}
    castShadow={cast}
    receiveShadow={receive}
    geometry={roundedGeo(...size)}
    {...rest}
  >
    <meshStandardMaterial color={color} roughness={roughness} map={map ?? null} />
  </mesh>
);

/** Gradient strip texture: dark on one edge fading out — used for baked contact shading. */
const shadeTexture = (dir: 'top' | 'left' | 'right') => {
  const c = document.createElement('canvas');
  c.width = c.height = 128;
  const ctx = c.getContext('2d')!;
  const g =
    dir === 'top'
      ? ctx.createLinearGradient(0, 0, 0, 128)
      : dir === 'left'
        ? ctx.createLinearGradient(0, 0, 128, 0)
        : ctx.createLinearGradient(128, 0, 0, 0);
  g.addColorStop(0, 'rgba(45,20,32,1)');
  g.addColorStop(0.35, 'rgba(45,20,32,0.35)');
  g.addColorStop(1, 'rgba(45,20,32,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(c);
};

/** Cheap "baked" ambient occlusion where walls meet the floor and each other — always on, no GPU cost. */
const SeamShading: React.FC = () => {
  const { W, D, H } = ROOM;
  const top = useMemo(() => shadeTexture('top'), []);
  const left = useMemo(() => shadeTexture('left'), []);
  const right = useMemo(() => shadeTexture('right'), []);
  const m = (map: THREE.Texture, opacity: number) => (
    <meshBasicMaterial
      map={map}
      transparent
      opacity={opacity}
      depthWrite={false}
      toneMapped={false}
    />
  );
  return (
    <group>
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.006, BACK + 0.5]}>
        <planeGeometry args={[W, 1]} />
        {m(top, 0.32)}
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, Math.PI / 2]} position={[LEFT + 0.5, 0.006, 0]}>
        <planeGeometry args={[D, 1]} />
        {m(top, 0.32)}
      </mesh>
      <mesh position={[LEFT + 0.45, H / 2, BACK + 0.005]}>
        <planeGeometry args={[0.9, H]} />
        {m(left, 0.22)}
      </mesh>
      <mesh rotation-y={Math.PI / 2} position={[LEFT + 0.005, H / 2, BACK + 0.45]}>
        <planeGeometry args={[0.9, H]} />
        {m(right, 0.22)}
      </mesh>
    </group>
  );
};

export const Shell: React.FC = () => {
  const { W, D, H } = ROOM;
  const floorMap = useMemo(() => {
    const t = floorTexture();
    t.repeat.set(W / 5, D / 5);
    return t;
  }, [W, D]);
  const plaster = useMemo(plasterTexture, []);
  const wallMat = <meshStandardMaterial color={palette.wall} map={plaster} roughness={0.95} />;
  return (
    <group>
      {/* floor slab with trim */}
      <Box
        size={[W + 0.6, 0.6, D + 0.6]}
        position={[-0.15, -0.3, -0.15]}
        color={palette.trim}
        cast={false}
      />
      <Box
        size={[W + 0.9, 0.25, D + 0.9]}
        position={[-0.15, -0.72, -0.15]}
        color="#e3cbbd"
        cast={false}
      />
      <mesh rotation-x={-Math.PI / 2} position={[0, 0.002, 0]} receiveShadow>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial map={floorMap} roughness={0.5} envMapIntensity={0.6} />
      </mesh>

      {/* back wall */}
      <mesh position={[-0.15, H / 2, BACK - 0.15]} receiveShadow>
        <boxGeometry args={[W + 0.3, H, 0.3]} />
        {wallMat}
      </mesh>
      <Box
        size={[W + 0.3, 1.5, 0.36]}
        position={[-0.15, 0.75, BACK - 0.13]}
        color={palette.wainscot}
        cast={false}
      />
      <Box
        size={[W + 0.3, 0.1, 0.44]}
        position={[-0.15, 1.52, BACK - 0.1]}
        color={palette.trim}
        cast={false}
      />
      <Box
        size={[W + 0.3, 0.12, 0.42]}
        position={[-0.15, 0.06, BACK - 0.1]}
        color={palette.trim}
        cast={false}
      />
      <Box
        size={[W + 0.3, 0.18, 0.42]}
        position={[-0.15, H, BACK - 0.12]}
        color={palette.trim}
        cast={false}
      />
      {/* left wall */}
      <mesh position={[LEFT - 0.15, H / 2, -0.15]} receiveShadow>
        <boxGeometry args={[0.3, H, D + 0.3]} />
        {wallMat}
      </mesh>
      <Box
        size={[0.36, 1.5, D + 0.3]}
        position={[LEFT - 0.13, 0.75, -0.15]}
        color={palette.wainscot}
        cast={false}
      />
      <Box
        size={[0.44, 0.1, D + 0.3]}
        position={[LEFT - 0.1, 1.52, -0.15]}
        color={palette.trim}
        cast={false}
      />
      <Box
        size={[0.42, 0.12, D + 0.3]}
        position={[LEFT - 0.1, 0.06, -0.15]}
        color={palette.trim}
        cast={false}
      />
      <Box
        size={[0.42, 0.18, D + 0.3]}
        position={[LEFT - 0.12, H, -0.15]}
        color={palette.trim}
        cast={false}
      />
      {/* corner post */}
      <Box
        size={[0.36, H, 0.36]}
        position={[LEFT - 0.12, H / 2, BACK - 0.12]}
        color={palette.trim}
        cast={false}
      />

      <SeamShading />

      {/* rug */}
      <group position={[0.2, 0, 0.6]}>
        <mesh rotation-x={-Math.PI / 2} position-y={0.012} receiveShadow>
          <circleGeometry args={[2.9, 72]} />
          <meshStandardMaterial color="#f0b5c4" roughness={1} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={0.016} receiveShadow>
          <ringGeometry args={[2.3, 2.45, 72]} />
          <meshStandardMaterial color={palette.cream} roughness={1} />
        </mesh>
        <mesh rotation-x={-Math.PI / 2} position-y={0.016} receiveShadow>
          <ringGeometry args={[1.0, 1.12, 72]} />
          <meshStandardMaterial color={palette.rose} roughness={1} />
        </mesh>
      </group>
    </group>
  );
};

/** A panelled door on the back wall — pure decoration that makes the room feel lived in. */
export const Door: React.FC = () => (
  <group position={[6.05, 0, BACK + 0.02]}>
    <Box size={[1.5, 3.1, 0.12]} position={[0, 1.55, 0]} color={palette.trim} cast={false} />
    <Box size={[1.25, 2.95, 0.1]} position={[0, 1.5, 0.05]} color="#d98da1" />
    {[
      [0.95, 2.3],
      [0.95, 0.85]
    ].map(([h, y]) => (
      <Box key={y} size={[0.9, h, 0.04]} position={[0, y, 0.11]} color="#e4a2b3" cast={false} />
    ))}
    <mesh position={[0.45, 1.45, 0.16]} castShadow>
      <sphereGeometry args={[0.06, 16, 12]} />
      <meshStandardMaterial color="#e2b46b" metalness={0.9} roughness={0.25} />
    </mesh>
  </group>
);

/** Window with a day/night sky that crossfades, swaying curtains and dust in the light. */
export const Window: React.FC = () => {
  const toggleNight = useStudio((s) => s.toggleNight);
  const day = useMemo(() => skyTexture(false), []);
  const night = useMemo(() => skyTexture(true), []);
  const nightMat = useRef<THREE.MeshBasicMaterial>(null);
  const curtains = useRef<THREE.Group>(null);

  useFrame(({ clock }) => {
    if (nightMat.current) nightMat.current.opacity = env.night;
    if (curtains.current) {
      const t = clock.elapsedTime;
      curtains.current.children.forEach((c, i) => {
        c.rotation.z = Math.sin(t * 0.8 + i) * 0.015;
      });
    }
  });

  const W = 2.3;
  const H = 2.4;
  return (
    <group position={[-1.5, 3.35, BACK + 0.01]}>
      <Hotspot id="window" label="Toggle day / night" onSelect={toggleNight} lift={0.02}>
        <mesh>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial map={day} toneMapped={false} />
        </mesh>
        <mesh position-z={0.001}>
          <planeGeometry args={[W, H]} />
          <meshBasicMaterial
            ref={nightMat}
            map={night}
            transparent
            opacity={0}
            toneMapped={false}
          />
        </mesh>
        {/* frame */}
        {[
          [0, H / 2 + 0.06, W + 0.24, 0.12],
          [0, -H / 2 - 0.06, W + 0.24, 0.12],
          [-W / 2 - 0.06, 0, 0.12, H],
          [W / 2 + 0.06, 0, 0.12, H],
          [0, 0, 0.07, H],
          [0, 0.2, W, 0.07]
        ].map(([x, y, w, h], i) => (
          <Box
            key={i}
            size={[w, h, 0.14]}
            position={[x, y, 0.07]}
            color={palette.trim}
            roughness={0.5}
          />
        ))}
        {/* sill */}
        <Box
          size={[W + 0.6, 0.1, 0.42]}
          position={[0, -H / 2 - 0.16, 0.19]}
          color={palette.trim}
          roughness={0.5}
        />
      </Hotspot>
      {/* little succulents on the sill */}
      {[-0.8, 0.85].map((x, i) => (
        <group key={x} position={[x, -H / 2 - 0.02, 0.2]}>
          <mesh castShadow position-y={0.09}>
            <cylinderGeometry args={[0.11, 0.08, 0.18, 20]} />
            <meshStandardMaterial color={i ? '#f6c1cf' : '#fff'} roughness={0.5} />
          </mesh>
          <mesh castShadow position-y={0.24} scale={[1, 0.8, 1]}>
            <icosahedronGeometry args={[0.13, 1]} />
            <meshStandardMaterial color={palette.sage} roughness={0.7} flatShading />
          </mesh>
        </group>
      ))}
      {/* curtain rod + curtains (kept below the fairy lights) */}
      <mesh position={[0, H / 2 + 0.3, 0.32]} rotation-z={Math.PI / 2}>
        <cylinderGeometry args={[0.035, 0.035, W + 1.5, 12]} />
        <meshStandardMaterial color="#d4a373" metalness={0.7} roughness={0.3} />
      </mesh>
      {[-1, 1].map((s) => (
        <mesh key={s} position={[s * (W / 2 + 0.78), H / 2 + 0.3, 0.32]}>
          <sphereGeometry args={[0.06, 12, 10]} />
          <meshStandardMaterial color="#d4a373" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      <group ref={curtains}>
        {[-1, 1].map((side) => (
          <group key={side} position={[side * (W / 2 + 0.36), H / 2 + 0.28, 0.32]}>
            {[0, 1, 2, 3].map((k) => (
              <mesh key={k} position={[(k - 1.5) * 0.13, -1.5, 0]} castShadow>
                <cylinderGeometry args={[0.08, 0.1, 3.0, 12, 1, true, 0, Math.PI]} />
                <meshStandardMaterial color="#f3a3b8" roughness={0.95} side={THREE.DoubleSide} />
              </mesh>
            ))}
          </group>
        ))}
      </group>
      <Sparkles
        count={40}
        scale={[3, 3, 3]}
        position={[0.6, -1.2, 1.8]}
        size={2.2}
        speed={0.25}
        opacity={0.6}
        color="#fff3d6"
      />
    </group>
  );
};

/** Little bulbs strung along the top of both walls; they twinkle brighter at night. */
export const FairyLights: React.FC = () => {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const points = useMemo(() => {
    const pts: THREE.Vector3[] = [];
    const sag = (a: THREE.Vector3, b: THREE.Vector3, n: number, depth: number) => {
      for (let i = 0; i < n; i++) {
        const t = i / n;
        const p = a.clone().lerp(b, t);
        p.y -= Math.sin(t * Math.PI) * depth;
        pts.push(p);
      }
    };
    const y = ROOM.H - 0.3;
    const x0 = LEFT + 0.15;
    const z0 = BACK + 0.15;
    const spansBack = 5;
    const spanX = (ROOM.W - 0.3) / spansBack;
    for (let s = 0; s < spansBack; s++)
      sag(
        new THREE.Vector3(x0 + s * spanX, y, z0),
        new THREE.Vector3(x0 + (s + 1) * spanX, y, z0),
        10,
        0.3
      );
    const spansLeft = 4;
    const spanZ = (ROOM.D - 0.3) / spansLeft;
    for (let s = 0; s < spansLeft; s++)
      sag(
        new THREE.Vector3(x0, y, z0 + s * spanZ),
        new THREE.Vector3(x0, y, z0 + (s + 1) * spanZ),
        10,
        0.3
      );
    return pts;
  }, []);
  const colors = useMemo(
    () => ['#ffd27a', '#ff9ec0', '#fff1c9', '#ffb38a'].map((c) => new THREE.Color(c)),
    []
  );
  const tmp = useMemo(() => new THREE.Object3D(), []);
  const col = useMemo(() => new THREE.Color(), []);
  const wire = useMemo(() => new THREE.CatmullRomCurve3(points), [points]);

  useFrame(({ clock }) => {
    const m = mesh.current;
    if (!m) return;
    const t = clock.elapsedTime;
    points.forEach((p, i) => {
      tmp.position.copy(p);
      tmp.position.y -= 0.06;
      tmp.updateMatrix();
      m.setMatrixAt(i, tmp.matrix);
      const tw = 0.55 + 0.45 * Math.sin(t * 2 + i * 1.7);
      const glow = 0.7 + env.night * (1.6 + tw * 2.2);
      col.copy(colors[i % colors.length]).multiplyScalar(glow);
      m.setColorAt(i, col);
    });
    m.instanceMatrix.needsUpdate = true;
    if (m.instanceColor) m.instanceColor.needsUpdate = true;
  });

  return (
    <group>
      <mesh>
        <tubeGeometry args={[wire, 260, 0.008, 4, false]} />
        <meshBasicMaterial color="#3a2a2a" />
      </mesh>
      <instancedMesh ref={mesh} args={[undefined, undefined, points.length]}>
        <sphereGeometry args={[0.055, 12, 10]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
    </group>
  );
};
