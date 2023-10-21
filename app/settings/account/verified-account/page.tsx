'use client';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import CheckIcon from '@/app/components/ui/CheckIcon';
import { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import { Verification } from '@/app/utils/enums/verification';

export default function Page() {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [code, setCode] = useState<String | null>();
  const [success, setSuccess] = useState<String | null>();
  const [error, setError] = useState<String | null>();

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  useClickOutside(menuRef, () => setMenuIsOpen(false));

  function actionBtnHandler() {
    generateCode();
  }

  async function generateCode() {
    try {
      const response = await fetch('/api/verified', {
        method: 'POST',
      });
      if (!response.ok) throw new Error(await response.text());

      const responseText = await response.text();

      if (responseText === Verification.SUCCESS) {
        return setError(Verification.SUCCESS);
      }

      setMenuIsOpen(true);
      setError(null);
    } catch (error) {
      console.error(error);
    }
  }

  async function verifyAccount() {
    try {
      const response = await fetch('/api/verified', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code: code }),
      });
      if (!response.ok) throw new Error(await response.text());

      const responseText = await response.text();

      if (responseText === Verification.SUCCESS) {
        setSuccess(Verification.SUCCESS);
      }

      setError(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.profile}>
      <div className={styles['heading-container']}>
        <Link href={'/settings/account'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>Verified Account</h1>
      </div>

      <div className={styles.text}>
        <p>Obtain your verified icon by confirming your email address,</p>
        <p className={styles['verify-btn']} onClick={() => actionBtnHandler()}>
          Click here.
        </p>
      </div>

      {error && (
        <p className={styles['text-error']}>
          Your Account already has been verified
        </p>
      )}

      {menuIsOpen && (
        <div className={styles['verification-container']}>
          <div className={styles.verification} ref={menuRef}>
            {!success && (
              <div>
                <form action="" className={styles.form}>
                  <label htmlFor="code">
                    Please enter your verification code.
                  </label>
                  <p>
                    Verify your email address to access the verification code.
                  </p>
                  <input
                    type="text"
                    onChange={(e) => setCode(e.currentTarget.value)}
                  />
                  {error && (
                    <p className={styles.error}>An error has occured</p>
                  )}
                </form>
                <button
                  className={styles['submit-btn']}
                  onClick={() => verifyAccount()}
                >
                  Submit
                </button>
              </div>
            )}

            {success && (
              <div className={styles.success}>
                <div className={styles.container}>
                  <CheckIcon className={styles['check-icon']} />
                  <p>{success}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
