import React from 'react';
import { Code2 } from 'lucide-react';

interface TechIconProps {
  name: string;
  className?: string;
}

export const TechIcon: React.FC<TechIconProps> = ({ name, className = 'size-5' }) => {
  const normalized = name.toLowerCase().trim();

  // React Native
  if (normalized.includes('react native')) {
    return (
      <svg viewBox="-11.5 -10.23 23 20.46" className={className} aria-hidden="true">
        <circle cx="0" cy="0" r="2.05" fill="#61DAFB" />
        <g stroke="#61DAFB" strokeWidth="1" fill="none">
          <ellipse rx="11" ry="4.2" />
          <ellipse rx="11" ry="4.2" transform="rotate(60)" />
          <ellipse rx="11" ry="4.2" transform="rotate(120)" />
        </g>
      </svg>
    );
  }

  // React Navigation
  if (normalized.includes('navigation')) {
    return (
      <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
        <circle cx="12" cy="12" r="9" stroke="#7B61FF" strokeWidth="2" />
        <polygon points="12,6 16.5,16.5 12,14 7.5,16.5" fill="#7B61FF" />
      </svg>
    );
  }

  // Expo
  if (normalized.includes('expo')) {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
        <path d="M3.24 19.5L12 4.26l8.76 15.24H3.24zm8.76-11.48L7.14 17.1h9.72L12 8.02z" />
      </svg>
    );
  }

  // TypeScript
  if (normalized.includes('typescript')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#3178C6" />
        <path
          fill="#ffffff"
          d="M11.5 8.5H5.5v2.2h1.8v6.8h2.3v-6.8h1.9V8.5zm3.2 4.6c.7.4 1.4.7 2.1.7.7 0 1.1-.3 1.1-.7 0-.5-.5-.7-1.4-1.1-1.3-.5-2.2-1.2-2.2-2.3 0-1.4 1.1-2.4 2.8-2.4 1 0 1.9.3 2.5.7l-.6 1.8c-.5-.3-1.2-.6-1.9-.6-.6 0-1 .3-1 .6 0 .4.4.6 1.3 1 1.5.5 2.3 1.2 2.3 2.4 0 1.5-1.1 2.5-3 2.5-1.1 0-2.2-.4-2.8-.8l.8-1.8z"
        />
      </svg>
    );
  }

  // JavaScript
  if (normalized.includes('javascript')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <rect width="24" height="24" rx="4" fill="#F7DF1E" />
        <path
          fill="#000000"
          d="M7 16.5c.7.5 1.5.8 2.3.8 1.3 0 2-.6 2-1.9v-5.2h-2.1v5.1c0 .4-.2.6-.6.6-.4 0-.8-.2-1.1-.5l-.5 1.1zm6.5-1.1c.9.5 1.8.8 2.8.8 1.5 0 2.4-.7 2.4-1.8 0-1.1-.8-1.6-2.1-2.1-1-.4-1.5-.7-1.5-1.3 0-.5.4-.9 1.1-.9.7 0 1.4.3 1.9.6l.5-1.3c-.6-.4-1.4-.6-2.3-.6-1.5 0-2.4.8-2.4 1.9 0 1.1.7 1.6 1.9 2.1 1.1.4 1.7.8 1.7 1.4 0 .6-.5 1-1.3 1-.8 0-1.7-.3-2.3-.7l-.7 1.2z"
        />
      </svg>
    );
  }

  // HTML & CSS
  if (normalized.includes('html') || normalized.includes('css')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <path d="M3 3h18l-1.6 16.2L12 22l-7.4-2.8L3 3z" fill="#E34F26" />
        <path d="M12 4.6v15.6l5.8-2.2 1.3-13.4H12z" fill="#EF652A" />
        <path
          d="M7.2 7.5h9.6l-.3 2.5H9.7l.2 2.5h6.6l-.6 6-3.9 1.1-3.9-1.1-.2-2.8h2l.1 1.4 2 .5 2-.5.3-2.8H7.5l-.3-6.7z"
          fill="#FFFFFF"
        />
      </svg>
    );
  }

  // Vite
  if (normalized.includes('vite')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <defs>
          <linearGradient id="viteGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#41D1FF" />
            <stop offset="100%" stopColor="#BD34FE" />
          </linearGradient>
        </defs>
        <path
          fill="url(#viteGrad)"
          d="M21.7 3.6L12.9 22.3a1 1 0 01-1.8 0L2.3 3.6a1 1 0 011.2-1.4l8.5 2.9 8.5-2.9a1 1 0 011.2 1.4z"
        />
        <path
          fill="#FFD62E"
          d="M12.9 4.3l-4 7.5h3.3l-1.5 6.2 5.5-8.5h-3.3l1.8-4.2a.5.5 0 00-.9-.5l-.9-.5z"
        />
      </svg>
    );
  }

  // Python
  if (normalized.includes('python')) {
    return (
      <svg viewBox="0 0 128 128" className={className} aria-hidden="true">
        <path
          fill="#3776AB"
          d="M63.5 8c-24.8 0-23.3 10.8-23.3 10.8l.1 11.2h23.7v3.4H30.4S15.6 31.7 15.6 56.4s13 24 13 24h7.8v-11.3s-.4-13 12.8-13h22.1s12.4.2 12.4-12.2V20.4S85.2 8 63.5 8zm-12.8 7.3c2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4z"
        />
        <path
          fill="#FFD43D"
          d="M64.5 120c24.8 0 23.3-10.8 23.3-10.8l-.1-11.2H64v-3.4h33.6s14.8 1.7 14.8-23-13-24-13-24h-7.8v11.3s.4 13-12.8 13H56.7s-12.4-.2-12.4 12.2v23.5s-1.5 12.4 20.2 12.4zm12.8-7.3c-2.4 0-4.4-2-4.4-4.4 0-2.4 2-4.4 4.4-4.4 2.4 0 4.4 2 4.4 4.4 0 2.4-2 4.4-4.4 4.4z"
        />
      </svg>
    );
  }

  // Flask
  if (normalized.includes('flask')) {
    return (
      <svg
        viewBox="0 0 24 24"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <path d="M9 3h6M10 3v5l-4.5 8.5A2 2 0 007.2 19.5h9.6a2 2 0 001.7-3L14 8V3" />
        <path d="M8 14h8" />
        <circle cx="10" cy="16.5" r="0.75" fill="currentColor" />
        <circle cx="13.5" cy="15.5" r="0.75" fill="currentColor" />
      </svg>
    );
  }

  // Supabase
  if (normalized.includes('supabase')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="supaGrad" x1="12" y1="2" x2="12" y2="22" gradientUnits="userSpaceOnUse">
            <stop stopColor="#24E395" />
            <stop offset="1" stopColor="#3ECF8E" />
          </linearGradient>
        </defs>
        <path
          d="M12.9 2.1c-.5-.8-1.7-.5-1.8.4L9.5 12.3a.9.9 0 00.9 1h7.4c.8 0 1.3.8.9 1.5l-6.8 9c-.6.8-1.8.4-1.8-.6l1.6-9.8a.9.9 0 00-.9-1H4.3c-.8 0-1.3-.8-.9-1.5l8.6-8.9.9.1z"
          fill="url(#supaGrad)"
        />
      </svg>
    );
  }

  // PostgreSQL
  if (normalized.includes('postgres') || normalized.includes('sql')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#336791" aria-hidden="true">
        <path d="M12 2C7 2 3.8 5.4 3.8 9.5c0 3.2 2 6 4.9 7.1-.1.7-.3 1.9-.8 2.8-.2.4.1.9.6.8 1.9-.3 3.6-1.4 4.5-2.6 1.4.3 2.9.1 4.2-.6 2.8-1.5 4.8-4.3 4.8-7.5C22 5.4 17.5 2 12 2zm3.8 8.4c-.6.6-1.5.8-2.3.6-.8-.2-1.3-.9-1.4-1.7-.1-.9.4-1.8 1.2-2.1.8-.3 1.8-.1 2.3.6.6.7.6 1.9.2 2.6z" />
      </svg>
    );
  }

  // Git / GitHub
  if (normalized.includes('git')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
        />
      </svg>
    );
  }

  // VS Code
  if (normalized.includes('code') || normalized.includes('vs code')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#007ACC" aria-hidden="true">
        <path d="M17.6 2.2l-8.4 7.6-4.6-3.5L2 7.7v8.6l2.6 1.4 4.6-3.5 8.4 7.6 4.4-2.1V4.3l-4.4-2.1zm0 4.6v10.4l-6-5.2 6-5.2z" />
      </svg>
    );
  }

  // Figma
  if (normalized.includes('figma')) {
    return (
      <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
        <path d="M8 2a3.5 3.5 0 000 7h3.5V2H8z" fill="#F24E1E" />
        <path d="M11.5 2h3.5a3.5 3.5 0 010 7h-3.5V2z" fill="#FF7262" />
        <path d="M8 9a3.5 3.5 0 000 7h3.5V9H8z" fill="#A259FF" />
        <path d="M11.5 9h3.5a3.5 3.5 0 010 7h-3.5V9z" fill="#1ABCFE" />
        <path d="M8 16a3.5 3.5 0 003.5 3.5V16H8z" fill="#0ACF83" />
      </svg>
    );
  }

  // Postman
  if (normalized.includes('postman')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#FF6C37" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M8 15.5l5-7 3 2.5-5 7-3-2.5zm4.2-4.8l2 1.7.9-1.2-2-1.7-.9 1.2z" fill="#FFFFFF" />
      </svg>
    );
  }

  // Android Studio / Android
  if (normalized.includes('android')) {
    return (
      <svg viewBox="0 0 24 24" className={className} fill="#3DDC84" aria-hidden="true">
        <path d="M6 14a6 6 0 0112 0H6z" />
        <line x1="8" y1="8.5" x2="6.5" y2="6" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
        <line x1="16" y1="8.5" x2="17.5" y2="6" stroke="#3DDC84" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="9.5" cy="11.5" r="0.9" fill="#FFFFFF" />
        <circle cx="14.5" cy="11.5" r="0.9" fill="#FFFFFF" />
      </svg>
    );
  }

  return <Code2 className={className} />;
};
