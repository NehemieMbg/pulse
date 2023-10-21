'use client';

import React, { FormEvent, useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';

import styles from './PasswordReset.module.scss';
import CircularIndeterminate from '../../ui/CircularInterminate';

enum PasswordResetStep {
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
  STEP_3 = 'STEP_3',
}

// ! TO BE REFACTORED
function PasswordReset() {
  const router = useRouter();

  // So it doesn't recalculate.
  const matchEmail = useMemo(() => {
    return /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  }, []);

  const [submittingIsLoading, setSubmittingIsLoading] = useState(false);
  const [next, setNext] = useState(false);
  const [email, setEmail] = useState<String | null>(null);
  const [userCode, setUserCode] = useState<String | null>(null);
  const [error, setError] = useState<String | null>(null);
  const [step, setStep] = useState(PasswordResetStep.STEP_1);

  const [password, setPassword] = useState<String | null>(null);
  const [confirmPassword, setConfirmPassword] = useState<String | null>(null);

  useEffect(() => {
    if (step === PasswordResetStep.STEP_1) {
      if (email && email.match(matchEmail)) {
        setNext(true);
      } else {
        setNext(false);
      }
    }

    if (step === PasswordResetStep.STEP_2) {
      if (userCode) {
        setNext(true);
      } else {
        setNext(false);
      }
    }

    if (step === PasswordResetStep.STEP_3) {
      if (password && confirmPassword) {
        setNext(true);
      } else {
        setNext(false);
      }
    }
  }, [email, matchEmail, step, userCode, password, confirmPassword]);

  async function sendCode() {
    setSubmittingIsLoading(true);
    setNext(false);

    try {
      const response = await fetch('/api/password_reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSubmittingIsLoading(false);
        throw new Error(errorMessage);
      }

      setError(null);
      setSubmittingIsLoading(false);
      setStep(PasswordResetStep.STEP_2);
    } catch (error) {
      console.error(error);
    }
  }

  async function verifyCode() {
    setSubmittingIsLoading(true);
    setNext(false);

    try {
      const response = await fetch('/api/password_reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userCode }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSubmittingIsLoading(false);
        throw new Error(errorMessage);
      }

      setError(null);
      setSubmittingIsLoading(false);
      setStep(PasswordResetStep.STEP_3);
    } catch (error) {
      console.error(error);
    }
  }

  async function changePassword() {
    setSubmittingIsLoading(true);
    setNext(false);

    try {
      const response = await fetch('/api/password_reset', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, userCode, password, confirmPassword }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setError(errorMessage);
        setSubmittingIsLoading(false);
        throw new Error(errorMessage);
      }

      setError(null);
      setSubmittingIsLoading(false);
      router.push('/login');
    } catch (error) {
      console.error(error);
    }
  }

  async function submitBtnHandler() {
    if (step === PasswordResetStep.STEP_1) {
      await sendCode();
    }

    if (step === PasswordResetStep.STEP_2) {
      await verifyCode();
    }

    if (step === PasswordResetStep.STEP_3) {
      await changePassword();
    }
  }

  return (
    <div className={styles['reset-password']}>
      {step === PasswordResetStep.STEP_1 && (
        <>
          <h1 className={styles.heading}>Find your PULSE account</h1>
          <p className={styles.text}>
            Enter the email associated with your account to change your
            password.
          </p>
        </>
      )}

      {step === PasswordResetStep.STEP_2 && (
        <>
          <h1 className={styles.heading}>We sent you a code</h1>
          <p className={styles.text}>
            Check your email to get your confirmation code.
          </p>
        </>
      )}

      {step === PasswordResetStep.STEP_3 && (
        <>
          <h1 className={styles.heading}>Change your password</h1>
          <p className={styles.text}>You can now update your password</p>
        </>
      )}

      <form action="" className={styles.form}>
        {step === PasswordResetStep.STEP_1 && (
          <div className={styles['get-code']}>
            <label htmlFor="email"></label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              required
              onChange={(event) => setEmail(event.target.value)}
            />
            {error && <p className={styles['error-message']}>{error}</p>}
          </div>
        )}

        {step === PasswordResetStep.STEP_2 && (
          <div className={styles['get-code']}>
            <label htmlFor="code"></label>
            <input
              type="text"
              name="code"
              placeholder="Verification code"
              required
              onChange={(event) => setUserCode(event.target.value)}
            />
            {error && <p className={styles['error-message']}>{error}</p>}
          </div>
        )}

        {step === PasswordResetStep.STEP_3 && (
          <div className={styles['get-code']}>
            <label htmlFor="password"></label>
            <input
              type="password"
              name="password"
              placeholder="New Password"
              required
              onChange={(event) => setPassword(event.target.value)}
              className={error ? `${styles['input-error']}` : ''}
            />
            <input
              type="password"
              name="confirm-password"
              placeholder="Confirm Password"
              required
              onChange={(event) => setConfirmPassword(event.target.value)}
              className={error ? `${styles['input-error']}` : ''}
            />
            {error && <p className={styles['error-message']}>{error}</p>}
          </div>
        )}
      </form>

      <button
        className={`${styles.btn} ${styles.next} ${
          !next && `${styles['loading-container']}`
        }`}
        disabled={!next}
        onClick={submitBtnHandler}
      >
        {submittingIsLoading && (
          <CircularIndeterminate className={styles.loading} />
        )}
        Next
      </button>
    </div>
  );
}

export default PasswordReset;
