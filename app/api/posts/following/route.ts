import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import { getUserSession } from '@/app/utils/functions/user';
import { getImageUrl } from '@/app/utils/user-utils';

export async function GET() {
  const email = await getUserSession();

  try {
    const followingUserPost = await prisma.user.findFirst({
      where: { email: email as string },
      include: {
        followedBy: {
          select: {
            following: {
              select: {
                posts: {
                  orderBy: [{ createdAt: 'desc' }],
                  select: {
                    id: true,
                    createdAt: true,
                    caption: true,
                    imageName: true,
                    imageUrl: true,
                    authorId: true,
                    author: {
                      select: {
                        id: true,
                        username: true,
                        name: true,
                        image: true,
                        imageName: true,
                        emailVerified: true,
                      },
                    },
                    items: true,
                    comments: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    // const posts = followingUserPost?.followedBy[0].following.posts || [];
    const posts =
      followingUserPost?.followedBy
        .map((post) => post.following.posts)
        .flat() || [];

    if (posts) {
    }
    for (const post of posts) {
      if (post.author.imageName)
        post.author.image = await getImageUrl(post.author.imageName);

      //? Since image is expires it return the current image url
      post.imageUrl = await getImageUrl(post.imageName);
    }

    return NextResponse.json(posts);
  } catch (error) {
    return new NextResponse('Could not fetch post', { status: 400 });
  }
}
