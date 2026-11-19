import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import { Html } from '@react-three/drei';
import { useStudio } from './store';
import { BlobShadow, Hotspot, avatarState, damp } from './Hotspot';
import { palette } from './Room';
import { profile } from '../data/profile';

const skin = '#f5c9a9';
const hair = '#2b1a17';
const top = '#f3a3b8';
const jeans = '#3d4a73';

const greetings = [
  `Hi, I'm ${profile.firstName}! 👋`,
  'Welcome to my studio ✨',
  'Click around — everything is alive!',
  'I build mobile apps with React Native 📱',
  'Try the record player 🎶'
];

/* ------------------------------------------------------------------ */
/* Activities                                                          */
/* ------------------------------------------------------------------ */

type Anim =
  'type' | 'read' | 'phone' | 'browse' | 'look' | 'pet' | 'stretch' | 'dance' | 'wave' | 'idle';
type Pose = 'stand' | 'sit' | 'crouch';

interface Activity {
  id: string;
  place: string;
  label: (night: boolean) => string;
  /** where she walks to */
  approach: [number, number];
  /** where she ends up (differs when she sits down onto something) */
  at?: [number, number];
  yaw: number;
  pose: Pose;
  /** how far the whole body drops for the pose */
  drop?: number;
  anim: Anim;
  prop?: 'book' | 'phone';
  duration: [number, number];
}

const activities: Activity[] = [
  {
    id: 'desk',
    place: 'the desk',
    label: () => 'Coding a new app 💻',
    approach: [2.45, -3.5],
    at: [3.35, -3.5],
    yaw: Math.PI,
    pose: 'sit',
    drop: 0.44, // chair seat top is 1.02; hip joint sits ~0.1 above it
    anim: 'type',
    duration: [10, 15]
  },
  {
    id: 'shelf',
    place: 'the bookshelf',
    label: () => 'Reading up on React Native 📚',
    approach: [-5.2, -3.75],
    yaw: Math.PI,
    pose: 'stand',
    anim: 'read',
    prop: 'book',
    duration: [8, 11]
  },
  {
    id: 'music',
    place: 'the record player',
    label: () => 'Picking a vinyl 🎶',
    approach: [-5.55, 2.4],
    yaw: -Math.PI / 2,
    pose: 'stand',
    anim: 'browse',
    duration: [6, 9]
  },
  {
    id: 'beanbag',
    place: 'the bean bag',
    label: () => 'Scrolling for UI inspiration 📱',
    approach: [4.0, 0.9],
    at: [5.0, 0.3],
    yaw: Math.PI / 4,
    pose: 'sit',
    drop: -0.22,
    anim: 'phone',
    prop: 'phone',
    duration: [9, 13]
  },
  {
    id: 'sofa',
    place: 'the sofa',
    label: () => 'Relaxing with a good book 📖',
    approach: [4.98, 3.5],
    at: [4.98, 4.66],
    yaw: Math.PI,
    pose: 'sit',
    drop: 0.07, // sofa cushion top is 0.64
    anim: 'read',
    prop: 'book',
    duration: [10, 14]
  },
  {
    id: 'window',
    place: 'the window',
    label: (night) => (night ? 'Stargazing 🌙' : 'Watching the clouds ☁️'),
    approach: [-1.5, -4.3],
    yaw: Math.PI,
    pose: 'stand',
    anim: 'look',
    duration: [6, 9]
  },
  {
    id: 'cat',
    place: 'Mochi the cat',
    label: () => 'Petting Mochi 🐱',
    approach: [-1.12, 1.42],
    yaw: -Math.PI / 4,
    pose: 'crouch',
    drop: -0.3,
    anim: 'pet',
    duration: [5, 7]
  },
  {
    id: 'rug',
    place: 'the rug',
    label: () => 'Taking a stretch break 🙆',
    approach: [0.2, 0.5],
    yaw: Math.PI / 4,
    pose: 'stand',
    anim: 'stretch',
    duration: [4, 6]
  }
];

const rug = activities.find((a) => a.id === 'rug')!;

const hello: Activity = {
  ...rug,
  id: 'hello',
  label: () => 'Hi there! 👋',
  anim: 'wave',
  duration: [1e9, 1e9]
};
const dance: Activity = {
  ...rug,
  id: 'dance',
  label: () => 'Dancing to lo-fi 💃',
  anim: 'dance',
  duration: [1e9, 1e9]
};

const start: Activity = {
  ...rug,
  id: 'start',
  label: () => '',
  anim: 'idle',
  duration: [7, 7]
};

const HUB = new THREE.Vector2(0.2, 0.5);
const SPEED = 1.5;

const angleTo = (from: number, to: number) => {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return from + d;
};

type Phase = 'walk' | 'enter' | 'act' | 'exit';

/* ------------------------------------------------------------------ */
/* Avatar                                                              */
/* ------------------------------------------------------------------ */

/** Chibi Tiara: walks around the studio and does things — codes, reads, pets the cat… */
export const Avatar: React.FC = () => {
  const doWave = useStudio((s) => s.doWave);
  const doMeow = useStudio((s) => s.doMeow);
  const wave = useStudio((s) => s.wave);
  const setSpot = useStudio((s) => s.setSpot);

  const mover = useRef<THREE.Group>(null);
  const root = useRef<THREE.Group>(null);
  const body = useRef<THREE.Group>(null);
  const head = useRef<THREE.Group>(null);
  const armR = useRef<THREE.Group>(null);
  const armL = useRef<THREE.Group>(null);
  const hipR = useRef<THREE.Group>(null);
  const hipL = useRef<THREE.Group>(null);
  const kneeR = useRef<THREE.Group>(null);
  const kneeL = useRef<THREE.Group>(null);
  const eyes = useRef<THREE.Group>(null);
  const book = useRef<THREE.Group>(null);
  const phone = useRef<THREE.Group>(null);
  const bubbleAnchor = useRef<THREE.Group>(null);

  const waveT = useRef(10);
  const [greeting, setGreeting] = useState<string | null>(null);
  const [status, setStatus] = useState<string | null>(null);

  const st = useRef({
    phase: 'act' as Phase,
    act: start as Activity,
    prev: start as Activity,
    path: [] as THREE.Vector2[],
    pos: new THREE.Vector2(0.2, 0.5),
    yaw: Math.PI / 4,
    t: 0,
    dur: 7,
    blend: 0, // 0 = at approach point, 1 = fully in the pose
    walkPhase: 0,
    moving: 0,
    lastId: 'rug',
    reqN: 0
  });

  useEffect(() => {
    if (!wave) return;
    waveT.current = 0;
    setGreeting(greetings[(wave - 1) % greetings.length]);
    const id = window.setTimeout(() => setGreeting(null), 3200);
    return () => window.clearTimeout(id);
  }, [wave]);

  // greet once on arrival
  useEffect(() => {
    const id = window.setTimeout(() => doWave(), 2600);
    return () => window.clearTimeout(id);
  }, [doWave]);

  /** Decide what to do next and start walking there. */
  const goTo = (act: Activity) => {
    const s = st.current;
    s.prev = s.act;
    s.act = act;
    s.lastId = act.id;
    const target = new THREE.Vector2(...act.approach);
    const path: THREE.Vector2[] = [];
    // go through the open middle of the room so she never clips through furniture
    if (s.pos.distanceTo(HUB) > 1.2 && target.distanceTo(HUB) > 1.2) path.push(HUB.clone());
    path.push(target);
    s.path = path;
    s.phase = s.blend > 0.01 ? 'exit' : 'walk';
    s.t = 0;
    setStatus(s.pos.distanceTo(target) < 0.2 ? null : `🚶 heading to ${act.place}`);
  };

  const pickNext = () => {
    const s = st.current;
    const { spot, music } = useStudio.getState();
    if (spot === 'about') return hello;
    if (music) return dance;
    const options = activities.filter((a) => a.id !== s.lastId);
    return options[Math.floor(Math.random() * options.length)];
  };

  useFrame(({ clock, pointer }, rawDt) => {
    const dt = Math.min(rawDt, 0.05);
    const t = clock.elapsedTime;
    const s = st.current;
    const { spot, music } = useStudio.getState();
    waveT.current += dt;
    const waving = waveT.current < 2.2;

    // interrupt for "About" (come say hi) or for music (dance)
    const wanted = spot === 'about' ? 'hello' : music ? 'dance' : null;
    if (wanted && s.act.id !== wanted) goTo(wanted === 'hello' ? hello : dance);
    // the user clicked something (e.g. the sofa) to call her over
    const req = useStudio.getState().request;
    if (req.n !== s.reqN) {
      s.reqN = req.n;
      const asked = activities.find((a) => a.id === req.id);
      if (asked && !wanted && s.act.id !== asked.id) goTo(asked);
    }
    if (!wanted && (s.act.id === 'hello' || s.act.id === 'dance') && s.phase === 'act')
      s.dur = Math.min(s.dur, s.t + 1.5);

    /* ---------------- state machine ---------------- */
    s.t += dt;
    if (s.phase === 'exit') {
      s.blend = Math.max(0, s.blend - dt / 0.6);
      if (s.blend <= 0) {
        s.phase = 'walk';
        s.pos.set(...s.prev.approach);
      }
    } else if (s.phase === 'walk') {
      const next = s.path[0];
      if (!next) {
        // arrived: turn to face the activity
        s.yaw = damp(s.yaw, angleTo(s.yaw, s.act.yaw), 8, dt);
        if (Math.abs(angleTo(s.yaw, s.act.yaw) - s.yaw) < 0.08) {
          s.phase = 'enter';
          s.t = 0;
          setStatus(s.act.label(useStudio.getState().night));
        }
      } else {
        const dir = next.clone().sub(s.pos);
        const dist = dir.length();
        const step = SPEED * dt;
        const heading = Math.atan2(dir.x, dir.y);
        s.yaw = damp(s.yaw, angleTo(s.yaw, heading), 10, dt);
        if (dist <= step) {
          s.pos.copy(next);
          s.path.shift();
        } else s.pos.addScaledVector(dir.normalize(), step);
      }
    } else if (s.phase === 'enter') {
      s.blend = Math.min(1, s.blend + dt / 0.7);
      if (s.blend >= 1) {
        s.phase = 'act';
        s.t = 0;
        s.dur = s.act.duration[0] + Math.random() * (s.act.duration[1] - s.act.duration[0]);
        if (s.act.id === 'cat') doMeow();
      }
    } else if (s.phase === 'act' && s.t > s.dur) {
      goTo(pickNext());
    }

    const moving = s.phase === 'walk' && s.path.length > 0 ? 1 : 0;
    s.moving = damp(s.moving, moving, 8, dt);
    s.walkPhase += dt * 9 * s.moving;
    avatarState.at =
      s.phase === 'enter' || s.phase === 'act' || s.phase === 'exit' ? s.act.id : null;

    /* ---------------- placement ---------------- */
    const a = s.phase === 'exit' ? s.prev : s.act;
    const at = a.at ?? a.approach;
    const e = THREE.MathUtils.smoothstep(s.blend, 0, 1);
    const inAct = s.phase !== 'walk';
    const px = inAct ? THREE.MathUtils.lerp(a.approach[0], at[0], e) : s.pos.x;
    const pz = inAct ? THREE.MathUtils.lerp(a.approach[1], at[1], e) : s.pos.y;
    if (inAct) s.pos.set(px, pz);
    const m = mover.current;
    if (m) {
      m.position.set(px, 0, pz);
      m.rotation.y = s.yaw;
    }
    const drop = (a.drop ?? 0) * (inAct ? e : 0);
    const bob = Math.abs(Math.sin(s.walkPhase)) * 0.05 * s.moving;
    if (root.current) root.current.position.y = drop + bob;
    if (bubbleAnchor.current) bubbleAnchor.current.position.y = 2.5 + drop;

    /* ---------------- pose targets ---------------- */
    const active = s.phase === 'act' || s.phase === 'enter';
    const anim: Anim = active ? a.anim : 'idle';
    const pose: Pose = inAct ? a.pose : 'stand';
    const w = Math.sin(s.walkPhase);
    const k = 12;

    let hip = 0;
    let knee = 0;
    if (pose === 'sit') {
      hip = -1.5 * e;
      knee = 1.5 * e;
    } else if (pose === 'crouch') {
      hip = -1.3 * e;
      knee = 2.0 * e;
    }
    const legSwing = 0.55 * s.moving;
    if (hipL.current)
      hipL.current.rotation.x = damp(hipL.current.rotation.x, hip - w * legSwing, k, dt);
    if (hipR.current)
      hipR.current.rotation.x = damp(hipR.current.rotation.x, hip + w * legSwing, k, dt);
    if (kneeL.current)
      kneeL.current.rotation.x = damp(
        kneeL.current.rotation.x,
        knee + Math.max(0, w) * 0.7 * s.moving,
        k,
        dt
      );
    if (kneeR.current)
      kneeR.current.rotation.x = damp(
        kneeR.current.rotation.x,
        knee + Math.max(0, -w) * 0.7 * s.moving,
        k,
        dt
      );

    // arms: [x (forward/back), z (out/in)] for right and left
    let rx = w * -0.45 * s.moving;
    let lx = w * 0.45 * s.moving;
    let rz = -0.12;
    let lz = 0.12;
    let headX = 0;
    let headY = 0;
    let headZ = 0;
    let bodyZ = 0;
    let bodyY = 0;
    const beat = t * Math.PI * 1.27;
    switch (anim) {
      case 'type':
        rx = -1.2 + Math.sin(t * 18) * 0.07;
        lx = -1.2 + Math.sin(t * 18 + 1.3) * 0.07;
        rz = 0.25;
        lz = -0.25;
        headX = 0.12 + Math.sin(t * 0.7) * 0.05;
        break;
      case 'read':
        rx = -1.05;
        lx = -1.05;
        rz = 0.45;
        lz = -0.45;
        headX = 0.32;
        headY = Math.sin(t * 0.9) * 0.12;
        break;
      case 'phone':
        rx = -1.25 + Math.sin(t * 3) * 0.04;
        lx = -0.95;
        rz = 0.35;
        lz = -0.2;
        headX = 0.35;
        break;
      case 'browse':
        rx = -0.9 + Math.sin(t * 4) * 0.15;
        lx = -0.85 + Math.sin(t * 4 + 1.5) * 0.15;
        rz = 0.2;
        lz = -0.2;
        headX = 0.3;
        headY = Math.sin(t * 1.2) * 0.2;
        break;
      case 'look':
        headX = -0.22;
        headY = Math.sin(t * 0.5) * 0.25;
        rx = -0.2;
        lx = -0.2;
        break;
      case 'pet':
        rx = -1.0 + Math.sin(t * 5) * 0.25;
        rz = 0.15;
        headX = 0.45;
        headZ = 0.15;
        break;
      case 'stretch':
        rz = -2.8 + Math.sin(t * 2) * 0.15;
        lz = 2.8 - Math.sin(t * 2) * 0.15;
        bodyZ = Math.sin(t * 1.4) * 0.12;
        headX = -0.15;
        break;
      case 'dance':
        rz = -1.4 + Math.sin(beat * 2) * 0.9;
        lz = 1.4 + Math.sin(beat * 2 + Math.PI) * 0.9;
        bodyZ = Math.sin(beat) * 0.1;
        bodyY = Math.abs(Math.sin(beat)) * 0.08;
        headZ = Math.sin(beat) * 0.15;
        break;
      case 'wave':
        rz = -2.6 + Math.sin(t * 12) * 0.35;
        break;
    }
    // facing the camera with nothing to do → follow the cursor with her eyes
    if (
      anim === 'wave' ||
      anim === 'stretch' ||
      anim === 'dance' ||
      (anim === 'idle' && s.moving < 0.1)
    ) {
      headY += pointer.x * 0.5;
      headX += -pointer.y * 0.2;
    }
    if (waving) {
      rx = 0;
      rz = -2.6 + Math.sin(waveT.current * 14) * 0.35;
    }

    if (armR.current) {
      armR.current.rotation.x = damp(armR.current.rotation.x, rx, k, dt);
      armR.current.rotation.z = damp(armR.current.rotation.z, rz, k, dt);
    }
    if (armL.current) {
      armL.current.rotation.x = damp(armL.current.rotation.x, lx, k, dt);
      armL.current.rotation.z = damp(armL.current.rotation.z, lz, k, dt);
    }
    if (head.current) {
      head.current.rotation.x = damp(head.current.rotation.x, headX, 6, dt);
      head.current.rotation.y = damp(head.current.rotation.y, headY, 6, dt);
      head.current.rotation.z = damp(head.current.rotation.z, headZ, 6, dt);
    }
    if (body.current) {
      body.current.rotation.z = damp(body.current.rotation.z, bodyZ, 8, dt);
      body.current.position.y = damp(
        body.current.position.y,
        bodyY + Math.sin(t * 2) * 0.012,
        10,
        dt
      );
    }
    if (eyes.current) {
      const blink = t % 4 < 0.12 ? 0.1 : 1;
      eyes.current.scale.y = damp(eyes.current.scale.y, blink, 30, dt);
    }
    const showProp = (g: THREE.Group | null, on: boolean) => {
      if (!g) return;
      const sc = damp(g.scale.x, on ? 1 : 0, 10, dt);
      g.scale.setScalar(sc);
      g.visible = sc > 0.02;
    };
    showProp(book.current, active && a.prop === 'book');
    showProp(phone.current, active && a.prop === 'phone');
  });

  const mat = (color: string, r = 0.7) => <meshStandardMaterial color={color} roughness={r} />;

  const leg = (
    side: number,
    hipRef: React.RefObject<THREE.Group>,
    kneeRef: React.RefObject<THREE.Group>
  ) => (
    <group ref={hipRef} position={[side * 0.13, 0.68, 0]}>
      <mesh position-y={-0.17}>
        <capsuleGeometry args={[0.105, 0.16, 6, 12]} />
        {mat(jeans)}
      </mesh>
      <group ref={kneeRef} position-y={-0.34}>
        <mesh position-y={-0.14}>
          <capsuleGeometry args={[0.095, 0.14, 6, 12]} />
          {mat(jeans)}
        </mesh>
        <mesh position={[0, -0.27, 0.05]} scale={[1, 0.7, 1.4]}>
          <sphereGeometry args={[0.12, 16, 12]} />
          {mat('#fff7f2', 0.5)}
        </mesh>
      </group>
    </group>
  );

  const arm = (side: number, ref: React.RefObject<THREE.Group>) => (
    <group ref={ref} position={[side * 0.3, 1.25, 0]}>
      <mesh position-y={-0.25}>
        <capsuleGeometry args={[0.075, 0.36, 6, 10]} />
        {mat(top, 0.9)}
      </mesh>
      <mesh position-y={-0.52}>
        <sphereGeometry args={[0.075, 12, 10]} />
        {mat(skin)}
      </mesh>
    </group>
  );

  return (
    <group ref={mover} position={[0.2, 0, 0.5]} rotation-y={Math.PI / 4}>
      <Hotspot
        id="avatar"
        label={`Say hi to ${profile.firstName}`}
        onSelect={() => {
          doWave();
          if (useStudio.getState().spot === 'room') setSpot('about');
        }}
        lift={0.03}
      >
        <group ref={root}>
          {leg(-1, hipR, kneeR)}
          {leg(1, hipL, kneeL)}
          <group ref={body}>
            <mesh position-y={0.98}>
              <capsuleGeometry args={[0.26, 0.42, 8, 20]} />
              {mat(top, 0.9)}
            </mesh>
            <mesh position-y={0.72}>
              <cylinderGeometry args={[0.29, 0.34, 0.16, 24]} />
              {mat(top, 0.9)}
            </mesh>
            {arm(-1, armR)}
            {arm(1, armL)}
            {/* props */}
            <group ref={book} position={[0, 1.02, 0.42]} rotation-x={-0.7} scale={0}>
              {[-1, 1].map((sd) => (
                <mesh key={sd} position-x={sd * 0.13} rotation-y={sd * -0.25}>
                  <boxGeometry args={[0.26, 0.34, 0.03]} />
                  <meshStandardMaterial color={sd > 0 ? '#fffaf0' : '#fff4e6'} roughness={0.9} />
                </mesh>
              ))}
              <mesh position-z={-0.02}>
                <boxGeometry args={[0.56, 0.36, 0.02]} />
                <meshStandardMaterial color={palette.rose} />
              </mesh>
            </group>
            <group ref={phone} position={[-0.08, 1.08, 0.4]} rotation-x={-0.9} scale={0}>
              <mesh castShadow>
                <boxGeometry args={[0.14, 0.26, 0.02]} />
                <meshStandardMaterial color="#222" roughness={0.3} />
              </mesh>
              <mesh position-z={0.011}>
                <planeGeometry args={[0.12, 0.23]} />
                <meshBasicMaterial color="#ff9ec0" toneMapped={false} />
              </mesh>
            </group>
            <mesh position-y={1.42}>
              <cylinderGeometry args={[0.07, 0.08, 0.12, 12]} />
              {mat(skin)}
            </mesh>
            <group ref={head} position-y={1.75}>
              <mesh castShadow>
                <sphereGeometry args={[0.36, 32, 24]} />
                {mat(skin, 0.6)}
              </mesh>
              <mesh position={[0, 0.07, -0.04]} scale={[1.07, 1.02, 1.07]}>
                <sphereGeometry args={[0.36, 32, 24, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
                {mat(hair, 0.5)}
              </mesh>
              <mesh position={[0, -0.22, -0.16]} scale={[1, 1, 0.55]}>
                <capsuleGeometry args={[0.33, 0.45, 8, 20]} />
                {mat(hair, 0.5)}
              </mesh>
              {[-0.16, 0, 0.16].map((x, i) => (
                <mesh
                  key={x}
                  position={[x, 0.2, 0.27]}
                  rotation={[0.5, 0, (i - 1) * -0.4]}
                  scale={[1, 1.1, 0.5]}
                >
                  <sphereGeometry args={[0.14, 14, 10]} />
                  {mat(hair, 0.5)}
                </mesh>
              ))}
              <group position={[0.24, 0.3, 0.1]} rotation-z={-0.4}>
                {[-1, 1].map((sd) => (
                  <mesh key={sd} position-x={sd * 0.07} rotation-z={(sd * Math.PI) / 2}>
                    <coneGeometry args={[0.07, 0.13, 12]} />
                    {mat(palette.rose, 0.5)}
                  </mesh>
                ))}
              </group>
              <group ref={eyes} position={[0, 0.0, 0.33]}>
                {[-0.12, 0.12].map((x) => (
                  <mesh key={x} position={[x, 0, 0]} scale={[1, 1.3, 0.5]}>
                    <sphereGeometry args={[0.045, 12, 10]} />
                    <meshStandardMaterial color="#1c1420" roughness={0.2} />
                  </mesh>
                ))}
              </group>
              {[-0.19, 0.19].map((x) => (
                <mesh key={x} position={[x, -0.09, 0.3]} scale={[1, 0.6, 0.3]}>
                  <sphereGeometry args={[0.05, 10, 8]} />
                  <meshBasicMaterial color="#ff9db5" transparent opacity={0.7} />
                </mesh>
              ))}
              <mesh position={[0, -0.12, 0.34]} rotation-z={Math.PI}>
                <torusGeometry args={[0.045, 0.012, 6, 12, Math.PI]} />
                <meshStandardMaterial color="#9b3a4d" />
              </mesh>
            </group>
          </group>
        </group>
      </Hotspot>
      <BlobShadow size={1.2} opacity={0.4} />
      <group ref={bubbleAnchor} position-y={2.5}>
        {(greeting || status) && (
          <Html center zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
            {greeting ? (
              <div className="studio-bubble">{greeting}</div>
            ) : (
              <div key={status} className="studio-status">
                {status}
              </div>
            )}
          </Html>
        )}
      </group>
    </group>
  );
};
