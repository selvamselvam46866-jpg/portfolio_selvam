'use client';

import React, { useState } from 'react';
import { initialProfileData } from '@/lib/data/initial-data';
import { updateProfile } from '@/lib/actions/admin';
import { createClient } from '@/lib/supabase/client';
import { FileText, Upload, CheckCircle2, AlertTriangle, Loader2, Download, ExternalLink } from 'lucide-react';

export default function AdminResumePage() {
  const [currentPath, setCurrentPath] = useState(initialProfileData.resume_url || '/Selvam_D_Resume.pdf');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selected = e.target.files[0];
      if (selected.type !== 'application/pdf') {
        setStatus({ success: false, message: 'Only PDF documents are allowed.' });
        return;
      }
      if (selected.size > 10 * 1024 * 1024) {
        setStatus({ success: false, message: 'PDF size must be less than 10MB.' });
        return;
      }
      setFile(selected);
      setStatus(null);
    }
  };

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!file) {
      setStatus({ success: false, message: 'Please select a PDF file first.' });
      return;
    }

    setUploading(true);
    setStatus(null);

    try {
      const supabase = createClient();
      if (!supabase) {
        // If local preview mode, simulate saving the path
        setCurrentPath(`/resumes/${file.name}`);
        await updateProfile({ id: initialProfileData.id, resume_url: `/resumes/${file.name}` });
        setStatus({
          success: true,
          message: `Resume recorded as /resumes/${file.name} (Configure live Supabase Storage in production).`,
        });
        setUploading(false);
        return;
      }

      // Upload to Supabase Storage bucket 'resumes'
      const filePath = `resumes/Selvam_D_Resume_${Date.now()}.pdf`;
      const { data, error } = await supabase.storage.from('resumes').upload(filePath, file, {
        cacheControl: '3600',
        upsert: true,
      });

      if (error) throw error;

      // Get public URL
      const { data: publicUrlData } = supabase.storage.from('resumes').getPublicUrl(filePath);
      const publicUrl = publicUrlData.publicUrl;

      // Update in profile
      await updateProfile({ id: initialProfileData.id, resume_url: publicUrl });

      setCurrentPath(publicUrl);
      setStatus({ success: true, message: 'Resume uploaded and published to portfolio!' });
      setFile(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to upload resume PDF.' });
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Resume Manager</h1>
        <p className="text-xs text-gray-400">
          Upload and replace your master PDF resume. The public &ldquo;Download Resume&rdquo; button will always link to this version.
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

      {/* Active Resume Card */}
      <div className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-4">
        <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <FileText className="w-5 h-5 text-accent-rose" />
          Active Public Resume
        </h2>

        <div className="p-4 rounded-xl bg-[#101014] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <span className="text-xs font-semibold text-white block">Current Document Reference</span>
            <span className="text-[11px] font-mono text-gray-400 break-all">{currentPath}</span>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={currentPath}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Preview</span>
            </a>
            <a
              href={currentPath}
              download
              className="px-3 py-1.5 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download</span>
            </a>
          </div>
        </div>
      </div>

      {/* Upload New Resume */}
      <div className="p-6 rounded-2xl bg-[#191920] border border-white/10 space-y-4">
        <h2 className="font-heading text-base font-bold text-white flex items-center gap-2">
          <Upload className="w-5 h-5 text-accent-lavender" />
          Upload &amp; Replace Resume PDF
        </h2>

        <form onSubmit={handleUpload} className="space-y-4">
          <div className="border-2 border-dashed border-white/10 hover:border-accent-rose/50 rounded-2xl p-8 text-center space-y-3 transition-colors">
            <input
              type="file"
              id="resume-file"
              accept=".pdf,application/pdf"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="resume-file"
              className="cursor-pointer inline-flex flex-col items-center gap-2"
            >
              <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-accent-rose">
                <FileText className="w-6 h-6" />
              </div>
              <span className="text-xs font-semibold text-white">
                {file ? file.name : 'Click to select PDF resume file'}
              </span>
              <span className="text-[11px] text-gray-500">
                PDF format only &bull; Max 10MB
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!file || uploading}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold uppercase tracking-wider shadow-md disabled:opacity-50 transition-all flex items-center justify-center gap-2"
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            <span>Upload and Publish Resume</span>
          </button>
        </form>
      </div>
    </div>
  );
}
