'use client';

import styles from './SignIn.module.scss';
import GoogleIcon from '../../ui/GoogleIcon';
import Link from 'next/link';
import SignInForm from '../Form/SignInForm';
import { signIn } from 'next-auth/react';

function SignIn() {
  async function googleSignIn() {
    signIn('google', {
      redirect: false,
    });
  }

  return (
    <div className={styles.signin}>
      <h2 className={styles.heading}>Sign in to PULSE</h2>

      <div className={styles.connect}>
        <button
          className={`${styles.btn} ${styles.google}`}
          onClick={googleSignIn}
        >
          <GoogleIcon className={styles.icon} /> Sign in with Google
        </button>

        <div className={styles.or}>
          <div />
          <p>or</p>
          <div />
        </div>

        <SignInForm />

        <Link
          href={'/password_reset'}
          className={`${styles.btn} ${styles.forgot}`}
        >
          Forgot password?
        </Link>

        <p className={styles['to-sign-up']}>
          {"Don't have an account?"} <Link href={'/sign-up'}>Sign up</Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
