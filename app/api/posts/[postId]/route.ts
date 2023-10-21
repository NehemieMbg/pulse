import { NextRequest, NextResponse } from 'next/server';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { getUserSession } from '@/app/utils/functions/user';
import {
  DeleteObjectCommand,
  GetObjectCommand,
  S3Client,
} from '@aws-sdk/client-s3';
import prisma from '@/app/lib/prismadb';
import { getImageUrl } from '@/app/utils/user-utils';

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.BUCKET_REGION;
const accessKey = process.env.ACCESS_KEY;
const secretAccessKey = process.env.SECRET_ACCESS_KEY;

const s3 = new S3Client({
  credentials: {
    accessKeyId: accessKey as string,
    secretAccessKey: secretAccessKey as string,
  },
  region: bucketRegion as string,
});

export async function GET(
  request = NextRequest,
  { params }: { params: { postId: string } }
) {
  const userEmail = await getUserSession();

  try {
    const postData = await prisma.post.findFirst({
      where: { id: params.postId },
      include: {
        author: {
          select: {
            name: true,
            username: true,
            emailVerified: true,
            imageName: true,
            image: true,
          },
        },
        comments: { select: { author: true, content: true } },
        items: { select: { itemName: true, itemLink: true } },
      },
    });

    const getObjectParams = {
      Bucket: bucketName as string,
      Key: postData?.imageName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

    //? Since the image expires it return the current valid image url
    if (postData) {
      postData.imageUrl = url as string;
    }
    if (postData?.author.imageName)
      postData.author.image = await getImageUrl(postData.author.imageName);

    return NextResponse.json(postData);
  } catch (error) {
    return new NextResponse('Could not find post', { status: 400 });
  }
}

export async function DELETE(
  request = NextRequest,
  { params }: { params: { postId: string } }
) {
  const userEmail = await getUserSession();

  const user = await prisma.user.findFirst({
    where: { email: String(userEmail) },
  });
  const post = await prisma.post.findFirst({ where: { id: params.postId } });

  const awsParams = {
    Bucket: bucketName,
    Key: post?.imageName,
  };
  const command = new DeleteObjectCommand(awsParams);

  if (user?.id === post?.authorId) {
    try {
      //? Delete image from storage
      await s3.send(command);

      const repsonse = await prisma.post.delete({
        where: { id: params.postId },
      });
      return NextResponse.json(post?.id);
    } catch (error) {
      return new NextResponse('Error', { status: 400 });
    }
  } else {
    return new NextResponse('You do not have the right to delete this post', {
      status: 400,
    });
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { postId: string } }
) {
  const userEmail = await getUserSession();
  const body = await request.json();

  const user = await prisma.user.findFirst({
    where: { email: String(userEmail) },
  });
  const post = await prisma.post.findFirst({ where: { id: params.postId } });

  if (user?.id === post?.authorId) {
    try {
      // First, delete the items associated with the post
      await prisma.post.update({
        where: { id: params.postId },
        data: {
          items: {
            deleteMany: {},
          },
        },
      });

      // Then, create and associate the new items with the post
      const updatedPost = await prisma.post.update({
        where: { id: params.postId },
        include: { items: true },
        data: {
          caption: body.caption,
          items: {
            create: body.postLinks,
          },
        },
      });

      return NextResponse.json(updatedPost);
    } catch (error) {
      console.log(error);
      return new NextResponse('Something went wrong', { status: 400 });
    }
  } else {
    return new NextResponse('You do not have the right to modify this post', {
      status: 400,
    });
  }
}
