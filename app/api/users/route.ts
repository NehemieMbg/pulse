import { getUserSession } from '@/app/utils/functions/user';
import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { username } = body;

  // check if the user is authenticated
  await getUserSession();

  if (!username) {
    return new NextResponse('No user found', { status: 400 });
  }

  const userList = await prisma.user.findMany({
    where: { username: { startsWith: username } },
    select: { username: true, name: true },
  });

  if (userList.length > 0) return NextResponse.json(userList);
  else return NextResponse.json([]);
}
