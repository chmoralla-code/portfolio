/**
 * Data persistence layer for the portfolio.
 *
 * - Primary: Supabase PostgreSQL (production / Vercel)
 * - Fallback: In-memory store + optional JSON file (local dev without Supabase)
 */

import { promises as fs } from "node:fs";
import path from "node:path";
import type { PortfolioData } from "./types";

// Attempt to import Supabase helpers; if env vars are missing, fall back gracefully
let supabaseLoad: (() => Promise<PortfolioData | null>) | undefined;
let supabaseSave: ((data: PortfolioData) => Promise<void>) | undefined;

try {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const supabaseModule = require("./supabase");
  supabaseLoad = supabaseModule.loadPortfolioData;
  supabaseSave = supabaseModule.savePortfolioData;
} catch {
  // Supabase not configured — will use fallback
}

const DATA_FILE = path.join(process.cwd(), "data", "portfolio.json");

// Default seed data — used when no saved data exists
export const defaultPortfolioData: PortfolioData = {
  profile: {
    name: "Alex Developer",
    title: "Full-Stack Engineer",
    tagline: "I build scalable web apps and delightful user experiences.",
    profilePhoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face",
    resumeUrl: "#",
  },
  about:
    "I'm a passionate full-stack developer with 5+ years of experience building modern web applications. I specialize in React, Node.js, and cloud technologies. I love solving complex problems and creating intuitive user interfaces. When I'm not coding, you can find me exploring new technologies, contributing to open-source projects, or enjoying the outdoors.",
  skills: [
    { id: "1", name: "React", category: "Frontend", level: 95 },
    { id: "2", name: "TypeScript", category: "Frontend", level: 90 },
    { id: "3", name: "Next.js", category: "Frontend", level: 92 },
    { id: "4", name: "Tailwind CSS", category: "Frontend", level: 88 },
    { id: "5", name: "Node.js", category: "Backend", level: 85 },
    { id: "6", name: "PostgreSQL", category: "Backend", level: 80 },
    { id: "7", name: "MongoDB", category: "Backend", level: 78 },
    { id: "8", name: "Docker", category: "DevOps", level: 75 },
    { id: "9", name: "AWS", category: "DevOps", level: 72 },
    { id: "10", name: "Git", category: "Tools", level: 90 },
    { id: "11", name: "Figma", category: "Design", level: 70 },
    { id: "12", name: "Python", category: "Backend", level: 82 },
  ],
  projects: [
    {
      id: "1",
      title: "E-Commerce Platform",
      description: "A full-featured online store with real-time inventory and payment processing.",
      longDescription:
        "Built a scalable e-commerce platform handling 10k+ daily users. Features include real-time inventory tracking, Stripe payment integration, admin dashboard, and responsive design.",
      technologies: ["Next.js", "TypeScript", "Stripe", "PostgreSQL"],
      imageUrl: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=500&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
    },
    {
      id: "2",
      title: "Task Management App",
      description: "Collaborative task manager with real-time updates and team workspaces.",
      longDescription:
        "A Trello-like task management application with drag-and-drop functionality, real-time collaboration via WebSockets, and team workspace management.",
      technologies: ["React", "Node.js", "Socket.io", "MongoDB"],
      imageUrl: "https://images.unsplash.com/photo-1540350394557-8d14678e7f91?w=800&h=500&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      featured: true,
    },
    {
      id: "3",
      title: "AI Content Generator",
      description: "An AI-powered tool that generates blog posts, social media content, and more.",
      longDescription:
        "Leverages OpenAI's GPT API to generate high-quality content. Includes templates, tone customization, SEO optimization suggestions, and export functionality.",
      technologies: ["Next.js", "OpenAI API", "Tailwind CSS", "Redis"],
      imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=500&fit=crop",
      demoUrl: "#",
      repoUrl: "#",
      featured: false,
    },
  ],
  experience: [
    {
      id: "1",
      company: "TechCorp Inc.",
      role: "Senior Full-Stack Developer",
      location: "San Francisco, CA",
      startDate: "2022-01",
      endDate: undefined,
      current: true,
      description:
        "Lead a team of 5 developers building microservices architecture. Reduced API latency by 40% through optimization. Implemented CI/CD pipelines and mentored junior developers.",
    },
    {
      id: "2",
      company: "StartupXYZ",
      role: "Full-Stack Developer",
      location: "Remote",
      startDate: "2020-06",
      endDate: "2021-12",
      current: false,
      description:
        "Built the MVP from scratch, scaling to 50k users. Designed the database schema, implemented authentication, and created the React frontend. Raised $2M in seed funding.",
    },
    {
      id: "3",
      company: "Digital Agency Pro",
      role: "Frontend Developer",
      location: "New York, NY",
      startDate: "2019-03",
      endDate: "2020-05",
      current: false,
      description:
        "Developed responsive websites for 20+ clients using React and Vue.js. Improved page load times by 60% through code splitting and lazy loading techniques.",
    },
  ],
  socialLinks: [
    { platform: "GitHub", url: "https://github.com" },
    { platform: "LinkedIn", url: "https://linkedin.com" },
    { platform: "Twitter", url: "https://twitter.com" },
  ],
  contact: {
    email: "alex@developer.com",
    phone: "+1 (555) 123-4567",
    location: "San Francisco, CA",
    availability: "Open to freelance & full-time opportunities",
  },
  settings: {
    siteName: "Alex Portfolio",
    heroBackgroundUrl:
      "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=2000&h=1400&fit=crop",
    accentColor: "#22d3ee",
    headings: {
      about: {
        title: "About Me",
        subtitle: "Who I am and what I do",
      },
      skills: {
        title: "Skills",
        subtitle: "Technologies I work with",
      },
      projects: {
        title: "Projects",
        subtitle: "Some of my recent work",
      },
      experience: {
        title: "Experience",
        subtitle: "Professional journey",
      },
      contact: {
        title: "Contact",
        subtitle: "Let’s build something great",
      },
    },
  },
};

// In-memory fallback store
let memoryData: PortfolioData = JSON.parse(JSON.stringify(defaultPortfolioData));

function cloneDeep<T>(value: T): T {
  return JSON.parse(JSON.stringify(value));
}

function normalizePortfolioData(data: Partial<PortfolioData>): PortfolioData {
  return {
    ...defaultPortfolioData,
    ...data,
    profile: { ...defaultPortfolioData.profile, ...(data.profile || {}) },
    contact: { ...defaultPortfolioData.contact, ...(data.contact || {}) },
    settings: {
      ...defaultPortfolioData.settings,
      ...(data.settings || {}),
      headings: {
        ...defaultPortfolioData.settings.headings,
        ...(data.settings?.headings || {}),
        about: {
          ...defaultPortfolioData.settings.headings.about,
          ...(data.settings?.headings?.about || {}),
        },
        skills: {
          ...defaultPortfolioData.settings.headings.skills,
          ...(data.settings?.headings?.skills || {}),
        },
        projects: {
          ...defaultPortfolioData.settings.headings.projects,
          ...(data.settings?.headings?.projects || {}),
        },
        experience: {
          ...defaultPortfolioData.settings.headings.experience,
          ...(data.settings?.headings?.experience || {}),
        },
        contact: {
          ...defaultPortfolioData.settings.headings.contact,
          ...(data.settings?.headings?.contact || {}),
        },
      },
    },
    skills: Array.isArray(data.skills) ? data.skills : defaultPortfolioData.skills,
    projects: Array.isArray(data.projects) ? data.projects : defaultPortfolioData.projects,
    experience: Array.isArray(data.experience) ? data.experience : defaultPortfolioData.experience,
    socialLinks: Array.isArray(data.socialLinks) ? data.socialLinks : defaultPortfolioData.socialLinks,
    about: typeof data.about === "string" ? data.about : defaultPortfolioData.about,
  };
}

/**
 * Load portfolio data.
 * Tries Supabase first, then JSON file, then in-memory default.
 */
export async function loadPortfolioData(): Promise<PortfolioData> {
  // 1. Try Supabase
  if (supabaseLoad) {
    try {
      const data = await supabaseLoad();
      if (data) {
        const normalized = normalizePortfolioData(data);
        memoryData = cloneDeep(normalized);
        return cloneDeep(normalized);
      }
    } catch (err) {
      console.warn("Supabase load failed, falling back:", err);
    }
  }

  // 2. Try JSON file (local dev)
  try {
    const raw = await fs.readFile(DATA_FILE, "utf-8");
    memoryData = normalizePortfolioData(JSON.parse(raw) as Partial<PortfolioData>);
    return cloneDeep(memoryData);
  } catch {
    // File missing or unreadable
  }

  // 3. Return in-memory default
  return cloneDeep(memoryData);
}

/**
 * Save portfolio data.
 * Tries Supabase first, then JSON file, then in-memory only.
 */
export async function savePortfolioData(data: PortfolioData): Promise<void> {
  const normalized = normalizePortfolioData(data);
  memoryData = cloneDeep(normalized);

  // 1. Try Supabase
  if (supabaseSave) {
    try {
      await supabaseSave(normalized);
      return;
    } catch (err) {
      console.warn("Supabase save failed, falling back:", err);
    }
  }

  // 2. Try JSON file (local dev)
  try {
    await fs.writeFile(DATA_FILE, JSON.stringify(normalized, null, 2), "utf-8");
  } catch {
    // Read-only filesystem — silently ignore; in-memory data is already saved
  }
}
