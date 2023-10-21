'use client';

import React, { FormEvent, useState } from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { User } from '@/app/types/user-type';
import Username from '@/app/components/my-profile/Username/Username';
import Name from '@/app/components/my-profile/Name/Name';
import Bio from '@/app/components/my-profile/Bio/Bio';
import UserLink from '@/app/components/my-profile/UserLink/UserLink';
import ProfilePicture from '@/app/components/my-profile/ProfilePicture/ProfilePicture';
import Location from '@/app/components/my-profile/Location/Location';

function Page() {
  const [userData, setUserData] = useState<User>();

  useFetchUserData(setUserData);

  async function updateUserData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.profile}>
      <div className={styles['heading-container']}>
        <Link href={'/settings/account/'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>My Profile</h1>
      </div>

      <form action="" onSubmit={updateUserData} className={styles.form}>
        <ProfilePicture userData={userData!} setUserData={setUserData} />
        <Username userData={userData!} setUserData={setUserData} />
        <Name userData={userData!} setUserData={setUserData} />
        <Location userData={userData!} setUserData={setUserData} />
        <Bio userData={userData!} setUserData={setUserData} />
        <UserLink userData={userData!} setUserData={setUserData} />
      </form>
    </div>
  );
}

export default Page;
