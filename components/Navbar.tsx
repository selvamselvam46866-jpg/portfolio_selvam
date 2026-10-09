'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { Menu, X, ArrowUpRight, BarChart2 } from 'lucide-react';

interface NavbarProps {
  name?: string;
  resumeUrl?: string | null;
}

export function Navbar({ name = 'Selvam D', resumeUrl = '/Selvam_D_Resume.pdf' }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'About', href: '#about', num: '01' },
    { label: 'Projects', href: '#projects', num: '02' },
    { label: 'Skills', href: '#skills', num: '03' },
    { label: 'Experience', href: '#experience', num: '04' },
    { label: 'Education', href: '#education', num: '05' },
    { label: 'Certifications', href: '#certifications', num: '06' },
    { label: 'Contact', href: '#contact', num: '07' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#101014]/90 dark:bg-[#101014]/90 bg-white/90 backdrop-blur-md border-b border-gray-200 dark:border-white/10 shadow-lg'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand / Monogram */}
        <Link href="/" className="flex items-center gap-3 group focus:outline-none">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-accent-plum via-accent-rose to-accent-lavender p-[1.5px] transition-transform duration-300 group-hover:scale-105">
            <div className="w-full h-full bg-[#101014] rounded-[10px] flex items-center justify-center font-heading font-bold text-accent-rose group-hover:text-white transition-colors">
              SD
            </div>
          </div>
          <div className="flex flex-col">
            <span className="font-heading font-bold text-base tracking-tight text-gray-900 dark:text-white group-hover:text-accent-rose dark:group-hover:text-accent-lavender transition-colors">
              {name}
            </span>
            <span className="text-[11px] font-medium text-gray-500 dark:text-gray-400 tracking-wider uppercase flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Junior Data Analyst
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 lg:gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-300 hover:text-accent-rose dark:hover:text-accent-lavender transition-colors py-1 group flex items-center gap-1"
            >
              <span className="text-[10px] text-accent-rose/70 dark:text-accent-lavender/60 font-mono">
                {link.num}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        {/* Action Buttons & Theme Switcher */}
        <div className="hidden sm:flex items-center gap-3">
          <ThemeToggle />
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-accent-plum/30 hover:scale-105"
          >
            <span>Hire Me</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex sm:hidden items-center gap-2">
          <ThemeToggle />
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-white/5 focus:outline-none"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="sm:hidden border-b border-gray-200 dark:border-white/10 bg-white/95 dark:bg-[#101014]/95 backdrop-blur-xl px-6 py-6 transition-all">
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-semibold uppercase tracking-wider text-gray-700 dark:text-gray-200 hover:text-accent-rose dark:hover:text-accent-lavender flex items-center justify-between py-2 border-b border-gray-100 dark:border-white/5"
              >
                <span>{link.label}</span>
                <span className="text-xs text-accent-lavender/60 font-mono">{link.num}</span>
              </a>
            ))}
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 w-full py-3 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-center text-xs font-semibold uppercase tracking-wider shadow-md"
            >
              Hire Me
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
