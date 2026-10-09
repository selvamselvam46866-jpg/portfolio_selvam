'use client';

import React, { useState, useEffect } from 'react';
import { ContactMessage } from '@/types/portfolio';
import { createClient } from '@/lib/supabase/client';
import { markMessageRead, deleteMessage } from '@/lib/actions/admin';
import { Mail, Search, Trash2, MailOpen, Reply, AlertTriangle, CheckCircle2, X } from 'lucide-react';

const mockMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Sarah Jenkins',
    email: 'sarah.j@techrecruiters.com',
    subject: 'Junior Data Analyst opening at Apex Manufacturing',
    message:
      'Hi Selvam, I reviewed your NovaTech MFG Intelligence and AeroHome Power BI projects. We have an entry-level Data Analyst opening on our industrial intelligence team in Chennai. Would you be open for a quick introductory discussion this week?',
    is_read: false,
    created_at: new Date(Date.now() - 3600000 * 4).toISOString(),
  },
  {
    id: 'msg-2',
    name: 'Arun Kumar',
    email: 'arun.k@analyticsfoundry.io',
    subject: 'Feedback on TrendMart Excel Leakage Analysis',
    message:
      'Impressive work identifying the 23 data quality inconsistencies and the 7.2% margin leakage in TrendMart. Your structured approach to business actions is what we look for in freshers. Let us know if you are actively looking for junior analyst roles.',
    is_read: true,
    created_at: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
];

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>(mockMessages);
  const [search, setSearch] = useState('');
  const [activeMessage, setActiveMessage] = useState<ContactMessage | null>(null);
  const [status, setStatus] = useState<{ success?: boolean; message?: string } | null>(null);

  useEffect(() => {
    async function loadLiveMessages() {
      const supabase = createClient();
      if (supabase) {
        const { data, error } = await supabase
          .from('messages')
          .select('*')
          .order('created_at', { ascending: false });
        if (data && data.length > 0) {
          setMessages(data);
        }
      }
    }
    loadLiveMessages();
  }, []);

  const filtered = messages.filter((m) => {
    const q = search.toLowerCase();
    return (
      m.name.toLowerCase().includes(q) ||
      m.email.toLowerCase().includes(q) ||
      m.subject.toLowerCase().includes(q)
    );
  });

  const handleToggleRead = async (msg: ContactMessage) => {
    const newStatus = !msg.is_read;
    try {
      await markMessageRead(msg.id, newStatus);
    } catch {
      // Local fallback
    }
    setMessages((prev) =>
      prev.map((m) => (m.id === msg.id ? { ...m, is_read: newStatus } : m))
    );
    if (activeMessage && activeMessage.id === msg.id) {
      setActiveMessage({ ...activeMessage, is_read: newStatus });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteMessage(id);
    } catch {
      // Local fallback
    }
    setMessages((prev) => prev.filter((m) => m.id !== id));
    if (activeMessage && activeMessage.id === id) {
      setActiveMessage(null);
    }
    setStatus({ success: true, message: 'Message removed.' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-white">Messages Inbox</h1>
          <p className="text-xs text-gray-400">
            Review incoming opportunities, recruiter inquiries, and project discussions.
          </p>
        </div>

        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="w-4 h-4 text-gray-500 absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search messages..."
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#191920] border border-white/10 text-xs text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum"
          />
        </div>
      </div>

      {status && (
        <div className="p-3.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>{status.message}</span>
        </div>
      )}

      {/* Messages Table */}
      <div className="rounded-2xl bg-[#191920] border border-white/10 overflow-hidden shadow-xl">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-xs text-gray-500 space-y-2">
            <Mail className="w-8 h-8 mx-auto text-gray-600" />
            <p>No messages matching your search.</p>
          </div>
        ) : (
          <div className="divide-y divide-white/5">
            {filtered.map((msg) => (
              <div
                key={msg.id}
                onClick={() => {
                  setActiveMessage(msg);
                  if (!msg.is_read) handleToggleRead(msg);
                }}
                className={`p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs cursor-pointer hover:bg-white/[0.02] transition-colors ${
                  !msg.is_read ? 'bg-accent-plum/5 border-l-4 border-l-accent-rose' : ''
                }`}
              >
                <div className="space-y-1 sm:max-w-xl">
                  <div className="flex items-center gap-2">
                    <span className={`text-sm ${!msg.is_read ? 'font-bold text-white' : 'font-medium text-gray-300'}`}>
                      {msg.name}
                    </span>
                    <span className="text-gray-500 font-mono text-[11px]">&lt;{msg.email}&gt;</span>
                    {!msg.is_read && (
                      <span className="px-2 py-0.5 rounded-full bg-accent-rose/20 text-accent-rose text-[10px] font-bold">
                        Unread
                      </span>
                    )}
                  </div>
                  <p className={`line-clamp-1 ${!msg.is_read ? 'text-gray-200 font-semibold' : 'text-gray-400'}`}>
                    {msg.subject}
                  </p>
                  <p className="text-gray-500 line-clamp-1 text-[11px]">{msg.message}</p>
                </div>

                <div className="flex items-center gap-3 self-end sm:self-auto" onClick={(e) => e.stopPropagation()}>
                  <span className="text-[10px] font-mono text-gray-500">
                    {new Date(msg.created_at).toLocaleDateString()}
                  </span>

                  <button
                    onClick={() => handleToggleRead(msg)}
                    className="p-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-gray-400 hover:text-white"
                    title={msg.is_read ? 'Mark Unread' : 'Mark Read'}
                  >
                    <MailOpen className="w-3.5 h-3.5" />
                  </button>

                  <a
                    href={`mailto:${msg.email}?subject=Re: ${encodeURIComponent(msg.subject)}`}
                    className="p-1.5 rounded-lg bg-accent-plum/20 hover:bg-accent-plum/40 text-accent-rose"
                    title="Reply via Email"
                  >
                    <Reply className="w-3.5 h-3.5" />
                  </a>

                  <button
                    onClick={() => handleDelete(msg.id)}
                    className="p-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400"
                    title="Delete Message"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Reader Modal */}
      {activeMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <div className="w-full max-w-xl rounded-2xl bg-[#191920] border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div className="space-y-1">
                <span className="text-xs font-mono text-gray-400">
                  {new Date(activeMessage.created_at).toLocaleString()}
                </span>
                <h3 className="font-heading text-lg font-bold text-white">
                  {activeMessage.subject}
                </h3>
                <div className="text-xs text-gray-300">
                  From: <span className="font-bold text-white">{activeMessage.name}</span>{' '}
                  <span className="text-accent-lavender">({activeMessage.email})</span>
                </div>
              </div>

              <button
                onClick={() => setActiveMessage(null)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-4 rounded-xl bg-[#101014] border border-white/5 text-xs sm:text-sm text-gray-200 leading-relaxed whitespace-pre-wrap">
              {activeMessage.message}
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-white/5">
              <button
                onClick={() => handleToggleRead(activeMessage)}
                className="text-xs text-gray-400 hover:text-white"
              >
                {activeMessage.is_read ? 'Mark as Unread' : 'Mark as Read'}
              </button>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleDelete(activeMessage.id)}
                  className="px-3 py-1.5 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 text-xs font-semibold"
                >
                  Delete
                </button>
                <a
                  href={`mailto:${activeMessage.email}?subject=Re: ${encodeURIComponent(activeMessage.subject)}`}
                  className="px-4 py-1.5 rounded-lg bg-accent-plum hover:bg-accent-plumLight text-white text-xs font-semibold flex items-center gap-1.5 shadow-md"
                >
                  <Reply className="w-3.5 h-3.5" />
                  <span>Reply via Mail</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
