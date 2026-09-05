export type ProjectCategory = 'all' | 'mobile' | 'fullstack';

export interface AppScreen {
  id: string;
  name: string;
  icon: string;
  headerTitle: string;
  subtitle: string;
  badge?: string;
  mockContent: {
    heroMetric?: { label: string; value: string; trend?: string };
    listItems: Array<{
      title: string;
      desc: string;
      time?: string;
      status?: string;
      icon?: string;
      badgeColor?: string;
    }>;
    actionLabel?: string;
  };
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  category: 'mobile' | 'fullstack';
  featured: boolean;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  architecture: string[];
  features: string[];
  challenges: string;
  metrics: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
  apkDownloadUrl?: string;
  color: string;
  screens: AppScreen[];
}

export type SkillCategory = 'all' | 'mobile' | 'frontend' | 'backend' | 'tools';

export interface Skill {
  name: string;
  category: 'mobile' | 'frontend' | 'backend' | 'tools';
  level: number; // 0 - 100
  levelText: string;
  experience: string;
  icon: string;
  description: string;
  featured?: boolean;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location: string;
  type: 'academic' | 'internship' | 'organization';
  status: 'Current' | 'Completed';
  description: string;
  keyPoints: string[];
  skills: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  issuedDate: string;
  credentialId: string;
  credentialUrl?: string;
  category: 'Mobile' | 'Backend & Python' | 'Cloud & Database' | 'Academic';
  skillsCovered: string[];
  description: string;
  badgeColor?: string;
}

export interface BioStat {
  label: string;
  value: string;
  suffix?: string;
  detail: string;
  icon: string;
}

export interface SocialLink {
  name: string;
  url: string;
  label: string;
  icon: string;
  color?: string;
}
