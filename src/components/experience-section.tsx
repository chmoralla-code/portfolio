"use client";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import type { Experience, SiteSettings } from "@/lib/types";

export function ExperienceSection({ experience, settings }: { experience: Experience[]; settings: SiteSettings }) {
  return (
    <section id="experience" className="border-t border-white/5">
      <div className="section-container">
        <div className="animate-slide-up mb-12 text-center">
          <div className="pill-label mb-4">
            <Briefcase size={14} /> Experience
          </div>
          <h2 className="section-title">{settings.headings.experience.title}</h2>
          {settings.headings.experience.subtitle && (
            <p className="section-subtitle">{settings.headings.experience.subtitle}</p>
          )}
        </div>
        <div className="mx-auto max-w-3xl">
          {experience.map((exp, index) => (
            <div key={exp.id} className="relative flex gap-6 pb-12 last:pb-0">
              {index < experience.length - 1 && (
                <div className="absolute left-[11px] top-8 h-full w-px bg-white/10" />
              )}
               <div className="relative z-10 mt-2 h-6 w-6 shrink-0 rounded-full border-2 border-white/50 bg-[#050505]" />
              <div className="card flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{exp.role}</h3>
                  {exp.current && <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">Current</span>}
                </div>
                <p className="mb-1 text-sm font-medium text-zinc-200">{exp.company}</p>
                <div className="mb-3 flex flex-wrap gap-3 text-xs text-zinc-500">
                  {exp.location && <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>}
                  <span className="flex items-center gap-1"><Calendar size={12} /> {exp.startDate} &mdash; {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <p className="text-sm leading-relaxed text-zinc-400">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
