import { create } from 'zustand';

export type Spot = 'room' | 'projects' | 'skills' | 'experience' | 'awards' | 'about' | 'music';

/** Where the camera sits and what it looks at for each spot. */
export const views: Record<
  Spot,
  { pos: [number, number, number]; target: [number, number, number] }
> = {
  room: { pos: [19.5, 16.2, 19.5], target: [0, 1.6, 0] },
  projects: { pos: [3.7, 4.6, 2.0], target: [3.4, 2.2, -4.9] },
  skills: { pos: [-2.4, 3.9, 2.4], target: [-5.2, 2.1, -5.0] },
  experience: { pos: [0.2, 3.5, 4.0], target: [-7.0, 2.6, 2.4] },
  awards: { pos: [0.8, 4.0, -2.1], target: [-7.0, 3.1, -2.45] },
  about: { pos: [4.6, 3.3, 5.1], target: [0.2, 1.3, 0.5] },
  music: { pos: [-1.8, 3.2, 4.6], target: [-6.2, 1.2, 2.4] }
};

export const tabs: { id: Spot; label: string }[] = [
  { id: 'room', label: 'Room' },
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'awards', label: 'Awards' },
  { id: 'about', label: 'About' }
];

interface StudioState {
  spot: Spot;
  hovered: string | null;
  night: boolean;
  music: boolean;
  projectIndex: number;
  modalOpen: boolean;
  hd: boolean;
  /** screen-space ambient occlusion — the priciest HD effect, dropped first on slow GPUs */
  ao: boolean;
  setAo: (ao: boolean) => void;
  setHd: (hd: boolean) => void;
  wave: number;
  meow: number;
  setSpot: (s: Spot) => void;
  setHovered: (h: string | null) => void;
  toggleNight: () => void;
  toggleMusic: () => void;
  setProjectIndex: (i: number) => void;
  setModalOpen: (o: boolean) => void;
  doWave: () => void;
  doMeow: () => void;
}

const startsAtNight = () => {
  const h = new Date().getHours();
  return h >= 18 || h < 6;
};

export const useStudio = create<StudioState>((set) => ({
  spot: 'room',
  hovered: null,
  night: startsAtNight(),
  music: false,
  projectIndex: 0,
  modalOpen: false,
  hd: true,
  ao: true,
  setAo: (ao) => set({ ao }),
  setHd: (hd) => set({ hd }),
  wave: 0,
  meow: 0,
  setSpot: (spot) => set({ spot }),
  setHovered: (hovered) => set({ hovered }),
  toggleNight: () => set((s) => ({ night: !s.night })),
  toggleMusic: () => set((s) => ({ music: !s.music })),
  setProjectIndex: (projectIndex) => set({ projectIndex }),
  setModalOpen: (modalOpen) => set({ modalOpen }),
  doWave: () => set((s) => ({ wave: s.wave + 1 })),
  doMeow: () => set((s) => ({ meow: s.meow + 1 }))
}));
