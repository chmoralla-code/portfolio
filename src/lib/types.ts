/**
 * Type definitions for the portfolio website.
 * These types define the shape of all editable content.
 */

export interface SocialLink {
  platform: string;
  url: string;
  icon?: string;
}

export interface Skill {
  id: string;
  name: string;
  category: string;
  level: number; // 1-100
  icon?: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  demoUrl?: string;
  repoUrl?: string;
  featured: boolean;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  location?: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone?: string;
  location?: string;
  availability?: string;
}

export interface Profile {
  name: string;
  title: string;
  tagline: string;
  profilePhoto: string;
  resumeUrl?: string;
}

export interface SectionHeading {
  title: string;
  subtitle?: string;
}

export interface SiteSettings {
  siteName: string;
  heroBackgroundUrl: string;
  accentColor: string;
  headings: {
    about: SectionHeading;
    skills: SectionHeading;
    projects: SectionHeading;
    experience: SectionHeading;
    contact: SectionHeading;
  };
}

export interface PortfolioData {
  profile: Profile;
  about: string;
  skills: Skill[];
  projects: Project[];
  experience: Experience[];
  socialLinks: SocialLink[];
  contact: ContactInfo;
  settings: SiteSettings;
}
