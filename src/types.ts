// Type definitions for the blog theme

export interface Post {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: PostData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface PostData {
  title: string;
  date: Date;
  description: string | null;
  image?: string | null | undefined;
  imageAlt?: string | null | undefined;
  imageOG?: boolean;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  tags?: string[] | null | undefined;
  draft?: boolean;
  targetKeyword?: string | null | undefined;
  author?: string | null | undefined;
  noIndex?: boolean;
}

export interface Page {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: PageData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface PageData {
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  imageOG?: boolean;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  draft?: boolean;
  showTOC?: boolean;
  noIndex?: boolean;
  lastModified?: Date;
}

export interface Project {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: ProjectData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface ProjectData {
  title: string;
  description: string;
  date: Date;
  categories?: string[];
  repositoryUrl?: string;
  projectUrl?: string;
  status?: string | null;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  draft?: boolean;
  noIndex?: boolean;
  featured?: boolean;
}

export interface Docs {
  id: string;
  slug: string;
  body: string;
  collection: string;
  data: DocsData;
  render(): Promise<{ Content: any; headings: Heading[]; remarkPluginFrontmatter: any }>;
}

export interface DocsData {
  title: string;
  description: string;
  category?: string | null;
  order: number;
  lastModified?: Date;
  version?: string;
  image?: string;
  imageAlt?: string;
  hideCoverImage?: boolean;
  hideTOC?: boolean;
  draft?: boolean;
  noIndex?: boolean;
  showTOC?: boolean;
  featured?: boolean;
}

export interface Heading {
  depth: number;
  slug: string;
  text: string;
}

export interface ReadingTime {
  text: string;
  minutes: number;
  time: number;
  words: number;
}

export interface NavigationItem {
  title: string;
  url: string;
  external?: boolean;
  icon?: string;
}

export interface SocialLink {
  title: string;
  url: string;
  icon: string;
}

export interface CommandPaletteItem {
  id: string;
  title: string;
  description?: string;
  url: string;
  type: 'post' | 'page' | 'project' | 'docs' | 'social' | 'external' | 'action';
  icon?: string;
}

export interface SearchResult {
  item: CommandPaletteItem;
  score: number;
  matches: Array<{
    indices: Array<[number, number]>;
    value: string;
    key: string;
  }>;
}

export interface ImageInfo {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
}

export interface OpenGraphImage {
  url: string;
  alt: string;
  width: number;
  height: number;
}

export interface SEOData {  
  title: string;  
  description: string;  
  canonical: string;  
  ogImage?: OpenGraphImage;  
  ogType: 'website' | 'article';  
  publishedTime?: string;  
  modifiedTime?: string;  
  tags?: string[];  
  noIndex?: boolean;  
  robots?: string;  
  articleSection?: string;  
  twitter?: {  
    card?: string;  
    title?: string;  
    description?: string;  
    image?: string;  
  };  
  keywords?: string[];  
}

export interface WikilinkMatch {
  link: string;
  display: string;
  slug: string;
}

export interface LinkedMention {
  title: string;
  slug: string;
  excerpt: string;
}

export interface PaginationInfo {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
  nextUrl?: string;
  prevUrl?: string;
}