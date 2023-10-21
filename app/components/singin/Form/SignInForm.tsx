'use client';

import React, { FormEvent, useState } from 'react';
import styles from './SignInForm.module.scss';
import { useRouter } from 'next/navigation';
import { setEmail, setPassword } from '@/app/utils/functions/sign-up';
import { signIn } from 'next-auth/react';
import { NewUser } from '@/app/utils/enums/sign-up';
import CircularIndeterminate from '../../ui/CircularInterminate';

function SignInForm() {
  const router = useRouter();
  const [data, setData] = useState({
    email: '',
    password: '',
  });

  const [submittingIsLoading, setSubmittingIsLoading] = useState(false);
  const [emailMsgError, setEmailMsgError] = useState<string | null>(null);
  const [passwordMsgError, setPasswordMsgError] = useState<string | null>(null);

  async function loginUser(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmittingIsLoading(true);

    try {
      const response = await signIn('credentials', {
        ...data,
        redirect: false,
      });

      if (response?.error) {
        if (response.error === NewUser.INPUTS_REQUIRED) {
          setEmailMsgError(NewUser.EMAIL_IS_MISSING);
          setPasswordMsgError(NewUser.PASSWORD_IS_MISSING);
        }

        if (response.error === NewUser.WRONG_CREDENTIALS) {
          setEmailMsgError(NewUser.WRONG_CREDENTIALS);
          setPasswordMsgError(NewUser.WRONG_CREDENTIALS);
        }

        if (response.error === NewUser.EMAIL_IS_MISSING) {
          setEmailMsgError(NewUser.EMAIL_IS_MISSING);
          setPasswordMsgError(null);
        }

        if (response.error === NewUser.PASSWORD_IS_MISSING) {
          setEmailMsgError(null);
          setPasswordMsgError(NewUser.PASSWORD_IS_MISSING);
        }
        setSubmittingIsLoading(false);
        throw new Error(response?.error);
      }

      setEmailMsgError(null);
      setPasswordMsgError(null);

      // To avoid bug throwing back to back from /home to /login
      setTimeout(() => {
        router.push('/home');
      }, 1000);
    } catch (error) {
      console.error(error);
    }

    setSubmittingIsLoading(false);
  }

  return (
    <form
      action=""
      onSubmit={(event) => loginUser(event)}
      className={styles.form}
    >
      <div className={styles['error-container']}>
        <label htmlFor="email"></label>
        <input
          type="email"
          name="email"
          defaultValue="nehemie.mbg@gmail.com"
          className={`${styles['email-input']} ${
            emailMsgError && `${styles['input-error']}`
          }`}
          placeholder="Email"
          onChange={(event) => setEmail(event, data, setData)}
        />
        {emailMsgError && <p className={styles.error}>{emailMsgError}</p>}
      </div>

      <div className={styles['error-container']}>
        <input
          type="password"
          defaultValue="test1234"
          className={`${styles['password-input']} ${
            passwordMsgError ? `${styles['input-error']}` : ''
          }`}
          placeholder="Password"
          onChange={(event) => setPassword(event, data, setData)}
        />
        {passwordMsgError && <p className={styles.error}>{passwordMsgError}</p>}
      </div>
      <button
        className={`${styles.btn} ${styles.next} ${
          submittingIsLoading && `${styles['loading-container']}`
        }`}
        disabled={submittingIsLoading}
      >
        {submittingIsLoading && (
          <CircularIndeterminate className={styles.loading} />
        )}
        Next
      </button>
    </form>
  );
}

export default SignInForm;
