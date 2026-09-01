export type WorldMode = 'all' | 'build' | 'design' | 'ar';
export type CursorType = 'default' | 'pointer' | 'view' | 'try-lens' | 'explore' | 'open' | 'play' | 'drag';

export interface PersonalInfo {
  name: string;
  shortName: string;
  titles: string;
  positioning: string;
  brandStatement: string;
  tagline: string;
  location: string;
  phone?: string;
  whatsappNumber?: string;
  portfolioUrl?: string;
  email: string;
  github: string;
  linkedin: string;
  snapchat: string;
  snapchatCreator: string;
  snapchatAccount: string;
  snapchatHandle: string;
  whatsapp: string;
  availability: string;
  bio: string;
  equation: {
    part1: string;
    part2: string;
    part3: string;
    result: string;
  };
}

export interface Project {
  id: string;
  title: string;
  category: 'build' | 'design' | 'ar';
  subtitle: string;
  tagline: string;
  description: string;
  problem: string;
  solution: string;
  architecture?: string[];
  features: string[];
  technologies: string[];
  metrics?: { label: string; value: string }[];
  liveUrl?: string;
  githubUrl?: string;
  snapcodeUrl?: string;
  previewType: 'image' | 'video' | 'interactive';
  previewUrl: string;
  accentColor: string;
  role: string;
  stats?: { views?: string; shares?: string; accuracy?: string; users?: string };
}

export interface DesignItem {
  id: string;
  title: string;
  category: 'thumbnails' | 'social' | 'branding' | 'posters' | 'flyers' | 'ui' | 'marketing';
  clientOrProject: string;
  role: string;
  tools: string[];
  process: string[];
  imageUrl: string;
  aspectRatio: string;
  accentColor: string;
  metrics?: string;
  tags: string[];
}

export interface ARLens {
  id: string;
  name: string;
  type: 'Face Effect' | 'World AR' | 'Interactive Experience' | 'Segmented Filter' | 'Brand Experience';
  builtWith: string;
  description: string;
  uuid?: string;
  snapcodeSvgUrl?: string;
  lensUrl?: string;
  previewGifOrImg: string;
  features: string[];
  stats: {
    views?: string;
    shares?: string;
    plays?: string;
  };
  accentColor: string;
  interactiveType: 'sunglasses' | 'cyberpunk' | 'aura' | 'particles' | 'retrogaming';
}

export interface SkillNode {
  id: string;
  name: string;
  category: 'code' | 'design' | 'ar' | 'ai';
  level: number; // 1-100
  description: string;
  connectedProjects: string[];
  x?: number;
  y?: number;
}

export interface ServiceItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  deliverables: string[];
  accentColor: string;
  iconName: string;
}

export interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  location: string;
  highlights: string[];
  technologies: string[];
  category?: 'software' | 'design_ar' | 'entrepreneurship' | 'leadership' | 'academic';
}

export interface EducationItem {
  degree: string;
  institution: string;
  school?: string;
  location: string;
  period: string;
  coursework?: string[];
  highlights?: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  projectType: string;
  message: string;
  date: string;
  status: 'new' | 'read' | 'replied';
}

export interface AdminConfig {
  email: string;
  pin: string;
  lastLogin?: string;
}

export interface FullPortfolioData {
  personalInfo: PersonalInfo;
  buildProjects: Project[];
  designItems: DesignItem[];
  arLenses: ARLens[];
  skillNodes: SkillNode[];
  services: ServiceItem[];
  experience: ExperienceItem[];
  contactMessages: ContactMessage[];
  adminConfig: AdminConfig;
}
