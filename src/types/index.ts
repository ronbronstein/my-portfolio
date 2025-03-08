// File: src/types/index.ts
// Centralized type definitions

// Node types
export interface Node {
    id: string;
    title: string;
    x: number;
    y: number;
    isLocked: boolean;
    dependencies?: string[];
    lockMessage?: string;
  }
  
  // Content types
  export interface Project {
    id: string;
    title: string;
    slug: string;
    description: string;
    technologies: string[];
    imageUrl?: string;
    link?: string;
  }
  
  export interface Playlist {
    id: string;
    title: string;
    slug: string;
    description: string;
    spotifyEmbedUrl: string;
    genre?: string;
    mood?: string;
  }
  
  export interface Essay {
    id: string;
    title: string;
    slug: string;
    excerpt: string;
    substackUrl: string;
    category?: string;
    publishedAt: string;
  }
  
  export interface Sticker {
    id: string;
    title: string;
    slug: string;
    description: string;
    imageUrl: string;
    price?: number;
    shopUrl?: string;
  }
  
  export interface NodeContent {
    title: string;
    content: string;
    unlocksNodes: string[];
  }
  
  // Component prop types
  export interface MatrixRainProps {
    className?: string;
    density?: number;
    speed?: number;
    fontSize?: number;
    fadeAlpha?: number;
  }
  
  export interface BaseNodeProps {
    id: string;
    title: string;
    isLocked?: boolean;
    isActive?: boolean;
    isMobile?: boolean;
    onClick?: () => void;
  }
  
  export interface MatrixModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    children: React.ReactNode;
    isMobile?: boolean;
  }
  
  export interface TabSystemProps {
    tabs: { id: string; label: string }[];
    initialTabId?: string;
    children: (activeTabId: string) => React.ReactNode;
    isMobile?: boolean;
  }
  
  export type EasterEgg = 'konami' | 'matrix' | 'rabbit' | null;
