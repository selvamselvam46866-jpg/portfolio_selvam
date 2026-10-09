-- ==============================================================================
-- SELVAM D PORTFOLIO SEED SCRIPT
-- Realistic, verified data matching Selvam's background & project work
-- ==============================================================================

-- 1. SITE SETTINGS
INSERT INTO site_settings (id, site_title, meta_description, admin_email, show_phone_publicly, resume_download_enabled)
VALUES (
    'a0000000-0000-0000-0000-000000000001',
    'Selvam D — AI & Data Analytics Portfolio',
    'Portfolio of Selvam D, aspiring Data Analyst and AI & Data Analytics Professional specializing in Power BI, Excel, SQL, and DAX.',
    'selvamselvam46866@gmail.com',
    false,
    true
) ON CONFLICT (id) DO UPDATE SET
    site_title = EXCLUDED.site_title,
    admin_email = EXCLUDED.admin_email;

-- 2. PROFILE
INSERT INTO profiles (
    id, name, title, rotating_roles, tagline, bio,
    location, email, phone, linkedin_url, github_url,
    availability_status, avatar_url, resume_url,
    stats_projects, stats_certifications, stats_experience
) VALUES (
    'b0000000-0000-0000-0000-000000000001',
    'Selvam D',
    'AI and Data Analytics Professional',
    ARRAY[
        'Aspiring Data Analyst',
        'Junior Data Analyst',
        'Power BI Dashboard Developer',
        'Excel Data Analyst',
        'Business Intelligence Enthusiast'
    ],
    'Transforming raw transactional datasets into interactive dashboards, high-impact DAX measures, and clear executive business decisions.',
    'I am an aspiring Data Analyst with a B.Sc. in Computer Science and practical project experience in Power BI and Excel. I work on cleaning data, modelling tables, creating DAX measures, building interactive dashboards, and identifying useful business insights. I am currently pursuing AI and Data Analytics training at Anudip Foundation and looking for an opportunity to apply my analytical skills in a professional environment.',
    'Adhiyaman Kottai, Dharmapuri, Tamil Nadu',
    'selvamselvam46866@gmail.com',
    '+91 63748 91360',
    'https://linkedin.com/in/selvam-d-03b787291',
    'https://github.com/jsdfocal-afk',
    'Open to fresher Data Analyst and Junior Data Analyst opportunities',
    '/images/selvam-photo.jpg',
    '/Selvam_D_Resume.pdf',
    4,
    5,
    3
) ON CONFLICT (id) DO NOTHING;

-- 3. PROJECTS
INSERT INTO projects (
    id, title, slug, category, description, business_problem,
    tools, key_findings, recommended_actions,
    image_url, github_url, live_demo_url, is_featured, is_published, sort_order
) VALUES
(
    'c0000000-0000-0000-0000-000000000001',
    'AeroHome Manufacturing Dashboard',
    'aerohome-manufacturing-dashboard',
    'Manufacturing Analytics',
    'A nine-page manufacturing analytics report designed to analyze production performance, downtime, quality, energy consumption, cost exposure, suppliers, materials, and operators across four plants.',
    'Manufacturing management struggled to monitor plant downtime drivers, defect cost exposures across production lines, and supplier procurement delay patterns across four industrial locations.',
    ARRAY['Power BI', 'DAX', 'Data Modelling', 'Power Query', 'KPI Cards'],
    ARRAY[
        'Engineered custom DAX measures for Production Achievement %, Defect Rate, Downtime per 1,000 Units, and Delay Rate.',
        'Analyzed cross-plant performance spanning production volume, downtime, energy load, and procurement latency.',
        'Identified material shortages as the primary contributor to operational downtime in the recorded dataset.',
        'Identified a 544M defect cost exposure across reported manufacturing batches (subject to underlying currency verification).'
    ],
    ARRAY[
        'Investigate supply chain buffer stocks to mitigate material shortage-related downtime.',
        'Deploy quality control checkpoint audits at high-defect assembly stages.',
        'Establish automated supplier delivery tracking to curb upstream lead time delays.'
    ],
    '/images/aerohome-overview.png',
    'https://github.com/jsdfocal-afk',
    NULL,
    true,
    true,
    1
),
(
    'c0000000-0000-0000-0000-000000000002',
    'NovaTech MFG Intelligence Dashboard',
    'novatech-mfg-intelligence-dashboard',
    'Manufacturing Analytics',
    'A seven-page manufacturing intelligence dashboard analyzing five plants and ten products across the 2024–2025 operating period.',
    'Leadership required an executive overview linking plant-level production output (1M units), defect distributions (18K defects), downtime (86K hours), energy consumption (3.21M kWh), and procurement metrics ($21.54M spend).',
    ARRAY['Power BI', 'DAX', 'Data Modelling', 'Manufacturing KPIs', 'Interactive Slicers'],
    ARRAY[
        'Synthesized 1M total production units across 5 global manufacturing plants and 10 core product lines.',
        'Uncovered specific supplier with the highest delivery delay rate (0.11 delay rate on 2K purchase orders).',
        'Pinpointed the specific plant exhibiting the highest energy consumption per unit (Shanghai Gigafactory at ~11 kWh/unit).',
        'Mapped product category distribution showing Renewable Energy (32.3%) and Consumer Electronics (24.0%) as top volume drivers.',
    ],
    ARRAY[
        'Rebalance energy efficiency strategies at highest-consumption facilities.',
        'Renegotiate SLA terms and buffer inventories with high-delay material suppliers.',
        'Standardize defect prevention guidelines to maintain defect rate below the 0.02 benchmark.'
    ],
    '/images/novatech-overview.png',
    'https://github.com/jsdfocal-afk',
    NULL,
    true,
    true,
    2
),
(
    'c0000000-0000-0000-0000-000000000003',
    'TrendMart Profitability Leakage Analysis',
    'trendmart-profitability-leakage-analysis',
    'Retail Analytics',
    'A retail analytics workbook built using 3,000 transactions, pivot tables, XLOOKUP, slicers, and a ten-chart dashboard.',
    'TrendMart experienced eroding net margins despite steady top-line revenue, alongside inconsistent raw data reporting across regional retail records.',
    ARRAY['Microsoft Excel', 'Pivot Tables', 'XLOOKUP', 'Data Cleaning', 'Slicers', 'Chart Design'],
    ARRAY[
        'Audited and resolved 23 discrete data-quality inconsistencies across 5 spreadsheet sheets.',
        'Discovered a 7.2% year-over-year profit decline occurring alongside essentially flat gross revenue.',
        'Established current actual net profit margin baseline of 19.56%.',
        'Isolated high-volume product items selling at compressed or negative unit margins.'
    ],
    ARRAY[
        'Conduct root-cause pricing audits on high-volume, low-margin merchandise items.',
        'Analyze product return patterns to reduce leakage from restocking and processing overhead.',
        'Implement standardized Excel validation templates to prevent data-entry discrepancies.'
    ],
    '/images/trendmart-dashboard.png',
    'https://github.com/jsdfocal-afk',
    NULL,
    true,
    true,
    3
),
(
    'c0000000-0000-0000-0000-000000000004',
    'FreshMart Profitability Leakage Analysis',
    'freshmart-profitability-leakage-analysis',
    'Supermarket Analytics',
    'A supermarket analytics workbook analyzing 2,500 orders using category, product, and store-level analysis in pivot tables and charts.',
    'Store managers lacked granular visibility into profitability across product departments, risking over-promotion of margin-eroding grocery categories.',
    ARRAY['Microsoft Excel', 'Pivot Tables', 'Category Modelling', 'Store-level Analysis', 'Charts'],
    ARRAY[
        'Evaluated 2,500 order transactions segmented by category, SKU, and store location.',
        'Determined that the Bakery category delivered the highest profit margin across the chain at 38.9%.',
        'Identified that Rice registered the lowest relative margin at 14.8% due to bulk cost structures.',
        'Highlighted store-to-store variance in merchandising efficiency.',
    ],
    ARRAY[
        'Leverage category-level profitability insights to re-engineer promotional end-caps toward high-margin items like Bakery.',
        'Optimize wholesale procurement and packaging costs for high-volume staples like Rice.',
        'Align individual store inventory targets with high-margin category sales velocities.'
    ],
    '/images/freshmart-dashboard.png',
    'https://github.com/jsdfocal-afk',
    NULL,
    false,
    true,
    4
) ON CONFLICT (id) DO NOTHING;

-- 4. SKILL GROUPS & SKILLS
INSERT INTO skill_groups (id, title, icon, sort_order, is_published) VALUES
('d0000000-0000-0000-0000-000000000001', 'Data Analytics and Business Intelligence', 'BarChart3', 1, true),
('d0000000-0000-0000-0000-000000000002', 'Excel', 'Sheet', 2, true),
('d0000000-0000-0000-0000-000000000003', 'SQL', 'Database', 3, true),
('d0000000-0000-0000-0000-000000000004', 'Programming & AI', 'Brain', 4, true),
('d0000000-0000-0000-0000-000000000005', 'Tools & Environment', 'Wrench', 5, true),
('d0000000-0000-0000-0000-000000000006', 'Soft Skills', 'Sparkles', 6, true)
ON CONFLICT (id) DO NOTHING;

-- Skills for Group 1: Data Analytics & BI
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000001', 'Power BI Desktop', 'Advanced Hands-on', 'BarChart3', 1),
('d0000000-0000-0000-0000-000000000001', 'Dashboard Design', 'Proficient', 'LayoutDashboard', 2),
('d0000000-0000-0000-0000-000000000001', 'KPI Cards & Slicers', 'Proficient', 'Sliders', 3),
('d0000000-0000-0000-0000-000000000001', 'Data Visualization', 'Proficient', 'PieChart', 4),
('d0000000-0000-0000-0000-000000000001', 'Business Insights', 'Analytical', 'TrendingUp', 5),
('d0000000-0000-0000-0000-000000000001', 'Data Modelling (Star Schema)', 'Hands-on', 'Network', 6),
('d0000000-0000-0000-0000-000000000001', 'DAX Measures', 'Calculations & KPIs', 'Calculator', 7),
('d0000000-0000-0000-0000-000000000001', 'Power Query ETL', 'Intermediate', 'Filter', 8);

-- Skills for Group 2: Excel
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000002', 'Pivot Tables', 'Proficient', 'Table', 1),
('d0000000-0000-0000-0000-000000000002', 'XLOOKUP & VLOOKUP', 'Proficient', 'Search', 2),
('d0000000-0000-0000-0000-000000000002', 'Data Cleaning & Validation', 'Hands-on', 'CheckCircle2', 3),
('d0000000-0000-0000-0000-000000000002', 'Data Analysis', 'Analytical', 'Activity', 4),
('d0000000-0000-0000-0000-000000000002', 'Excel Charts & Dashboards', 'Visual Design', 'BarChart', 5),
('d0000000-0000-0000-0000-000000000002', 'Interactive Slicers', 'Proficient', 'SlidersHorizontal', 6);

-- Skills for Group 3: SQL
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000003', 'SELECT Queries & Aliasing', 'Proficient', 'Code', 1),
('d0000000-0000-0000-0000-000000000003', 'Filtering & Sorting (WHERE, ORDER BY)', 'Proficient', 'Filter', 2),
('d0000000-0000-0000-0000-000000000003', 'Aggregate Functions (SUM, AVG, COUNT)', 'Proficient', 'Calculator', 3),
('d0000000-0000-0000-0000-000000000003', 'GROUP BY & HAVING', 'Proficient', 'Layers', 4),
('d0000000-0000-0000-0000-000000000003', 'Table Joins (INNER, LEFT, RIGHT)', 'Intermediate', 'GitMerge', 5),
('d0000000-0000-0000-0000-000000000003', 'Subqueries', 'Working Knowledge', 'FileCode2', 6),
('d0000000-0000-0000-0000-000000000003', 'Window Functions', 'Foundational', 'Workflow', 7);

-- Skills for Group 4: Programming & AI
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000004', 'Python Basics', 'Foundations', 'FileCode', 1),
('d0000000-0000-0000-0000-000000000004', 'Pandas Fundamentals', 'Learning', 'TableProperties', 2),
('d0000000-0000-0000-0000-000000000004', 'NumPy Basics', 'Learning', 'Cpu', 3),
('d0000000-0000-0000-0000-000000000004', 'Python Data Visualization (Matplotlib)', 'Foundations', 'BarChart2', 4),
('d0000000-0000-0000-0000-000000000004', 'AI & Analytics Workflow', 'Coursework', 'BrainCircuit', 5);

-- Skills for Group 5: Tools & Environment
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000005', 'Microsoft Excel', 'Primary Analytical Tool', 'Sheet', 1),
('d0000000-0000-0000-0000-000000000005', 'Power BI Desktop', 'Primary BI Tool', 'BarChart3', 2),
('d0000000-0000-0000-0000-000000000005', 'SQL Tools (PostgreSQL / MySQL)', 'Database Tooling', 'Database', 3),
('d0000000-0000-0000-0000-000000000005', 'VS Code', 'Editor', 'Code2', 4),
('d0000000-0000-0000-0000-000000000005', 'Git & GitHub', 'Version Control', 'GitBranch', 5);

-- Skills for Group 6: Soft Skills
INSERT INTO skills (group_id, name, proficiency, icon, sort_order) VALUES
('d0000000-0000-0000-0000-000000000006', 'Teamwork', 'Collaborative', 'Users', 1),
('d0000000-0000-0000-0000-000000000006', 'Time Management', 'Disciplined', 'Clock', 2),
('d0000000-0000-0000-0000-000000000006', 'Effective Communication', 'Stakeholder Focused', 'MessageSquare', 3),
('d0000000-0000-0000-0000-000000000006', 'Critical Thinking', 'Inquisitive', 'Compass', 4),
('d0000000-0000-0000-0000-000000000006', 'Problem Solving', 'Structured Approach', 'HelpCircle', 5),
('d0000000-0000-0000-0000-000000000006', 'Quick Learning', 'Fast Learner', 'Zap', 6);

-- 5. EXPERIENCES & TRAINING
INSERT INTO experiences (
    id, organization, role, period, description, type, sort_order, is_published
) VALUES
(
    'e0000000-0000-0000-0000-000000000001',
    'Novitech R&D Private Limited',
    'Data Analytics Training',
    'July 2025 – September 2025',
    'Completed intensive data analytics training focused on practical analytical workflows, real-world case studies, data modeling, Power BI dashboard construction, and project-based learning.',
    'training',
    1,
    true
),
(
    'e0000000-0000-0000-0000-000000000002',
    'Pranav Solution, Krishnagiri',
    'Python and Artificial Intelligence Training',
    'May 2025 – June 2025',
    'Participated in Python and Artificial Intelligence training to develop foundational technical knowledge, covering programming basics, syntax, data structures, and algorithmic principles.',
    'training',
    2,
    true
),
(
    'e0000000-0000-0000-0000-000000000003',
    'Anudip Foundation',
    'AI and Data Analytics Course',
    'In Progress (2025 – Present)',
    'Currently developing industry-aligned skills in AI and Data Analytics, including data cleaning, analytical problem-solving, business case presentation, and practical project execution.',
    'training',
    3,
    true
) ON CONFLICT (id) DO NOTHING;

-- 6. EDUCATION
INSERT INTO education (
    id, degree, institution, period, description, sort_order, is_published
) VALUES
(
    'f0000000-0000-0000-0000-000000000001',
    'Bachelor of Science in Computer Science (B.Sc)',
    'Government Arts and Science College, Pappireddipatti',
    '2023 – 2026',
    'Undergraduate degree building strong core foundations in computer science, database management systems, computational logic, and data analysis.',
    1,
    true
),
(
    'f0000000-0000-0000-0000-000000000002',
    'Higher Secondary Education (6th to 12th)',
    'Arignar Anna Government Boys Higher Secondary School, Adhiyaman Kottai',
    '2016 – 2023',
    'Completed higher secondary schooling with focus on academic foundations, analytical aptitude, and science curriculum.',
    2,
    true
) ON CONFLICT (id) DO NOTHING;

-- 7. CERTIFICATIONS & ACHIEVEMENTS
INSERT INTO certifications (
    id, title, issuer, issue_date, credential_url, description, sort_order, is_published
) VALUES
(
    '10000000-0000-0000-0000-000000000001',
    'Foundation of Coding with Python',
    'Naan Mudhalvan with Infosys Springboard',
    '2025',
    NULL,
    'Certified in Python programming fundamentals, control structures, and code problem-solving principles.',
    1,
    true
),
(
    '10000000-0000-0000-0000-000000000002',
    'UI/UX Design',
    'Naan Mudhalvan',
    '2025',
    NULL,
    'Trained in user-centric design fundamentals, wireframing, layout hierarchy, and dashboard readability ergonomics.',
    2,
    true
),
(
    '10000000-0000-0000-0000-000000000003',
    'AI and Green Skills',
    'Shell-Edunet',
    '2025',
    NULL,
    'Completed certification covering the intersection of modern artificial intelligence tools, sustainability, and technological workflows.',
    3,
    true
),
(
    '10000000-0000-0000-0000-000000000004',
    'Employability Skills',
    'Communication, Teamwork & Problem Solving',
    '2025',
    NULL,
    'Structured development in professional communication, interpersonal effectiveness, time management, and workplace readiness.',
    4,
    true
),
(
    '10000000-0000-0000-0000-000000000005',
    'AI and Data Analytics Course',
    'Anudip Foundation',
    'In Progress',
    NULL,
    'Comprehensive professional track covering end-to-end data analytics, Power BI reporting, and business acumen.',
    5,
    true
) ON CONFLICT (id) DO NOTHING;

-- 8. HOBBIES & INTERESTS
INSERT INTO hobbies (id, title, icon, sort_order, is_published) VALUES
('20000000-0000-0000-0000-000000000001', 'Playing Chess', 'Crown', 1, true),
('20000000-0000-0000-0000-000000000002', 'Reading and Writing', 'BookOpen', 2, true),
('20000000-0000-0000-0000-000000000003', 'Coding and Programming', 'Code2', 3, true),
('20000000-0000-0000-0000-000000000004', 'Creating AI-Generated Videos', 'Video', 4, true),
('20000000-0000-0000-0000-000000000005', 'Listening to Music', 'Headphones', 5, true),
('20000000-0000-0000-0000-000000000006', 'Cooking and Trying New Recipes', 'Utensils', 6, true)
ON CONFLICT (id) DO NOTHING;
