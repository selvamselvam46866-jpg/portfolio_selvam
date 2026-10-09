import React from 'react';
import Link from 'next/link';
import { getPortfolioData } from '@/lib/data/portfolio';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import {
  FolderKanban,
  Award,
  Briefcase,
  Mail,
  ArrowUpRight,
  Plus,
  CheckCircle2,
  Clock,
  AlertCircle,
  Database,
  ExternalLink,
} from 'lucide-react';

export default async function AdminDashboardOverview() {
  const data = await getPortfolioData();
  const { profile, projects, certifications, experiences, isLiveSupabase } = data;

  // Fetch unread messages from Supabase if connected
  let unreadCount = 0;
  let recentMessages: any[] = [];

  const supabase = await createServerSupabaseClient();
  if (supabase) {
    const { data: messages, count } = await supabase
      .from('messages')
      .select('*', { count: 'exact' })
      .order('created_at', { ascending: false })
      .limit(5);

    if (messages) {
      recentMessages = messages;
    }
    const { count: unread } = await supabase
      .from('messages')
      .select('*', { count: 'exact', head: true })
      .eq('is_read', false);
    unreadCount = unread || 0;
  }

  const kpis = [
    {
      title: 'Published Projects',
      value: projects.filter((p) => p.is_published).length,
      icon: FolderKanban,
      href: '/admin/projects',
      badge: 'Active in Portfolio',
    },
    {
      title: 'Certifications',
      value: certifications.length,
      icon: Award,
      href: '/admin/certifications',
      badge: 'Verified Credentials',
    },
    {
      title: 'Training Experiences',
      value: experiences.length,
      icon: Briefcase,
      href: '/admin/experience',
      badge: 'Practical Timeline',
    },
    {
      title: 'Unread Inquiries',
      value: unreadCount,
      icon: Mail,
      href: '/admin/messages',
      badge: unreadCount > 0 ? `${unreadCount} New` : 'All Caught Up',
      highlight: unreadCount > 0,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-white">
            Welcome back, {profile.name}
          </h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Manage your analytics portfolio, showcase Power BI reports, and respond to recruiters.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects"
            className="px-4 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Manage Projects</span>
          </Link>
          <Link
            href="/"
            target="_blank"
            className="px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-2 border border-white/10 transition-all"
          >
            <span>View Site</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>

      {/* Database Connection Notice */}
      {!isLiveSupabase && (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs flex items-start gap-3">
          <Database className="w-5 h-5 flex-shrink-0 text-amber-400 mt-0.5" />
          <div className="space-y-1">
            <span className="font-bold block">Development Preview Mode Active</span>
            <p className="text-amber-300/80">
              The portfolio is currently serving verified offline starter data. To connect your live cloud database, run <code className="bg-black/30 px-1 py-0.5 rounded font-mono">schema.sql</code> and <code className="bg-black/30 px-1 py-0.5 rounded font-mono">seed.sql</code> in your Supabase SQL editor and set your credentials in <code className="bg-black/30 px-1 py-0.5 rounded font-mono">.env.local</code>.
            </p>
          </div>
        </div>
      )}

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kpi, idx) => {
          const Icon = kpi.icon;

          return (
            <Link
              key={idx}
              href={kpi.href}
              className="p-5 rounded-2xl bg-[#191920] border border-white/10 hover:border-accent-rose/40 transition-all space-y-3 group"
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-gray-400">{kpi.title}</span>
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-accent-rose group-hover:scale-110 transition-transform">
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="font-heading text-3xl font-extrabold text-white">
                {kpi.value}
              </div>

              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-white/5 text-gray-400">
                <span className={kpi.highlight ? 'text-accent-rose font-bold' : ''}>
                  {kpi.badge}
                </span>
                <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-accent-rose transition-colors" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Quick Action Shortcuts */}
      <div className="space-y-3">
        <h2 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-400">
          Quick Management Actions
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <Link
            href="/admin/profile"
            className="p-4 rounded-xl bg-[#191920] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-bold text-white block">Edit Profile & Headline</span>
              <span className="text-gray-400 text-[11px]">Update bio, roles & status</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-accent-rose" />
          </Link>

          <Link
            href="/admin/resume"
            className="p-4 rounded-xl bg-[#191920] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-bold text-white block">Upload Resume PDF</span>
              <span className="text-gray-400 text-[11px]">Replace download file</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-accent-rose" />
          </Link>

          <Link
            href="/admin/settings"
            className="p-4 rounded-xl bg-[#191920] border border-white/10 hover:border-white/20 transition-all flex items-center justify-between text-xs"
          >
            <div>
              <span className="font-bold text-white block">Site Settings</span>
              <span className="text-gray-400 text-[11px]">SEO meta & phone visibility</span>
            </div>
            <ArrowUpRight className="w-4 h-4 text-accent-rose" />
          </Link>
        </div>
      </div>

      {/* Recent Messages Section */}
      <div className="rounded-2xl p-6 bg-[#191920] border border-white/10 space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <h3 className="font-heading text-lg font-bold text-white">
              Recent Inquiries & Contact Messages
            </h3>
            <p className="text-xs text-gray-400">
              Direct recruiter messages submitted through the portfolio contact form.
            </p>
          </div>

          <Link
            href="/admin/messages"
            className="text-xs font-semibold text-accent-rose hover:underline"
          >
            View All Messages &rarr;
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <div className="py-12 text-center text-xs text-gray-500 border border-dashed border-white/10 rounded-xl space-y-2">
            <Mail className="w-8 h-8 text-gray-600 mx-auto" />
            <p>No new messages in your inbox.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className="p-3.5 rounded-xl bg-[#101014] border border-white/5 flex items-center justify-between text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">{msg.name}</span>
                    <span className="text-gray-500 font-mono">({msg.email})</span>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose text-[10px] font-bold">
                        New
                      </span>
                    )}
                  </div>
                  <p className="text-gray-400">{msg.subject}</p>
                </div>

                <Link
                  href="/admin/messages"
                  className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs transition-colors"
                >
                  View
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}
