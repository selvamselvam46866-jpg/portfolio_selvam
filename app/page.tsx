import React from 'react';
import { getPortfolioData } from '@/lib/data/portfolio';
import { Navbar } from '@/components/Navbar';
import { HeroSection } from '@/components/sections/HeroSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { ProjectsSection } from '@/components/sections/ProjectsSection';
import { SkillsSection } from '@/components/sections/SkillsSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { EducationSection } from '@/components/sections/EducationSection';
import { CertificationsSection } from '@/components/sections/CertificationsSection';
import { HobbiesSection } from '@/components/sections/HobbiesSection';
import { ContactSection } from '@/components/sections/ContactSection';
import { Footer } from '@/components/Footer';
import { Database } from 'lucide-react';

export const revalidate = 60; // ISR cache revalidation

export default async function HomePage() {
  const data = await getPortfolioData();
  const { profile, projects, skillGroups, experiences, education, certifications, hobbies, settings, isLiveSupabase } = data;
  const visibility = settings.section_visibility || {
    about: true,
    projects: true,
    skills: true,
    experience: true,
    education: true,
    certifications: true,
    hobbies: true,
    contact: true,
  };

  return (
    <main className="min-h-screen bg-background text-foreground relative selection:bg-accent-plum selection:text-white">
      {/* Sticky Navbar */}
      <Navbar name={profile.name} resumeUrl={profile.resume_url} />

      {/* Hero Section */}
      <HeroSection profile={profile} />

      {/* 01 / About Section */}
      {visibility.about && <AboutSection profile={profile} />}

      {/* 02 / Projects Section */}
      {visibility.projects && <ProjectsSection projects={projects} />}

      {/* 03 / Skills Section */}
      {visibility.skills && <SkillsSection skillGroups={skillGroups} />}

      {/* 04 / Experience Section */}
      {visibility.experience && <ExperienceSection experiences={experiences} />}

      {/* 05 / Education Section */}
      {visibility.education && <EducationSection education={education} />}

      {/* 06 / Certifications Section */}
      {visibility.certifications && <CertificationsSection certifications={certifications} />}

      {/* 07 / Hobbies Section */}
      {visibility.hobbies && <HobbiesSection hobbies={hobbies} />}

      {/* 08 / Contact Section */}
      {visibility.contact && <ContactSection profile={profile} settings={settings} />}

      {/* Footer */}
      <Footer
        name={profile.name}
        email={profile.email}
        linkedinUrl={profile.linkedin_url}
        githubUrl={profile.github_url}
      />

      {/* Environment status indicator (discreet bottom pill) */}
      {!isLiveSupabase && (
        <div className="fixed bottom-4 left-4 z-40">
          <div className="px-3 py-1.5 rounded-full bg-[#191920]/90 border border-amber-500/30 text-amber-300 text-[11px] font-mono flex items-center gap-2 shadow-xl backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
            <span>Local Preview Mode (Using Verified Seed Data)</span>
          </div>
        </div>
      )}
    </main>
  );
}
