import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation';

export async function isLoggedIn() {
  const session = await getServerSession(authOptions as any);
  if (session) redirect('/home');
}

export async function isLoggedOut() {
  const session = await getServerSession(authOptions as any);
  if (!session) redirect('/');

  return session;
}
