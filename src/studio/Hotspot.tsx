import React, { useRef } from 'react';
import * as THREE from 'three';
import { useFrame, type ThreeEvent } from '@react-three/fiber';
import { useStudio } from './store';
import { blip } from './music';

/** Shared, frame-rate independent values that many objects read every frame. */
export const env = { night: 0 };

/** Where the avatar is right now — read by props like the desk chair. */
export const avatarState: { at: string | null } = { at: null };

export const damp = THREE.MathUtils.damp;

interface HotspotProps {
  id: string;
  label: string;
  onSelect: () => void;
  children: React.ReactNode;
  position?: [number, number, number];
  rotation?: [number, number, number];
  /** how much the object grows on hover */
  lift?: number;
}

/**
 * Wraps a group of meshes so the whole thing reacts as one object:
 * hover grows + floats it slightly and shows a cursor label, click selects it.
 */
export const Hotspot: React.FC<HotspotProps> = ({
  id,
  label,
  onSelect,
  children,
  position,
  rotation,
  lift = 0.04
}) => {
  const ref = useRef<THREE.Group>(null);
  const hovered = useStudio((s) => s.hovered === label);
  const setHovered = useStudio((s) => s.setHovered);

  useFrame((_, dt) => {
    const g = ref.current;
    if (!g) return;
    const k = hovered ? 1 + lift : 1;
    const s = damp(g.scale.x, k, 12, dt);
    g.scale.setScalar(s);
  });

  const over = (e: ThreeEvent<PointerEvent>) => {
    e.stopPropagation();
    setHovered(label);
    document.body.style.cursor = 'pointer';
  };
  const out = () => {
    if (useStudio.getState().hovered === label) setHovered(null);
    document.body.style.cursor = '';
  };

  return (
    <group
      ref={ref}
      name={id}
      position={position}
      rotation={rotation}
      onPointerOver={over}
      onPointerOut={out}
      onClick={(e) => {
        e.stopPropagation();
        blip(720, 0.07);
        onSelect();
      }}
    >
      {children}
    </group>
  );
};

let blobTex: THREE.Texture | null = null;
/** Soft round shadow under moving characters (they don't write to the static shadow map). */
export const BlobShadow: React.FC<{ size?: number; opacity?: number }> = ({
  size = 1,
  opacity = 0.35
}) => {
  if (!blobTex) {
    const c = document.createElement('canvas');
    c.width = c.height = 128;
    const ctx = c.getContext('2d')!;
    const g = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
    g.addColorStop(0, 'rgba(40,20,30,1)');
    g.addColorStop(1, 'rgba(40,20,30,0)');
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, 128, 128);
    blobTex = new THREE.CanvasTexture(c);
  }
  return (
    <mesh rotation-x={-Math.PI / 2} position-y={0.02} renderOrder={1}>
      <planeGeometry args={[size, size]} />
      <meshBasicMaterial map={blobTex} transparent opacity={opacity} depthWrite={false} />
    </mesh>
  );
};
