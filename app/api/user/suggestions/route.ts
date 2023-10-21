import { NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl } from '@/app/utils/user-utils';

export async function GET() {
  const email = await getUserSession();

  try {
    const suggestion = await prisma.user.findMany({
      where: { email: { not: { equals: email as string } } },
      select: {
        username: true,
        name: true,
        id: true,
        image: true,
        imageName: true,
      },
    });

    const userFollowing = await prisma.user.findFirst({
      where: { email: email as string },
      select: {
        following: true,
        followedBy: {
          select: {
            following: {
              select: {
                name: true,
                username: true,
                id: true,
              },
            },
          },
        },
      },
    });

    //? create an array of ids
    const followingArray = userFollowing?.followedBy.map(
      (user) => user.following.id
    );

    const suggestionsUsers = [];

    //? Filter the array to not add the alreay followed users
    for (let i = 0; i < suggestion.length; i++) {
      if (suggestion[i].imageName)
        suggestion[i].image = await getImageUrl(
          suggestion[i].imageName as string
        );

      if (!followingArray?.includes(suggestion[i].id))
        suggestionsUsers.push(suggestion[i]);
    }

    return NextResponse.json(suggestionsUsers.slice(0, 5));
  } catch (error) {
    return new NextResponse('Could not find suggestion', { status: 400 });
  }
}
