'use client';

import React, { useState, useEffect } from 'react';
import { Profile } from '@/types/portfolio';
import { initialProfileData } from '@/lib/data/initial-data';
import { updateProfile } from '@/lib/actions/admin';
import { User, Save, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

export default function AdminProfilePage() {
  const [profile, setProfile] = useState<Profile>(initialProfileData);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleRolesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value;
    const array = raw.split(',').map((s) => s.trim()).filter(Boolean);
    setProfile((prev) => ({ ...prev, rotating_roles: array }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      await updateProfile(profile);
      setStatus({ success: true, message: 'Profile updated successfully!' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to update profile.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Profile & Hero Editor</h1>
          <p className="text-xs text-gray-400">
            Edit your public persona, rotating headline roles, professional summary, and contact handles.
          </p>
        </div>
      </div>

      {status && (
        <div
          className={`p-4 rounded-xl border flex items-center gap-3 text-xs ${
            status.success
              ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-300'
              : 'bg-red-500/10 border-red-500/30 text-red-300'
          }`}
        >
          {status.success ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
          <span>{status.message}</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Full Name</label>
            <input
              type="text"
              name="name"
              value={profile.name}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Professional Title</label>
            <input
              type="text"
              name="title"
              value={profile.title}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">
            Rotating Roles (Comma-separated)
          </label>
          <input
            type="text"
            value={profile.rotating_roles.join(', ')}
            onChange={handleRolesChange}
            placeholder="Aspiring Data Analyst, Junior Data Analyst, Power BI Developer"
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
          />
          <span className="text-[10px] text-gray-500">
            These roles will rotate in the dynamic hero animation.
          </span>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Tagline</label>
          <input
            type="text"
            name="tagline"
            value={profile.tagline}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Professional Bio / Summary</label>
          <textarea
            name="bio"
            rows={4}
            value={profile.bio}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum resize-none"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Availability Status</label>
          <input
            type="text"
            name="availability_status"
            value={profile.availability_status}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Email Address</label>
            <input
              type="email"
              name="email"
              value={profile.email}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Phone Number</label>
            <input
              type="text"
              name="phone"
              value={profile.phone}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">LinkedIn URL</label>
            <input
              type="text"
              name="linkedin_url"
              value={profile.linkedin_url}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">GitHub URL</label>
            <input
              type="text"
              name="github_url"
              value={profile.github_url}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-semibold text-gray-300">Location</label>
          <input
            type="text"
            name="location"
            value={profile.location}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
          />
        </div>

        <div className="grid grid-cols-3 gap-4 pt-2">
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Stats: Projects</label>
            <input
              type="number"
              name="stats_projects"
              value={profile.stats_projects}
              onChange={(e) => setProfile((p) => ({ ...p, stats_projects: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Stats: Certifications</label>
            <input
              type="number"
              name="stats_certifications"
              value={profile.stats_certifications}
              onChange={(e) => setProfile((p) => ({ ...p, stats_certifications: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Stats: Experiences</label>
            <input
              type="number"
              name="stats_experience"
              value={profile.stats_experience}
              onChange={(e) => setProfile((p) => ({ ...p, stats_experience: parseInt(e.target.value) || 0 }))}
              className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white focus:outline-none focus:ring-2 focus:ring-accent-plum"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Profile Changes</span>
        </button>

      </form>
    </div>
  );
}
