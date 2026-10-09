'use client';

import React, { useState } from 'react';
import { Certification } from '@/types/portfolio';
import { initialCertificationsData } from '@/lib/data/initial-data';
import { upsertCertification, deleteCertification } from '@/lib/actions/admin';
import { Award, Plus, Pencil, Trash2, CheckCircle2, AlertTriangle, Loader2, Save, X } from 'lucide-react';

export default function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>(initialCertificationsData);
  const [editingCert, setEditingCert] = useState<Partial<Certification> | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCert) return;
    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        ...editingCert,
        id: editingCert.id || `cert-${Date.now()}`,
        is_published: true,
        sort_order: certifications.length + 1,
      };

      await upsertCertification(payload);
      setCertifications((prev) => {
        const exists = prev.some((c) => c.id === payload.id);
        return exists ? prev.map((c) => (c.id === payload.id ? (payload as Certification) : c)) : [...prev, payload as Certification];
      });
      setStatus({ success: true, message: 'Certification saved successfully!' });
      setEditingCert(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error saving certification.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await deleteCertification(id);
      setCertifications((prev) => prev.filter((c) => c.id !== id));
      setStatus({ success: true, message: 'Certification deleted.' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error deleting certification.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Certifications Manager</h1>
          <p className="text-xs text-gray-400">
            Publish verified certificates from Naan Mudhalvan, Shell-Edunet, Infosys Springboard, etc.
          </p>
        </div>

        <button
          onClick={() =>
            setEditingCert({
              title: '',
              issuer: '',
              issue_date: '2025',
              description: '',
              credential_url: '',
            })
          }
          className="px-4 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Certification</span>
        </button>
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

      {/* Grid of Certifications */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {certifications.map((cert) => (
          <div
            key={cert.id}
            className="p-5 rounded-2xl bg-[#191920] border border-white/10 flex flex-col justify-between space-y-3"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="w-8 h-8 rounded-lg bg-accent-plum/20 flex items-center justify-center text-accent-rose">
                  <Award className="w-4 h-4" />
                </div>
                {cert.issue_date && (
                  <span className="text-[10px] font-mono text-gray-400">{cert.issue_date}</span>
                )}
              </div>

              <div>
                <h3 className="font-heading text-sm font-bold text-white">{cert.title}</h3>
                <p className="text-xs text-accent-lavender font-semibold">{cert.issuer}</p>
              </div>

              {cert.description && (
                <p className="text-gray-400 text-[11px] leading-relaxed">{cert.description}</p>
              )}
            </div>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-white/5">
              <button
                onClick={() => setEditingCert(cert)}
                className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300"
              >
                <Pencil className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => handleDelete(cert.id)}
                className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Editor */}
      {editingCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">Certification Details</h3>
              <button onClick={() => setEditingCert(null)} className="p-1 rounded-lg text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-3">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Certificate Title</label>
                <input
                  type="text"
                  required
                  value={editingCert.title || ''}
                  onChange={(e) => setEditingCert((p) => ({ ...p, title: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Issuing Organization</label>
                <input
                  type="text"
                  required
                  value={editingCert.issuer || ''}
                  onChange={(e) => setEditingCert((p) => ({ ...p, issuer: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Issue Date / Year</label>
                  <input
                    type="text"
                    value={editingCert.issue_date || ''}
                    onChange={(e) => setEditingCert((p) => ({ ...p, issue_date: e.target.value }))}
                    placeholder="2025"
                    className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Credential URL (Optional)</label>
                  <input
                    type="text"
                    value={editingCert.credential_url || ''}
                    onChange={(e) => setEditingCert((p) => ({ ...p, credential_url: e.target.value }))}
                    placeholder="https://..."
                    className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={2}
                  value={editingCert.description || ''}
                  onChange={(e) => setEditingCert((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingCert(null)}
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
                  <span>Save Certificate</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
