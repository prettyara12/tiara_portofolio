export interface Project {
  id: string;
  title: string;
  summary: string;
  description: string;
  year?: string;
  role?: string;
  stack: string[];
  highlights: string[];
  /** Path under /public, e.g. '/projects/campus-hub.webp' */
  image?: string;
  repoUrl?: string;
  liveUrl?: string;
}

export interface Experience {
  id: string;
  role: string;
  organization: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
}

export interface Certificate {
  id: string;
  title: string;
  issuer: string;
  date: string;
  /** Path under /public, e.g. '/certificates/meta-rn.webp' */
  image?: string;
  credentialUrl?: string;
}

export interface SkillGroup {
  label: string;
  items: string[];
}
