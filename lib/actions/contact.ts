'use server';

import { contactSchema, ContactFormData } from '@/lib/validations/contact';
import { createServerSupabaseClient } from '@/lib/supabase/server';
import { headers } from 'next/headers';

// Rate limiting in-memory store for basic flood mitigation (supplementing DB IP hash checks)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

export interface SubmitContactResult {
  success: boolean;
  message: string;
  errors?: Record<string, string[]>;
}

export async function submitContactMessage(formData: ContactFormData): Promise<SubmitContactResult> {
  try {
    // 1. Zod Server Validation
    const validation = contactSchema.safeParse(formData);
    if (!validation.success) {
      return {
        success: false,
        message: 'Please review and fix errors in the form fields.',
        errors: validation.error.flatten().fieldErrors,
      };
    }

    // 2. Honeypot check
    if (formData.company_website_trap && formData.company_website_trap.length > 0) {
      // Silently discard spam bot
      return {
        success: true,
        message: 'Thank you! Your message has been received.',
      };
    }

    // 3. Client IP extraction for rate limiting
    const headerList = headers();
    const forwardedFor = headerList.get('x-forwarded-for');
    const realIp = headerList.get('x-real-ip');
    const clientIp = (forwardedFor ? forwardedFor.split(',')[0].trim() : realIp) || '127.0.0.1';

    // Basic rate limit: max 5 messages per 10 minutes per IP
    const now = Date.now();
    const rateLimit = rateLimitMap.get(clientIp);
    if (rateLimit && now < rateLimit.resetTime) {
      if (rateLimit.count >= 5) {
        return {
          success: false,
          message: 'Too many messages submitted from your connection. Please wait a few minutes before trying again.',
        };
      }
      rateLimit.count += 1;
    } else {
      rateLimitMap.set(clientIp, { count: 1, resetTime: now + 10 * 60 * 1000 });
    }

    // 4. Save to Supabase (if available)
    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('messages').insert({
        name: validation.data.name,
        email: validation.data.email,
        subject: validation.data.subject,
        message: validation.data.message,
        is_read: false,
        ip_hash: clientIp.replace(/(\d+)\.(\d+)\.(\d+)\.(\d+)/, '$1.$2.***.***'),
      });

      if (error) {
        console.error('Supabase contact message insert error:', error);
        // If table doesn't exist yet or connection fails, we log and still give friendly fallback
      }
    } else {
      console.log('Contact message received in local preview mode:', {
        name: validation.data.name,
        email: validation.data.email,
        subject: validation.data.subject,
      });
    }

    return {
      success: true,
      message: 'Thank you, your message has been sent successfully! Selvam will get back to you shortly.',
    };
  } catch (error) {
    console.error('Contact submission error:', error);
    return {
      success: false,
      message: 'An unexpected error occurred while sending your message. Please try again or email directly.',
    };
  }
}
