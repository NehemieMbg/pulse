import { getUserSession } from '@/app/utils/functions/user';
import prisma from '@/app/lib/prismadb';
import { NextRequest, NextResponse } from 'next/server';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import crypto from 'crypto';
import sharp from 'sharp';

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

export async function POST(request: NextRequest) {
  const userEmail = await getUserSession();
  console.log('Made through');

  const data = await request.formData();
  const file: File | null = data.get('file') as File;

  console.log(file);

  function randomeImageName(bytes = 32) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  if (!file) {
    return NextResponse.json({ success: false });
  }

  // Check if the file type starts with 'image/'
  if (!file.type.startsWith('image/')) {
    return new NextResponse('The file must be an image', { status: 400 });
  }

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  // ? Resizing image
  const reisizedImage = await sharp(buffer)
    .toFormat('jpg')
    .resize({ height: 500, width: 500, fit: 'cover' })
    .toBuffer();

  const imageName = randomeImageName();

  const fileParams = {
    Bucket: bucketName as string,
    Key: imageName,
    Body: reisizedImage,
  };

  const command = new PutObjectCommand(fileParams);
  await s3.send(command);

  try {
    const updatedUserProfile = await prisma.user.update({
      where: { email: String(userEmail) },
      data: {
        imageName: imageName,
        image: '',
      },
    });

    return NextResponse.json(updatedUserProfile.image);
  } catch (error) {
    return new NextResponse('Error updating user profile image', {
      status: 400,
    });
  }
}
