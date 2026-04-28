"use client";
import { useEffect, useState } from "react";
import { Code2, Plus, Trash2, Save } from "lucide-react";
import type { PortfolioData, Skill } from "@/lib/types";

export default function AdminSkillsPage() {
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

  function addSkill() {
    if (!data) return;
    const newSkill: Skill = { id: crypto.randomUUID(), name: "New Skill", category: "General", level: 50 };
    setData({ ...data, skills: [...data.skills, newSkill] });
  }

  function updateSkill(index: number, field: keyof Skill, value: string | number) {
    if (!data) return;
    const updated = [...data.skills];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, skills: updated });
  }

  function deleteSkill(index: number) {
    if (!data) return;
    const updated = [...data.skills];
    updated.splice(index, 1);
    setData({ ...data, skills: updated });
  }

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-white/60 border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Code2 size={24} className="text-zinc-300" />
          <h1 className="text-2xl font-bold">Edit Skills</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={addSkill} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Add Skill</button>
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="space-y-4">
        {data.skills.map((skill, i) => (
          <div key={skill.id} className="card grid gap-4 sm:grid-cols-4">
            <input type="text" value={skill.name} onChange={e => updateSkill(i, "name", e.target.value)} placeholder="Skill name" />
            <input type="text" value={skill.category} onChange={e => updateSkill(i, "category", e.target.value)} placeholder="Category" />
            <div className="flex items-center gap-2">
              <input type="range" min={0} max={100} value={skill.level} onChange={e => updateSkill(i, "level", Number(e.target.value))} className="flex-1" />
              <span className="w-10 text-right text-sm text-zinc-400">{skill.level}%</span>
            </div>
            <div className="flex items-center justify-end">
              <button onClick={() => deleteSkill(i)} className="rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {data.skills.length === 0 && <p className="text-center text-zinc-500">No skills yet. Click &quot;Add Skill&quot; to create one.</p>}
      </div>
    </div>
  );
}
