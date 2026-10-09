'use client';

import React, { useState } from 'react';
import { Hobby } from '@/types/portfolio';
import { initialHobbiesData } from '@/lib/data/initial-data';
import { upsertHobby, deleteHobby } from '@/lib/actions/admin';
import { Sparkles, Plus, Trash2, CheckCircle2, AlertTriangle, Loader2, Save, X, Activity } from 'lucide-react';

export default function AdminHobbiesPage() {
  const [hobbies, setHobbies] = useState<Hobby[]>(initialHobbiesData);
  const [newTitle, setNewTitle] = useState('');
  const [newIcon, setNewIcon] = useState('Activity');
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  const handleAddHobby = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    setSaving(true);
    setStatus(null);

    const newHobby: Hobby = {
      id: `hobby-${Date.now()}`,
      title: newTitle.trim(),
      icon: newIcon,
      sort_order: hobbies.length + 1,
      is_published: true,
    };

    try {
      await upsertHobby(newHobby);
      setHobbies((prev) => [...prev, newHobby]);
      setNewTitle('');
      setStatus({ success: true, message: 'Hobby added successfully!' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error adding hobby.' });
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    setSaving(true);
    try {
      await deleteHobby(id);
      setHobbies((prev) => prev.filter((h) => h.id !== id));
      setStatus({ success: true, message: 'Hobby removed.' });
    } catch (err: any) {
      setStatus({ success: false, message: err.message || 'Error deleting hobby.' });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-heading text-2xl font-bold text-white">Hobbies & Interests Manager</h1>
        <p className="text-xs text-gray-400">
          Personalize creative pursuits, chess, music, programming, and AI video creation.
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

      {/* Add New Hobby Form */}
      <form onSubmit={handleAddHobby} className="p-5 rounded-2xl bg-[#191920] border border-white/10 flex flex-col sm:flex-row items-end gap-4">
        <div className="flex-1 space-y-1.5 w-full">
          <label className="text-xs font-semibold text-gray-300">New Hobby or Interest Title</label>
          <input
            type="text"
            required
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="e.g. Data Visualization Blogging"
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
          />
        </div>

        <div className="space-y-1.5 w-full sm:w-48">
          <label className="text-xs font-semibold text-gray-300">Icon Key</label>
          <select
            value={newIcon}
            onChange={(e) => setNewIcon(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl bg-[#101014] border border-white/10 text-xs text-white"
          >
            <option value="Crown">Crown (Chess)</option>
            <option value="BookOpen">Book (Reading/Writing)</option>
            <option value="Code2">Code (Programming)</option>
            <option value="Video">Video (AI Videos)</option>
            <option value="Headphones">Headphones (Music)</option>
            <option value="Utensils">Utensils (Cooking)</option>
            <option value="Activity">Activity (General)</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={saving}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold shadow-md flex items-center justify-center gap-2"
        >
          {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
          <span>Add Hobby</span>
        </button>
      </form>

      {/* Grid of Hobbies */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {hobbies.map((h) => (
          <div
            key={h.id}
            className="p-4 rounded-xl bg-[#191920] border border-white/10 flex flex-col items-center justify-between gap-3 text-center"
          >
            <span className="font-bold text-xs text-white block mt-2">{h.title}</span>
            <button
              onClick={() => handleDelete(h.id)}
              className="p-1 rounded-lg text-gray-500 hover:text-red-400 hover:bg-red-500/10 transition-colors"
              title="Delete hobby"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
