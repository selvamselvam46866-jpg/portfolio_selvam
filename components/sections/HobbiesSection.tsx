'use client';

import React from 'react';
import { Hobby } from '@/types/portfolio';
import { Crown, BookOpen, Code2, Video, Headphones, Utensils, Activity } from 'lucide-react';

interface HobbiesSectionProps {
  hobbies: Hobby[];
}

const iconMap: Record<string, any> = {
  Crown,
  BookOpen,
  Code2,
  Video,
  Headphones,
  Utensils,
};

export function HobbiesSection({ hobbies }: HobbiesSectionProps) {
  return (
    <section id="hobbies" className="py-20 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-12">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            07 / BEYOND THE SCREEN
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold uppercase text-gray-900 dark:text-white">
            Hobbies & Creative Interests
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        {/* Hobbies Chips Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {hobbies.map((hobby) => {
            const Icon = iconMap[hobby.icon] || Activity;

            return (
              <div
                key={hobby.id}
                className="p-4 rounded-xl bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-sm hover:border-accent-rose/40 hover:scale-[1.02] transition-all flex flex-col items-center text-center gap-3"
              >
                <div className="w-10 h-10 rounded-full bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender">
                  <Icon className="w-5 h-5" />
                </div>
                <span className="font-heading text-xs font-bold text-gray-800 dark:text-gray-200">
                  {hobby.title}
                </span>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
