'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import {
  LayoutDashboard,
  User,
  FolderKanban,
  Wrench,
  Briefcase,
  Award,
  Sparkles,
  FileText,
  Mail,
  Settings,
  ExternalLink,
  LogOut,
  Menu,
  X,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, render children directly without the dashboard shell
  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) {
      await supabase.auth.signOut();
    }
    router.push('/admin/login');
    router.refresh();
  };

  const navItems = [
    { label: 'Overview', href: '/admin', icon: LayoutDashboard },
    { label: 'Profile & Hero', href: '/admin/profile', icon: User },
    { label: 'Projects Manager', href: '/admin/projects', icon: FolderKanban },
    { label: 'Skills Manager', href: '/admin/skills', icon: Wrench },
    { label: 'Experience & Edu', href: '/admin/experience', icon: Briefcase },
    { label: 'Certifications', href: '/admin/certifications', icon: Award },
    { label: 'Hobbies', href: '/admin/hobbies', icon: Sparkles },
    { label: 'Resume Manager', href: '/admin/resume', icon: FileText },
    { label: 'Messages Inbox', href: '/admin/messages', icon: Mail },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-[#101014] text-white flex">
      {/* Mobile Sidebar Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static top-0 bottom-0 left-0 z-50 w-64 bg-[#191920] border-r border-white/10 flex flex-col justify-between transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-6 space-y-6">
          {/* Brand */}
          <div className="flex items-center justify-between">
            <Link href="/admin" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-accent-plum to-accent-rose flex items-center justify-center font-heading font-bold text-white text-xs shadow-md">
                SD
              </div>
              <div>
                <span className="font-heading font-bold text-sm tracking-tight block">
                  Admin Control
                </span>
                <span className="text-[10px] font-mono text-gray-400">
                  Portfolio CMS
                </span>
              </div>
            </Link>

            <button
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-gray-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center justify-between px-3.5 py-2.5 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                    isActive
                      ? 'bg-accent-plum text-white shadow-md'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </div>
                  {isActive && <ChevronRight className="w-3.5 h-3.5" />}
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-white/5 space-y-3">
          <Link
            href="/"
            target="_blank"
            className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5 text-accent-rose" />
            <span>View Public Site</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full py-2 px-3 rounded-xl hover:bg-red-500/10 text-gray-400 hover:text-red-400 text-xs font-medium flex items-center justify-center gap-2 transition-colors"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 bg-[#191920]/80 backdrop-blur-md border-b border-white/10 px-4 sm:px-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-gray-400 hover:text-white"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Verified Administrator Session</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 text-xs text-accent-lavender hover:underline"
            >
              <span>Live Site Preview</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>

      </div>
    </div>
  );
}
