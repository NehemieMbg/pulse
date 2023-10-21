import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import prisma from '@/app/lib/prismadb';

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

export async function getImageUrl(imageName: string) {
  const getObjectParams = {
    Bucket: bucketName as string,
    Key: imageName,
  };

  const command = new GetObjectCommand(getObjectParams);

  return await getSignedUrl(s3, command, { expiresIn: 3600 });
}

export async function getUser(email: string) {
  return await prisma.user.findFirst({
    where: { email: email },
    include: { Follow: true, followedBy: true, following: true },
  });
}
