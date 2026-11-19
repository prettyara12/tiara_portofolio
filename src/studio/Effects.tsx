import React, { useEffect } from 'react';
import * as THREE from 'three';
import { useThree } from '@react-three/fiber';
import {
  Bloom,
  EffectComposer,
  N8AO,
  SMAA,
  ToneMapping,
  Vignette
} from '@react-three/postprocessing';
import { ToneMappingMode } from 'postprocessing';
import { useStudio } from './store';

/** HD pipeline: ambient occlusion in the corners, glow on bulbs/neon, crisp edges, filmic tone. */
export const Effects: React.FC = () => {
  const gl = useThree((s) => s.gl);
  const ao = useStudio((s) => s.ao);
  useEffect(() => {
    gl.toneMapping = THREE.NoToneMapping;
    return () => {
      gl.toneMapping = THREE.ACESFilmicToneMapping;
    };
  }, [gl]);
  return (
    <EffectComposer multisampling={0} enableNormalPass={false}>
      <>
        {ao && (
          <N8AO
            aoRadius={0.9}
            distanceFalloff={0.6}
            intensity={2.2}
            quality="performance"
            halfRes
            color="#3a1e2a"
          />
        )}
      </>
      <Bloom
        mipmapBlur
        luminanceThreshold={0.95}
        luminanceSmoothing={0.2}
        intensity={0.75}
        radius={0.7}
      />
      <ToneMapping mode={ToneMappingMode.ACES_FILMIC} />
      <Vignette offset={0.3} darkness={0.35} />
      <SMAA />
    </EffectComposer>
  );
};

export default Effects;
