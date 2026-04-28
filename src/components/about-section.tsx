"use client";
import { User } from "lucide-react";

export function AboutSection({ about }: { about: string }) {
  return (
    <section id="about" className="border-t border-white/5">
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <User size={14} /> About Me
          </div>
          <h2 className="section-title mb-6">Who I Am</h2>
          <p className="text-lg leading-relaxed text-slate-300">{about}</p>
        </div>
      </div>
    </section>
  );
}
