'use client';

import React from 'react';
import { SkillGroup } from '@/types/portfolio';
import { BarChart3, Sheet, Database, Brain, Wrench, Sparkles, CheckCircle2 } from 'lucide-react';

interface SkillsSectionProps {
  skillGroups: SkillGroup[];
}

const iconMap: Record<string, any> = {
  BarChart3,
  Sheet,
  Database,
  Brain,
  Wrench,
  Sparkles,
};

export function SkillsSection({ skillGroups }: SkillsSectionProps) {
  return (
    <section id="skills" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            03 / SKILLS & PROFICIENCIES
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Analytical Tooling & Methodologies
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        {/* Skill Groups Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group) => {
            const GroupIcon = iconMap[group.icon] || BarChart3;

            return (
              <div
                key={group.id}
                className="rounded-2xl p-6 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-lg hover:border-accent-rose/30 transition-all space-y-5"
              >
                {/* Group Title Header */}
                <div className="flex items-center gap-3 border-b border-gray-100 dark:border-white/5 pb-4">
                  <div className="w-10 h-10 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender">
                    <GroupIcon className="w-5 h-5" />
                  </div>
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                    {group.title}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-2.5">
                  {group.skills?.map((skill) => (
                    <div
                      key={skill.id}
                      className="p-2.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/60 dark:border-white/5 flex items-center justify-between gap-3 hover:border-accent-lavender/30 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <CheckCircle2 className="w-3.5 h-3.5 text-accent-rose dark:text-accent-lavender flex-shrink-0" />
                        <span className="text-xs font-semibold text-gray-800 dark:text-gray-200">
                          {skill.name}
                        </span>
                      </div>

                      {skill.proficiency && (
                        <span className="text-[10px] font-mono font-medium px-2 py-0.5 rounded-md bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400">
                          {skill.proficiency}
                        </span>
                      )}
                    </div>
                  ))}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
