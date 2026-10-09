# Selvam D — AI & Data Analytics Portfolio & Admin Dashboard

A production-ready, database-driven personal portfolio website and secure content management admin dashboard tailored for **Selvam D**, an **AI and Data Analytics professional / Junior Data Analyst**.

Showcases real Power BI dashboards, manufacturing intelligence telemetry, retail profitability leakage analyses in Excel, DAX calculations, SQL capabilities, and business recommendations.

---

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router, latest stable version)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Custom tokens: Near-black `#101014`, Deep Plum `#5B2245`, Rose `#C0679A`, Soft Lavender `#A78BFA`)
- **Theme**: Dark and Light mode with persistent theme switcher
- **Animations & Visuals**: [Framer Motion](https://www.framer.com/motion/), [Lucide React](https://lucide.dev/), and [Recharts](https://recharts.org/)
- **Database & Auth**: [Supabase](https://supabase.com/) (PostgreSQL, Row Level Security, Auth, Storage)
- **Forms & Validation**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Hosting Target**: [Vercel](https://vercel.com/)

---

## 1. Prerequisites

Before running the application, make sure you have:

- **Node.js**: v18.18.0 or newer (v20+ or v24+ recommended)
- **npm**: v9+ or newer
- A free **[Supabase](https://supabase.com)** account (for PostgreSQL, Auth, and Storage)
- A **[Vercel](https://vercel.com)** account (for production deployment)

---

## 2. Installation

1. Clone or download this repository.
2. Navigate to the project directory:
   ```bash
   cd my_portfolio-main
   ```
3. Install dependencies:
   ```bash
   npm install
   ```

---

## 3. Creating & Setting Up Supabase

### Step A: Create a New Supabase Project
1. Log in to [Supabase](https://supabase.com/) and click **"New Project"**.
2. Give your project a name (e.g., `selvam-portfolio`) and choose a database password.
3. Select the closest region (e.g., *South Asia (Mumbai)*) and wait for the database to provision.

### Step B: Execute the Schema Script
1. In your Supabase Dashboard, open the **SQL Editor** from the left navigation.
2. Open the file `supabase/schema.sql` from this codebase.
3. Paste the entire SQL script into the editor and click **"Run"**.
   - This creates all 10 normalized tables (`profiles`, `projects`, `skill_groups`, `skills`, `experiences`, `education`, `certifications`, `hobbies`, `messages`, `site_settings`).
   - Sets up automatic `updated_at` triggers.
   - Enables Row-Level Security (RLS) on every table.
   - Configures storage buckets: `portfolio-assets` and `resumes`.

### Step C: Execute the Seed Data Script
1. In the Supabase **SQL Editor**, open the file `supabase/seed.sql`.
2. Paste the SQL script and click **"Run"**.
   - This populates your verified background, projects (AeroHome, NovaTech, TrendMart, FreshMart), skill groups, training timeline, certifications, and initial settings.

### Step D: Create Your Admin Account Securely
1. In your Supabase Dashboard, navigate to **Authentication** &rarr; **Users**.
2. Click **"Add user"** &rarr; **"Create user"**.
3. Enter your administrative email:
   - **Email**: `selvamselvam46866@gmail.com`
   - **Password**: Create a strong password (minimum 10 characters).
4. Uncheck *"Auto Confirm User?"* or ensure *"Confirm User"* is active.
5. In **Authentication** &rarr; **URL Configuration**, confirm your Site URL is set to `http://localhost:3000` (and later your Vercel domain).
6. Under **Authentication** &rarr; **Providers** &rarr; **Email**, make sure *"Allow new users to sign up"* is **disabled** to prevent unauthorized public registrations.

---

## 4. Configuring Environment Variables

Copy the `.env.example` file to `.env.local`:

```bash
cp .env.example .env.local
```

Open `.env.local` and populate the keys from your Supabase Dashboard under **Project Settings** &rarr; **API**:

```env
# Supabase Project URL & Anon Key
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Authorized Administrator Email
ADMIN_EMAIL=selvamselvam46866@gmail.com

# Deployment Canonical URL
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> [!CAUTION]
> Never commit `.env.local` to Git. Keep `SUPABASE_SERVICE_ROLE_KEY` confidential on the server only.

---

## 5. Running the Application

### Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build
```bash
npm run build
npm start
```

---

## 6. Accessing & Using the Admin Dashboard

1. Navigate to [http://localhost:3000/admin/login](http://localhost:3000/admin/login).
2. Enter your credentials (`selvamselvam46866@gmail.com` and password).
3. Upon successful verification, you will be redirected to `/admin`.
4. **Sections available for real-time editing:**
   - **Overview**: View live KPI counters and incoming recruiter inquiries.
   - **Profile & Hero Editor**: Modify headline, rotating roles, bio, availability badge, and social URLs.
   - **Projects Manager**: Add new Power BI or Excel projects, update DAX measures, findings, and screenshots, toggle featured status, or unpublish drafts.
   - **Skills Manager**: Add and categorize skills across BI, Excel, SQL, and tools with proficiency tags.
   - **Experience & Education**: Update training records (Novitech, Pranav, Anudip) and degrees.
   - **Certifications**: Manage credentials and verification links.
   - **Resume Manager**: Upload and replace your official PDF resume.
   - **Messages Inbox**: Read inquiries, filter search results, mark as read, or launch a direct mail reply.
   - **Site Settings**: Toggle section visibility, manage public phone number exposure, and update SEO tags.

---

## 7. Storage Bucket Configuration (Supabase)

To enable uploading screenshots and PDF resumes directly from the admin dashboard:
1. In Supabase Dashboard, go to **Storage**.
2. Verify two public buckets exist:
   - `portfolio-assets` (Public: ON)
   - `resumes` (Public: ON)
3. Under **Policies**, ensure that authenticated users have full `INSERT`, `UPDATE`, and `DELETE` permissions on both buckets, while anonymous users have `SELECT` (read) permissions.

---

## 8. Deploying to Vercel

1. Push your repository to GitHub:
   ```bash
   git add .
   git commit -m "feat: complete data analytics portfolio and admin CMS"
   git push origin main
   ```
2. Log in to [Vercel](https://vercel.com/) and click **"Add New..."** &rarr; **"Project"**.
3. Import your GitHub repository.
4. In the **Environment Variables** section, add all variables from `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `ADMIN_EMAIL`
   - `NEXT_PUBLIC_SITE_URL` (set to your custom Vercel domain, e.g. `https://selvam-portfolio.vercel.app`)
5. Click **"Deploy"**.

---

## 9. Troubleshooting & FAQ

- **Unconfigured Supabase Warning**: If keys are missing, the public site runs in resilient preview mode with all verified seed data. Set `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` to connect live.
- **Admin Access Forbidden**: Ensure your login email in Supabase exactly matches `ADMIN_EMAIL=selvamselvam46866@gmail.com`.
- **Honeypot Triggered**: The contact form contains an invisible honeypot trap to silently drop automated spam submissions.

---

&copy; Selvam D. Built with Next.js, Supabase, TypeScript, and Tailwind CSS.
