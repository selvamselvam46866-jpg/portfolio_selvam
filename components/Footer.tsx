'use client';

import React from 'react';
import Link from 'next/link';
import { Linkedin, Github, Mail, Lock, Heart, ArrowUp } from 'lucide-react';

interface FooterProps {
  name?: string;
  email?: string;
  linkedinUrl?: string;
  githubUrl?: string;
}

export function Footer({
  name = 'Selvam D',
  email = 'selvamselvam46866@gmail.com',
  linkedinUrl = 'https://linkedin.com/in/selvam-d-03b787291',
  githubUrl = 'https://github.com/jsdfocal-afk',
}: FooterProps) {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-gray-200 dark:border-white/10 bg-white dark:bg-[#0c0c10] py-16 text-xs text-gray-500 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start justify-between">
          
          {/* Brand & Tagline */}
          <div className="md:col-span-5 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-accent-plum to-accent-rose flex items-center justify-center font-heading font-bold text-white text-xs">
                SD
              </div>
              <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                {name}
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-300 max-w-sm leading-relaxed">
              AI & Data Analytics Professional / Junior Data Analyst passionate about Power BI dashboards, DAX measures, Excel modelling, and practical business insights.
            </p>
          </div>

          {/* Quick Navigation Shortcuts */}
          <div className="md:col-span-4 space-y-3">
            <span className="font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white block">
              Navigation
            </span>
            <div className="grid grid-cols-2 gap-2">
              <a href="#about" className="hover:text-accent-rose transition-colors">01 / About</a>
              <a href="#projects" className="hover:text-accent-rose transition-colors">02 / Projects</a>
              <a href="#skills" className="hover:text-accent-rose transition-colors">03 / Skills</a>
              <a href="#experience" className="hover:text-accent-rose transition-colors">04 / Experience</a>
              <a href="#education" className="hover:text-accent-rose transition-colors">05 / Education</a>
              <a href="#certifications" className="hover:text-accent-rose transition-colors">06 / Certifications</a>
              <a href="#hobbies" className="hover:text-accent-rose transition-colors">07 / Hobbies</a>
              <a href="#contact" className="hover:text-accent-rose transition-colors">08 / Contact</a>
            </div>
          </div>

          {/* Socials & Top Button */}
          <div className="md:col-span-3 space-y-3 md:text-right flex flex-col md:items-end">
            <span className="font-mono font-bold uppercase tracking-wider text-gray-900 dark:text-white block">
              Connect
            </span>
            <div className="flex items-center gap-3">
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#191920] hover:text-accent-rose transition-colors"
                title="LinkedIn"
              >
                <Linkedin className="w-4 h-4" />
              </a>
              <a
                href={githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#191920] hover:text-accent-rose transition-colors"
                title="GitHub"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${email}`}
                className="p-2.5 rounded-xl bg-gray-100 dark:bg-[#191920] hover:text-accent-rose transition-colors"
                title="Email"
              >
                <Mail className="w-4 h-4" />
              </a>
              <button
                onClick={scrollToTop}
                className="p-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white transition-colors"
                title="Back to Top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-100 dark:border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>
            &copy; {currentYear} {name}. All rights reserved. Designed for data intelligence.
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-gray-400 hover:text-accent-rose transition-colors"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>

      </div>
    </footer>
  );
}
