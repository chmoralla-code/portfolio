"use client";
import { Mail, Phone, MapPin, Send, Github, Linkedin, Twitter, ExternalLink } from "lucide-react";
import type { ContactInfo, SocialLink, SiteSettings } from "@/lib/types";

export function ContactSection({
  contact,
  socialLinks,
  settings,
}: {
  contact: ContactInfo;
  socialLinks: SocialLink[];
  settings: SiteSettings;
}) {
  return (
    <section id="contact" className="border-t border-white/5">
      <div className="section-container">
        <div className="animate-slide-up mb-12 text-center">
          <div className="pill-label mb-4">
            <Send size={14} /> Contact
          </div>
          <h2 className="section-title">{settings.headings.contact.title}</h2>
          {settings.headings.contact.subtitle && (
            <p className="section-subtitle">{settings.headings.contact.subtitle}</p>
          )}
          <p className="mt-4 text-zinc-400">{contact.availability}</p>
        </div>
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-zinc-200"><Mail size={20} /></div>
              <div>
                <p className="text-sm text-zinc-500">Email</p>
                <a href={"mailto:" + contact.email} className="font-medium transition hover:text-white">{contact.email}</a>
              </div>
            </div>
            {contact.phone && (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-zinc-200"><Phone size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500">Phone</p>
                  <a href={"tel:" + contact.phone} className="font-medium transition hover:text-white">{contact.phone}</a>
                </div>
              </div>
            )}
            {contact.location && (
              <div className="flex items-center gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-zinc-200"><MapPin size={20} /></div>
                <div>
                  <p className="text-sm text-zinc-500">Location</p>
                  <p className="font-medium">{contact.location}</p>
                </div>
              </div>
            )}
            <div className="flex items-center gap-4 pt-4">
              {socialLinks.map((link) => (
                <a key={link.platform} href={link.url} target="_blank" rel="noopener noreferrer" className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-zinc-400 transition hover:bg-white/10 hover:text-white" aria-label={link.platform}>
                  {link.platform === "GitHub" && <Github size={18} />}
                  {link.platform === "LinkedIn" && <Linkedin size={18} />}
                  {link.platform === "Twitter" && <Twitter size={18} />}
                  {!"GitHub LinkedIn Twitter".split(" ").includes(link.platform) && <ExternalLink size={18} />}
                </a>
              ))}
            </div>
          </div>
          <div className="card">
            <form onSubmit={(e) => { e.preventDefault(); alert("Demo form - connect to a backend like Formspree in production"); }} className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">Name</label>
                <input type="text" placeholder="Your name" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">Email</label>
                <input type="email" placeholder="your@email.com" required />
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-medium text-zinc-400">Message</label>
                <textarea rows={4} placeholder="Tell me about your project..." required />
              </div>
              <button type="submit" className="btn-primary w-full">Send Message</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
