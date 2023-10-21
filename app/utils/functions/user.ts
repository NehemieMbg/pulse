import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import prisma from '@/app/lib/prismadb';
import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { Notification } from '@/app/types/notifications-type';
import { User } from '@/app/types/user-type';
import { pusherServer } from '@/app/lib/pusher';

export async function getUserData(email: string) {
  const userData = await prisma.user.findFirst({ where: { email: email } });
}

export async function getUserSession() {
  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  const { email } = session.user;

  return email;
}

// Generate a random 5 length code string
export function generateCode() {
  const min = 10000;
  const max = 99999;
  const randomNumber = Math.floor(Math.random() * (max - min) + min);

  return String(randomNumber);
}
