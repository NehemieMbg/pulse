'use client';

import { Post } from '@/app/types/posts-type';
import React, { useRef, useState } from 'react';

import styles from './UserPost.module.scss';
import ArrowLongLeft from '../../ui/ArrowLongLeft';
import Image from 'next/image';
import VerifiedIcon from '../../ui/VerifiedIcon';
import DotsVerticalIcon from '../../ui/Dots/DotsVerticalIcon';
import PostForm from '../PostForm/PostForm';
import PostReaction from '../PostReaction/PostReaction';
import PostComments from '../PostComments/PostComments';
import UserPostProfile from '../UserPostProfile/UserPostProfile';
import { useRouter } from 'next/navigation';
import useClickOutside from '@/app/hooks/useClickOutside';
import PostMenu from '../PostMenu/PostMenu';
import EditPost from '../../edit_post/NewPost/EditPost';
import UserPostSkeleton from '../../skeletons/UserPostSkeleton/UserPostSkeleton';

export default function UserPost(props: { postData: Post }) {
  const { postData } = props;
  const router = useRouter();

  const [editIsOpen, setEditIsOpen] = useState<boolean>(false);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  console.log(postData.author.image);

  const postRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(postRef, () => router.back());

  return (
    <>
      {postData ? (
        <div className={styles['post-container']}>
          <div className={styles.post} ref={postRef}>
            <div className={styles.return}>
              <div
                className={styles['return-container']}
                onClick={() => router.back()}
              >
                <ArrowLongLeft className={styles['return-icon']} />
                <p>return</p>
              </div>
            </div>

            <div className={styles['user-profile-mobile']}>
              <div className={styles['profile-picture']}>
                {postData.author.image ? (
                  <Image
                    src={postData.author.image}
                    alt={postData.caption}
                    height={100}
                    width={100}
                    className={styles['profile-image']}
                  />
                ) : (
                  <div className={styles['no-image']}></div>
                )}
                <p className={styles['profile-username']}>
                  {postData.author?.username}
                </p>
                {postData.author?.emailVerified && (
                  <VerifiedIcon className={styles.verified} />
                )}
              </div>
              <div className={styles.menu} onClick={() => setMenuIsOpen(true)}>
                <DotsVerticalIcon />
              </div>
            </div>

            <div className={styles['image-container']}>
              <Image
                src={postData.imageUrl}
                alt={postData.caption}
                height={1350}
                width={1080}
                className={styles.image}
              />
            </div>

            <div className={styles.comment}>
              <UserPostProfile
                postData={postData}
                setEditIsOpen={setEditIsOpen}
                setMenuIsOpen={setMenuIsOpen}
              />
              <PostComments postData={postData} />

              {/* //? Dont forget to add submit hanlder */}
              <div className={styles['aciton-container']}>
                <PostReaction postData={postData} />
                <PostForm />
              </div>
            </div>
            <PostMenu
              menuIsOpen={menuIsOpen}
              setMenuIsOpen={setMenuIsOpen}
              setEditIsOpen={setEditIsOpen}
              postId={postData.id}
            />
            <EditPost
              editIsOpen={editIsOpen}
              setEditIsOpen={setEditIsOpen}
              postData={postData}
            />
          </div>
        </div>
      ) : (
        <UserPostSkeleton />
      )}
    </>
  );
}
