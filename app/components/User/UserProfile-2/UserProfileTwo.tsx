import React from 'react';
import Image from 'next/image';
import BadgeCheckIcon from '../../ui/CheckMark/BadgeCheckIcon';
import styles from './UserProfileTwo.module.scss';
import Link from 'next/link';

function UserProfileTwo(props: {
  user: {
    id: string;
    image: string;
    name: string;
    username: string;
    emailVerified: string;
  };
}) {
  const { user } = props;

  return (
    <Link href={`/${user.username}`} className={styles['top-card']}>
      {user.image ? (
        <Image
          src={user.image}
          alt="user-profile-picture"
          width={100}
          height={100}
          className={styles['profile-picture']}
        />
      ) : (
        <div className={styles['no-image']}></div>
      )}

      <div className={styles['profile-info-container']}>
        <div className={styles.name}>
          <h2 className={styles.fullname}>{user.name}</h2>
          {user.emailVerified && <BadgeCheckIcon />}
        </div>
        <p className={styles.username}>@{user.username}</p>
      </div>
    </Link>
  );
}

export default UserProfileTwo;
