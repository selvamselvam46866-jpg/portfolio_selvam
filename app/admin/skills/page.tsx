'use client';

import React, { useState } from 'react';
import { SkillGroup, SkillItem } from '@/types/portfolio';
import { initialSkillGroupsData } from '@/lib/data/initial-data';
import { upsertSkill, deleteSkill } from '@/lib/actions/admin';
import { Wrench, Plus, Trash2, CheckCircle2, AlertTriangle, Loader2, Save, X } from 'lucide-react';

export default function AdminSkillsPage() {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>(initialSkillGroupsData);
  const [selectedGroupId, setSelectedGroupId] = useState<string>(initialSkillGroupsData[0].id);
  const [editingSkill, setEditingSkill] = useState<{
    id?: string;
    group_id: string;
    name: string;
    proficiency: string;
    icon?: string;
  } | null>(null);

  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const currentGroup = skillGroups.find((g) => g.id === selectedGroupId) || skillGroups[0];

  const openNewSkill = () => {
    setEditingSkill({
      group_id: currentGroup.id,
      name: '',
      proficiency: 'Proficient',
      icon: 'CheckCircle',
    });
  };

  const handleSaveSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingSkill) return;

    setSaving(true);
    setStatus(null);

    try {
      const payload = {
        ...editingSkill,
        id: editingSkill.id || `skill-${Date.now()}`,
        is_published: true,
        sort_order: 10,
      };

      await upsertSkill(payload);

      setSkillGroups((prev) =>
        prev.map((g) => {
          if (g.id !== payload.group_id) return g;
          const currentSkills = g.skills || [];
          const exists = currentSkills.some((s) => s.id === payload.id);
          const updated = exists
            ? currentSkills.map((s) => (s.id === payload.id ? (payload as SkillItem) : s))
            : [...currentSkills, payload as SkillItem];
          return { ...g, skills: updated };
        })
      );

      setStatus({ success: true, message: 'Skill saved successfully!' });
      setEditingSkill(null);
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to save skill.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteSkill = async (skillId: string) => {
    setSaving(true);
    try {
      await deleteSkill(skillId);
      setSkillGroups((prev) =>
        prev.map((g) => ({
          ...g,
          skills: (g.skills || []).filter((s) => s.id !== skillId),
        }))
      );
      setStatus({ success: true, message: 'Skill removed.' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Failed to delete skill.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Skills Manager</h1>
          <p className="text-xs text-gray-400">
            Organize analytical capabilities across BI, Excel, SQL, programming, and soft skills.
          </p>
        </div>

        <button
          onClick={openNewSkill}
          className="px-4 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-2 shadow-md transition-all self-start sm:self-auto"
        >
          <Plus className="w-4 h-4" />
          <span>Add Skill in Current Group</span>
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

      {/* Group Selector Tabs */}
      <div className="flex flex-wrap gap-2 border-b border-white/10 pb-4">
        {skillGroups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroupId(group.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              selectedGroupId === group.id
                ? 'bg-accent-plum text-white shadow-md'
                : 'bg-[#191920] text-gray-400 hover:text-white border border-white/5'
            }`}
          >
            {group.title}
          </button>
        ))}
      </div>

      {/* Selected Group Skills Table */}
      <div className="rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3">
          <h3 className="font-heading text-lg font-bold text-white">
            {currentGroup.title} ({currentGroup.skills?.length || 0} skills)
          </h3>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {currentGroup.skills?.map((s) => (
            <div
              key={s.id}
              className="p-3.5 rounded-xl bg-[#101014] border border-white/5 flex items-center justify-between gap-3 text-xs"
            >
              <div>
                <span className="font-semibold text-white block">{s.name}</span>
                {s.proficiency && (
                  <span className="text-[10px] text-accent-lavender font-mono">{s.proficiency}</span>
                )}
              </div>

              <button
                onClick={() => handleDeleteSkill(s.id)}
                className="p-1.5 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
                title="Delete skill"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Add / Edit Skill Modal */}
      {editingSkill && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-[#191920] border border-white/10 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <h3 className="font-heading text-lg font-bold text-white">
                Add Skill to {currentGroup.title}
              </h3>
              <button
                onClick={() => setEditingSkill(null)}
                className="p-1 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveSkill} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Skill Name</label>
                <input
                  type="text"
                  required
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill((p) => (p ? { ...p, name: e.target.value } : null))}
                  placeholder="e.g. Star Schema Data Modelling"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-gray-300">Proficiency Tag / Level</label>
                <input
                  type="text"
                  value={editingSkill.proficiency}
                  onChange={(e) => setEditingSkill((p) => (p ? { ...p, proficiency: e.target.value } : null))}
                  placeholder="e.g. Advanced Hands-on / Proficient"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
                />
              </div>

              <div className="flex items-center justify-end gap-3 pt-3 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setEditingSkill(null)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-gray-400 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="px-5 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold shadow-md flex items-center gap-2"
                >
                  {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                  <span>Save Skill</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
