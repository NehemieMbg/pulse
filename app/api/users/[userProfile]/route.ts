import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl, getUser } from '@/app/utils/user-utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { userProfile: string } }
) {
  const email = await getUserSession();
  const connectedUser = await getUser(email as string);
  let followUser = false;

  // ? The user from the viewing profile
  const user = await prisma.user.findFirst({
    where: {
      username: params.userProfile,
    },
    select: {
      id: true,
      name: true,
      imageName: true,
      image: true,
      emailVerified: true,
      email: true,
      username: true,
      bio: true,
      link: true,
      city: true,
      following: {
        select: {
          User: {
            select: {
              username: true,
              name: true,
              id: true,
              image: true,
              imageName: true,
            },
          },
        },
      },
      followedBy: {
        select: {
          following: {
            select: {
              username: true,
              name: true,
              id: true,
              image: true,
              imageName: true,
            },
          },
        },
      },
    },
  });

  //? Check if user viewing is the connected user
  const isUser = email === user?.email;

  if (user?.imageName) user.image = await getImageUrl(user.imageName);

  if (user) {
    for (const followingUser of user.following) {
      if (followingUser?.User?.id === (connectedUser?.id as string)) {
        followUser = true;
      }

      if (followingUser.User?.imageName)
        followingUser.User.image = await getImageUrl(
          followingUser.User.imageName
        );
    }
  }

  if (user) {
    for (const userFollowing of user.followedBy) {
      if (userFollowing.following?.imageName)
        userFollowing.following.image = await getImageUrl(
          userFollowing.following.imageName
        );
    }
  }

  return NextResponse.json({ user, followUser, isUser });
}
