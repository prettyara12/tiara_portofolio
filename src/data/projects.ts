import type { Project } from '../types/portfolio';

// PLACEHOLDER entries for previewing the design — replace with real projects.
// An empty array hides the whole section and its nav link.
export const projects: Project[] = [
  {
    id: 'campus-hub',
    title: 'Campus Hub',
    summary: 'A student companion app: class schedule, announcements and a digital student card.',
    description:
      'Placeholder description. Explain the problem, who it was for, what you built and what you learned. Two or three short paragraphs work best.',
    year: '2025',
    role: 'Mobile developer',
    stack: ['React Native', 'Expo', 'Supabase'],
    highlights: ['Offline-first schedule cache', 'Push notifications before each class', 'Row-level security on student data'],
    repoUrl: '',
    liveUrl: ''
  },
  {
    id: 'event-tracker',
    title: 'Event Tracker',
    summary: 'Discover and check in to campus events with QR codes.',
    description: 'Placeholder description. Replace with the real story of this project.',
    year: '2024',
    role: 'Full-stack developer',
    stack: ['React Native', 'Flask', 'PostgreSQL'],
    highlights: ['QR check-in', 'REST API in Flask', 'Admin dashboard'],
    repoUrl: '',
    liveUrl: ''
  }
];
