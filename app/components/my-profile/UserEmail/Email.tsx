import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';
import { signOut } from 'next-auth/react';

import styles from './Email.module.scss';
import { redirect } from 'next/navigation';

export default function Email(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const [editEmail, setEditEmail] = useState(false);
  const [email, setEmail] = useState<String | null>();
  const [emailError, setEmailError] = useState<String | null>();

  useFetchUserData(setUserData);

  async function updateEmail() {
    if (email === userData?.email)
      return setEmailError('Cannot submit your current username');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setEmailError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setEmailError(null);
      setEditEmail(false);
      signOut();
      redirect('/login');
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="username" className={styles.label}>
        Email
      </label>

      {/* <h2 className={styles.label}>Username</h2> */}
      {editEmail ? (
        <div className={styles.edit}>
          <input
            type="email"
            placeholder={userData!.email!}
            name="email"
            id="email"
            autoComplete="off"
            className={styles['input-text']}
            onChange={(event) => setEmail(event.target.value)}
          />
          {emailError && <p className={styles.taken}>{emailError}</p>}
          <div className={styles['btn-container']}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setEditEmail(false)}
            >
              Cancel
            </button>

            <button className={styles['edit-btn']} onClick={updateEmail}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.edit}>
          {userData?.email && <p className={styles.text}>{userData?.email}</p>}
          <button
            className={styles['edit-btn']}
            onClick={() => setEditEmail(true)}
          >
            Change your email
          </button>
        </div>
      )}
    </div>
  );
}
