"use client";
import { Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import type { Profile, SiteSettings, SocialLink } from "@/lib/types";

export function Hero({
  profile,
  socialLinks,
  settings,
}: {
  profile: Profile;
  socialLinks: SocialLink[];
  settings: SiteSettings;
}) {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden pt-16"
      style={{
        backgroundImage: `linear-gradient(rgba(5,5,5,0.78), rgba(5,5,5,0.96)), url(${settings.heroBackgroundUrl})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.12),transparent_45%)]" />
      <div className="section-container relative text-center">
        <div
          className="animate-slide-up animate-float mx-auto mb-8 h-32 w-32 overflow-hidden rounded-full border-2 sm:h-40 sm:w-40"
          style={{ borderColor: settings.accentColor || "#d4d4d8" }}
        >
          <img src={profile.profilePhoto} alt={profile.name} className="h-full w-full object-cover" />
        </div>
        <p className="animate-fade-in mb-3 text-sm font-semibold uppercase tracking-[0.3em] text-zinc-300/80">{profile.title}</p>
        <h1 className="animate-slide-up stagger-1 mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
          Hi, I&apos;m <span className="gradient-text">{profile.name}</span>
        </h1>
        <p className="animate-slide-up stagger-2 mx-auto max-w-2xl text-lg leading-relaxed text-zinc-300 sm:text-xl">{profile.tagline}</p>
        <div className="animate-slide-up stagger-3 mt-10 flex flex-wrap items-center justify-center gap-4">
          <a href="#projects" className="btn-primary">View My Work</a>
          <a href="#contact" className="btn-secondary">Get In Touch</a>
        </div>
        <div className="animate-slide-up stagger-4 mt-12 flex items-center justify-center gap-6">
          {socialLinks.map((link) => (
            <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="rounded-xl bg-white/5 p-3 text-zinc-400 transition hover:bg-white/10 hover:text-white" aria-label={link.platform}>
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
