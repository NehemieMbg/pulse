'use client';

import React from 'react';

import styles from './page.module.scss';
import GoogleIcon from '../components/ui/GoogleIcon';
import Link from 'next/link';
import { useIsLoggedIn } from '../utils/session/clientSide/session';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';

function Page() {
  useIsLoggedIn();
  const router = useRouter();

  async function googleSignIn() {
    signIn('google', {
      redirect: false,
    });
    router.push('/home');
  }

  return (
    <div className={styles.auth}>
      <div className={styles.logo}>
        <h1>PULSE</h1>
      </div>

      <div className={styles['connect-container']}>
        <h1 className={styles.heading}>Step in the fashion world</h1>
        <h2 className={styles.subheading}>Connect now.</h2>

        <div className={styles.connect}>
          <div className={styles['connect-subcontainer']}>
            <button
              className={`${styles.btn} ${styles.google}`}
              onClick={() => googleSignIn()}
            >
              <GoogleIcon className={styles.icon} /> Sign up with Google
            </button>

            <div className={styles.or}>
              <div />
              <p>or</p>
              <div />
            </div>

            <Link
              href={'/sign-up'}
              className={`${styles.btn} ${styles.signup}`}
            >
              Create account
            </Link>

            <div className={styles.existing}>
              <h3>Already have an account?</h3>
              <Link
                href={'/login'}
                className={`${styles.btn} ${styles.signin}`}
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
