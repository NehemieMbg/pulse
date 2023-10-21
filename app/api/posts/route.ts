import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/app/lib/prismadb';
import crypto from 'crypto';
import {
  S3Client,
  PutObjectCommand,
  GetObjectCommand,
} from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

import sharp from 'sharp';
import { getServerSession } from 'next-auth';
import { authOptions } from '../auth/[...nextauth]/route';
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

export async function POST(request: NextRequest, response: NextResponse) {
  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  const { email } = session.user;

  const user = await prisma.user.findFirst({
    where: {
      email,
    },
  });

  const data = await request.formData();
  const file: File | null = data.get('file') as File;
  const postData = JSON.parse(data.get('postData') as string);
  const postCaption = postData.caption;
  const postLinks = postData.postLinks;

  if (!file) {
    return NextResponse.json({ success: false });
  }

  // Check if the file type starts with 'image/'
  if (!file.type.startsWith('image/')) {
    return new NextResponse('The file must be an image', { status: 400 });
  }

  function randomeImageName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ? Resizing image
  const reisizedImage = await sharp(buffer)
    .toFormat('jpg')
    .resize({ height: 1350, width: 1080, fit: 'cover' })
    .toBuffer();

  const imageName = randomeImageName();

  const fileParams = {
    Bucket: bucketName as string,
    Key: imageName,
    Body: reisizedImage,
  };

  const command = new PutObjectCommand(fileParams);
  await s3.send(command);

  const post = await prisma.post.create({
    data: {
      caption: postCaption,
      imageName: imageName,
      items: {
        create: postLinks,
      },
      author: {
        connect: {
          username: user?.username as string,
          name: user!.name as string,
          image: user?.image,
        },
      },
    },
  });

  return NextResponse.json({ sucess: true });
}

export async function GET() {
  //? Only authenticated users are allowed to access this request
  const session = (await getServerSession(authOptions as any)) as {
    user: { email: string };
  };

  if (!session)
    return new NextResponse('You must be connected', { status: 400 });

  // get posts from the database in descending order
  const posts = await prisma.post.findMany({
    orderBy: [{ createdAt: 'desc' }],
    include: {
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
  });

  for (const post of posts) {
    const getObjectParams = {
      Bucket: bucketName as string,
      Key: post.imageName,
    };

    const command = new GetObjectCommand(getObjectParams);
    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
    if (post.author.imageName)
      post.author.image = await getImageUrl(post.author.imageName);

    //? Since image is expires it return the current image url
    post.imageUrl = url;
  }

  return NextResponse.json(posts);
}
