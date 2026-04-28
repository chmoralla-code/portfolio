"use client";

import { useAuth } from "@/lib/auth-context";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import {
  LayoutDashboard, User, FileText, Code2, Briefcase, History, Mail, LogOut, Menu, Settings
} from "lucide-react";
import Link from "next/link";

const nav = [
  { href: "/admin", label: "Overview", icon: LayoutDashboard },
  { href: "/admin/profile", label: "Profile", icon: User },
  { href: "/admin/about", label: "About", icon: FileText },
  { href: "/admin/skills", label: "Skills", icon: Code2 },
  { href: "/admin/projects", label: "Projects", icon: Briefcase },
  { href: "/admin/experience", label: "Experience", icon: History },
  { href: "/admin/contact", label: "Contact", icon: Mail },
  { href: "/admin/settings", label: "Settings", icon: Settings },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { isLoggedIn, isLoading, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isLoading && !isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login");
    }
  }, [isLoading, isLoggedIn, pathname, router]);

  if (isLoading || !isLoggedIn) {
    return (
      <div className="flex h-screen items-center justify-center bg-[#050505]">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/60 border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-[#050505] text-[#f8fafc]">
      {/* Sidebar desktop */}
      <aside className="hidden w-64 flex-col border-r border-white/10 bg-[#050505]/95 lg:flex">
        <div className="flex h-16 items-center border-b border-white/10 px-6">
          <span className="text-lg font-bold">Portfolio<span className="text-zinc-300">Admin</span></span>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-4">
          {nav.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition ${
                  active ? "bg-white/10 text-white" : "text-zinc-400 hover:bg-white/5 hover:text-white"
                }`}
              >
                <Icon size={18} /> {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-white/10 p-3">
          <button
            onClick={() => logout()}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-400 transition hover:bg-white/5 hover:text-red-300"
          >
            <LogOut size={18} /> Sign Out
          </button>
        </div>
      </aside>

      {/* Mobile header */}
      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-between border-b border-white/10 px-4 lg:hidden">
          <span className="text-lg font-bold">Portfolio<span className="text-zinc-300">Admin</span></span>
          <button className="rounded-lg p-2 text-zinc-300">
            <Menu size={20} />
          </button>
        </header>
        <main className="flex-1 p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
