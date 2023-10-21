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
  await getUserSession();
  const { postId } = params;

  try {
    const comments = await prisma.comment.findMany({
      where: { postId: postId },
      include: {
        author: {
          select: { name: true, username: true, imageName: true, image: true },
        },
      },
    });

    for (let i = 0; i < comments.length; i++) {
      if (comments[i].author.imageName) {
        comments[i].author.image = await getImageUrl(
          comments[i].author.imageName as string
        );
      }
    }

    return NextResponse.json(comments.reverse());
  } catch (error) {
    return new NextResponse('Could not find comments', { status: 400 });
  }
}

export async function POST(request: NextRequest) {
  const userEmail = await getUserSession();
  const body = await request.json();
  const { postId: id, comment } = body;

  if (comment === '')
    return new NextResponse('Please enter a comment', { status: 400 });

  const user = await prisma.user.findFirst({
    where: { email: userEmail as string },
  });

  try {
    const newComment = await prisma.comment.create({
      data: {
        content: comment,
        userId: user?.id as string,
        postId: id as string,
      },
      include: {
        Post: {
          select: {
            author: {
              select: {
                id: true,
                image: true,
                imageName: true,
                username: true,
              },
            },
          },
        },
      },
    });

    await prisma.user.update({
      where: { id: newComment.Post?.author.id },
      data: {
        openedNotifications: true,
      },
    });

    await prisma.notification.create({
      data: {
        type: 'comment',
        senderId: user?.id as string,
        senderName: user?.username as string,
        message: `commented your post`,
        timestamp: new Date(),
        link: `/post/${id}`,
        userId: newComment.Post?.author.id,
      },
    });

    const newNotification: Notification = {
      id: id,
      type: 'comment',
      senderId: user?.id as string,
      senderName: user?.username as string,
      message: `commented your post`,
      link: `/post/${id}`,
      timestamp: new Date(),
      user: {
        imageName: user?.imageName!,
        image: user?.imageName
          ? await getImageUrl(user?.imageName as string)
          : '',
      },
    };

    await pusherServer.trigger(
      newComment.Post?.author.username!,
      'notification:new',
      newNotification
    );

    return NextResponse.json(newComment.id);
  } catch (error) {
    return new NextResponse('error', { status: 400 });
  }
}
