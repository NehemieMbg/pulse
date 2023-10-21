import Image from 'next/image';
import React, { Dispatch, SetStateAction, useState } from 'react';
import VerifiedIcon from '../../ui/VerifiedIcon';
import DotsVerticalIcon from '../../ui/Dots/DotsVerticalIcon';

import styles from './UserPostProfile.module.scss';
import { Post } from '@/app/types/posts-type';
import PostMenu from '../PostMenu/PostMenu';
import { useGetUser } from '@/app/hooks/useFetchUserData';
import EditPost from '../../edit_post/NewPost/EditPost';

function UserPostProfile(props: {
  postData: Post;
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { postData, setMenuIsOpen } = props;
  // const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  const [user, setUser] = useState<{
    username: string;
    name: string;
    isVerified: boolean;
  }>();

  useGetUser(setUser);

  return (
    <div className={styles['user-profile']}>
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
      {postData.author.username === user?.username && (
        <>
          <div className={styles.menu}>
            <div className={styles.btn} onClick={() => setMenuIsOpen(true)}>
              <DotsVerticalIcon />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default UserPostProfile;
