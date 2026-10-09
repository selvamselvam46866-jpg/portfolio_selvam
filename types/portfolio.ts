export interface Profile {
  id: string;
  name: string;
  title: string;
  rotating_roles: string[];
  tagline: string;
  bio: string;
  location: string;
  email: string;
  phone: string;
  linkedin_url: string;
  github_url: string;
  availability_status: string;
  avatar_url: string | null;
  resume_url: string | null;
  stats_projects: number;
  stats_certifications: number;
  stats_experience: number;
  created_at?: string;
  updated_at?: string;
}

export interface Project {
  id: string;
  title: string;
  slug: string;
  category: string;
  description: string;
  business_problem: string;
  tools: string[];
  key_findings: string[];
  recommended_actions: string[];
  image_url: string | null;
  github_url: string | null;
  live_demo_url: string | null;
  is_featured: boolean;
  is_published: boolean;
  sort_order: number;
  created_at?: string;
  updated_at?: string;
}

export interface SkillItem {
  id: string;
  group_id: string;
  name: string;
  proficiency: string | null;
  icon: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface SkillGroup {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
  skills?: SkillItem[];
}

export interface Experience {
  id: string;
  organization: string;
  role: string;
  period: string;
  description: string;
  type: 'training' | 'internship' | 'employment';
  sort_order: number;
  is_published: boolean;
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  period: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface Certification {
  id: string;
  title: string;
  issuer: string;
  issue_date: string | null;
  credential_url: string | null;
  description: string | null;
  sort_order: number;
  is_published: boolean;
}

export interface Hobby {
  id: string;
  title: string;
  icon: string;
  sort_order: number;
  is_published: boolean;
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  is_read: boolean;
  created_at: string;
  ip_hash?: string | null;
}

export interface SiteSettings {
  id: string;
  site_title: string;
  meta_description: string;
  admin_email: string;
  show_phone_publicly: boolean;
  resume_download_enabled: boolean;
  section_visibility: {
    about: boolean;
    projects: boolean;
    skills: boolean;
    experience: boolean;
    education: boolean;
    certifications: boolean;
    hobbies: boolean;
    contact: boolean;
  };
}

export interface PortfolioData {
  profile: Profile;
  projects: Project[];
  skillGroups: SkillGroup[];
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  hobbies: Hobby[];
  settings: SiteSettings;
  isLiveSupabase: boolean;
}
