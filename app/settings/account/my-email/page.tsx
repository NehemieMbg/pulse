'use client';

import React, { FormEvent, useState } from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { User } from '@/app/types/user-type';
import Email from '@/app/components/my-profile/UserEmail/Email';

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
        <Email userData={userData!} setUserData={setUserData} />
      </form>
    </div>
  );
}

export default Page;
