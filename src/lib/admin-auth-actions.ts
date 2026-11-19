'use server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies, headers } from 'next/headers';
import { getAdminSecret } from '@/lib/admin-secret';
import { clientIp, rateLimit } from '@/lib/rate-limit';

export async function adminLogin(
  email: string,
  password: string
): Promise<{ ok: boolean }> {
  // 10 attempts per 15 minutes per IP
  if (!rateLimit(`admin-login:${clientIp(await headers())}`, 10, 15 * 60_000)) {
    return { ok: false };
  }

  const validEmail = process.env.ADMIN_EMAIL;
  const validHash = process.env.ADMIN_PASSWORD_HASH;

  if (!validEmail || !validHash || !process.env.ADMIN_AUTH_SECRET) {
    return { ok: false };
  }

  if (email !== validEmail) {
    return { ok: false };
  }

  const match = await bcrypt.compare(password, validHash);
  if (!match) {
    return { ok: false };
  }

  const token = await new SignJWT({ email })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('8h')
    .sign(getAdminSecret());

  (await cookies()).set('admin-auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return { ok: true };
}
