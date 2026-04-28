"use client";
import { useEffect, useState } from "react";
import { Briefcase, Plus, Trash2, Save } from "lucide-react";
import type { PortfolioData, Project } from "@/lib/types";

export default function AdminProjectsPage() {
  const [data, setData] = useState<PortfolioData | null>(null);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    fetch("/api/portfolio").then(r => r.json()).then(d => setData(d as PortfolioData));
  }, []);

  async function save() {
    if (!data) return;
    setSaving(true);
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    setSaving(false);
    setMsg(res.ok ? "Saved successfully!" : "Save failed.");
    setTimeout(() => setMsg(""), 3000);
  }

  function addProject() {
    if (!data) return;
    const newProject: Project = {
      id: crypto.randomUUID(),
      title: "New Project",
      description: "Description",
      technologies: ["React"],
      imageUrl: "",
      demoUrl: "#",
      repoUrl: "#",
      featured: false,
    };
    setData({ ...data, projects: [...data.projects, newProject] });
  }

  function updateProject(index: number, field: keyof Project, value: unknown) {
    if (!data) return;
    const updated = [...data.projects];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, projects: updated });
  }

  function deleteProject(index: number) {
    if (!data) return;
    const updated = [...data.projects];
    updated.splice(index, 1);
    setData({ ...data, projects: updated });
  }

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase size={24} className="text-cyan-300" />
          <h1 className="text-2xl font-bold">Edit Projects</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={addProject} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Add Project</button>
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="space-y-6">
        {data.projects.map((project, i) => (
          <div key={project.id} className="card space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" value={project.title} onChange={e => updateProject(i, "title", e.target.value)} placeholder="Title" />
              <input type="text" value={project.imageUrl || ""} onChange={e => updateProject(i, "imageUrl", e.target.value)} placeholder="Image URL" />
            </div>
            <textarea rows={3} value={project.description} onChange={e => updateProject(i, "description", e.target.value)} placeholder="Short description" />
            <textarea rows={3} value={project.longDescription || ""} onChange={e => updateProject(i, "longDescription", e.target.value)} placeholder="Long description" />
            <div className="grid gap-4 sm:grid-cols-3">
              <input type="text" value={project.technologies.join(", ")} onChange={e => updateProject(i, "technologies", e.target.value.split(",").map(t => t.trim()))} placeholder="Technologies (comma separated)" />
              <input type="text" value={project.demoUrl || ""} onChange={e => updateProject(i, "demoUrl", e.target.value)} placeholder="Demo URL" />
              <input type="text" value={project.repoUrl || ""} onChange={e => updateProject(i, "repoUrl", e.target.value)} placeholder="Repo URL" />
            </div>
            <div className="flex items-center gap-2">
              <input type="checkbox" id={`feat-${project.id}`} checked={project.featured} onChange={e => updateProject(i, "featured", e.target.checked)} />
              <label htmlFor={`feat-${project.id}`} className="text-sm text-slate-400">Featured</label>
              <button onClick={() => deleteProject(i)} className="ml-auto rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {data.projects.length === 0 && <p className="text-center text-slate-500">No projects yet. Click "Add Project" to create one.</p>}
      </div>
    </div>
  );
}