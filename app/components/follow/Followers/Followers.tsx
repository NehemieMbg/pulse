import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import styles from './Followers.module.scss';
import XmarkIcon from '../../ui/XmarkIcon';
import Image from 'next/image';
import Link from 'next/link';
import useClickOutside from '@/app/hooks/useClickOutside';

interface UserFollowers {
  User: {
    username: string;
    name: string;
    id: string;
    image: string;
    imageName: string;
  };
}

export default function Followers(props: {
  userUsername: string;
  followers: UserFollowers[];
  followerIsOpen: boolean;
  setFollowersIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { userUsername, followers, followerIsOpen, setFollowersIsOpen } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setFollowersIsOpen(false));

  return (
    followerIsOpen && (
      <div className={styles.container}>
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.nav}>
            <div
              className={styles['icon-container']}
              onClick={() => setFollowersIsOpen(false)}
            >
              <XmarkIcon className={styles['closing-icon']} />
            </div>
            {userUsername && <h1>Users following @{userUsername}</h1>}
          </div>

          <ul className={styles.list}>
            {followers.map((user, idx) => (
              <li className={styles.user} key={idx}>
                <Link href={`/${user.User.username}`} className={styles.link}>
                  {user.User.image ? (
                    <Image
                      src={user.User.image}
                      alt="user profile image"
                      className={styles.image}
                      height={100}
                      width={100}
                    />
                  ) : (
                    <div className={styles['no-image']}></div>
                  )}

                  <div className={styles.text}>
                    <h2 className={styles.name}>{user.User.name}</h2>
                    {user.User.username && (
                      <p className={styles.username}>@{user.User.username}</p>
                    )}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    )
  );
}
