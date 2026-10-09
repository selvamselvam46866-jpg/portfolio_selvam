'use client';

import React from 'react';
import { Education } from '@/types/portfolio';
import { GraduationCap, Calendar, MapPin } from 'lucide-react';

interface EducationSectionProps {
  education: Education[];
}

export function EducationSection({ education }: EducationSectionProps) {
  return (
    <section id="education" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            05 / ACADEMIC BACKGROUND
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Formal Education
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        {/* Education Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {education.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl p-7 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-lg hover:border-accent-rose/30 transition-all space-y-4"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="w-12 h-12 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender flex-shrink-0">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div className="text-right">
                  <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-md bg-gray-100 dark:bg-[#101014] text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-white/10">
                    {item.period}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="font-heading text-xl font-bold text-gray-900 dark:text-white">
                  {item.degree}
                </h3>
                <p className="text-sm font-semibold text-accent-rose dark:text-accent-lavender">
                  {item.institution}
                </p>
              </div>

              {item.description && (
                <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed pt-2 border-t border-gray-100 dark:border-white/5">
                  {item.description}
                </p>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
