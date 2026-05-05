export interface Experience {
  id: string;
  company: string;
  position: string;
  position_en?: string;
  period: string;
  period_en?: string;
  description: string[];
  description_en?: string[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  tech: string[];
  link?: string;
  github?: string;
  image?: string;
}

export interface Education {
  id: string;
  institution: string;
  institution_en?: string;
  degree: string;
  degree_en?: string;
  period: string;
}

export interface Certificate {
  id: string;
  name: string;
  name_en?: string;
  issuer: string;
  issuer_en?: string;
  date: string;
  link?: string;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  title_en?: string;
  description: string;
  description_en?: string;
  date: string;
  link?: string;
  image?: string;
  content?: string; // Markdown content or path
  type: 'internal' | 'external';
}

export interface Profile {
  name: string;
  title: string;
  about: string;
  email: string;
  location: string;
  linkedin?: string;
  github?: string;
  instagram?: string;
  twitter?: string;
  os?: 'windows' | 'linux' | 'macos';
  mobile?: 'android' | 'ios';
  languages: { name: string; level: string }[];
  hobbies: string[];
  skills: string[];
}

export interface PortfolioData {
  profile: Profile;
  experience: Experience[];
  projects: Project[];
  education: Education[];
  certificates: Certificate[];
  articles: Article[];
  sections?: {
    projects: boolean;
    articles: boolean;
  };
}

export type Language = 'pt' | 'en';

export interface TranslationStrings {
  about: string;
  experience: string;
  projects: string;
  education: string;
  certificates: string;
  articles: string;
  languages: string;
  hobbies: string;
  skills: string;
  downloadCV: string;
  importProfile: string;
  importDescription: string;
  attachments: string;
  page: string;
  of: string;
  socials: string;
  platforms: string;
  readMore: string;
  back: string;
}
