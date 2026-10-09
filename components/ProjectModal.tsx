'use client';

import React from 'react';
import Image from 'next/image';
import { Project } from '@/types/portfolio';
import { X, ExternalLink, Github, CheckCircle2, AlertCircle, Wrench } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export function ProjectModal({ project, onClose }: ProjectModalProps) {
  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/80 backdrop-blur-md transition-opacity"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-2xl p-6 sm:p-8 space-y-6"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 rounded-xl bg-gray-100 dark:bg-[#101014] text-gray-600 dark:text-gray-300 hover:text-red-500 hover:bg-red-500/10 transition-colors"
          aria-label="Close dialog"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="space-y-1 pr-10">
          <span className="text-xs font-mono font-bold tracking-wider uppercase text-accent-rose dark:text-accent-lavender">
            {project.category}
          </span>
          <h3 id="project-modal-title" className="font-heading text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-white">
            {project.title}
          </h3>
        </div>

        {/* Project Image Preview */}
        {project.image_url && (
          <div className="relative w-full h-64 sm:h-96 rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-[#101014]">
            <Image
              src={project.image_url}
              alt={project.title}
              fill
              className="object-contain"
            />
          </div>
        )}

        {/* Tools Badges */}
        <div className="flex flex-wrap gap-2">
          {project.tools.map((t) => (
            <span
              key={t}
              className="text-xs font-semibold px-2.5 py-1 rounded-md bg-accent-plum/10 dark:bg-accent-plum/30 border border-accent-plum/30 text-accent-rose dark:text-accent-lavender"
            >
              {t}
            </span>
          ))}
        </div>

        {/* Description & Business Problem */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-2">
            <h4 className="font-heading text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider">
              Project Overview
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.description}
            </p>
          </div>

          <div className="p-4 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-2">
            <h4 className="font-heading text-xs uppercase font-bold text-gray-500 dark:text-gray-400 tracking-wider flex items-center gap-1.5 text-amber-500">
              <AlertCircle className="w-3.5 h-3.5" />
              Business Problem
            </h4>
            <p className="text-sm text-gray-700 dark:text-gray-300 leading-relaxed">
              {project.business_problem}
            </p>
          </div>
        </div>

        {/* Key Findings */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-500" />
            Key Analytical Findings
          </h4>
          <ul className="space-y-2">
            {project.key_findings.map((f, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5 p-2 rounded-lg bg-gray-50 dark:bg-[#101014]/60 border border-gray-100 dark:border-white/5"
              >
                <span className="font-mono text-xs font-bold text-accent-rose">0{i + 1}.</span>
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Recommended Actions */}
        <div className="space-y-3">
          <h4 className="font-heading text-sm font-bold uppercase tracking-wider text-gray-900 dark:text-white flex items-center gap-2">
            <Wrench className="w-4 h-4 text-accent-lavender" />
            Recommended Business Actions
          </h4>
          <ul className="space-y-2">
            {project.recommended_actions.map((act, i) => (
              <li
                key={i}
                className="text-xs sm:text-sm text-gray-700 dark:text-gray-300 flex items-start gap-2.5 p-2 rounded-lg bg-accent-plum/5 dark:bg-accent-plum/20 border border-accent-plum/20"
              >
                <span className="text-accent-rose font-bold">&rarr;</span>
                <span>{act}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-gray-100 dark:border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl bg-gray-100 dark:bg-[#101014] hover:bg-gray-200 dark:hover:bg-white/10 text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <Github className="w-4 h-4" />
                <span>View GitHub Repository</span>
              </a>
            )}
            {project.live_demo_url && (
              <a
                href={project.live_demo_url}
                target="_blank"
                rel="noopener noreferrer"
                className="py-2 px-4 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-2 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
                <span>Live Interactive Report</span>
              </a>
            )}
          </div>

          <button
            onClick={onClose}
            className="py-2 px-4 rounded-xl text-xs font-medium text-gray-500 hover:text-gray-900 dark:hover:text-white"
          >
            Close
          </button>
        </div>

      </div>
    </div>
  );
}
