"use client";
import { User } from "lucide-react";
import type { SiteSettings } from "@/lib/types";

export function AboutSection({ about, settings }: { about: string; settings: SiteSettings }) {
  return (
    <section id="about" className="border-t border-white/5">
      <div className="section-container">
        <div className="animate-slide-up mx-auto max-w-3xl text-center">
          <div className="pill-label mb-4">
            <User size={14} /> About Me
          </div>
          <h2 className="section-title mb-2">{settings.headings.about.title}</h2>
          {settings.headings.about.subtitle && (
            <p className="section-subtitle mb-6">{settings.headings.about.subtitle}</p>
          )}
          <p className="text-lg leading-relaxed text-zinc-300">{about}</p>
        </div>
      </div>
    </section>
  );
}
