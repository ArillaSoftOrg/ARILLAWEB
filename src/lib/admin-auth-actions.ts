'use server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { cookies } from 'next/headers';

const secret = () =>
  new TextEncoder().encode(process.env.ADMIN_AUTH_SECRET!);

export async function adminLogin(
  email: string,
  password: string
): Promise<{ ok: boolean }> {
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
    .sign(secret());

  (await cookies()).set('admin-auth', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/',
    maxAge: 60 * 60 * 8, // 8 hours
  });

  return { ok: true };
}
