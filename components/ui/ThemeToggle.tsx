'use client';

import React from 'react';
import { useTheme } from '@/components/ThemeProvider';
import { Moon, Sun } from 'lucide-react';

export function ThemeToggle({ className = '' }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      type="button"
      className={`p-2 rounded-lg border border-white/10 dark:border-white/10 border-gray-200 bg-white/50 dark:bg-[#191920]/80 text-gray-700 dark:text-gray-300 hover:text-accent-rose dark:hover:text-accent-lavender hover:border-accent-rose/40 transition-colors focus:outline-none focus:ring-2 focus:ring-accent-lavender/40 ${className}`}
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-300 transition-transform hover:rotate-45" />
      ) : (
        <Moon className="w-4 h-4 text-purple-700 transition-transform hover:-rotate-12" />
      )}
    </button>
  );
}
