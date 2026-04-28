"use client";
import { useEffect, useState } from "react";
import { FileText, Save } from "lucide-react";
import type { PortfolioData } from "@/lib/types";

export default function AdminAboutPage() {
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
          <FileText size={24} className="text-cyan-300" />
          <h1 className="text-2xl font-bold">Edit About</h1>
        </div>
        <button onClick={save} disabled={saving} className="btn-primary flex items-center gap-2">
          <Save size={16} /> {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
      {msg && <div className="mb-4 rounded-lg bg-emerald-400/10 px-3 py-2 text-sm text-emerald-300">{msg}</div>}

      <div className="card">
        <label className="mb-1.5 block text-sm font-medium text-slate-400">About / Bio</label>
        <textarea rows={10} value={data.about} onChange={e => setData({ ...data, about: e.target.value })} />
      </div>
    </div>
  );
}