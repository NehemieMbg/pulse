'use client';

import BadgeCheckIcon from '@/app/components/ui/CheckMark/BadgeCheckIcon';
import Image from 'next/image';

import styles from './PostCard.module.scss';
import { useState } from 'react';

import LikePost from '../LikePost/LikePost';
import CommentPost from '../CommentPost/CommentPost';
import OutfitPost from '../OutfitPost/OutfitPost';

import { Post } from '@/app/types/posts-type';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { useGetFollowing } from '@/app/hooks/useFetchUserData';
import { usePathname } from 'next/navigation';
import PostCardSkeleton from '../../skeletons/PostCardSkeleton/PostCardSkeleton';

export default function PostCard(props: { data: Post[] }) {
  let data: Post[] = [];
  const pathname = usePathname();
  const [following, setFollowing] = useState<Post[]>();
  useGetFollowing(setFollowing);

  const filter = useSelector(
    (state: { navigation: { filter: 'for_you' | 'following' } }) =>
      state.navigation.filter
  );

  if (pathname === '/home') {
    data = filter === 'for_you' ? props.data! : following!;
  } else {
    data = props.data;
  }

  function postTimeConverter(postDate: string): string {
    const now = new Date();
    const postTime = new Date(postDate);
    const secondsDifference = Math.floor(
      (now.getTime() - postTime.getTime()) / 1000
    ); // getTime() returns milliseconds

    if (secondsDifference < 60) {
      return `${secondsDifference}s`;
    } else if (secondsDifference < 3600) {
      // Less than 1 hour
      return `${Math.floor(secondsDifference / 60)}m`;
    } else if (secondsDifference < 86400) {
      // Less than 1 day
      return `${Math.floor(secondsDifference / 3600)}h`;
    } else if (secondsDifference < 2592000) {
      // Less than 1 month (assuming 30 days in a month)
      return `${Math.floor(secondsDifference / 86400)}d`;
    } else if (secondsDifference < 31536000) {
      // Less than 1 year
      return `${Math.floor(secondsDifference / 2592000)}mo`;
    } else {
      return `${Math.floor(secondsDifference / 31536000)}y`;
    }
  }

  return (
    <ul className={styles['post-container']}>
      {/* -------------------------------------------------- */}

      {data?.map((post: Post) => (
        <li className={styles.post} key={post.id}>
          <div className={styles['post-card']}>
            <div className={styles['top-card-container']}>
              <Link
                href={`${post.author.username}`}
                className={styles['top-card']}
              >
                {post.author.image ? (
                  <Image
                    src={post.author.image}
                    alt="user-profile-picture"
                    width={100}
                    height={100}
                    className={styles['profile-picture']}
                  />
                ) : (
                  <div className={styles['no-image']}></div>
                )}

                <div className={styles['profile-info-container']}>
                  <div className={styles['profile-info']}>
                    <div className={styles.name}>
                      <h2 className={styles.fullname}>{post.author.name}</h2>
                      {post.author.emailVerified && <BadgeCheckIcon />}
                      <p className={styles.username}>@{post.author.username}</p>
                    </div>
                  </div>
                  <p className={styles['posted-time']}>
                    {postTimeConverter(post.createdAt)}
                  </p>
                </div>
              </Link>
              {/* <PostMenu username={post.author.username} /> */}
            </div>

            <Image
              src={post.imageUrl}
              alt="outfit"
              width={1080}
              height={1350}
              className={styles['main-picture']}
            />

            <div className={styles['bottom-card']}>
              <div className={styles['user-bio']}>
                <p className={styles['user-bio-text']}>
                  <span className={styles['user-bio-username']}>
                    {post.author.name}
                  </span>
                  {'  '}
                  {post.caption}
                </p>
              </div>

              <div className={styles.reactions}>
                <LikePost className={styles.likes} postData={post} />

                <CommentPost className={styles.comments} postData={post} />

                <OutfitPost className={styles.views} postData={post} />
              </div>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
