'use server';
import { cookies } from 'next/headers';

export async function adminLogout(): Promise<void> {
  (await cookies()).delete('admin-auth');
}
