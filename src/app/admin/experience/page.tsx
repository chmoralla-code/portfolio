"use client";
import { useEffect, useState } from "react";
import { History, Plus, Trash2, Save } from "lucide-react";
import type { PortfolioData, Experience } from "@/lib/types";

export default function AdminExperiencePage() {
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

  function addExperience() {
    if (!data) return;
    const newExp: Experience = {
      id: crypto.randomUUID(),
      company: "Company",
      role: "Role",
      location: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    };
    setData({ ...data, experience: [...data.experience, newExp] });
  }

  function updateExperience(index: number, field: keyof Experience, value: unknown) {
    if (!data) return;
    const updated = [...data.experience];
    updated[index] = { ...updated[index], [field]: value };
    setData({ ...data, experience: updated });
  }

  function deleteExperience(index: number) {
    if (!data) return;
    const updated = [...data.experience];
    updated.splice(index, 1);
    setData({ ...data, experience: updated });
  }

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-white/60 border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <History size={24} className="text-zinc-300" />
          <h1 className="text-2xl font-bold">Edit Experience</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={addExperience} className="btn-secondary flex items-center gap-2"><Plus size={16} /> Add Experience</button>
          <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2"><Save size={16} /> {saving ? "Saving..." : "Save"}</button>
        </div>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="space-y-6">
        {data.experience.map((exp, i) => (
          <div key={exp.id} className="card space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <input type="text" value={exp.company} onChange={e => updateExperience(i, "company", e.target.value)} placeholder="Company" />
              <input type="text" value={exp.role} onChange={e => updateExperience(i, "role", e.target.value)} placeholder="Role" />
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              <input type="text" value={exp.location || ""} onChange={e => updateExperience(i, "location", e.target.value)} placeholder="Location" />
              <input type="text" value={exp.startDate} onChange={e => updateExperience(i, "startDate", e.target.value)} placeholder="Start Date (YYYY-MM)" />
              <input type="text" value={exp.endDate || ""} onChange={e => updateExperience(i, "endDate", e.target.value)} placeholder="End Date (YYYY-MM)" />
            </div>
            <textarea rows={3} value={exp.description} onChange={e => updateExperience(i, "description", e.target.value)} placeholder="Description" />
            <div className="flex items-center gap-2">
              <input type="checkbox" id={`cur-${exp.id}`} checked={exp.current} onChange={e => updateExperience(i, "current", e.target.checked)} />
              <label htmlFor={`cur-${exp.id}`} className="text-sm text-zinc-400">Current position</label>
              <button onClick={() => deleteExperience(i)} className="ml-auto rounded-lg p-2 text-red-400 transition hover:bg-red-400/10"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
        {data.experience.length === 0 && <p className="text-center text-zinc-500">No experience entries yet. Click &quot;Add Experience&quot; to create one.</p>}
      </div>
    </div>
  );
}
