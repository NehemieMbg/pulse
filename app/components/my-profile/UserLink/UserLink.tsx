import React, { useState, useRef, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './UserLink.module.scss';

export default function UserLink(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const userLinkRef = useRef<HTMLInputElement | null>(null);
  const [userLink, setUserLink] = useState<String | null>();
  const [userLinkError, setUserLinkError] = useState<String | null>();

  useFetchUserData(setUserData);

  useEffect(() => {
    if (userData) {
      userLinkRef.current!.value = userData.link!;
    }
  }, [userData]);

  function cancelBtnHandler() {
    setUserLink(null);
    if (userData) {
      userLinkRef.current!.value = userData.link!;
    }
  }

  async function updateUserLink() {
    if (userLink === userData?.link)
      return setUserLinkError('Cannot submit your current name');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userLink }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setUserLinkError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setUserLink(null);
      setUserLinkError(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="link" className={styles.label}>
        Link
      </label>

      <div className={styles.edit}>
        <input
          type="text"
          name="link"
          id="link"
          ref={userLinkRef}
          autoComplete="off"
          className={styles['input-text']}
          onChange={(event) => setUserLink(event.target.value)}
        />
        {userLinkError && <p className={styles.taken}>{userLinkError}</p>}
        <div className={styles['btn-container']}>
          {userLink && (
            <button className={styles['cancel-btn']} onClick={cancelBtnHandler}>
              Cancel
            </button>
          )}

          <button className={styles['edit-btn']} onClick={updateUserLink}>
            Submit
          </button>
        </div>
      </div>
    </div>
  );
}
