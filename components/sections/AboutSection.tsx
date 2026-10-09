'use client';

import React from 'react';
import Image from 'next/image';
import { Profile } from '@/types/portfolio';
import { MapPin, Mail, Globe, Linkedin, Github, CheckCircle2, Database, BarChart2, Layers } from 'lucide-react';

interface AboutSectionProps {
  profile: Profile;
}

export function AboutSection({ profile }: AboutSectionProps) {
  const highlights = [
    {
      icon: Database,
      title: 'Data Cleaning & ETL',
      desc: 'Fixing inconsistencies, structuring tables, and verifying data hygiene before modelling.',
    },
    {
      icon: Layers,
      title: 'Star Schema & Modelling',
      desc: 'Structuring relationships between fact and dimension tables for high-performance reporting.',
    },
    {
      icon: BarChart2,
      title: 'DAX & Calculated KPIs',
      desc: 'Formulating time intelligence, defect rates, achievement percentages, and custom metrics.',
    },
    {
      icon: CheckCircle2,
      title: 'Actionable Storytelling',
      desc: 'Translating complex analytical findings into concrete, commercial recommendations for leaders.',
    },
  ];

  return (
    <section id="about" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            01 / ABOUT ME
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Transforming Data Into Decision Power
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Profile Card & Quick Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-6 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-xl space-y-6">
              
              {/* Photo & Quick Title */}
              <div className="flex items-center gap-4">
                <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-accent-rose/50 bg-[#101014] flex-shrink-0">
                  <Image
                    src={profile.avatar_url || '/images/resume-preview.png'}
                    alt={profile.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
                    {profile.name}
                  </h3>
                  <p className="text-xs font-semibold text-accent-rose dark:text-accent-lavender tracking-wide">
                    {profile.title}
                  </p>
                  <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-1">
                    B.Sc Computer Science (2023–2026)
                  </p>
                </div>
              </div>

              {/* Bio Summary */}
              <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-2 border-t border-gray-100 dark:border-white/5">
                {profile.bio}
              </p>

              {/* Meta details */}
              <div className="space-y-3 pt-2 text-xs text-gray-600 dark:text-gray-300 border-t border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-2.5">
                  <MapPin className="w-4 h-4 text-accent-rose flex-shrink-0" />
                  <span>{profile.location}</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 text-accent-rose flex-shrink-0" />
                  <a href={`mailto:${profile.email}`} className="hover:text-accent-rose transition-colors">
                    {profile.email}
                  </a>
                </div>
                <div className="flex items-center gap-2.5">
                  <Globe className="w-4 h-4 text-accent-rose flex-shrink-0" />
                  <span>Languages: Tamil (Native), English (Professional)</span>
                </div>
              </div>

              {/* Social profile buttons */}
              <div className="pt-2 flex items-center gap-3">
                <a
                  href={profile.linkedin_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200 dark:border-white/10 hover:border-accent-rose/50 text-gray-800 dark:text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Linkedin className="w-4 h-4 text-blue-500" />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.github_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-2.5 px-3 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200 dark:border-white/10 hover:border-accent-lavender/50 text-gray-800 dark:text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  <span>GitHub</span>
                </a>
              </div>

            </div>
          </div>

          {/* Right Column: Analytical Philosophy & 4 Pillars */}
          <div className="lg:col-span-7 space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-xl space-y-6">
              
              <div className="space-y-3">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  My Core Approach to Analytics
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  Rather than just creating decorative charts, I approach data with business outcomes in mind. 
                  Every dashboard begins with the business question: What is causing profitability leakage? Which supplier creates downstream assembly bottlenecks? How can operators curb downtime?
                </p>
              </div>

              {/* 4 Pillars Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {highlights.map((item, idx) => {
                  const Icon = item.icon;
                  return (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-2 hover:border-accent-rose/30 transition-colors"
                    >
                      <div className="w-8 h-8 rounded-lg bg-accent-plum/20 flex items-center justify-center text-accent-rose dark:text-accent-lavender">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-heading text-sm font-bold text-gray-900 dark:text-white">
                        {item.title}
                      </h4>
                      <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  );
                })}
              </div>

              {/* Current Focus Banner */}
              <div className="p-4 rounded-xl bg-gradient-to-r from-accent-plum/20 via-accent-rose/10 to-transparent border border-accent-plum/30 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-accent-plum flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                  AI
                </div>
                <div className="text-xs">
                  <span className="font-bold text-gray-900 dark:text-white block">
                    Active Professional Development
                  </span>
                  <span className="text-gray-600 dark:text-gray-300">
                    Currently pursuing AI and Data Analytics training at Anudip Foundation to refine statistical workflows and predictive modeling techniques.
                  </span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
