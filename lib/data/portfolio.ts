import { createServerSupabaseClient } from '@/lib/supabase/server';
import { PortfolioData, Profile, Project, SkillGroup, Experience, Education, Certification, Hobby, SiteSettings, SkillItem } from '@/types/portfolio';
import {
  initialProfileData,
  initialProjectsData,
  initialSkillGroupsData,
  initialExperiencesData,
  initialEducationData,
  initialCertificationsData,
  initialHobbiesData,
  initialSettingsData,
} from './initial-data';

export {
  initialProfileData,
  initialProjectsData,
  initialSkillGroupsData,
  initialExperiencesData,
  initialEducationData,
  initialCertificationsData,
  initialHobbiesData,
  initialSettingsData,
};

/**
 * Fetch portfolio data from Supabase.
 * If Supabase environment variables are missing or connection fails,
 * returns initial verified data while marking `isLiveSupabase: false`.
 */
export async function getPortfolioData(): Promise<PortfolioData> {
  const supabase = await createServerSupabaseClient();

  if (!supabase) {
    return {
      profile: initialProfileData,
      projects: initialProjectsData,
      skillGroups: initialSkillGroupsData,
      experiences: initialExperiencesData,
      education: initialEducationData,
      certifications: initialCertificationsData,
      hobbies: initialHobbiesData,
      settings: initialSettingsData,
      isLiveSupabase: false,
    };
  }

  try {
    const [
      { data: profile },
      { data: projects },
      { data: skillGroups },
      { data: skills },
      { data: experiences },
      { data: education },
      { data: certifications },
      { data: hobbies },
      { data: settings },
    ] = await Promise.all([
      supabase.from('profiles').select('*').limit(1).maybeSingle(),
      supabase.from('projects').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('skill_groups').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('skills').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('experiences').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('education').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('certifications').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('hobbies').select('*').eq('is_published', true).order('sort_order', { ascending: true }),
      supabase.from('site_settings').select('*').limit(1).maybeSingle(),
    ]);

    // Attach skills to skill groups
    const populatedGroups: SkillGroup[] = (skillGroups || initialSkillGroupsData).map((group: SkillGroup) => ({
      ...group,
      skills: (skills || []).filter((s: SkillItem) => s.group_id === group.id),
    }));

    return {
      profile: profile || initialProfileData,
      projects: projects && projects.length > 0 ? projects : initialProjectsData,
      skillGroups: populatedGroups.length > 0 ? populatedGroups : initialSkillGroupsData,
      experiences: experiences && experiences.length > 0 ? experiences : initialExperiencesData,
      education: education && education.length > 0 ? education : initialEducationData,
      certifications: certifications && certifications.length > 0 ? certifications : initialCertificationsData,
      hobbies: hobbies && hobbies.length > 0 ? hobbies : initialHobbiesData,
      settings: settings || initialSettingsData,
      isLiveSupabase: true,
    };
  } catch (err) {
    console.error('Failed to query Supabase, using initial verified dataset:', err);
    return {
      profile: initialProfileData,
      projects: initialProjectsData,
      skillGroups: initialSkillGroupsData,
      experiences: initialExperiencesData,
      education: initialEducationData,
      certifications: initialCertificationsData,
      hobbies: initialHobbiesData,
      settings: initialSettingsData,
      isLiveSupabase: false,
    };
  }
}
