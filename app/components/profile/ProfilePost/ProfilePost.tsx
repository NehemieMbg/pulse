import React from 'react';

import Image from 'next/image';

import styles from './ProfilePost.module.scss';
import { Post } from '@/app/types/posts-type';
import Link from 'next/link';

function ProfilePost(props: { posts: Post[] }) {
  const { posts } = props;

  return (
    <div className={styles.feed}>
      <div className={styles['feed-container']}>
        <h2 className={styles.heading}>Posts</h2>

        <ul className={styles['photo-feed']}>
          {posts.length > 0 ? (
            posts.map((post: Post, idx: number) => (
              <li className={styles['image-container']} key={idx}>
                <Link href={`/post/${post.id}`}>
                  <Image
                    src={`${post?.imageUrl}`}
                    width={400}
                    height={600}
                    alt="photo"
                    className={styles.image}
                  />
                </Link>
              </li>
            ))
          ) : (
            <li></li>
          )}
        </ul>
      </div>
    </div>
  );
}

export default ProfilePost;
