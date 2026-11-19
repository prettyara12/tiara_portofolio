import React, { Suspense, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import {
  AdaptiveEvents,
  Environment,
  Lightformer,
  OrbitControls,
  PerformanceMonitor,
  Sparkles
} from '@react-three/drei';
import {
  Bloom,
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import type { OrbitControls as OrbitControlsImpl } from 'three-stdlib';
import { useStudio, views } from './store';
import { damp, env } from './Hotspot';
import { Door, FairyLights, Lights, Shell, Window } from './Room';
import {
  AwardsWall,
  Bookshelf,
  Clock,
  Corkboard,
  CozyCorner,
  Desk,
  NeonSign,
  Portrait,
  RecordPlayer
} from './Furniture';
import { Cat } from './Characters';
import { Avatar } from './Avatar';
import { Lamps } from './Lamps';

const ROOM_LIMITS = { minAz: 0.06, maxAz: Math.PI / 2 - 0.06, minPolar: 0.45, maxPolar: 1.25 };

/**
 * Glides the camera between spots, and shifts the projection so the focused
 * object stays centred in the part of the screen the info panel doesn't cover.
 */
const CameraRig: React.FC<{ panelOffset: { x: number; y: number } }> = ({ panelOffset }) => {
  const spot = useStudio((s) => s.spot);
  const controls = useRef<OrbitControlsImpl>(null);
  const { camera, size } = useThree();
  const flying = useRef(true);
  const goalPos = useRef(new THREE.Vector3(...views.room.pos));
  const goalTarget = useRef(new THREE.Vector3(...views.room.target));
  const offset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // fly-in from far away on first load
    camera.position.set(36, 30, 36);
  }, [camera]);

  useEffect(() => {
    const v = views[spot];
    goalPos.current.set(...v.pos);
    goalTarget.current.set(...v.target);
    // portrait screens see less sideways, so back the camera off to keep things in frame
    const aspect = size.width / size.height;
    const k = THREE.MathUtils.clamp(
      (spot === 'room' ? 1.15 : 0.95) / aspect,
      1,
      spot === 'room' ? 2.3 : 1.8
    );
    if (k > 1) {
      const dir = goalPos.current.clone().sub(goalTarget.current);
      goalPos.current.copy(goalTarget.current).addScaledVector(dir, k);
    }
    flying.current = true;
    const c = controls.current;
    if (c) {
      c.minAzimuthAngle = -Infinity;
      c.maxAzimuthAngle = Infinity;
      c.minPolarAngle = 0;
      c.maxPolarAngle = Math.PI;
    }
  }, [spot, size.width, size.height]);

  useEffect(() => {
    const c = controls.current;
    if (!c) return;
    const stop = () => (flying.current = false);
    c.addEventListener('start', stop);
    return () => c.removeEventListener('start', stop);
  }, []);

  useFrame((_, dt) => {
    const c = controls.current;
    if (!c) return;
    if (flying.current) {
      const k = 3.2;
      camera.position.x = damp(camera.position.x, goalPos.current.x, k, dt);
      camera.position.y = damp(camera.position.y, goalPos.current.y, k, dt);
      camera.position.z = damp(camera.position.z, goalPos.current.z, k, dt);
      c.target.x = damp(c.target.x, goalTarget.current.x, k, dt);
      c.target.y = damp(c.target.y, goalTarget.current.y, k, dt);
      c.target.z = damp(c.target.z, goalTarget.current.z, k, dt);
      if (
        camera.position.distanceTo(goalPos.current) < 0.02 &&
        c.target.distanceTo(goalTarget.current) < 0.02
      ) {
        flying.current = false;
        if (useStudio.getState().spot === 'room') {
          c.minAzimuthAngle = ROOM_LIMITS.minAz;
          c.maxAzimuthAngle = ROOM_LIMITS.maxAz;
          c.minPolarAngle = ROOM_LIMITS.minPolar;
          c.maxPolarAngle = ROOM_LIMITS.maxPolar;
        }
      }
    }
    // keep the focused object clear of the info panel
    const pc = camera as THREE.PerspectiveCamera;
    offset.current.x = damp(offset.current.x, panelOffset.x, 4, dt);
    offset.current.y = damp(offset.current.y, panelOffset.y, 4, dt);
    if (Math.abs(offset.current.x) > 0.5 || Math.abs(offset.current.y) > 0.5) {
      pc.setViewOffset(
        size.width,
        size.height,
        offset.current.x,
        offset.current.y,
        size.width,
        size.height
      );
    } else if (pc.view) {
      pc.clearViewOffset();
    }
    c.update();
  });

  const focused = spot !== 'room';
  return (
    <OrbitControls
      ref={controls}
      makeDefault
      enablePan={false}
      enableDamping
      dampingFactor={0.08}
      rotateSpeed={0.55}
      zoomSpeed={0.7}
      minDistance={focused ? 2.5 : 8}
      maxDistance={focused ? 16 : 60}
    />
  );
};

/** Night-time fireflies drifting around the room. */
const Fireflies: React.FC = () => {
  const ref = useRef<THREE.Group>(null);
  useFrame(() => {
    if (ref.current) ref.current.visible = env.night > 0.35;
  });
  return (
    <group ref={ref}>
      <Sparkles
        count={70}
        scale={[13, 4, 10]}
        position={[0, 2.6, 0]}
        size={4}
        speed={0.35}
        color="#ffd98a"
        opacity={0.9}
      />
    </group>
  );
};

/** Soft studio lighting for reflections — built from simple light cards, nothing downloaded. */
const StudioEnvironment: React.FC = () => (
  <Environment resolution={256} frames={1} environmentIntensity={0.35}>
    <Lightformer
      form="rect"
      intensity={2}
      color="#ffe9dc"
      position={[0, 6, 0]}
      rotation-x={Math.PI / 2}
      scale={[12, 12, 1]}
    />
    <Lightformer
      form="rect"
      intensity={1.2}
      color="#ffd6e2"
      position={[-8, 3, 2]}
      rotation-y={Math.PI / 2}
      scale={[8, 4, 1]}
    />
    <Lightformer
      form="rect"
      intensity={1.4}
      color="#fff3e0"
      position={[8, 3, 6]}
      rotation-y={-Math.PI / 2}
      scale={[8, 4, 1]}
    />
    <Lightformer form="circle" intensity={3} color="#ffffff" position={[4, 5, 8]} scale={3} />
  </Environment>
);

const Effects = React.lazy(() => import('./Effects'));

/**
 * The room's shadows barely change, so the shadow map is rendered a few times while
 * the scene settles and then frozen. Moving characters use their own blob shadows.
 * This roughly halves GPU time on integrated graphics.
 */
const StaticShadows: React.FC<{ hd: boolean }> = ({ hd }) => {
  const gl = useThree((s) => s.gl);
  const frames = useRef(0);
  useEffect(() => {
    gl.shadowMap.autoUpdate = false;
    frames.current = 0;
  }, [gl, hd]);
  useFrame(() => {
    // refresh for the first ~2s (textures/fonts settling), then every 4s for swaying bits
    frames.current++;
    if (frames.current < 120 || frames.current % 240 === 0) gl.shadowMap.needsUpdate = true;
  });
  return null;
};

const hdDpr = () => Math.min(2, Math.max(1.5, window.devicePixelRatio || 1));

export const Scene: React.FC<{
  panelOffset: { x: number; y: number };
  onReady: () => void;
  ready: boolean;
}> = ({ panelOffset, onReady, ready }) => {
  const hd = useStudio((s) => s.hd);
  const setHd = useStudio((s) => s.setHd);
  const [dpr, setDpr] = React.useState(hdDpr);
  useEffect(() => setDpr(hd ? hdDpr() : Math.min(1.25, window.devicePixelRatio || 1)), [hd]);
  return (
    <Canvas
      shadows="soft"
      dpr={dpr}
      camera={{ fov: 32, near: 0.5, far: 140, position: [36, 30, 36] }}
      gl={{ antialias: false, alpha: true, powerPreference: 'high-performance', stencil: false }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
      }}
      onPointerMissed={() => useStudio.getState().setHovered(null)}
    >
      {ready && (
        <PerformanceMonitor
          flipflops={2}
          onDecline={() => {
            // step down gently: drop AO first, then resolution, then the post effects
            const st = useStudio.getState();
            if (st.hd && st.ao) st.setAo(false);
            else if (dpr > 1.25) setDpr(1.25);
            else setHd(false);
          }}
          onFallback={() => setHd(false)}
        />
      )}
      <AdaptiveEvents />
      <Suspense fallback={null}>
        <StudioEnvironment />
        <Lights hd={hd} />
        <StaticShadows hd={hd} />
        <CameraRig panelOffset={panelOffset} />
        <Shell />
        <Door />
        <Window />
        <FairyLights />
        <NeonSign />
        <Clock />
        <Bookshelf />
        <Desk />
        <Corkboard />
        <RecordPlayer />
        <CozyCorner />
        <Lamps />
        <Avatar />
        <Cat />
        <Fireflies />
        <Portrait />
        <AwardsWall />
        <Ready onReady={onReady} />
      </Suspense>
      {hd && (
        <Suspense fallback={null}>
          <Effects />
        </Suspense>
      )}
    </Canvas>
  );
};

/** Renders inside the Suspense boundary so it only fires once textures have loaded. */
const Ready: React.FC<{ onReady: () => void }> = ({ onReady }) => {
  useEffect(() => {
    const id = window.setTimeout(onReady, 200);
    return () => window.clearTimeout(id);
  }, [onReady]);
  return null;
};
