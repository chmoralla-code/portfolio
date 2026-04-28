"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import type { PortfolioData } from "@/lib/types";
import { Hero } from "@/components/hero";
import { AboutSection } from "@/components/about-section";
import { SkillsSection } from "@/components/skills-section";
import { ProjectsSection } from "@/components/projects-section";
import { ExperienceSection } from "@/components/experience-section";
import { ContactSection } from "@/components/contact-section";

export default function PortfolioPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [loading, setLoading] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    async function loadData() {
      try {
        const res = await fetch("/api/portfolio");
        const portfolioData = (await res.json()) as PortfolioData;
        setData(portfolioData);
      } catch {
        // fallback
      } finally {
        setLoading(false);
      }
    }
    void loadData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" />
      </div>
    );
  }

  if (!data) return null;

  const navLinks = [
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "projects", label: "Projects" },
    { id: "experience", label: "Experience" },
    { id: "contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-[#0b1020] text-[#f8fafc]">
      <nav className="fixed top-0 z-50 w-full border-b border-white/10 bg-[#0b1020]/80 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a href="#hero" className="text-lg font-bold tracking-tight">
            {data.profile.name.split(" ")[0]}
            <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">.</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {navLinks.map((link) => (
              <a key={link.id} href={"#" + link.id} className="rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white">
                {link.label}
              </a>
            ))}
            <a href="/admin/login" className="ml-4 rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-slate-400 transition hover:bg-white/10 hover:text-white">
              Admin
            </a>
          </div>
          <button className="rounded-lg p-2 text-slate-300 md:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
        {mobileMenuOpen && (
          <div className="border-t border-white/10 bg-[#0b1020]/95 px-4 py-4 md:hidden">
            {navLinks.map((link) => (
              <a key={link.id} href={"#" + link.id} className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white" onClick={() => setMobileMenuOpen(false)}>
                {link.label}
              </a>
            ))}
            <a href="/admin/login" className="mt-2 block rounded-lg bg-white/5 px-3 py-2 text-sm font-medium text-slate-400">Admin</a>
          </div>
        )}
      </nav>

      <Hero profile={data.profile} socialLinks={data.socialLinks} />
      <AboutSection about={data.about} />
      <SkillsSection skills={data.skills} />
      <ProjectsSection projects={data.projects} />
      <ExperienceSection experience={data.experience} />
      <ContactSection contact={data.contact} socialLinks={data.socialLinks} />

      <footer className="border-t border-white/5 py-8">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-slate-500 sm:px-6 lg:px-8">
          <p>&copy; {new Date().getFullYear()} {data.profile.name}. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}