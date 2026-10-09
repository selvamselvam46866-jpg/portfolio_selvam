'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { contactSchema, ContactFormData } from '@/lib/validations/contact';
import { submitContactMessage } from '@/lib/actions/contact';
import { Profile, SiteSettings } from '@/types/portfolio';
import { Mail, Phone, MapPin, Linkedin, Github, Send, CheckCircle2, AlertTriangle, Loader2 } from 'lucide-react';

interface ContactSectionProps {
  profile: Profile;
  settings: SiteSettings;
}

export function ContactSection({ profile, settings }: ContactSectionProps) {
  const [serverStatus, setServerStatus] = useState<{
    success?: boolean;
    message?: string;
  } | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      subject: '',
      message: '',
      company_website_trap: '',
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setServerStatus(null);
    try {
      const res = await submitContactMessage(data);
      if (res.success) {
        setServerStatus({ success: true, message: res.message });
        reset();
      } else {
        setServerStatus({ success: false, message: res.message });
      }
    } catch {
      setServerStatus({
        success: false,
        message: 'Failed to send message. Please reach out directly via email.',
      });
    }
  };

  return (
    <section id="contact" className="py-24 border-t border-gray-200 dark:border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="space-y-2 mb-16">
          <div className="text-xs font-mono font-bold tracking-widest uppercase text-accent-rose dark:text-accent-lavender">
            08 / GET IN TOUCH
          </div>
          <h2 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase text-gray-900 dark:text-white">
            Let&apos;s Connect & Collaborate
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-accent-plum to-accent-rose rounded-full" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Direct Contact Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-xl space-y-6">
              
              <div className="space-y-2">
                <h3 className="font-heading text-2xl font-bold text-gray-900 dark:text-white">
                  Ready to add analytical firepower to your team?
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">
                  I am actively seeking fresher Data Analyst, Junior Data Analyst, and Business Intelligence opportunities. Whether you have an open position or a dashboard project, feel free to reach out.
                </p>
              </div>

              {/* Direct Info List */}
              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-white/5">
                
                {/* Email */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-gray-500 dark:text-gray-400 block">
                      Email Address
                    </span>
                    <a
                      href={`mailto:${profile.email}`}
                      className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-rose transition-colors"
                    >
                      {profile.email}
                    </a>
                  </div>
                </div>

                {/* Optional Phone (controlled by settings) */}
                {settings.show_phone_publicly && profile.phone && (
                  <div className="flex items-start gap-3.5">
                    <div className="w-10 h-10 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender flex-shrink-0">
                      <Phone className="w-5 h-5" />
                    </div>
                    <div>
                      <span className="text-[11px] font-mono uppercase text-gray-500 dark:text-gray-400 block">
                        Direct Phone
                      </span>
                      <a
                        href={`tel:${profile.phone}`}
                        className="text-sm font-semibold text-gray-900 dark:text-white hover:text-accent-rose transition-colors"
                      >
                        {profile.phone}
                      </a>
                    </div>
                  </div>
                )}

                {/* Location */}
                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-accent-plum/10 dark:bg-accent-plum/30 flex items-center justify-center text-accent-rose dark:text-accent-lavender flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-[11px] font-mono uppercase text-gray-500 dark:text-gray-400 block">
                      Location
                    </span>
                    <span className="text-sm font-semibold text-gray-900 dark:text-white">
                      {profile.location}
                    </span>
                  </div>
                </div>

              </div>

              {/* Social profiles */}
              <div className="pt-4 border-t border-gray-100 dark:border-white/5 space-y-3">
                <span className="text-xs font-mono font-bold uppercase text-gray-500 dark:text-gray-400 block">
                  Connect on Socials
                </span>
                <div className="flex items-center gap-3">
                  <a
                    href={profile.linkedin_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200 dark:border-white/10 hover:border-accent-rose text-gray-800 dark:text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <Linkedin className="w-4 h-4 text-blue-500" />
                    <span>LinkedIn</span>
                  </a>
                  <a
                    href={profile.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 py-3 px-4 rounded-xl bg-gray-50 dark:bg-[#101014] border border-gray-200 dark:border-white/10 hover:border-accent-lavender text-gray-800 dark:text-gray-200 text-xs font-semibold flex items-center justify-center gap-2 transition-all hover:scale-105"
                  >
                    <Github className="w-4 h-4" />
                    <span>GitHub</span>
                  </a>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Interactive Contact Form */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl p-6 sm:p-8 bg-white dark:bg-[#191920] border border-gray-200 dark:border-white/10 shadow-xl space-y-6">
              
              <div className="space-y-1">
                <h3 className="font-heading text-xl sm:text-2xl font-bold text-gray-900 dark:text-white">
                  Send a Direct Message
                </h3>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Messages are securely stored and directly routed to Selvam.
                </p>
              </div>

              {/* Status Alert */}
              {serverStatus && (
                <div
                  className={`p-4 rounded-xl border flex items-start gap-3 text-xs sm:text-sm ${
                    serverStatus.success
                      ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-700 dark:text-emerald-300'
                      : 'bg-red-500/10 border-red-500/30 text-red-700 dark:text-red-300'
                  }`}
                >
                  {serverStatus.success ? (
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-emerald-500" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 flex-shrink-0 text-red-500" />
                  )}
                  <span>{serverStatus.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                
                {/* Honeypot field - visually hidden */}
                <div className="hidden" aria-hidden="true">
                  <label htmlFor="company_website_trap">Leave this blank</label>
                  <input
                    type="text"
                    id="company_website_trap"
                    tabIndex={-1}
                    autoComplete="off"
                    {...register('company_website_trap')}
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="name" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Your Name <span className="text-accent-rose">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="e.g. Alex Morgan"
                      {...register('name')}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#101014] border text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all ${
                        errors.name ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-white/10'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-[11px] text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Email */}
                  <div className="space-y-1.5">
                    <label htmlFor="email" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                      Your Email <span className="text-accent-rose">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. alex@company.com"
                      {...register('email')}
                      className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#101014] border text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all ${
                        errors.email ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-white/10'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-[11px] text-red-500">{errors.email.message}</p>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-1.5">
                  <label htmlFor="subject" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Subject <span className="text-accent-rose">*</span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="e.g. Junior Data Analyst Position / Project Discussion"
                    {...register('subject')}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#101014] border text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all ${
                      errors.subject ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-white/10'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-red-500">{errors.subject.message}</p>
                  )}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label htmlFor="message" className="text-xs font-semibold text-gray-700 dark:text-gray-300">
                    Message <span className="text-accent-rose">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Share the details of your inquiry, dashboard challenge, or role opportunity..."
                    {...register('message')}
                    className={`w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-[#101014] border text-xs sm:text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-accent-plum transition-all resize-none ${
                      errors.message ? 'border-red-500 ring-1 ring-red-500' : 'border-gray-200 dark:border-white/10'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-red-500">{errors.message.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 rounded-xl bg-gradient-to-r from-accent-plum to-accent-rose hover:opacity-95 text-white font-semibold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-accent-plum/25 hover:shadow-accent-rose/30 disabled:opacity-50 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

              </form>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
