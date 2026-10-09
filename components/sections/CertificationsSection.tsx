'use client';

import React from 'react';
import { Certification } from '@/types/portfolio';
import { Award, ExternalLink, Calendar, CheckCircle2 } from 'lucide-react';

interface CertificationsSectionProps {
  certifications: Certification[];
}

export function CertificationsSection({ certifications }: CertificationsSectionProps) {
  return (
    <section id="certifications" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            06 / CREDENTIALS
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Certifications & Achievements
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {certifications.map((cert) => (
            <div
              key={cert.id}
              className="rounded-2xl p-6 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-lg hover:border-accent-rose/30 transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="w-10 h-10 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender">
                    <Award className="w-5 h-5" />
                  </div>
                  {cert.issue_date && (
                    <span className="text-[11px] font-mono text-gray-500 dark:text-gray-400">
                      {cert.issue_date}
                    </span>
                  )}
                </div>

                <div className="space-y-1">
                  <h3 className="font-heading text-lg font-bold text-gray-900 dark:text-white">
                    {cert.title}
                  </h3>
                  <p className="text-xs font-semibold text-accent-rose dark:text-accent-lavender">
                    {cert.issuer}
                  </p>
                </div>

                {cert.description && (
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed pt-2 border-t border-gray-100 dark:border-white/5">
                    {cert.description}
                  </p>
                )}
              </div>

              {cert.credential_url && (
                <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-accent-rose hover:underline flex items-center gap-1.5"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
