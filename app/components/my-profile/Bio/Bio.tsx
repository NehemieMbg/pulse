import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './Bio.module.scss';

export default function Bio(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const bioRef = useRef<HTMLTextAreaElement | null>(null);
  const [bio, setBio] = useState<String | null>();
  const [bioError, setBioError] = useState<String | null>();

  useFetchUserData(setUserData);

  useEffect(() => {
    if (userData) {
      bioRef.current!.value = userData.bio!;
    }
  }, [userData]);

  function cancelBtnHandler() {
    setBio(null);
    if (userData) {
      bioRef.current!.value = userData.bio!;
    }
  }

  async function updateBio() {
    if (bio === userData?.bio)
      return setBioError('Cannot submit your current name');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bio }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setBioError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setBio(null);
      setBioError(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="bio" className={styles.label}>
        Bio
      </label>

      <div className={styles.edit}>
        <textarea
          name="bio"
          id="bio"
          ref={bioRef}
          autoComplete="off"
          maxLength={150}
          className={styles['input-text']}
          onChange={(event) => setBio(event.target.value)}
        />
        {bioError && <p className={styles.taken}>{bioError}</p>}
        <div className={styles['btn-container']}>
          {bio && (
            <button className={styles['cancel-btn']} onClick={cancelBtnHandler}>
              Cancel
            </button>
          )}

          <button className={styles['edit-btn']} onClick={updateBio}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
