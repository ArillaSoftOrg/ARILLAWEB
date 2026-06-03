import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET!);

const intlMiddleware = createMiddleware(routing);

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin JWT auth — runs first, bypasses locale routing entirely
  if (pathname.startsWith('/admin')) {
    if (pathname === '/admin/login') return NextResponse.next();

    const token = request.cookies.get('admin-auth')?.value;
    if (!token)
      return NextResponse.redirect(new URL('/admin/login', request.url));

    try {
      await jwtVerify(token, secret());
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    return NextResponse.next();
  }

  // Apply next-intl locale routing for all other paths
  const response = intlMiddleware(request);

  // Forward detected locale in a header so root layout can set <html lang>
  const localeFromPath = pathname.split('/')[1];
  const locale = routing.locales.includes(localeFromPath as (typeof routing.locales)[number])
    ? localeFromPath
    : routing.defaultLocale;
  response.headers.set('x-locale', locale);

  return response;
}

export const config = {
  matcher: [
    // Match all paths except static files, Next.js internals, api, admin
    '/((?!api|admin|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest|apple-touch-icon\\.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json)$).*)',
  ],
};
