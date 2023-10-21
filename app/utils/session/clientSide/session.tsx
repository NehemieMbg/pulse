'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { signOut } from 'next-auth/react';
import { redirect } from 'next/navigation';

export function useIsLoggedIn() {
  const { data: session, status } = useSession();

  if (session) redirect('/home');

  return session;
}
