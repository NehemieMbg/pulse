import React from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import ChevronRightIcon from '@/app/components/ui/ChevronRightIcon';

function page() {
  return (
    <div className={styles.settings}>
      <div className={styles['heading-container']}>
        <Link href={'/settings'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>Account Information</h1>
      </div>

      <Link href={'/settings/account/my-profile'} className={styles.link}>
        <div className={styles.text}>
          <h2>Profile</h2>
          <p>
            Edit your profile informations, like your profile picture and
            username
          </p>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>

      <Link href={'/settings/account/my-email'} className={styles.link}>
        <div className={styles.text}>
          <h2>Email</h2>
          <p>Update your email</p>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>

      <Link href={'/settings/account/verified-account'} className={styles.link}>
        <div className={styles.text}>
          <h2>Get verified</h2>
          <p>Confirm your email address to get verified</p>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>
    </div>
  );
}

export default page;
