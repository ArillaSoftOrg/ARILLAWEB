/**
 * Signing/verification key for the admin session cookie.
 * Throws when ADMIN_AUTH_SECRET is missing so auth fails closed with a clear message,
 * instead of silently verifying against an empty key.
 */
export function getAdminSecret(): Uint8Array {
  const secret = process.env.ADMIN_AUTH_SECRET;
  if (!secret) {
    throw new Error('ADMIN_AUTH_SECRET is not set');
  }
  return new TextEncoder().encode(secret);
}
