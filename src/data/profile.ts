import type { SkillGroup } from '../types/portfolio';

export const profile = {
  name: 'Tiara Mamuaya',
  firstName: 'Tiara',
  role: 'Mobile Application Developer',
  institution: 'Universitas Klabat (UNKLAB)',
  department: 'Faculty of Computer Science — Informatics',
  location: 'Airmadidi, North Sulawesi, Indonesia',
  headline: 'Building smooth, modern & engaging mobile experiences.',
  bio: [
    'I’m an Informatics student at Universitas Klabat with a deep focus on mobile application engineering.',
    'I design and build cross-platform Android & iOS apps with React Native and Expo, backed by reliable services like Python Flask and Supabase.'
  ],
  motto: 'Transforming creative ideas into elegant, pixel-perfect mobile apps.',
  loves: ['Clean architecture', 'Fluid animations', 'User-centric UI/UX', 'Music & coffee'],
  availability: 'Open for internships, mobile projects & collaborations'
};

// Leave a link empty ('') to hide its button everywhere.
export const contact = {
  email: 'tiaramamuaya@gmail.com',
  whatsapp: '', // digits only with country code, e.g. '6281234567890'
  github: '',
  linkedin: '',
  instagram: ''
};

export const skills: SkillGroup[] = [
  { label: 'Mobile', items: ['React Native', 'Expo', 'React Navigation'] },
  { label: 'Frontend', items: ['TypeScript', 'JavaScript (ES6+)', 'HTML & CSS', 'Vite'] },
  { label: 'Backend & Data', items: ['Python', 'Flask (REST)', 'Supabase', 'PostgreSQL'] },
  { label: 'Tools', items: ['Git & GitHub', 'VS Code', 'Figma', 'Postman', 'Android Studio'] }
];
