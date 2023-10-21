import React from 'react';

import styles from './ExploreList.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import XmarkIcon from '../../ui/XmarkIcon';
import { User } from '@/app/types/user-type';

function ExploreList(props: { userList: User[] | null }) {
  const { userList } = props;

  return (
    <ul className={styles.list}>
      {userList?.map((user) => (
        <li className={styles.result} key={user.id}>
          <Link href={`/${user.username}`} className={styles.link}>
            <div className={styles.profile}>
              <Image
                src={'/user-profile.jpg'}
                alt="user profile image"
                height={200}
                width={100}
                className={styles['profile-image']}
              />

              <div className={styles.text}>
                <h2 className={styles.fullname}>{user.name}</h2>
                <p className={styles.username}>@{user.username}</p>
              </div>
            </div>

            {/* <div className={styles['icon-container']}>
              <XmarkIcon className={styles.icon} />
            </div> */}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default ExploreList;
