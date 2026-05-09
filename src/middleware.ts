import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET!);

export async function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/admin')) {
    if (request.nextUrl.pathname === '/admin/login')
      return NextResponse.next();

    const token = request.cookies.get('admin-auth')?.value;
    if (!token)
      return NextResponse.redirect(new URL('/admin/login', request.url));

    try {
      await jwtVerify(token, secret());
    } catch {
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};