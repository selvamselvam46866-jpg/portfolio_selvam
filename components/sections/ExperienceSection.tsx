'use client';

import React from 'react';
import { Experience } from '@/types/portfolio';
import { Briefcase, Calendar, Building, Sparkles } from 'lucide-react';

interface ExperienceSectionProps {
  experiences: Experience[];
}

export function ExperienceSection({ experiences }: ExperienceSectionProps) {
  return (
    <section id="experience" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            04 / EXPERIENCE & TRAINING
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Practical Analytics Training Timeline
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        {/* Timeline List */}
        <div className="relative border-l-2 border-accent-plum/30 dark:border-accent-plum/40 ml-4 sm:ml-8 space-y-12">
          {experiences.map((exp, index) => (
            <div key={exp.id} className="relative pl-8 sm:pl-12 group">
              
              {/* Timeline Indicator Dot */}
              <div className="absolute -left-[9px] top-1.5 w-4 h-4 rounded-full bg-accent-plum border-2 border-white dark:border-[#101014] group-hover:bg-accent-rose transition-colors shadow-md" />

              {/* Card */}
              <div className="rounded-2xl p-6 sm:p-7 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-lg hover:border-accent-rose/30 transition-all space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-gray-100 dark:border-white/5 pb-3">
                  <div>
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-accent-rose dark:text-accent-lavender flex items-center gap-1.5">
                      <Sparkles className="w-3 h-3" />
                      {exp.type.toUpperCase()}
                    </span>
                    <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white mt-1">
                      {exp.role}
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5 text-accent-rose" />
                    <span>{exp.period}</span>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  <Building className="w-4 h-4 text-accent-lavender" />
                  <span>{exp.organization}</span>
                </div>

                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-1">
                  {exp.description}
                </p>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
