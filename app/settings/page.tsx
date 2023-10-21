import React from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ProfileIcon from '../components/ui/ProfileIcon';
import ChevronRightIcon from '../components/ui/ChevronRightIcon';
import KeyIcon from '../components/ui/KeyIcon';
import FaceFrownIcon from '../components/ui/FaceFrownIcon';
import ArrowLongLeft from '../components/ui/ArrowLongLeft';

function page() {
  return (
    <div className={styles.settings}>
      <div className={styles['heading-container']}>
        <Link href={'/home'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>Your Account</h1>
      </div>
      <p className={styles['heading-text']}>
        See information about your account
      </p>

      <Link href={'/settings/account'} className={styles.link}>
        <div className={styles['text-container']}>
          <ProfileIcon className={styles.icon} />

          <div className={styles.text}>
            <h2>Account information</h2>
            <p>See your account information like your email address.</p>
          </div>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>

      <Link href={'/settings/password'} className={styles.link}>
        <div className={styles['text-container']}>
          <KeyIcon className={styles.icon} />

          <div className={styles.text}>
            <h2>Change your password</h2>
            <p>Change your password at any time.</p>
          </div>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>

      <Link href={'/settings/deactivate'} className={styles.link}>
        <div className={styles['text-container']}>
          <FaceFrownIcon className={styles.icon} />

          <div className={styles.text}>
            <h2>Deactivate your account</h2>
            <p>Find out how you can deactivate your account</p>
          </div>
        </div>

        <ChevronRightIcon className={styles.icon} />
      </Link>
    </div>
  );
}

export default page;
