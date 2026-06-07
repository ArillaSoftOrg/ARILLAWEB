import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';
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

  // Detect locale from path
  const localeFromPath = pathname.split('/')[1];
  const locale = routing.locales.includes(localeFromPath as (typeof routing.locales)[number])
    ? localeFromPath
    : routing.defaultLocale;

  // Forward pathname and locale as request headers so server components can read them
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-locale', locale);
  requestHeaders.set('x-pathname', pathname);

  // Run intl middleware with the injected request headers so server components
  // can read x-pathname/x-locale while next-intl keeps its rewrites intact.
  const requestWithPathHeaders = new NextRequest(request.url, {
    headers: requestHeaders,
    method: request.method,
  });

  return intlMiddleware(requestWithPathHeaders);
}

export const config = {
  matcher: [
    '/admin/:path*',
    // Match all paths except static files, Next.js internals, api, admin
    '/((?!api|admin|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|site\\.webmanifest|apple-touch-icon\\.png|.*\\.(?:png|jpg|jpeg|gif|webp|svg|ico|txt|xml|json)$).*)',
  ],
};
