import React from 'react';
import { useStudio } from './store';
import { Hotspot } from './Hotspot';
import { Box, palette } from './Room';

/* ------------------------------------------------------------------ */
/* L-shaped sofa tucked into the front corner, running off to the left */
/* ------------------------------------------------------------------ */

const L = 4.4; // length of the long side (along -x)
const D = 1.05; // seat depth
const CH = 2.0; // how far the chaise sticks out in front of the long side
const BACK = 0.2; // back thickness
const ARM = 0.3; // armrest width
const SEAT = 0.64; // top of the seat cushions

const fabric = '#e6d6c3';
const fabricLight = '#f1e5d6';

// All coordinates below are relative to the corner: x grows to the left of the screen,
// z towards the middle of the room — so the sofa's back sits against the room's front edges.
const longSeatCx = [-1.82, -3.32];
const legs: [number, number][] = [
  [-4.3, -0.12],
  [-4.3, -0.93],
  [-2.3, -0.12],
  [-2.3, -0.93],
  [-0.95, -0.93],
  [-0.12, -0.12],
  [-0.12, -(D + CH) + 0.12],
  [-0.95, -(D + CH) + 0.12]
];

export const Sofa: React.FC<{ position: [number, number, number] }> = ({ position }) => {
  const requestAct = useStudio((s) => s.requestAct);
  return (
    <group position={position}>
      {/* rug underneath */}
      <Box
        size={[5.0, 0.025, 3.3]}
        position={[-2.4, 0.0125, -1.55]}
        color="#e8c9b9"
        cast={false}
        roughness={1}
      />
      <Box
        size={[4.6, 0.03, 2.9]}
        position={[-2.4, 0.0145, -1.55]}
        color="#f6e4d6"
        cast={false}
        roughness={1}
      />

      <Hotspot
        id="sofa"
        label="Sofa — call Tiara over"
        onSelect={() => requestAct('sofa')}
        lift={0.012}
      >
        {legs.map(([x, z]) => (
          <mesh key={`${x}${z}`} castShadow position={[x, 0.08, z]}>
            <cylinderGeometry args={[0.05, 0.035, 0.16, 10]} />
            <meshStandardMaterial color={palette.woodDark} roughness={0.6} />
          </mesh>
        ))}

        {/* frame */}
        <Box size={[L, 0.3, D]} position={[-L / 2, 0.29, -D / 2]} color="#cdb9a2" />
        <Box size={[1.05, 0.3, CH]} position={[-0.525, 0.29, -(D + CH / 2)]} color="#cdb9a2" />

        {/* backs */}
        <Box size={[L, 0.55, BACK]} position={[-L / 2, 0.68, -BACK / 2]} color={fabric} />
        <Box
          size={[BACK, 0.55, D + CH - BACK]}
          position={[-BACK / 2, 0.68, -(D + CH + BACK) / 2]}
          color={fabric}
        />

        {/* rolled armrest at the far end of the long side */}
        <Box size={[ARM, 0.62, D]} position={[-L + ARM / 2, 0.45, -D / 2]} color={fabric} />
        <mesh
          castShadow
          receiveShadow
          position={[-L + ARM / 2, 0.76, -D / 2]}
          rotation-x={Math.PI / 2}
        >
          <cylinderGeometry args={[ARM / 2, ARM / 2, D, 20]} />
          <meshStandardMaterial color={fabric} roughness={0.95} />
        </mesh>

        {/* seat cushions */}
        {longSeatCx.map((x) => (
          <Box
            key={x}
            size={[1.49, 0.2, D - BACK - 0.02]}
            position={[x, SEAT - 0.1, -(BACK + D) / 2]}
            color={fabricLight}
            roughness={0.95}
          />
        ))}
        <Box
          size={[0.85, 0.2, D - BACK - 0.02]}
          position={[-0.625, SEAT - 0.1, -(BACK + D) / 2]}
          color={fabricLight}
          roughness={0.95}
        />
        <Box
          size={[0.85, 0.2, CH - 0.02]}
          position={[-0.625, SEAT - 0.1, -(D + CH / 2)]}
          color={fabricLight}
          roughness={0.95}
        />

        {/* back cushions, leaning against the backs */}
        {longSeatCx.map((x) => (
          <Box
            key={x}
            size={[1.49, 0.5, 0.24]}
            position={[x, 0.9, -BACK - 0.13]}
            rotation-x={0.14}
            color={fabric}
            roughness={0.95}
          />
        ))}
        {[-0.625, -(D + 0.5), -(D + 1.5)].map((z, i) => (
          <Box
            key={z}
            size={[0.24, 0.5, i === 0 ? 0.85 : 0.98]}
            position={[-BACK - 0.13, 0.9, z]}
            rotation-z={-0.14}
            color={fabric}
            roughness={0.95}
          />
        ))}

        {/* throw pillows + a blanket */}
        <Box
          size={[0.5, 0.5, 0.14]}
          position={[-3.55, 0.92, -0.45]}
          rotation={[0.35, 0.3, 0.12]}
          color={palette.pink}
          roughness={0.95}
        />
        <Box
          size={[0.48, 0.48, 0.14]}
          position={[-2.45, 0.9, -0.46]}
          rotation={[0.32, -0.25, -0.1]}
          color={palette.sage}
          roughness={0.95}
        />
        <Box
          size={[0.14, 0.46, 0.46]}
          position={[-0.45, 0.88, -1.55]}
          rotation={[0.1, 0, -0.32]}
          color="#fff1a8"
          roughness={0.95}
        />
        <Box
          size={[0.8, 0.06, 0.95]}
          position={[-0.62, SEAT + 0.03, -2.45]}
          rotation-y={0.12}
          color="#f6c1cf"
          roughness={1}
        />
        <Box
          size={[0.76, 0.05, 0.5]}
          position={[-0.6, SEAT + 0.085, -2.3]}
          rotation-y={-0.1}
          color={palette.pink}
          roughness={1}
        />
      </Hotspot>
    </group>
  );
};
