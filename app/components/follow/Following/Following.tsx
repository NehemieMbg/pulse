import React, { Dispatch, SetStateAction, useRef, useState } from 'react';

import styles from './Following.module.scss';
import XmarkIcon from '../../ui/XmarkIcon';
import Image from 'next/image';
import Link from 'next/link';
import useClickOutside from '@/app/hooks/useClickOutside';

interface UserFollowers {
  following: {
    username: string;
    name: string;
    id: string;
    image: string;
    imageName: string;
  };
}

export default function Following(props: {
  userUsername: string;
  following: UserFollowers[];
  followingIsOpen: boolean;
  setFollowingIsOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const { userUsername, following, followingIsOpen, setFollowingIsOpen } =
    props;

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setFollowingIsOpen(false));

  return (
    followingIsOpen && (
      <div className={styles.container}>
        <div className={styles.menu} ref={menuRef}>
          <div className={styles.nav}>
            <div
              className={styles['icon-container']}
              onClick={() => setFollowingIsOpen(false)}
            >
              <XmarkIcon className={styles['closing-icon']} />
            </div>
            {userUsername && <h1>Users following by @{userUsername}</h1>}
          </div>

          <ul className={styles.list}>
            {following.map((user, idx) => (
              <li className={styles.user} key={user.following.id}>
                <Link
                  href={`/${user.following.username}`}
                  className={styles.link}
                >
                  {user.following.image ? (
                    <Image
                      src={user.following.image}
                      alt="user profile image"
                      className={styles.image}
                      height={100}
                      width={100}
                    />
                  ) : (
                    <div className={styles['no-image']}></div>
                  )}

                  <div className={styles.text}>
                    <h2 className={styles.name}>{user.following.name}</h2>
                    {user.following.username && (
                      <p className={styles.username}>
                        @{user.following.username}
                      </p>
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
