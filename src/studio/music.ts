/**
 * A tiny generative lo-fi player built on WebAudio — no audio files to download.
 * Soft chord pads, a mellow plucked melody, dusty drums and vinyl crackle.
 */
const midi = (n: number) => 440 * Math.pow(2, (n - 69) / 12);

// Fmaj7 → Em7 → Dm7 → Cmaj7 (voiced low-mid)
const progression = [
  [53, 57, 60, 64],
  [52, 55, 59, 62],
  [50, 53, 57, 60],
  [48, 52, 55, 59]
];
const scale = [72, 74, 76, 79, 81, 84]; // C major pentatonic, upper register

export class LofiPlayer {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private filter!: BiquadFilterNode;
  private noise!: AudioBuffer;
  private crackle: AudioBufferSourceNode | null = null;
  private timer: number | null = null;
  private step = 0;
  private nextTime = 0;
  private readonly bpm = 76;

  start() {
    if (!this.ctx) this.init();
    const ctx = this.ctx!;
    ctx.resume();
    this.master.gain.cancelScheduledValues(ctx.currentTime);
    this.master.gain.setTargetAtTime(0.55, ctx.currentTime, 0.6);
    this.nextTime = ctx.currentTime + 0.1;
    this.startCrackle();
    if (this.timer === null) this.timer = window.setInterval(() => this.schedule(), 50);
  }

  stop() {
    if (!this.ctx) return;
    const ctx = this.ctx;
    this.master.gain.setTargetAtTime(0, ctx.currentTime, 0.25);
    if (this.timer !== null) window.clearInterval(this.timer);
    this.timer = null;
    window.setTimeout(() => {
      this.crackle?.stop();
      this.crackle = null;
    }, 1200);
  }

  dispose() {
    this.stop();
    window.setTimeout(() => this.ctx?.close(), 1400);
  }

  private init() {
    const ctx = new AudioContext();
    this.ctx = ctx;
    this.master = ctx.createGain();
    this.master.gain.value = 0;
    this.filter = ctx.createBiquadFilter();
    this.filter.type = 'lowpass';
    this.filter.frequency.value = 2400;
    this.filter.Q.value = 0.4;

    // simple feedback delay for space
    const delay = ctx.createDelay();
    delay.delayTime.value = 0.33;
    const fb = ctx.createGain();
    fb.gain.value = 0.28;
    const wet = ctx.createGain();
    wet.gain.value = 0.22;
    this.filter.connect(delay);
    delay.connect(fb).connect(delay);
    delay.connect(wet).connect(this.master);
    this.filter.connect(this.master);
    this.master.connect(ctx.destination);

    this.noise = ctx.createBuffer(1, ctx.sampleRate * 2, ctx.sampleRate);
    const d = this.noise.getChannelData(0);
    for (let i = 0; i < d.length; i++) d[i] = Math.random() * 2 - 1;
  }

  private startCrackle() {
    const ctx = this.ctx!;
    if (this.crackle) return;
    const buf = ctx.createBuffer(1, ctx.sampleRate * 3, ctx.sampleRate);
    const d = buf.getChannelData(0);
    for (let i = 0; i < d.length; i++) {
      d[i] =
        (Math.random() * 2 - 1) * 0.012 +
        (Math.random() < 0.0006 ? (Math.random() - 0.5) * 0.6 : 0);
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const hp = ctx.createBiquadFilter();
    hp.type = 'highpass';
    hp.frequency.value = 1500;
    src.connect(hp).connect(this.master);
    src.start();
    this.crackle = src;
  }

  private schedule() {
    const ctx = this.ctx!;
    const sixteenth = 60 / this.bpm / 4;
    while (this.nextTime < ctx.currentTime + 0.25) {
      this.playStep(this.step, this.nextTime, sixteenth);
      // slight swing on off-beats
      this.nextTime += sixteenth * (this.step % 2 === 0 ? 1.12 : 0.88);
      this.step = (this.step + 1) % 64;
    }
  }

  private playStep(step: number, t: number, s: number) {
    const bar = Math.floor(step / 16);
    const inBar = step % 16;
    if (inBar === 0) progression[bar].forEach((n) => this.pad(midi(n), t, s * 16));
    if (inBar === 0 || inBar === 10) this.kick(t);
    if (inBar === 4 || inBar === 12) this.snare(t);
    if (inBar % 2 === 0) this.hat(t, inBar % 4 === 2 ? 0.05 : 0.03);
    if (inBar % 2 === 0 && Math.random() < 0.32) {
      const n = scale[Math.floor(Math.random() * scale.length)];
      this.pluck(midi(n), t);
    }
  }

  private pad(f: number, t: number, len: number) {
    const ctx = this.ctx!;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.045, t + 0.4);
    g.gain.setTargetAtTime(0, t + len - 0.3, 0.25);
    g.connect(this.filter);
    [-6, 6].forEach((detune) => {
      const o = ctx.createOscillator();
      o.type = 'triangle';
      o.frequency.value = f;
      o.detune.value = detune;
      o.connect(g);
      o.start(t);
      o.stop(t + len + 1);
    });
  }

  private pluck(f: number, t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.type = 'sine';
    o.frequency.value = f;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.06, t + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.1);
    o.connect(g).connect(this.filter);
    o.start(t);
    o.stop(t + 1.2);
  }

  private kick(t: number) {
    const ctx = this.ctx!;
    const o = ctx.createOscillator();
    o.frequency.setValueAtTime(110, t);
    o.frequency.exponentialRampToValueAtTime(42, t + 0.18);
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.32, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.35);
    o.connect(g).connect(this.master);
    o.start(t);
    o.stop(t + 0.4);
  }

  private noiseHit(t: number, gain: number, type: BiquadFilterType, freq: number, len: number) {
    const ctx = this.ctx!;
    const src = ctx.createBufferSource();
    src.buffer = this.noise;
    const f = ctx.createBiquadFilter();
    f.type = type;
    f.frequency.value = freq;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    src.connect(f).connect(g).connect(this.master);
    src.start(t, Math.random());
    src.stop(t + len + 0.05);
  }

  private snare(t: number) {
    this.noiseHit(t, 0.09, 'bandpass', 1800, 0.22);
  }

  private hat(t: number, gain: number) {
    this.noiseHit(t, gain, 'highpass', 7000, 0.05);
  }
}

/** Short UI blips for clicks — synthesized, so nothing to load. */
let blipCtx: AudioContext | null = null;
export const blip = (freq = 660, len = 0.08, type: OscillatorType = 'sine', gain = 0.05) => {
  try {
    blipCtx ??= new AudioContext();
    const ctx = blipCtx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(freq, t);
    o.frequency.exponentialRampToValueAtTime(freq * 1.5, t + len);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.0001, t + len);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + len + 0.02);
  } catch {
    /* audio unavailable */
  }
};

export const meowSound = () => {
  try {
    blipCtx ??= new AudioContext();
    const ctx = blipCtx;
    const t = ctx.currentTime;
    const o = ctx.createOscillator();
    o.type = 'sawtooth';
    o.frequency.setValueAtTime(520, t);
    o.frequency.linearRampToValueAtTime(820, t + 0.12);
    o.frequency.linearRampToValueAtTime(480, t + 0.45);
    const f = ctx.createBiquadFilter();
    f.type = 'bandpass';
    f.frequency.value = 1200;
    f.Q.value = 3;
    const g = ctx.createGain();
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.12, t + 0.05);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 0.5);
    o.connect(f).connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + 0.55);
  } catch {
    /* audio unavailable */
  }
};
