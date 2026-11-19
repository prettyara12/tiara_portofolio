import React, { useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { env } from './Hotspot';
import { NightLight, palette, useGlow } from './Room';

/** Soft radial glow texture for bias lighting / light pools on walls. */
const glowTexture = (color: string) => {
  const c = document.createElement('canvas');
  c.width = c.height = 256;
  const ctx = c.getContext('2d')!;
  const g = ctx.createRadialGradient(128, 128, 10, 128, 128, 128);
  g.addColorStop(0, color);
  g.addColorStop(1, 'rgba(0,0,0,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
};

/** A glow decal on a wall that fades in at night (additive, so it brightens what's behind). */
const WallGlow: React.FC<{
  position: [number, number, number];
  rotationY?: number;
  size: [number, number];
  color: string;
  strength?: number;
}> = ({ position, rotationY = 0, size, color, strength = 0.9 }) => {
  const tex = useMemo(() => glowTexture(color), [color]);
  const mat = useRef<THREE.MeshBasicMaterial>(null);
  useFrame(() => {
    if (mat.current) mat.current.opacity = env.night * strength;
  });
  return (
    <mesh position={position} rotation-y={rotationY}>
      <planeGeometry args={size} />
      <meshBasicMaterial
        ref={mat}
        map={tex}
        transparent
        opacity={0}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </mesh>
  );
};

/** Brass wall sconce with a frosted globe and a pool of light on the wall. */
const Sconce: React.FC<{
  position: [number, number, number];
  rotationY: number;
  light?: boolean;
}> = ({ position, rotationY, light = true }) => {
  const bulb = useRef<THREE.MeshBasicMaterial>(null);
  useGlow(bulb, 1.0, 3.6);
  return (
    <group position={position} rotation-y={rotationY}>
      <mesh position-z={0.03}>
        <cylinderGeometry args={[0.1, 0.1, 0.05, 20]} />
        <meshStandardMaterial color="#d8a85e" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.06, 0.15]} rotation-x={Math.PI / 2}>
        <cylinderGeometry args={[0.02, 0.02, 0.25, 8]} />
        <meshStandardMaterial color="#d8a85e" metalness={0.85} roughness={0.3} />
      </mesh>
      <mesh position={[0, 0.2, 0.28]}>
        <sphereGeometry args={[0.14, 24, 18]} />
        <meshBasicMaterial ref={bulb} color="#ffe3b8" toneMapped={false} />
      </mesh>
      <WallGlow position={[0, 0.2, 0.01]} size={[2.6, 2.6]} color="rgba(255,190,120,0.8)" />
      {light && <NightLight position={[0, 0.2, 0.6]} intensity={4.5} distance={5.5} hdOnly />}
    </group>
  );
};

const TableLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const shade = useRef<THREE.MeshStandardMaterial>(null);
  useGlow(shade, 0.15, 2.2);
  return (
    <group position={position}>
      <mesh castShadow position-y={0.2}>
        <sphereGeometry args={[0.16, 24, 18]} />
        <meshStandardMaterial color={palette.sage} roughness={0.35} />
      </mesh>
      <mesh position-y={0.42}>
        <cylinderGeometry args={[0.015, 0.015, 0.2, 8]} />
        <meshStandardMaterial color="#d8a85e" metalness={0.8} roughness={0.3} />
      </mesh>
      <mesh castShadow position-y={0.62}>
        <cylinderGeometry args={[0.16, 0.26, 0.3, 28, 1, true]} />
        <meshStandardMaterial
          ref={shade}
          color="#fff1dc"
          emissive="#ffc27a"
          side={THREE.DoubleSide}
        />
      </mesh>
      <NightLight position={[0.3, 0.6, 0]} intensity={4} distance={4.5} hdOnly />
    </group>
  );
};

/** A glowing moon lamp on the side table — a soft night light. */
const MoonLamp: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const ref = useRef<THREE.Mesh>(null);
  useGlow(mat, 0.05, 1.6);
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.2;
  });
  return (
    <group position={position}>
      <mesh position-y={0.02}>
        <cylinderGeometry args={[0.08, 0.1, 0.04, 16]} />
        <meshStandardMaterial color={palette.woodDark} />
      </mesh>
      <mesh ref={ref} position-y={0.17}>
        <icosahedronGeometry args={[0.14, 3]} />
        <meshStandardMaterial
          ref={mat}
          color="#fff6e0"
          emissive="#ffe6b0"
          roughness={0.9}
          flatShading
        />
      </mesh>
    </group>
  );
};

/** Warm LED strips tucked under each bookshelf board (one shared material). */
const ShelfLeds: React.FC = () => {
  const mat = useMemo(
    () => new THREE.MeshBasicMaterial({ color: '#ffd9a0', toneMapped: false }),
    []
  );
  useFrame(() =>
    mat.color.set('#ffd9a0').multiplyScalar(THREE.MathUtils.lerp(0.6, 3.0, env.night))
  );
  return (
    <group position={[-5.2, 0, -4.82]}>
      {[0.89, 1.74, 2.59, 3.54].map((y) => (
        <mesh key={y} position={[0, y, 0]} material={mat}>
          <boxGeometry args={[2.05, 0.025, 0.025]} />
        </mesh>
      ))}
    </group>
  );
};

export const Lamps: React.FC = () => (
  <group>
    {/* left wall sconces */}
    <Sconce position={[-6.98, 3.75, 0.3]} rotationY={Math.PI / 2} />
    <Sconce position={[-6.98, 3.6, 4.6]} rotationY={Math.PI / 2} />
    {/* back wall sconce between portrait and door */}
    <Sconce position={[4.85, 3.9, -5.48]} rotationY={0} light={false} />
    {/* table lamp on the awards sideboard */}
    <TableLamp position={[-6.6, 1.0, -1.75]} />
    <MoonLamp position={[3.85, 0.7, 1.6]} />
    <ShelfLeds />
    {/* bias light behind the monitor + soft pools under the fairy lights */}
    <WallGlow
      position={[3.35, 2.45, -5.48]}
      size={[3.2, 2.0]}
      color="rgba(150,120,255,0.9)"
      strength={0.8}
    />
    <WallGlow
      position={[-5.2, 4.95, -5.47]}
      size={[3.6, 1.6]}
      color="rgba(255,95,162,0.8)"
      strength={0.6}
    />
  </group>
);
