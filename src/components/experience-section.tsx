"use client";
import { Briefcase, MapPin, Calendar } from "lucide-react";
import type { Experience } from "@/lib/types";

export function ExperienceSection({ experience }: { experience: Experience[] }) {
  return (
    <section id="experience" className="border-t border-white/5">
      <div className="section-container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Briefcase size={14} /> Experience
          </div>
          <h2 className="section-title">Work History</h2>
        </div>
        <div className="mx-auto max-w-3xl">
          {experience.map((exp, index) => (
            <div key={exp.id} className="relative flex gap-6 pb-12 last:pb-0">
              {index < experience.length - 1 && (
                <div className="absolute left-[11px] top-8 h-full w-px bg-white/10" />
              )}
              <div className="relative z-10 mt-2 h-6 w-6 shrink-0 rounded-full border-2 border-cyan-400/50 bg-[#0b1020]" />
              <div className="card flex-1">
                <div className="mb-2 flex flex-wrap items-center gap-2">
                  <h3 className="font-semibold">{exp.role}</h3>
                  {exp.current && <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-xs font-medium text-emerald-300">Current</span>}
                </div>
                <p className="mb-1 text-sm font-medium text-cyan-300">{exp.company}</p>
                <div className="mb-3 flex flex-wrap gap-3 text-xs text-slate-500">
                  {exp.location && <span className="flex items-center gap-1"><MapPin size={12} /> {exp.location}</span>}
                  <span className="flex items-center gap-1"><Calendar size={12} /> {exp.startDate} &mdash; {exp.current ? "Present" : exp.endDate}</span>
                </div>
                <p className="text-sm leading-relaxed text-slate-400">{exp.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
