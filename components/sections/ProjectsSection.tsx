'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { Project } from '@/types/portfolio';
import { ProjectModal } from '@/components/ProjectModal';
import { ExternalLink, Github, Eye, Sparkles, Layers, CheckCircle2, ChevronRight } from 'lucide-react';

interface ProjectsSectionProps {
  projects: Project[];
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeModalProject, setActiveModalProject] = useState<Project | null>(null);

  // Extract unique categories
  const categories = ['All', ...Array.from(new Set(projects.map((p) => p.category)))];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  return (
    <section id="projects" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div className="space-y-2">
            <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
              02 / PROJECTS
            </div>
            <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
              Data & Business Intelligence Projects
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide transition-all ${
                  selectedCategory === cat
                    ? 'bg-accent-plum text-white shadow-md'
                    : 'bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-accent-rose/50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredProjects.map((project) => (
            <div
              key={project.id}
              className="group rounded-2xl bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 overflow-hidden shadow-xl hover:shadow-2xl hover:border-accent-rose/40 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Visual Thumbnail & Click to Zoom */}
                {project.image_url && (
                  <div
                    className="relative w-full h-56 sm:h-64 bg-[#101014] overflow-hidden cursor-pointer group/img"
                    onClick={() => setActiveModalProject(project)}
                  >
                    <Image
                      src={project.image_url}
                      alt={project.title}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover/img:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#101014] via-transparent to-transparent opacity-80" />
                    
                    {/* Hover Overlay Hint */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover/img:opacity-100 transition-opacity bg-black/40 backdrop-blur-[2px]">
                      <span className="px-3.5 py-1.5 rounded-full bg-accent-plum text-white text-xs font-semibold flex items-center gap-1.5 shadow-lg">
                        <Eye className="w-3.5 h-3.5" />
                        Inspect Dashboard Report
                      </span>
                    </div>

                    {/* Featured / Category Badges */}
                    <div className="absolute top-3 left-3 flex items-center gap-2">
                      <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-black/70 text-white backdrop-blur-md border border-white/10">
                        {project.category}
                      </span>
                      {project.is_featured && (
                        <span className="px-2.5 py-1 rounded-md text-[10px] font-mono font-bold tracking-wider uppercase bg-accent-rose/90 text-white backdrop-blur-md flex items-center gap-1">
                          <Sparkles className="w-3 h-3" />
                          Featured
                        </span>
                      )}
                    </div>
                  </div>
                )}

                {/* Content Body */}
                <div className="p-6 sm:p-7 space-y-4">
                  <div className="space-y-1.5">
                    <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white group-hover:text-accent-rose dark:group-hover:text-accent-lavender transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Business Problem Card */}
                  <div className="p-3.5 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200/80 dark:border-white/5 space-y-1">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-amber-500 block">
                      Business Challenge
                    </span>
                    <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                      {project.business_problem}
                    </p>
                  </div>

                  {/* Tools Badges */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-[11px] font-semibold px-2.5 py-0.5 rounded-md bg-accent-plum/10 dark:bg-accent-plum/25 border border-accent-plum/20 text-accent-rose dark:text-accent-lavender"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>

                  {/* Key Analytical Findings Bullet Points */}
                  <div className="space-y-1.5 pt-2">
                    <span className="text-[11px] font-mono font-bold uppercase tracking-wider text-gray-500 dark:text-gray-400 block">
                      Key Analytical Findings
                    </span>
                    <ul className="space-y-1.5">
                      {project.key_findings.slice(0, 3).map((item, idx) => (
                        <li key={idx} className="text-xs text-gray-700 dark:text-gray-300 flex items-start gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Card Footer */}
              <div className="p-6 pt-0 border-t border-gray-100 dark:border-white/5 mt-4 flex items-center justify-between">
                <button
                  onClick={() => setActiveModalProject(project)}
                  className="text-xs font-semibold text-accent-rose dark:text-accent-lavender hover:underline flex items-center gap-1"
                >
                  <span>View Findings & Actions</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </button>

                <div className="flex items-center gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-gray-100 dark:bg-[#101014] hover:bg-gray-200 dark:hover:bg-white/10 text-gray-700 dark:text-gray-300 transition-colors"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a
                      href={project.live_demo_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white transition-colors"
                      title="Open Live Report"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

      {/* Detail Inspection Modal */}
      <ProjectModal
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </section>
  );
}
