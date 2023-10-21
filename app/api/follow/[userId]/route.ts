import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl, getUser } from '@/app/utils/user-utils';
import { pusherServer } from '@/app/lib/pusher';
import { Notification } from '@/app/types/notifications-type';

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const email = await getUserSession();
  const user = await getUser(email as string);

  const followingUser = await prisma.user.findFirst({
    where: { id: params.userId as string },
    select: {
      id: true,
      username: true,
    },
  });

  try {
    await prisma.user.update({
      where: { id: followingUser?.id as string },
      data: {
        openedNotifications: true,
      },
    });

    const updatedFollowing = await prisma.follow.create({
      data: {
        followingId: params.userId,
        followedById: user?.id as string,
        userId: user?.id,
      },
    });

    const notification = await prisma.notification.create({
      data: {
        type: 'follow',
        senderId: user?.id as string,
        senderName: user?.username as string,
        message: `started following you`,
        timestamp: new Date(),
        link: `/${user?.username}`,
        userId: followingUser?.id,
      },
    });

    const newNotification: Notification = {
      id: updatedFollowing.id as string,
      type: 'follow',
      senderId: user?.id as string,
      senderName: user?.username as string,
      message: `started following you`,
      link: `/${user?.username}`,
      timestamp: new Date(),
      user: {
        imageName: user?.imageName!,
        image: user?.imageName
          ? await getImageUrl(user?.imageName as string)
          : '',
      },
    };

    try {
      await pusherServer.trigger(
        followingUser?.username as string,
        'notification:new',
        newNotification
      );
    } catch (error) {
      return new NextResponse('Pusher trigger error', { status: 400 });
    }

    return NextResponse.json(updatedFollowing);
  } catch (error) {
    return new NextResponse('Could not follow user', { status: 400 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const email = await getUserSession();
  const user = await getUser(email as string);

  try {
    const updatedFollowing = await prisma.follow.delete({
      where: {
        followingId_followedById: {
          followingId: params.userId,
          followedById: user?.id as string,
        },
      },
    });

    return NextResponse.json(updatedFollowing);
  } catch (error) {
    return new NextResponse('Something happened', { status: 400 });
  }
}
