// Minimal fixed-window rate limiter for public POST routes and the admin login.
//
// State lives in this server instance's memory, so on serverless hosting each warm instance
// counts separately. That is enough to blunt naive form spam; for hard guarantees put Vercel
// Firewall rate limiting in front of these routes as well.

type Bucket = { count: number; resetAt: number };

const buckets = new Map<string, Bucket>();
let lastSweep = 0;

function sweep(now: number) {
  if (now - lastSweep < 60_000) return;
  lastSweep = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

/** Returns true when the request is allowed, false once `limit` hits in `windowMs` are used up. */
export function rateLimit(key: string, limit: number, windowMs: number): boolean {
  const now = Date.now();
  sweep(now);

  const bucket = buckets.get(key);
  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return true;
  }

  bucket.count += 1;
  return bucket.count <= limit;
}

/** Best-effort client IP from proxy headers (Vercel sets x-forwarded-for). */
export function clientIp(headers: Headers): string {
  const forwarded = headers.get('x-forwarded-for');
  if (forwarded) return forwarded.split(',')[0].trim();
  return headers.get('x-real-ip') ?? 'unknown';
}

export const TOO_MANY_REQUESTS = { error: 'Çok fazla istek gönderdiniz. Lütfen biraz sonra tekrar deneyin.' };
