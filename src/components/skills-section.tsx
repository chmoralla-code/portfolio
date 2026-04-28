"use client";
import { Code2 } from "lucide-react";
import type { SiteSettings, Skill } from "@/lib/types";

export function SkillsSection({ skills, settings }: { skills: Skill[]; settings: SiteSettings }) {
  return (
    <section id="skills" className="border-t border-white/5">
      <div className="section-container">
        <div className="animate-slide-up mb-12 text-center">
          <div className="pill-label mb-4">
            <Code2 size={14} /> Skills
          </div>
          <h2 className="section-title">{settings.headings.skills.title}</h2>
          {settings.headings.skills.subtitle && (
            <p className="section-subtitle">{settings.headings.skills.subtitle}</p>
          )}
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id} className="card">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-sm text-zinc-400">{skill.category}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-zinc-200 to-zinc-500 transition-all duration-1000" style={{ width: skill.level + "%" }} />
              </div>
              <span className="mt-2 block text-right text-xs text-zinc-500">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
