'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import { Lock, Mail, Key, AlertTriangle, ArrowRight, Loader2, ShieldCheck, Home } from 'lucide-react';
import Link from 'next/link';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);

    const supabase = createClient();
    if (!supabase) {
      setErrorMessage(
        'Supabase client is not configured yet. Please configure NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in your .env.local file.'
      );
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMessage(error.message);
        setLoading(false);
        return;
      }

      if (data?.user) {
        const adminEmail = process.env.ADMIN_EMAIL || 'selvamselvam46866@gmail.com';
        if (data.user.email?.toLowerCase() !== adminEmail.toLowerCase()) {
          await supabase.auth.signOut();
          setErrorMessage('Access Denied: This account is not authorized as the administrator.');
          setLoading(false);
          return;
        }

        router.push('/admin');
        router.refresh();
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected authentication error occurred.');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#101014] text-white flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent-plum/20 rounded-full blur-[140px] pointer-events-none" />

      {/* Return to site link */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-white transition-colors p-2 rounded-lg bg-white/5 border border-white/10"
        >
          <Home className="w-3.5 h-3.5" />
          <span>Return to Portfolio</span>
        </Link>
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="rounded-2xl p-8 bg-[#191920] border border-white/10 shadow-2xl space-y-6">
          
          {/* Logo & Header */}
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-accent-plum to-accent-rose flex items-center justify-center mx-auto shadow-lg shadow-accent-plum/30">
              <Lock className="w-6 h-6 text-white" />
            </div>
            <h1 className="font-heading text-2xl font-bold tracking-tight text-white">
              Admin Portal
            </h1>
            <p className="text-xs text-gray-400">
              Secure authentication for Selvam D portfolio management
            </p>
          </div>

          {/* Error Notice */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-xs flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 flex-shrink-0 mt-0.5 text-red-400" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 block">
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="selvamselvam46866@gmail.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#101014] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-gray-300 block">
                Password
              </label>
              <div className="relative">
                <Key className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#101014] border border-white/10 text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-accent-plum to-accent-rose hover:opacity-95 text-white text-xs font-semibold uppercase tracking-wider shadow-lg shadow-accent-plum/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Security policy footnote */}
          <div className="pt-4 border-t border-white/5 text-[11px] text-gray-500 text-center flex items-center justify-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-rose" />
            <span>Authorized access only &bull; Public signups disabled</span>
          </div>

        </div>
      </div>
    </div>
  );
}
