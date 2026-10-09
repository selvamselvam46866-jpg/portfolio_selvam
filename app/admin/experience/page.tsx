'use client';

import React, { useState } from 'react';
import { Experience, Education } from '@/types/portfolio';
import { initialExperiencesData, initialEducationData } from '@/lib/data/initial-data';
import { upsertExperience, deleteExperience, upsertEducation, deleteEducation } from '@/lib/actions/admin';
import { Briefcase, GraduationCap, Plus, Pencil, Trash2, CheckCircle2, AlertTriangle, Loader2, Save, X } from 'lucide-react';

export default function AdminExperiencePage() {
  const [experiences, setExperiences] = useState<Experience[]>(initialExperiencesData);
  const [education, setEducation] = useState<Education[]>(initialEducationData);

  const [editingExp, setEditingExp] = useState<Partial<Experience> | null>(null);
  const [editingEdu, setEditingEdu] = useState<Partial<Education> | null>(null);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  // Experience handlers
  const handleSaveExp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingExp) return;
    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        ...editingExp,
        id: editingExp.id || `exp-${Date.now()}`,
        type: editingExp.type || 'training',
        is_published: true,
        sort_order: experiences.length + 1,
      };

      await upsertExperience(payload);
      setExperiences((prev) => {
        const exists = prev.some((x) => x.id === payload.id);
        return exists ? prev.map((x) => (x.id === payload.id ? (payload as Experience) : x)) : [...prev, payload as Experience];
      });
      setStatus({ success: true, message: 'Experience item saved!' });
      setEditingExp(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error saving experience.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteExp = async (id: string) => {
    setSaving(true);
    try {
      await deleteExperience(id);
      setExperiences((prev) => prev.filter((x) => x.id !== id));
      setStatus({ success: true, message: 'Experience entry deleted.' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error deleting experience.' });
    } finally {
      setSaving(false);
    }
  };

  // Education handlers
  const handleSaveEdu = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingEdu) return;
    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        ...editingEdu,
        id: editingEdu.id || `edu-${Date.now()}`,
        is_published: true,
        sort_order: education.length + 1,
      };

      await upsertEducation(payload);
      setEducation((prev) => {
        const exists = prev.some((x) => x.id === payload.id);
        return exists ? prev.map((x) => (x.id === payload.id ? (payload as Education) : x)) : [...prev, payload as Education];
      });
      setStatus({ success: true, message: 'Education entry saved!' });
      setEditingEdu(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error saving education.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteEdu = async (id: string) => {
    setSaving(true);
    try {
      await deleteEducation(id);
      setEducation((prev) => prev.filter((x) => x.id !== id));
      setStatus({ success: true, message: 'Education entry deleted.' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error deleting education.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Experience & Education Manager</h1>
        <p className="text-xs text-gray-400">
          Maintain your training timeline, course achievements, and formal university degrees.
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

      {/* 1. Practical Trainings Section */}
      <div className="rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <Briefcase className="w-5 h-5 text-accent-rose" />
            <h2 className="font-heading text-lg font-bold text-white">
              Practical Trainings & Experience
            </h2>
          </div>
          <button
            onClick={() =>
              setEditingExp({
                role: '',
                organization: '',
                period: '',
                description: '',
                type: 'training',
              })
            }
            className="px-3.5 py-1.5 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Experience</span>
          </button>
        </div>

        <div className="space-y-3">
          {experiences.map((exp) => (
            <div
              key={exp.id}
              className="p-4 rounded-xl bg-[#101014] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white text-sm">{exp.role}</span>
                  <span className="px-2 py-0.5 rounded-md bg-accent-rose/20 text-accent-rose text-[10px] font-mono uppercase">
                    {exp.type}
                  </span>
                </div>
                <p className="text-accent-lavender font-semibold">{exp.organization} &bull; <span className="text-gray-400 font-normal">{exp.period}</span></p>
                <p className="text-gray-400 text-[11px] line-clamp-1">{exp.description}</p>
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setEditingExp(exp)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteExp(exp.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 2. Education Section */}
      <div className="rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-2.5">
            <GraduationCap className="w-5 h-5 text-accent-lavender" />
            <h2 className="font-heading text-lg font-bold text-white">
              Formal Education
            </h2>
          </div>
          <button
            onClick={() =>
              setEditingEdu({
                degree: '',
                institution: '',
                period: '',
                description: '',
              })
            }
            className="px-3.5 py-1.5 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-1.5"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Degree</span>
          </button>
        </div>

        <div className="space-y-3">
          {education.map((edu) => (
            <div
              key={edu.id}
              className="p-4 rounded-xl bg-[#101014] border border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <span className="font-bold text-white text-sm block">{edu.degree}</span>
                <p className="text-accent-lavender font-semibold">{edu.institution} &bull; <span className="text-gray-400 font-normal">{edu.period}</span></p>
                {edu.description && <p className="text-gray-400 text-[11px]">{edu.description}</p>}
              </div>

              <div className="flex items-center gap-2 self-end sm:self-auto">
                <button
                  onClick={() => setEditingEdu(edu)}
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
                >
                  <Pencil className="w-3.5 h-3.5" />
                </button>
                <button
                  onClick={() => handleDeleteEdu(edu.id)}
                  className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Experience Modal */}
      {editingExp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">Experience Entry</h3>
              <button onClick={() => setEditingExp(null)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveExp} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Role / Program Name</label>
                <input
                  type="text"
                  required
                  value={editingExp.role || ''}
                  onChange={(e) => setEditingExp((p) => ({ ...p, role: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Organization / Company</label>
                <input
                  type="text"
                  required
                  value={editingExp.organization || ''}
                  onChange={(e) => setEditingExp((p) => ({ ...p, organization: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Period / Dates</label>
                  <input
                    type="text"
                    required
                    value={editingExp.period || ''}
                    onChange={(e) => setEditingExp((p) => ({ ...p, period: e.target.value }))}
                    placeholder="July 2025 – Sep 2025"
                    className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Type</label>
                  <select
                    value={editingExp.type || 'training'}
                    onChange={(e) => setEditingExp((p) => ({ ...p, type: e.target.value as any }))}
                    className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  >
                    <option value="training">Training</option>
                    <option value="internship">Internship</option>
                    <option value="employment">Employment</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  required
                  value={editingExp.description || ''}
                  onChange={(e) => setEditingExp((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingExp(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Experience</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Education Modal */}
      {editingEdu && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">Education Degree</h3>
              <button onClick={() => setEditingEdu(null)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveEdu} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Degree / Certificate</label>
                <input
                  type="text"
                  required
                  value={editingEdu.degree || ''}
                  onChange={(e) => setEditingEdu((p) => ({ ...p, degree: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Institution / College / School</label>
                <input
                  type="text"
                  required
                  value={editingEdu.institution || ''}
                  onChange={(e) => setEditingEdu((p) => ({ ...p, institution: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Period / Years</label>
                <input
                  type="text"
                  required
                  value={editingEdu.period || ''}
                  onChange={(e) => setEditingEdu((p) => ({ ...p, period: e.target.value }))}
                  placeholder="2023 – 2026"
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={2}
                  value={editingEdu.description || ''}
                  onChange={(e) => setEditingEdu((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingEdu(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold shadow-md flex items-center gap-1.5"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Degree</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
