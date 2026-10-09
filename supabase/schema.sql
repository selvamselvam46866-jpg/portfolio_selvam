-- ==============================================================================
-- SELVAM D PORTFOLIO DATABASE SCHEMA
-- PostgreSQL / Supabase Schema with Row Level Security (RLS)
-- ==============================================================================

-- 1. EXTENSIONS & HELPER FUNCTIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Function to automatically update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 2. SITE SETTINGS TABLE
CREATE TABLE IF NOT EXISTS site_settings (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    site_title TEXT NOT NULL DEFAULT 'Selvam D — AI & Data Analytics Portfolio',
    meta_description TEXT NOT NULL DEFAULT 'Portfolio of Selvam D, aspiring Data Analyst and AI & Data Analytics Professional specializing in Power BI, Excel, SQL, and DAX.',
    admin_email TEXT NOT NULL DEFAULT 'selvamselvam46866@gmail.com',
    show_phone_publicly BOOLEAN NOT NULL DEFAULT false,
    resume_download_enabled BOOLEAN NOT NULL DEFAULT true,
    section_visibility JSONB NOT NULL DEFAULT '{
        "about": true,
        "projects": true,
        "skills": true,
        "experience": true,
        "education": true,
        "certifications": true,
        "hobbies": true,
        "contact": true
    }'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Trigger for site_settings
CREATE TRIGGER update_site_settings_modtime
    BEFORE UPDATE ON site_settings
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- Admin verification helper function
CREATE OR REPLACE FUNCTION is_admin()
RETURNS BOOLEAN AS $$
DECLARE
    target_admin TEXT;
BEGIN
    SELECT admin_email INTO target_admin FROM site_settings LIMIT 1;
    IF target_admin IS NULL THEN
        target_admin := 'selvamselvam46866@gmail.com';
    END IF;
    RETURN (auth.jwt() ->> 'email' = target_admin);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL DEFAULT 'Selvam D',
    title TEXT NOT NULL DEFAULT 'AI and Data Analytics Professional',
    rotating_roles TEXT[] NOT NULL DEFAULT ARRAY[
        'Aspiring Data Analyst',
        'Junior Data Analyst',
        'Power BI Dashboard Developer',
        'Excel Data Analyst',
        'Business Intelligence Enthusiast'
    ],
    tagline TEXT NOT NULL DEFAULT 'Transforming complex data into actionable business intelligence through Power BI, DAX, and structured analytical models.',
    bio TEXT NOT NULL,
    location TEXT NOT NULL DEFAULT 'Adhiyaman Kottai, Dharmapuri, Tamil Nadu',
    email TEXT NOT NULL DEFAULT 'selvamselvam46866@gmail.com',
    phone TEXT NOT NULL DEFAULT '+91 63748 91360',
    linkedin_url TEXT NOT NULL DEFAULT 'https://linkedin.com/in/selvam-d-03b787291',
    github_url TEXT NOT NULL DEFAULT 'https://github.com/jsdfocal-afk',
    availability_status TEXT NOT NULL DEFAULT 'Open to fresher Data Analyst and Junior Data Analyst opportunities',
    avatar_url TEXT DEFAULT '/images/resume-preview.png',
    resume_url TEXT DEFAULT '/Selvam_D_Resume.pdf',
    stats_projects INTEGER NOT NULL DEFAULT 4,
    stats_certifications INTEGER NOT NULL DEFAULT 5,
    stats_experience INTEGER NOT NULL DEFAULT 3,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_profiles_modtime
    BEFORE UPDATE ON profiles
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 4. PROJECTS TABLE
CREATE TABLE IF NOT EXISTS projects (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    category TEXT NOT NULL,
    description TEXT NOT NULL,
    business_problem TEXT NOT NULL,
    tools TEXT[] NOT NULL DEFAULT '{}',
    key_findings TEXT[] NOT NULL DEFAULT '{}',
    recommended_actions TEXT[] NOT NULL DEFAULT '{}',
    image_url TEXT,
    github_url TEXT,
    live_demo_url TEXT,
    is_featured BOOLEAN NOT NULL DEFAULT false,
    is_published BOOLEAN NOT NULL DEFAULT true,
    sort_order INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_projects_modtime
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 5. SKILL GROUPS TABLE
CREATE TABLE IF NOT EXISTS skill_groups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Database',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_skill_groups_modtime
    BEFORE UPDATE ON skill_groups
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 6. SKILLS TABLE
CREATE TABLE IF NOT EXISTS skills (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    group_id UUID NOT NULL REFERENCES skill_groups(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    proficiency TEXT,
    icon TEXT DEFAULT 'CheckCircle',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_skills_modtime
    BEFORE UPDATE ON skills
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 7. EXPERIENCES TABLE
CREATE TABLE IF NOT EXISTS experiences (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    organization TEXT NOT NULL,
    role TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    type TEXT NOT NULL DEFAULT 'training', -- 'training', 'internship', 'employment'
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_experiences_modtime
    BEFORE UPDATE ON experiences
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 8. EDUCATION TABLE
CREATE TABLE IF NOT EXISTS education (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    degree TEXT NOT NULL,
    institution TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_education_modtime
    BEFORE UPDATE ON education
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 9. CERTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS certifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    issuer TEXT NOT NULL,
    issue_date TEXT,
    credential_url TEXT,
    description TEXT,
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_certifications_modtime
    BEFORE UPDATE ON certifications
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 10. HOBBIES TABLE
CREATE TABLE IF NOT EXISTS hobbies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    icon TEXT NOT NULL DEFAULT 'Activity',
    sort_order INTEGER NOT NULL DEFAULT 0,
    is_published BOOLEAN NOT NULL DEFAULT true,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TRIGGER update_hobbies_modtime
    BEFORE UPDATE ON hobbies
    FOR EACH ROW EXECUTE PROCEDURE update_updated_at_column();

-- 11. MESSAGES TABLE
CREATE TABLE IF NOT EXISTS messages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN NOT NULL DEFAULT false,
    ip_hash TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ==============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ==============================================================================

-- Enable RLS on all tables
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE skill_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE education ENABLE ROW LEVEL SECURITY;
ALTER TABLE certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE hobbies ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- 1. Site Settings Policies
CREATE POLICY "Public read for site settings" ON site_settings
    FOR SELECT USING (true);
CREATE POLICY "Admin write for site settings" ON site_settings
    FOR ALL USING (is_admin());

-- 2. Profiles Policies
CREATE POLICY "Public read for profiles" ON profiles
    FOR SELECT USING (true);
CREATE POLICY "Admin write for profiles" ON profiles
    FOR ALL USING (is_admin());

-- 3. Projects Policies
CREATE POLICY "Public read for published projects" ON projects
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for projects" ON projects
    FOR ALL USING (is_admin());

-- 4. Skill Groups Policies
CREATE POLICY "Public read for published skill groups" ON skill_groups
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for skill groups" ON skill_groups
    FOR ALL USING (is_admin());

-- 5. Skills Policies
CREATE POLICY "Public read for published skills" ON skills
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for skills" ON skills
    FOR ALL USING (is_admin());

-- 6. Experiences Policies
CREATE POLICY "Public read for published experiences" ON experiences
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for experiences" ON experiences
    FOR ALL USING (is_admin());

-- 7. Education Policies
CREATE POLICY "Public read for published education" ON education
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for education" ON education
    FOR ALL USING (is_admin());

-- 8. Certifications Policies
CREATE POLICY "Public read for published certifications" ON certifications
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for certifications" ON certifications
    FOR ALL USING (is_admin());

-- 9. Hobbies Policies
CREATE POLICY "Public read for published hobbies" ON hobbies
    FOR SELECT USING (is_published = true OR is_admin());
CREATE POLICY "Admin write for hobbies" ON hobbies
    FOR ALL USING (is_admin());

-- 10. Messages Policies
-- Public can ONLY insert new messages
CREATE POLICY "Public submit contact messages" ON messages
    FOR INSERT WITH CHECK (true);
-- ONLY Admin can read, update or delete messages
CREATE POLICY "Admin manage contact messages" ON messages
    FOR ALL USING (is_admin());

-- ==============================================================================
-- STORAGE CONFIGURATION (Supabase Storage Buckets)
-- ==============================================================================
-- Insert default storage buckets if storage schema exists
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM information_schema.schemata WHERE schema_name = 'storage') THEN
        INSERT INTO storage.buckets (id, name, public)
        VALUES ('portfolio-assets', 'portfolio-assets', true)
        ON CONFLICT (id) DO NOTHING;

        INSERT INTO storage.buckets (id, name, public)
        VALUES ('resumes', 'resumes', true)
        ON CONFLICT (id) DO NOTHING;
    END IF;
END $$;
