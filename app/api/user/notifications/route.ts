import { getUserSession } from '@/app/utils/functions/user';
import prisma from '@/app/lib/prismadb';
import { NextResponse } from 'next/server';
import { getImageUrl, getUser } from '@/app/utils/user-utils';

export async function GET() {
  const userEmail = await getUserSession();
  const user = await getUser(userEmail as string);

  try {
    await prisma.user.update({
      where: { email: userEmail as string },
      data: {
        openedNotifications: false,
      },
    });

    const notifications = await prisma.notification.findMany({
      where: {
        userId: user?.id,
      },
      orderBy: { timestamp: 'desc' },
    });

    const formatedNotifications = [];

    for (let i = 0; i < notifications.length; i++) {
      const user = await prisma.user.findFirst({
        where: { id: notifications[i].senderId },
        select: { imageName: true, image: true },
      });

      if (user?.imageName) user.image = await getImageUrl(user?.imageName);

      const updatedNotification = { ...notifications[i], user };

      formatedNotifications.push(updatedNotification);
    }

    return NextResponse.json(formatedNotifications);
  } catch (error) {
    return new NextResponse('no notifications found', { status: 400 });
  }
}
