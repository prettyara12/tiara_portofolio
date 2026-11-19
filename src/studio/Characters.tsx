import React, { useEffect, useMemo, useRef } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Billboard } from '@react-three/drei';
import { useStudio } from './store';
import { BlobShadow, Hotspot, damp } from './Hotspot';
import { meowSound } from './music';
import { glyphTexture } from './textures';
import { profile } from '../data/profile';

/** A cat napping on the rug. Click it: it wakes, meows, jumps and pops hearts. */
export const Cat: React.FC = () => {
  const meow = useStudio((s) => s.meow);
  const doMeow = useStudio((s) => s.doMeow);
  const body = useRef<THREE.Group>(null);
  const tail = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Group>(null);
  const hearts = useRef<THREE.Group>(null);
  const zzz = useRef<THREE.Group>(null);
  const awake = useRef(0);
  const heartTex = useMemo(() => glyphTexture('♥', '#ff5f8f'), []);
  const zTex = useMemo(() => glyphTexture('z', '#8ea0ff'), []);
  const fur = '#f2a65a';

  useEffect(() => {
    if (meow) awake.current = 3;
  }, [meow]);

  useFrame(({ clock }, dt) => {
    const t = clock.elapsedTime;
    awake.current = Math.max(0, awake.current - dt);
    const a = awake.current;
    const up = a > 0;
    if (body.current) {
      const breathe = 1 + Math.sin(t * 1.8) * (up ? 0.01 : 0.035);
      body.current.scale.set(1, breathe, 1);
      const jump = a > 2.4 ? Math.sin(((3 - a) / 0.6) * Math.PI) * 0.35 : 0;
      body.current.position.y = jump;
    }
    if (headRef.current) {
      headRef.current.rotation.x = damp(headRef.current.rotation.x, up ? -0.35 : 0.25, 6, dt);
      headRef.current.position.y = damp(headRef.current.position.y, up ? 0.42 : 0.26, 6, dt);
    }
    if (tail.current) tail.current.rotation.y = Math.sin(t * (up ? 9 : 1.5)) * (up ? 0.6 : 0.25);
    hearts.current?.children.forEach((h, i) => {
      const p = up ? Math.min(1, (3 - a) / 1.6 - i * 0.15) : 1;
      h.position.set((i - 1) * 0.25, 0.6 + Math.max(0, p) * 0.8, 0);
      ((h as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
        up && p > 0 ? Math.sin(p * Math.PI) : 0;
    });
    zzz.current?.children.forEach((z, i) => {
      const p = (t * 0.25 + i / 3) % 1;
      z.position.set(0.1 + p * 0.3, 0.5 + p * 0.6, 0);
      z.scale.setScalar(0.12 + p * 0.12);
      ((z as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity = up
        ? 0
        : Math.sin(p * Math.PI) * 0.8;
    });
  });

  return (
    <group position={[-1.7, 0, 2.0]} rotation-y={0.6}>
      <Hotspot
        id="cat"
        label="Pet the cat"
        onSelect={() => {
          meowSound();
          doMeow();
        }}
        lift={0.08}
      >
        <group ref={body}>
          <mesh position-y={0.2} scale={[1.35, 0.85, 1]}>
            <sphereGeometry args={[0.26, 24, 16]} />
            <meshStandardMaterial color={fur} roughness={0.9} />
          </mesh>
          <group ref={headRef} position={[0.36, 0.26, 0]}>
            <mesh castShadow>
              <sphereGeometry args={[0.18, 24, 16]} />
              <meshStandardMaterial color={fur} roughness={0.9} />
            </mesh>
            {[-1, 1].map((s) => (
              <mesh key={s} position={[0.02, 0.16, s * 0.1]} rotation-x={s * -0.3}>
                <coneGeometry args={[0.06, 0.12, 4]} />
                <meshStandardMaterial color={fur} roughness={0.9} />
              </mesh>
            ))}
            {[-1, 1].map((s) => (
              <mesh key={s} position={[0.16, 0.03, s * 0.07]} scale={[0.3, 1, 1]}>
                <sphereGeometry args={[0.025, 8, 8]} />
                <meshStandardMaterial color="#1c1420" />
              </mesh>
            ))}
            <mesh position={[0.18, -0.03, 0]}>
              <sphereGeometry args={[0.018, 8, 8]} />
              <meshStandardMaterial color="#ff8fa8" />
            </mesh>
          </group>
          <group ref={tail} position={[-0.32, 0.12, 0]}>
            <mesh position={[-0.18, 0, 0.08]} rotation-z={Math.PI / 2.3}>
              <capsuleGeometry args={[0.04, 0.36, 4, 8]} />
              <meshStandardMaterial color="#e08e40" roughness={0.9} />
            </mesh>
          </group>
          {/* stripes */}
          {[-0.12, 0.04].map((x) => (
            <mesh key={x} position={[x, 0.38, 0]} scale={[0.25, 0.08, 0.9]}>
              <sphereGeometry args={[0.22, 12, 8]} />
              <meshStandardMaterial color="#d97b2b" roughness={0.9} />
            </mesh>
          ))}
        </group>
      </Hotspot>
      <BlobShadow size={1.0} opacity={0.35} />
      <Billboard>
        <group ref={hearts}>
          {[0, 1, 2].map((i) => (
            <mesh key={i} scale={0.22}>
              <planeGeometry />
              <meshBasicMaterial
                map={heartTex}
                transparent
                opacity={0}
                depthWrite={false}
                toneMapped={false}
              />
            </mesh>
          ))}
        </group>
        <group ref={zzz}>
          {[0, 1, 2].map((i) => (
            <mesh key={i}>
              <planeGeometry />
              <meshBasicMaterial
                map={zTex}
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
