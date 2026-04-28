"use client";
import { Briefcase, ExternalLink, Github } from "lucide-react";
import type { Project } from "@/lib/types";

export function ProjectsSection({ projects }: { projects: Project[] }) {
  return (
    <section id="projects" className="border-t border-white/5">
      <div className="section-container">
        <div className="mb-12 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/5 px-4 py-1.5 text-sm font-medium text-cyan-300">
            <Briefcase size={14} /> Projects
          </div>
          <h2 className="section-title">Featured Work</h2>
        </div>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <div key={project.id} className="card overflow-hidden p-0">
              <div className="aspect-video overflow-hidden">
                <img src={project.imageUrl} alt={project.title} className="h-full w-full object-cover transition duration-500 hover:scale-105" />
              </div>
              <div className="p-6">
                <h3 className="mb-2 text-lg font-semibold">{project.title}</h3>
                <p className="mb-4 text-sm leading-relaxed text-slate-400">{project.description}</p>
                <div className="mb-4 flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span key={tech} className="rounded-full bg-cyan-400/10 px-2.5 py-1 text-xs font-medium text-cyan-300">{tech}</span>
                  ))}
                </div>
                <div className="flex gap-3">
                  {project.demoUrl && project.demoUrl !== "#" && (
                    <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-cyan-300 transition hover:text-cyan-200">
                      Live Demo <ExternalLink size={14} />
                    </a>
                  )}
                  {project.repoUrl && project.repoUrl !== "#" && (
                    <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-400 transition hover:text-white">
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
