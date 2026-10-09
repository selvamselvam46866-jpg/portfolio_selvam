import { NextRequest, NextResponse } from 'next/server';
import { contactSchema } from '@/lib/validations/contact';
import { createServerSupabaseClient } from '@/lib/supabase/server';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const result = contactSchema.safeParse(body);

    if (!result.success) {
      return NextResponse.json(
        { success: false, errors: result.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (body.company_website_trap) {
      // Honeypot trapped
      return NextResponse.json({ success: true, message: 'Message received.' });
    }

    const supabase = await createServerSupabaseClient();
    if (supabase) {
      const { error } = await supabase.from('messages').insert({
        name: result.data.name,
        email: result.data.email,
        subject: result.data.subject,
        message: result.data.message,
        is_read: false,
      });

      if (error) {
        console.error('Supabase contact API error:', error);
      }
    }

    return NextResponse.json({
      success: true,
      message: 'Message delivered successfully!',
    });
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: err.message || 'Server error' },
      { status: 500 }
    );
  }
}
