'use client';

import React, { useState } from 'react';

import styles from './PostComments.module.scss';
import { Comment, Post } from '@/app/types/posts-type';
import Image from 'next/image';
import VerifiedIcon from '../../ui/VerifiedIcon';
import { useGetComments } from '@/app/hooks/useFetchUserData';

function PostComments(props: { postData: Post }) {
  const { postData } = props;
  const [commentData, setCommentData] = useState<Comment[]>([]);
  useGetComments(postData.id, setCommentData);
  console.log(commentData);

  return (
    <ul className={styles['comments-list']}>
      {/* //? User post Caption */}
      {postData.caption && (
        <li className={styles['user-comment']}>
          {postData.author.image ? (
            <Image
              src={postData.author.image}
              alt="profile picture"
              width={100}
              height={100}
              className={styles['profile-picture']}
            />
          ) : (
            <div className={styles['no-image']}></div>
          )}

          <p className={styles['text-comment']}>
            <span className={styles.username}>
              {postData.author.username}{' '}
              {postData.author?.emailVerified && (
                <VerifiedIcon className={styles.verified} />
              )}
            </span>{' '}
            {postData.caption}
          </p>
        </li>
      )}
      {commentData.map((comment: Comment, idx: number) => (
        <li className={styles['user-comment']} key={idx}>
          {comment.author.image ? (
            <Image
              src={comment.author.image}
              alt="profile picture"
              width={100}
              height={100}
              className={styles['profile-picture']}
            />
          ) : (
            <div className={styles['no-image']}></div>
          )}

          <p className={styles['text-comment']}>
            <span className={styles.username}>
              {comment.author.username}{' '}
              {comment.author.emailVerified && (
                <VerifiedIcon className={styles.verified} />
              )}
            </span>{' '}
            {comment.content}
          </p>
        </li>
      ))}
    </ul>
  );
}

export default PostComments;
