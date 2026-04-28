"use client";
import { Briefcase, ExternalLink, Github } from "lucide-react";
import type { Project, SiteSettings } from "@/lib/types";

export function ProjectsSection({ projects, settings }: { projects: Project[]; settings: SiteSettings }) {
  return (
    <section id="projects" className="border-t border-white/5">
      <div className="section-container">
        <div className="animate-slide-up mb-12 text-center">
          <div className="pill-label mb-4">
            <Briefcase size={14} /> Projects
          </div>
          <h2 className="section-title">{settings.headings.projects.title}</h2>
          {settings.headings.projects.subtitle && (
            <p className="section-subtitle">{settings.headings.projects.subtitle}</p>
          )}
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="card overflow-hidden p-0">
              <div className="aspect-video overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-zinc-400">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 text-xs font-medium text-zinc-300">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-200 transition hover:text-white">
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.repoUrl && project.repoUrl !== "#" && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition hover:text-white">
                      Source <Github size={14} />
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
