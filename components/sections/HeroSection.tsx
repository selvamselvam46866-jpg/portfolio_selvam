'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/portfolio';
import { ArrowDown, Download, Sparkles, BarChart3, Database, TrendingUp, Layers, CheckCircle2 } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip } from 'recharts';

interface HeroSectionProps {
  profile: Profile;
}

const miniKpiData = [
  { month: 'Jan', prod: 42, defect: 1.8 },
  { month: 'Feb', prod: 45, defect: 1.6 },
  { month: 'Mar', prod: 48, defect: 1.9 },
  { month: 'Apr', prod: 41, defect: 1.4 },
  { month: 'May', prod: 47, defect: 1.7 },
  { month: 'Jun', prod: 52, defect: 1.3 },
  { month: 'Jul', prod: 55, defect: 1.2 },
];

export function HeroSection({ profile }: HeroSectionProps) {
  const roles = profile.rotating_roles && profile.rotating_roles.length > 0
    ? profile.rotating_roles
    : [
        'Aspiring Data Analyst',
        'Junior Data Analyst',
        'Power BI Dashboard Developer',
        'Excel Data Analyst',
        'Business Intelligence Enthusiast',
      ];

  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [fadeState, setFadeState] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setFadeState(false);
      setTimeout(() => {
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
        setFadeState(true);
      }, 300);
    }, 2800);
    return () => clearInterval(interval);
  }, [roles.length]);

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden analytics-grid-bg">
      {/* Background radial glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-accent-plum/20 dark:bg-accent-plum/25 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-[300px] h-[300px] bg-accent-lavender/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Headline, Bio & CTA */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            {/* Availability Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-medium border border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              <span>{profile.availability_status}</span>
            </div>

            {/* Name & Main Title */}
            <div className="space-y-2">
              <h1 className="font-heading text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-white">
                {profile.name}
              </h1>

              {/* Rotating Role Badge */}
              <div className="h-10 sm:h-12 flex items-center justify-center lg:justify-start">
                <span className="text-xl sm:text-2xl lg:text-3xl font-heading font-semibold text-gray-500 dark:text-gray-400 mr-2">
                  I am a
                </span>
                <span
                  className={`text-xl sm:text-2xl lg:text-3xl font-heading font-bold bg-gradient-to-r from-accent-rose via-accent-lavender to-purple-400 bg-clip-text text-transparent transition-opacity duration-300 ${
                    fadeState ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  {roles[currentRoleIndex]}
                </span>
              </div>
            </div>

            {/* Concise Tagline */}
            <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 max-w-2xl leading-relaxed">
              {profile.tagline}
            </p>

            {/* Call to Action Buttons */}
            <div className="pt-2 flex flex-wrap items-center justify-center lg:justify-start gap-4">
              <a
                href="#projects"
                className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-accent-plum to-accent-rose text-white text-sm font-semibold tracking-wide shadow-lg shadow-accent-plum/25 hover:shadow-accent-rose/30 hover:scale-[1.02] transition-all flex items-center gap-2"
              >
                <BarChart3 className="w-4 h-4" />
                <span>View My Projects</span>
              </a>

              <a
                href="#contact"
                className="px-6 py-3.5 rounded-xl border border-gray-300 dark:border-white/15 bg-white/70 dark:bg-[#191920]/80 hover:bg-gray-100 dark:hover:bg-white/10 text-gray-800 dark:text-gray-200 text-sm font-semibold transition-all hover:scale-[1.02] flex items-center gap-2"
              >
                <span>Contact Me</span>
              </a>

              <a
                href={profile.resume_url || '/Selvam_D_Resume.pdf'}
                download
                target="_blank"
                rel="noopener noreferrer"
                className="px-5 py-3.5 rounded-xl border border-accent-rose/30 dark:border-accent-lavender/30 bg-accent-rose/5 dark:bg-accent-lavender/10 text-accent-rose dark:text-accent-lavender text-sm font-semibold hover:bg-accent-rose/15 dark:hover:bg-accent-lavender/20 transition-all flex items-center gap-2"
              >
                <Download className="w-4 h-4" />
                <span>Download Resume</span>
              </a>
            </div>

            {/* Animated Live Stats */}
            <div className="pt-8 grid grid-cols-3 gap-4 border-t border-gray-200 dark:border-white/10 max-w-xl mx-auto lg:mx-0">
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.stats_projects}+
                </div>
                <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Hands-on Projects
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-accent-rose dark:text-accent-lavender">
                  {profile.stats_certifications}+
                </div>
                <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Certifications
                </div>
              </div>
              <div className="text-center lg:text-left">
                <div className="font-heading text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                  {profile.stats_experience}+
                </div>
                <div className="text-xs uppercase font-medium text-gray-500 dark:text-gray-400 tracking-wider">
                  Trainings Completed
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Power BI Inspired Telemetry Panel */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none rounded-2xl p-[1px] bg-gradient-to-b from-white/20 via-accent-plum/40 to-accent-rose/20 shadow-2xl">
              <div className="rounded-2xl bg-white dark:bg-[#191920] p-6 space-y-6">
                
                {/* Header with Power BI indicator */}
                <div className="flex items-center justify-between border-b border-gray-100 dark:border-white/10 pb-4">
                  <div className="flex items-center gap-2.5">
                    <div className="w-3 h-3 rounded-full bg-accent-rose animate-pulse" />
                    <span className="text-xs font-mono font-semibold tracking-wider uppercase text-gray-700 dark:text-gray-200">
                      LIVE ANALYTICS PREVIEW
                    </span>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-accent-plum/20 text-accent-rose dark:text-accent-lavender">
                    Power BI / DAX Model
                  </span>
                </div>

                {/* 4 Mini KPI Cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Total Production</span>
                    <div className="font-heading text-xl font-bold text-gray-900 dark:text-white">1,029,692</div>
                    <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                      <TrendingUp className="w-3 h-3" /> +12.4% vs Target
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Avg Defect Rate</span>
                    <div className="font-heading text-xl font-bold text-accent-rose">0.017</div>
                    <span className="text-[10px] text-emerald-500 font-medium flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Within 2% SLA
                    </span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Procurement Spend</span>
                    <div className="font-heading text-xl font-bold text-gray-900 dark:text-white">$21.54M</div>
                    <span className="text-[10px] text-gray-400 font-mono">2K Purchase Orders</span>
                  </div>

                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400">Energy per Unit</span>
                    <div className="font-heading text-xl font-bold text-accent-lavender">3.11 kWh</div>
                    <span className="text-[10px] text-gray-400 font-mono">5 Plant Benchmark</span>
                  </div>
                </div>

                {/* Mini Live Sparkline Chart */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium text-gray-600 dark:text-gray-400">Monthly Yield Velocity</span>
                    <span className="font-mono text-accent-rose text-[11px]">Trend: Stable</span>
                  </div>
                  <div className="h-28 w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={miniKpiData} margin={{ top: 5, right: 0, left: 0, bottom: 0 }}>
                        <defs>
                          <linearGradient id="colorProd" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#C0679A" stopOpacity={0.4} />
                            <stop offset="95%" stopColor="#C0679A" stopOpacity={0} />
                          </linearGradient>
                        </defs>
                        <XAxis dataKey="month" stroke="#6b7280" fontSize={10} tickLine={false} axisLine={false} />
                        <Tooltip
                          contentStyle={{
                            backgroundColor: '#191920',
                            borderColor: '#374151',
                            borderRadius: '8px',
                            fontSize: '11px',
                          }}
                        />
                        <Area type="monotone" dataKey="prod" stroke="#C0679A" strokeWidth={2} fillOpacity={1} fill="url(#colorProd)" />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Analytical Footnote */}
                <div className="text-[11px] text-gray-500 dark:text-gray-400 border-t border-gray-100 dark:border-white/5 pt-3 flex items-center justify-between">
                  <span>Synthesized from NovaTech manufacturing study</span>
                  <a href="#projects" className="text-accent-rose hover:underline font-medium">
                    Explore Details &rarr;
                  </a>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
