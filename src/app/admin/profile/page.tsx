"use client";
import { useEffect, useState } from "react";
import { User, Save } from "lucide-react";
import type { PortfolioData } from "@/lib/types";

export default function AdminProfilePage() {
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

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-cyan-400 border-t-transparent" /></div>;

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <User size={24} className="text-cyan-300" />
          <h1 className="text-2xl font-bold">Edit Profile</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Name</label>
            <input type="text" value={data.profile.name} onChange={e => setData({ ...data, profile: { ...data.profile, name: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Title</label>
            <input type="text" value={data.profile.title} onChange={e => setData({ ...data, profile: { ...data.profile, title: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Tagline</label>
            <input type="text" value={data.profile.tagline} onChange={e => setData({ ...data, profile: { ...data.profile, tagline: e.target.value } })} />
          </div>
        </div>
        <div className="card space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Profile Photo URL</label>
            <input type="text" value={data.profile.profilePhoto} onChange={e => setData({ ...data, profile: { ...data.profile, profilePhoto: e.target.value } })} />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-slate-400">Resume URL</label>
            <input type="text" value={data.profile.resumeUrl || ""} onChange={e => setData({ ...data, profile: { ...data.profile, resumeUrl: e.target.value } })} />
          </div>
        </div>
      </div>
    </div>
  );
}