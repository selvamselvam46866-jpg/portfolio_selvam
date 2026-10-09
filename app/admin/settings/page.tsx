'use client';

import React, { useState } from 'react';
import { SiteSettings } from '@/types/portfolio';
import { initialSettingsData } from '@/lib/data/initial-data';
import { updateSiteSettings } from '@/lib/actions/admin';
import { Settings, Save, CheckCircle2, AlertTriangle, Loader2, Eye, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const [settings, setSettings] = useState<SiteSettings>(initialSettingsData);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleToggleSection = (key: keyof SiteSettings['section_visibility']) => {
    setSettings((prev) => ({
      ...prev,
      section_visibility: {
        ...prev.section_visibility,
        [key]: !prev.section_visibility[key],
      },
    }));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setStatus(null);

    try {
      await updateSiteSettings(settings);
      setStatus({ success: true, message: 'Site settings updated successfully!' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to update site settings.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Site Settings & Controls</h1>
        <p className="text-xs text-gray-400">
          Configure global SEO parameters, section visibility toggles, and privacy preferences.
        </p>
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

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* SEO & Meta */}
        <div className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-4">
          <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Settings className="w-5 h-5 text-accent-rose" />
            SEO &amp; General Configuration
          </h2>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Site Title</label>
            <input
              type="text"
              value={settings.site_title}
              onChange={(e) => setSettings((p) => ({ ...p, site_title: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Meta Description</label>
            <textarea
              rows={3}
              value={settings.meta_description}
              onChange={(e) => setSettings((p) => ({ ...p, meta_description: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
            />
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-gray-300">Authorized Admin Email</label>
            <input
              type="email"
              value={settings.admin_email}
              onChange={(e) => setSettings((p) => ({ ...p, admin_email: e.target.value }))}
              className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white font-mono"
            />
            <span className="text-[10px] text-gray-500">
              Only logins matching this email will be granted administrative dashboard privileges.
            </span>
          </div>
        </div>

        {/* Privacy & Feature Toggles */}
        <div className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-4">
          <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-accent-lavender" />
            Privacy &amp; Feature Flags
          </h2>

          <div className="space-y-3">
            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#101014] border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.show_phone_publicly}
                onChange={(e) => setSettings((p) => ({ ...p, show_phone_publicly: e.target.checked }))}
                className="rounded bg-[#191920] border-white/10 text-accent-plum focus:ring-accent-plum"
              />
              <div>
                <span className="font-semibold text-xs text-white block">
                  Show Phone Number Publicly
                </span>
                <span className="text-[11px] text-gray-400">
                  When disabled, your phone number is concealed from the public contact cards for privacy.
                </span>
              </div>
            </label>

            <label className="flex items-center gap-3 p-3 rounded-xl bg-[#101014] border border-white/5 cursor-pointer">
              <input
                type="checkbox"
                checked={settings.resume_download_enabled}
                onChange={(e) => setSettings((p) => ({ ...p, resume_download_enabled: e.target.checked }))}
                className="rounded bg-[#191920] border-white/10 text-accent-plum focus:ring-accent-plum"
              />
              <div>
                <span className="font-semibold text-xs text-white block">
                  Enable Resume Download Button
                </span>
                <span className="text-[11px] text-gray-400">
                  Allows visitors to download your PDF resume directly from the hero and footer.
                </span>
              </div>
            </label>
          </div>
        </div>

        {/* Section Visibility Controls */}
        <div className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-4">
          <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-emerald-400" />
            Public Section Visibility
          </h2>
          <p className="text-xs text-gray-400">
            Instantly show or hide specific portfolio sections from public view without deleting their data.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(settings.section_visibility).map(([key, isVisible]) => (
              <label
                key={key}
                className={`p-3.5 rounded-xl border flex items-center justify-between text-xs cursor-pointer transition-colors ${
                  isVisible
                    ? 'bg-[#101014] border-accent-plum/40 text-white'
                    : 'bg-white/5 border-white/5 text-gray-500'
                }`}
              >
                <span className="font-semibold capitalize">{key}</span>
                <input
                  type="checkbox"
                  checked={isVisible}
                  onChange={() => handleToggleSection(key as any)}
                  className="rounded bg-[#101014] border-white/10 text-accent-plum focus:ring-accent-plum"
                />
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="px-6 py-3 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold uppercase tracking-wider flex items-center gap-2 shadow-lg disabled:opacity-50 transition-all"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          <span>Save Site Settings</span>
        </button>

      </form>
    </div>
  );
}
