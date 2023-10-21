import styles from './UserCard.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import BadgeCheckIcon from '../../ui/CheckMark/BadgeCheckIcon';
import { User } from '@/app/types/user-type';
import { useState } from 'react';
import { useGetUser } from '@/app/hooks/useFetchUserData';
import UserCardSkeleton from '../../skeletons/UserCardSkeleton/UserCardSkeleton';

function UserCard(props: { closeNavigation: () => void }) {
  const { closeNavigation } = props;
  const [userData, setUserData] = useState<User>();

  useGetUser(setUserData);

  return (
    <>
      {userData ? (
        <div className={styles['user-profile']}>
          <div className={styles.container} onClick={() => closeNavigation()}>
            <Link
              href={`/${userData?.username!}`}
              className={styles['my-profile-container']}
            >
              {userData?.image ? (
                <Image
                  src={`${userData?.image!}`}
                  height={100}
                  width={100}
                  alt={'User profile'}
                  className={styles['user-profile-picture']}
                />
              ) : (
                <div className={styles['no-image']}></div>
              )}

              <div className={styles['user-profile-text']}>
                <div className={styles['name-container']}>
                  {userData?.name && (
                    <h3 className={styles.name}>{userData?.name}</h3>
                  )}
                  {userData?.isVerified && <BadgeCheckIcon />}
                </div>
                {userData?.username && (
                  <h4 className={styles.username}>@{userData?.username}</h4>
                )}
              </div>
            </Link>
          </div>
        </div>
      ) : (
        <UserCardSkeleton />
      )}
    </>
  );
}

export default UserCard;
