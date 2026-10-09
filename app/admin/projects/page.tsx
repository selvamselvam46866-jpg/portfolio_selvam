'use client';

import React, { useState } from 'react';
import { Project } from '@/types/portfolio';
import { initialProjectsData } from '@/lib/data/initial-data';
import { upsertProject, deleteProject } from '@/lib/actions/admin';
import {
  FolderKanban,
  Plus,
  Pencil,
  Trash2,
  CheckCircle2,
  XCircle,
  Sparkles,
  Save,
  X,
  AlertTriangle,
  Loader2,
  Eye,
} from 'lucide-react';
import Image from 'next/image';

export default function AdminProjectsPage() {
  const [projects, setProjects] = useState<Project[]>(initialProjectsData);
  const [editingProject, setEditingProject] = useState<Partial<Project> | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const openNewProject = () => {
    setEditingProject({
      id: '',
      title: '',
      slug: `project-${Date.now()}`,
      category: 'Manufacturing Analytics',
      description: '',
      business_problem: '',
      tools: ['Power BI', 'DAX'],
      key_findings: [],
      recommended_actions: [],
      image_url: '/images/novatech-overview.png',
      github_url: 'https://github.com/jsdfocal-afk',
      live_demo_url: '',
      is_featured: false,
      is_published: true,
      sort_order: projects.length + 1,
    });
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    setSaving(true);
    setStatus(null);

    try {
      await upsertProject(editingProject);
      if (editingProject.id) {
        setProjects((prev) =>
          prev.map((p) => (p.id === editingProject.id ? ({ ...p, ...editingProject } as Project) : p))
        );
      } else {
        const newProj = {
          ...editingProject,
          id: `proj-${Date.now()}`,
        } as Project;
        setProjects((prev) => [...prev, newProj]);
      }
      setStatus({ success: true, message: 'Project saved successfully!' });
      setEditingProject(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to save project.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    setStatus(null);
    try {
      await deleteProject(id);
      setProjects((prev) => prev.filter((p) => p.id !== id));
      setStatus({ success: true, message: 'Project deleted successfully!' });
      setDeleteConfirmId(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to delete project.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Projects Manager</h1>
          <p className="text-xs text-gray-400">
            Publish, edit, and organize Power BI reports, Excel leakage workbooks, and analytical studies.
          </p>
        </div>

        <button
          onClick={openNewProject}
          className="px-4 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Project</span>
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

      {/* Projects Table */}
      <div className="rounded-2xl bg-[#191920] border border-white/10 overflow-hidden shadow-xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#101014] text-gray-400 uppercase tracking-wider font-mono border-b border-white/5">
              <tr>
                <th className="p-4">Project</th>
                <th className="p-4">Category</th>
                <th className="p-4">Tools</th>
                <th className="p-4 text-center">Status</th>
                <th className="p-4 text-center">Featured</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((p) => (
                <tr key={p.id} className="hover:bg-white/[0.02] transition-colors">
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      {p.image_url ? (
                        <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-white/10 flex-shrink-0 bg-black">
                          <Image src={p.image_url} alt={p.title} fill className="object-cover" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-lg bg-white/5 flex items-center justify-center text-gray-400">
                          <FolderKanban className="w-5 h-5" />
                        </div>
                      )}
                      <div>
                        <span className="font-bold text-white block text-sm">{p.title}</span>
                        <span className="text-[11px] text-gray-400 line-clamp-1">{p.description}</span>
                      </div>
                    </div>
                  </td>
                  <td className="p-4 font-mono text-gray-300">{p.category}</td>
                  <td className="p-4">
                    <div className="flex flex-wrap gap-1 max-w-xs">
                      {p.tools.slice(0, 3).map((t) => (
                        <span key={t} className="px-2 py-0.5 rounded bg-white/5 text-[10px] text-gray-300">
                          {t}
                        </span>
                      ))}
                      {p.tools.length > 3 && (
                        <span className="text-[10px] text-gray-500">+{p.tools.length - 3}</span>
                      )}
                    </div>
                  </td>
                  <td className="p-4 text-center">
                    {p.is_published ? (
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-semibold text-[10px]">
                        Published
                      </span>
                    ) : (
                      <span className="px-2.5 py-1 rounded-full bg-gray-500/10 text-gray-400 font-semibold text-[10px]">
                        Draft
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {p.is_featured ? (
                      <span className="px-2.5 py-1 rounded-full bg-accent-rose/20 text-accent-rose font-semibold text-[10px] flex items-center justify-center gap-1 w-max mx-auto">
                        <Sparkles className="w-3 h-3" /> Featured
                      </span>
                    ) : (
                      <span className="text-gray-600">-</span>
                    )}
                  </td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => setEditingProject(p)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors"
                        title="Edit Project"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(p.id)}
                        className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-colors"
                        title="Delete Project"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteConfirmId && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-sm rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4 shadow-2xl">
            <div className="flex items-center gap-3 text-red-400">
              <AlertTriangle className="w-6 h-6" />
              <h3 className="font-heading text-lg font-bold">Delete Project?</h3>
            </div>
            <p className="text-xs text-gray-400 leading-relaxed">
              Are you sure you want to delete this project? This action will remove it from the public portfolio.
            </p>
            <div className="flex items-center justify-end gap-3 pt-2">
              <button
                onClick={() => setDeleteConfirmId(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirmId)}
                disabled={saving}
                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold shadow-md"
              >
                {saving ? 'Deleting...' : 'Confirm Delete'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add / Edit Project Drawer / Modal */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#191920] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="font-heading text-xl font-bold text-white">
                {editingProject.id ? 'Edit Project' : 'Add New Project'}
              </h3>
              <button
                onClick={() => setEditingProject(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Project Title</label>
                  <input
                    type="text"
                    required
                    value={editingProject.title || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, title: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Category</label>
                  <select
                    value={editingProject.category || 'Manufacturing Analytics'}
                    onChange={(e) => setEditingProject((p) => ({ ...p, category: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                  >
                    <option value="Manufacturing Analytics">Manufacturing Analytics</option>
                    <option value="Retail Analytics">Retail Analytics</option>
                    <option value="Supermarket Analytics">Supermarket Analytics</option>
                    <option value="Business Intelligence">Business Intelligence</option>
                    <option value="Financial Analytics">Financial Analytics</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.description || ''}
                  onChange={(e) => setEditingProject((p) => ({ ...p, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Business Problem</label>
                <textarea
                  rows={2}
                  required
                  value={editingProject.business_problem || ''}
                  onChange={(e) => setEditingProject((p) => ({ ...p, business_problem: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white resize-none"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Tools & Technologies (Comma-separated)
                </label>
                <input
                  type="text"
                  value={editingProject.tools?.join(', ') || ''}
                  onChange={(e) =>
                    setEditingProject((p) => ({
                      ...p,
                      tools: e.target.value.split(',').map((s) => s.trim()).filter(Boolean),
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Key Findings (One bullet point per line)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.key_findings?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingProject((p) => ({
                      ...p,
                      key_findings: e.target.value.split('\n').filter(Boolean),
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white font-mono"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">
                  Recommended Business Actions (One bullet point per line)
                </label>
                <textarea
                  rows={3}
                  value={editingProject.recommended_actions?.join('\n') || ''}
                  onChange={(e) =>
                    setEditingProject((p) => ({
                      ...p,
                      recommended_actions: e.target.value.split('\n').filter(Boolean),
                    }))
                  }
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white font-mono"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">Dashboard Image / Path</label>
                  <input
                    type="text"
                    value={editingProject.image_url || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, image_url: e.target.value }))}
                    placeholder="/images/novatech-overview.png"
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white font-mono"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-300">GitHub Repository URL</label>
                  <input
                    type="text"
                    value={editingProject.github_url || ''}
                    onChange={(e) => setEditingProject((p) => ({ ...p, github_url: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_published ?? true}
                    onChange={(e) => setEditingProject((p) => ({ ...p, is_published: e.target.checked }))}
                    className="rounded bg-[#101014] border-white/10 text-accent-plum focus:ring-accent-plum"
                  />
                  <span>Published to Public Portfolio</span>
                </label>

                <label className="flex items-center gap-2 text-xs font-semibold text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={editingProject.is_featured ?? false}
                    onChange={(e) => setEditingProject((p) => ({ ...p, is_featured: e.target.checked }))}
                    className="rounded bg-[#101014] border-white/10 text-accent-plum focus:ring-accent-plum"
                  />
                  <span>Mark as Featured</span>
                </label>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingProject(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-6 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold shadow-md flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Project</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
