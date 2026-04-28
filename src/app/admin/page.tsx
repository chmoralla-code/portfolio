"use client";

import { useEffect, useState } from "react";
import { LayoutDashboard, User, Code2, Briefcase, History, Mail, Settings } from "lucide-react";
import type { PortfolioData } from "@/lib/types";
import Link from "next/link";

export default function AdminOverviewPage() {
  const [data, setData] = useState<PortfolioData | null>(null);

  useEffect(() => {
    fetch("/api/portfolio").then(r => r.json()).then(d => setData(d as PortfolioData));
  }, []);

  if (!data) return <div className="flex h-40 items-center justify-center"><div className="h-6 w-6 animate-spin rounded-full border-2 border-white/60 border-t-transparent" /></div>;

  const stats = [
    { label: "Skills", count: data.skills.length, icon: Code2, href: "/admin/skills" },
    { label: "Projects", count: data.projects.length, icon: Briefcase, href: "/admin/projects" },
    { label: "Experience", count: data.experience.length, icon: History, href: "/admin/experience" },
    { label: "Social Links", count: data.socialLinks.length, icon: Mail, href: "/admin/contact" },
    { label: "Settings", count: 1, icon: Settings, href: "/admin/settings" },
  ];

  return (
    <div>
      <div className="mb-8 flex items-center gap-3">
        <LayoutDashboard size={24} className="text-zinc-300" />
        <h1 className="text-2xl font-bold">Dashboard Overview</h1>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((s) => (
          <Link key={s.label} href={s.href} className="card">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 text-zinc-300">
                <s.icon size={20} />
              </div>
              <div>
                <p className="text-2xl font-bold">{s.count}</p>
                <p className="text-sm text-zinc-400">{s.label}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <User size={18} className="text-zinc-300" />
            <h2 className="font-semibold">Profile Preview</h2>
          </div>
          <div className="flex items-center gap-4">
            <img src={data.profile.profilePhoto} alt="" className="h-14 w-14 rounded-full object-cover" />
            <div>
              <p className="font-semibold">{data.profile.name}</p>
              <p className="text-sm text-zinc-400">{data.profile.title}</p>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="mb-4 flex items-center gap-2">
            <Mail size={18} className="text-zinc-300" />
            <h2 className="font-semibold">Contact Info</h2>
          </div>
          <div className="space-y-1 text-sm text-zinc-400">
            <p>Email: {data.contact.email}</p>
            {data.contact.phone && <p>Phone: {data.contact.phone}</p>}
            {data.contact.location && <p>Location: {data.contact.location}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
