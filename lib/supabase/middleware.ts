import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  const adminEmail = process.env.ADMIN_EMAIL || 'selvamselvam46866@gmail.com';

  const pathname = request.nextUrl.pathname;
  const isAdminRoute = pathname.startsWith('/admin') && pathname !== '/admin/login';
  const isLoginPage = pathname === '/admin/login';

  // If Supabase credentials are missing and trying to access /admin, redirect to login with config note
  if (!supabaseUrl || !supabaseAnonKey) {
    if (isAdminRoute) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'supabase_unconfigured');
      return NextResponse.redirect(url);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: Array<{ name: string; value: string; options?: any }>) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If visiting /admin routes without valid session or unmatching admin email
  if (isAdminRoute) {
    if (!user) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('redirect', pathname);
      return NextResponse.redirect(url);
    }

    if (user.email !== adminEmail) {
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      url.searchParams.set('error', 'forbidden_email');
      return NextResponse.redirect(url);
    }
  }

  // If already logged in and authorized, redirect away from /admin/login to /admin
  if (isLoginPage && user && user.email === adminEmail) {
    const url = request.nextUrl.clone();
    url.pathname = '/admin';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
