'use client';

import React, { FormEvent, useState } from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { User } from '@/app/types/user-type';
import NewPassword from '@/app/components/my-profile/NewPassword/NewPassword';

function Page() {
  const [userData, setUserData] = useState<User>();

  useFetchUserData(setUserData);

  async function updateUserData(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
  }

  return (
    <div className={styles.profile}>
      <div className={styles['heading-container']}>
        <Link href={'/settings'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>Password</h1>
      </div>

      <form action="" onSubmit={updateUserData} className={styles.form}>
        <NewPassword userData={userData!} setUserData={setUserData} />
      </form>
    </div>
  );
}

export default Page;
