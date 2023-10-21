import prisma from '@/app/lib/prismadb';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl } from '@/app/utils/user-utils';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  // check if the user is authenticated
  await getUserSession();

  const body = await request.json();
  const user = await prisma.user.findFirst({
    where: { username: body.username },
  });

  const isVerified = user?.emailVerified ? true : false;

  const userData = {
    isVerified,
    username: user?.username,
    name: user?.name,
  };

  return NextResponse.json(userData);
}

export async function GET() {
  const email = await getUserSession();

  try {
    const user = await prisma.user.findFirst({
      where: { email: email as string },
      select: {
        username: true,
        name: true,
        emailVerified: true,
        imageName: true,
        image: true,
        openedNotifications: true,
      },
    });

    const isVerified = user?.emailVerified ? true : false;

    let imageUrl = '';
    if (user?.imageName)
      imageUrl = await getImageUrl(user?.imageName as string);

    const userData = {
      isVerified,
      username: user?.username,
      name: user?.name,
      image: imageUrl,
      openedNotifications: user?.openedNotifications,
    };

    return NextResponse.json(userData);
  } catch (error) {
    return new NextResponse('Something went wrong', { status: 400 });
  }
}
