"use client";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import type { Profile, SocialLink } from "@/lib/types";

export function Hero({ profile, socialLinks }: { profile: Profile; socialLinks: SocialLink[] }) {
  return (
    <section id="hero" className="flex min-h-screen items-center justify-center pt-16">
      <div className="section-container text-center">
        <div className="mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-2 border-cyan-400/30 sm:h-40 sm:w-40">
          <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover" />
        </div>
        <p className="mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300/80">{profile.title}</p>
        <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">{profile.name}</span>
        </h1>
        <p className="mx-auto max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">{profile.tagline}</p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
        <div className="mt-12 flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 p-3 text-slate-400 transition hover:bg-white/10 hover:text-cyan-300" aria-label={link.platform}>
              {link.platform === "GitHub" && <Github size={20} />}
              {link.platform === "LinkedIn" && <Linkedin size={20} />}
              {link.platform === "Twitter" && <Twitter size={20} />}
              {!"GitHub LinkedIn Twitter".split(" ").includes(link.platform) && <ExternalLink size={20} />}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
