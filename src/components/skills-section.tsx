"use client";
import { Code2 } from "lucide-react";
import type { Skill } from "@/lib/types";

export function SkillsSection({ skills }: { skills: Skill[] }) {
  return (
    <section id="skills" className="border-t border-white/5">
      <div className="section-container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Code2 size={14} /> Skills
          </div>
          <h2 className="section-title">Technologies I Work With</h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skills.map((skill) => (
            <div key={skill.id} className="card">
              <div className="mb-3 flex items-center justify-between">
                <span className="font-semibold">{skill.name}</span>
                <span className="text-sm text-slate-400">{skill.category}</span>
              </div>
              <div className="h-2 overflow-hidden rounded-full bg-white/10">
                <div className="h-full rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 transition-all duration-1000" style={{ width: skill.level + "%" }} />
              </div>
              <span className="mt-2 block text-right text-xs text-slate-500">{skill.level}%</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
