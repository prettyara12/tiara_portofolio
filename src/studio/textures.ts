import * as THREE from 'three';

/** Procedural canvas textures — crisp at any DPR and nothing extra to download. */

const make = (w: number, h: number, draw: (c: CanvasRenderingContext2D) => void, aniso = 8) => {
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  draw(ctx);
  const tex = new THREE.CanvasTexture(canvas);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = aniso;
  return tex;
};

const rand = (seed: number) => () => {
  seed = (seed * 16807) % 2147483647;
  return (seed - 1) / 2147483646;
};

const SERIF = '"Instrument Serif", Georgia, serif';
const SANS = 'Geist, system-ui, sans-serif';

export const floorTexture = () => {
  const r = rand(7);
  const S = 2048;
  const tex = make(
    S,
    S,
    (c) => {
      const rows = 8;
      const h = S / rows;
      for (let i = 0; i < rows; i++) {
        let x = -r() * 800;
        while (x < S) {
          const w = 600 + r() * 520;
          const l = 50 + r() * 11;
          const hue = 24 + r() * 6;
          const sat = 40 + r() * 12;
          const g = c.createLinearGradient(x, 0, x + w, 0);
          g.addColorStop(0, `hsl(${hue}, ${sat}%, ${l - 2}%)`);
          g.addColorStop(0.5, `hsl(${hue}, ${sat}%, ${l + 2}%)`);
          g.addColorStop(1, `hsl(${hue}, ${sat}%, ${l - 1}%)`);
          c.fillStyle = g;
          c.fillRect(x, i * h, w, h);
          // wavy grain lines
          c.lineWidth = 1.5;
          for (let k = 0; k < 22; k++) {
            c.strokeStyle = r() > 0.5 ? 'rgba(90,52,24,0.12)' : 'rgba(255,225,185,0.12)';
            const y0 = i * h + r() * h;
            const amp = 2 + r() * 5;
            const f = 0.004 + r() * 0.01;
            c.beginPath();
            for (let gx = 0; gx <= w; gx += 16) {
              const yy = y0 + Math.sin((x + gx) * f) * amp;
              if (gx === 0) c.moveTo(x + gx, yy);
              else c.lineTo(x + gx, yy);
            }
            c.stroke();
          }
          // a knot now and then
          if (r() > 0.7) {
            c.fillStyle = 'rgba(80,45,20,0.25)';
            c.beginPath();
            c.ellipse(x + r() * w, i * h + h / 2, 14, 6, 0, 0, Math.PI * 2);
            c.fill();
          }
          c.fillStyle = 'rgba(55,30,12,0.55)';
          c.fillRect(x, i * h, 4, h);
          x += w;
        }
        c.fillStyle = 'rgba(55,30,12,0.6)';
        c.fillRect(0, i * h, S, 4);
        c.fillStyle = 'rgba(255,230,200,0.18)';
        c.fillRect(0, i * h + 4, S, 2);
      }
    },
    16
  );
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  return tex;
};

/** Very subtle plaster noise so walls don't look like flat plastic. */
export const plasterTexture = () => {
  const r = rand(21);
  const tex = make(512, 512, (c) => {
    c.fillStyle = '#ffffff';
    c.fillRect(0, 0, 512, 512);
    for (let i = 0; i < 26000; i++) {
      const v = 236 + Math.floor(r() * 19);
      c.fillStyle = `rgb(${v},${v},${v})`;
      c.fillRect(r() * 512, r() * 512, 1 + r() * 2, 1 + r() * 2);
    }
  });
  tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(4, 2);
  return tex;
};

export const skyTexture = (night: boolean) =>
  make(512, 512, (c) => {
    const g = c.createLinearGradient(0, 0, 0, 512);
    if (night) {
      g.addColorStop(0, '#0b1030');
      g.addColorStop(0.6, '#26214a');
      g.addColorStop(1, '#4a2b55');
    } else {
      g.addColorStop(0, '#7cc4f0');
      g.addColorStop(0.65, '#bfe3f5');
      g.addColorStop(1, '#ffd9cf');
    }
    c.fillStyle = g;
    c.fillRect(0, 0, 512, 512);
    const r = rand(night ? 3 : 11);
    if (night) {
      for (let i = 0; i < 90; i++) {
        c.fillStyle = `rgba(255,255,255,${0.4 + r() * 0.6})`;
        c.beginPath();
        c.arc(r() * 512, r() * 360, r() * 1.8 + 0.4, 0, Math.PI * 2);
        c.fill();
      }
      c.shadowColor = '#fff6d8';
      c.shadowBlur = 40;
      c.fillStyle = '#fff6d8';
      c.beginPath();
      c.arc(370, 120, 44, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;
      c.fillStyle = '#26214a';
      c.beginPath();
      c.arc(392, 106, 40, 0, Math.PI * 2);
      c.fill();
    } else {
      c.shadowColor = '#fff2b0';
      c.shadowBlur = 60;
      c.fillStyle = '#fff4c4';
      c.beginPath();
      c.arc(380, 120, 46, 0, Math.PI * 2);
      c.fill();
      c.shadowBlur = 0;
      c.fillStyle = 'rgba(255,255,255,0.9)';
      [
        [90, 150, 1],
        [250, 80, 0.8],
        [180, 260, 1.2]
      ].forEach(([x, y, s]) => {
        [0, 34, 70, 30].forEach((dx, k) => {
          c.beginPath();
          c.arc(x + dx * s, y - (k % 2) * 16 * s, (26 - (k % 2) * 4) * s, 0, Math.PI * 2);
          c.fill();
        });
      });
    }
    // hills + skyline
    c.fillStyle = night ? '#191533' : '#8fc49a';
    c.beginPath();
    c.moveTo(0, 512);
    for (let x = 0; x <= 512; x += 16)
      c.lineTo(x, 420 + Math.sin(x / 70) * 26 + Math.sin(x / 23) * 8);
    c.lineTo(512, 512);
    c.fill();
    c.fillStyle = night ? '#120f26' : '#6fa98a';
    for (let x = 0; x < 512; x += 34) {
      const h = 50 + r() * 70;
      c.fillRect(x, 470 - h, 26, h + 50);
      if (night) {
        for (let wy = 470 - h + 8; wy < 500; wy += 14)
          for (let wx = x + 4; wx < x + 22; wx += 8) {
            if (r() > 0.55) {
              c.fillStyle = '#ffd88a';
              c.fillRect(wx, wy, 4, 6);
            }
          }
        c.fillStyle = '#120f26';
      }
    }
  });

export const neonTexture = (text: string, color: string) =>
  make(1024, 256, (c) => {
    c.font = `italic 150px ${SERIF}`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.lineWidth = 6;
    c.shadowColor = color;
    for (let i = 0; i < 3; i++) {
      c.shadowBlur = 30 + i * 18;
      c.strokeStyle = color;
      c.strokeText(text, 512, 132);
    }
    c.shadowBlur = 8;
    c.fillStyle = '#fff';
    c.fillText(text, 512, 132);
  });

export const labelTexture = (text: string, bg = '#e7c27d', fg = '#3b2410') =>
  make(512, 96, (c) => {
    c.fillStyle = bg;
    c.fillRect(0, 0, 512, 96);
    c.strokeStyle = 'rgba(0,0,0,0.25)';
    c.lineWidth = 6;
    c.strokeRect(3, 3, 506, 90);
    c.fillStyle = fg;
    c.font = `600 44px ${SANS}`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.fillText(text.toUpperCase(), 256, 52);
  });

const wrap = (
  c: CanvasRenderingContext2D,
  text: string,
  x: number,
  y: number,
  maxW: number,
  lh: number,
  maxLines = 3
) => {
  const words = text.split(' ');
  let line = '';
  let lines = 0;
  for (const w of words) {
    const test = line ? `${line} ${w}` : w;
    if (c.measureText(test).width > maxW && line) {
      c.fillText(line, x, y + lines * lh);
      lines++;
      line = w;
      if (lines >= maxLines) return;
    } else line = test;
  }
  if (line) c.fillText(line, x, y + lines * lh);
};

export const corkboardTexture = (items: { role: string; organization: string; period: string }[]) =>
  make(2048, 1400, (c) => {
    const r = rand(5);
    c.fillStyle = '#c99a63';
    c.fillRect(0, 0, 2048, 1400);
    for (let i = 0; i < 9000; i++) {
      c.fillStyle = r() > 0.5 ? 'rgba(120,70,30,0.25)' : 'rgba(255,230,190,0.2)';
      c.fillRect(r() * 2048, r() * 1400, 3, 3);
    }
    const colors = ['#ffd6e0', '#fff1a8', '#c9f0dd', '#d6e4ff', '#ffe0c2', '#f0d6ff'];
    const shown = items.slice(0, 8);
    const pins: [number, number][] = [];
    shown.forEach((it, i) => {
      const col = i % 4;
      const row = Math.floor(i / 4);
      const x = 120 + col * 470 + r() * 30;
      const y = 120 + row * 620 + r() * 40;
      c.save();
      c.translate(x + 190, y + 210);
      c.rotate((r() - 0.5) * 0.12);
      c.shadowColor = 'rgba(0,0,0,0.35)';
      c.shadowBlur = 24;
      c.shadowOffsetY = 10;
      c.fillStyle = colors[i % colors.length];
      c.fillRect(-190, -210, 380, 420);
      c.shadowColor = 'transparent';
      c.fillStyle = '#b4235a';
      c.font = `600 30px ${SANS}`;
      c.fillText(it.period.toUpperCase(), -160, -130);
      c.fillStyle = '#1c1917';
      c.font = `italic 58px ${SERIF}`;
      wrap(c, it.role, -160, -60, 320, 56, 2);
      c.font = `400 32px ${SANS}`;
      c.fillStyle = '#4a433d';
      wrap(c, it.organization, -160, 90, 320, 40, 3);
      c.restore();
      pins.push([x + 190, y + 18]);
    });
    // string connecting the notes like a timeline
    c.strokeStyle = 'rgba(180,35,90,0.85)';
    c.lineWidth = 5;
    c.beginPath();
    pins.forEach(([x, y], i) =>
      i ? c.quadraticCurveTo((x + pins[i - 1][0]) / 2, y + 60, x, y) : c.moveTo(x, y)
    );
    c.stroke();
    pins.forEach(([x, y]) => {
      c.fillStyle = '#e0325f';
      c.beginPath();
      c.arc(x, y, 18, 0, Math.PI * 2);
      c.fill();
      c.fillStyle = 'rgba(255,255,255,0.6)';
      c.beginPath();
      c.arc(x - 5, y - 5, 6, 0, Math.PI * 2);
      c.fill();
    });
  });

export const phoneTexture = () =>
  make(256, 512, (c) => {
    const g = c.createLinearGradient(0, 0, 256, 512);
    g.addColorStop(0, '#ff8fb1');
    g.addColorStop(1, '#7b2ff7');
    c.fillStyle = g;
    c.fillRect(0, 0, 256, 512);
    c.fillStyle = 'rgba(255,255,255,0.95)';
    c.font = `600 22px ${SANS}`;
    c.fillText('9:41', 20, 36);
    c.font = `italic 46px ${SERIF}`;
    c.fillText('Hello!', 24, 120);
    for (let i = 0; i < 4; i++)
      for (let j = 0; j < 3; j++) {
        c.fillStyle = `rgba(255,255,255,${0.25 + ((i + j) % 3) * 0.15})`;
        c.beginPath();
        c.roundRect(24 + j * 72, 170 + i * 76, 56, 56, 14);
        c.fill();
      }
    c.fillStyle = 'rgba(255,255,255,0.8)';
    c.beginPath();
    c.roundRect(78, 482, 100, 8, 4);
    c.fill();
  });

export const glyphTexture = (glyph: string, color: string) =>
  make(128, 128, (c) => {
    c.font = `bold 96px ${SANS}`;
    c.textAlign = 'center';
    c.textBaseline = 'middle';
    c.shadowColor = color;
    c.shadowBlur = 12;
    c.fillStyle = color;
    c.fillText(glyph, 64, 70);
  });

export const clockFaceTexture = () =>
  make(512, 512, (c) => {
    c.fillStyle = '#fffaf3';
    c.beginPath();
    c.arc(256, 256, 250, 0, Math.PI * 2);
    c.fill();
    c.fillStyle = '#1c1917';
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      c.save();
      c.translate(256 + Math.sin(a) * 205, 256 - Math.cos(a) * 205);
      c.rotate(a);
      c.fillRect(-4, -(i % 3 === 0 ? 22 : 12), 8, i % 3 === 0 ? 44 : 24);
      c.restore();
    }
    c.fillStyle = '#b4235a';
    c.font = `italic 54px ${SERIF}`;
    c.textAlign = 'center';
    c.fillText('tiara', 256, 350);
  });
