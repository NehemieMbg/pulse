import prisma from '@/app/lib/prismadb';
import { pusherServer } from '@/app/lib/pusher';
import { Notification } from '@/app/types/notifications-type';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl } from '@/app/utils/user-utils';
import { NextRequest, NextResponse } from 'next/server';

//? little change
export async function GET(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const userEmail = await getUserSession();
  const { postId } = params;

  try {
    let likedPost = false;

    const user = await prisma.user.findFirst({
      where: { email: String(userEmail) },
    });
    const likes = await prisma.like.findMany({
      where: { postId: postId },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true,
            imageName: true,
            emailVerified: true,
          },
        },
      },
    });

    for (const like of likes) {
      if (like.author.id === user?.id) likedPost = true;

      if (like.author.imageName)
        like.author.image = await getImageUrl(like.author.imageName);
    }

    return NextResponse.json({ likes: likes.reverse(), likedPost });
  } catch (error) {
    return new NextResponse('Could not find comments', { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const userEmail = await getUserSession();
  const body = await request.json();
  const { id, authorId, username, imageName } = body;

  const user = await prisma.user.findFirst({
    where: { email: userEmail as string },
    include: { Like: { select: { postId: true } } },
  });

  if (user?.Like) {
    for (const post of user?.Like) {
      if (post.postId === id) {
        try {
          const deletedLike = await prisma.like.delete({
            where: {
              postId_userId: {
                postId: id as string,
                userId: user.id as string,
              },
            },
          });
          return NextResponse.json(deletedLike);
        } catch (error) {
          return new NextResponse('error', { status: 400 });
        }
      }
    }
  }

  try {
    await prisma.user.update({
      where: { email: userEmail as string },
      data: {
        openedNotifications: true,
      },
    });

    const newLike = await prisma.like.create({
      data: {
        userId: user?.id as string,
        postId: id as string,
      },
    });

    // ? Create a new notification
    await prisma.notification.create({
      data: {
        type: 'follow',
        senderId: user?.id as string,
        senderName: user?.username as string,
        message: `liked your post`,
        timestamp: new Date(),
        link: `/${user?.username}`,
        userId: authorId,
      },
    });

    const newNotification: Notification = {
      id: id,
      type: 'like',
      senderId: user?.id as string,
      senderName: user?.username as string,
      message: `liked your post`,
      link: `/post/${id}`,
      timestamp: new Date(),
      user: {
        imageName: imageName,
        image: imageName ? await getImageUrl(imageName as string) : '',
      },
    };

    await pusherServer.trigger(
      username as string,
      'notification:new',
      newNotification
    );

    return NextResponse.json(newLike.id);
  } catch (error) {
    return new NextResponse('error', { status: 400 });
  }
}
