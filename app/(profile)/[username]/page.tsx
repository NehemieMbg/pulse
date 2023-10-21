import React, { Suspense } from 'react';

import styles from './page.module.scss';
import ProfileNavigation from '@/app/components/profile/ProfileNavigation/ProfileNavigation';
import AboutUser from '@/app/components/profile/AboutUser/AboutUser';
import ProfilePost from '@/app/components/profile/ProfilePost/ProfilePost';
import { isLoggedOut } from '@/app/utils/session/serverSide/session';
import prisma from '@/app/lib/prismadb';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

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

async function page({ params }: { params: { username: string } }) {
  const posts: any = [];
  const username = params.username;

  const response = (await isLoggedOut()) as {
    user: {
      name: string;
      email: string;
      image: null | string;
    };
  };

  async function getUserData() {
    if (response && response.user) {
      posts.push(
        ...(await prisma.post.findMany({
          where: { author: { username } },
          orderBy: [{ createdAt: 'desc' }],
          include: {
            author: {
              select: {
                username: true,
                name: true,
                image: true,
                emailVerified: true,
              },
            },
          },
        }))
      );
    }
  }
  await getUserData();

  // to give the url a valid link
  if (posts.length > 0) {
    for (const post of posts) {
      const getObjectParams = {
        Bucket: bucketName as string,
        Key: post.imageName,
      };

      const command = new GetObjectCommand(getObjectParams);
      const url = await getSignedUrl(s3, command, { expiresIn: 3600 });

      //? Since images url expires it return the current image url
      post.imageUrl = url;
    }
  }

  return (
    <div className={styles.profile}>
      <ProfileNavigation />

      <div className={styles['main-content']}>
        <AboutUser />

        <ProfilePost posts={posts} />
      </div>
    </div>
  );
}

export default page;
