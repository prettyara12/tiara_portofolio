import React from 'react';
import { ArrowUp } from 'lucide-react';
import { profile } from '../data/profile';

export const Footer: React.FC = () => (
  <footer className="border-t border-line">
    <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-8 text-sm text-muted sm:px-8">
      <p>
        © {new Date().getFullYear()} {profile.name}
      </p>
      <a href="#home" className="inline-flex items-center gap-2 transition-colors hover:text-accent">
        Back to top <ArrowUp size={14} />
      </a>
    </div>
  </footer>
);
