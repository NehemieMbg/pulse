import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './Username.module.scss';

function Username(props: { userData: User; setUserData: (obj: any) => void }) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const [editUsername, setEditUsername] = useState(false);
  const [username, setUsername] = useState<String | null>();
  const [usernameError, setUsernameError] = useState<String | null>();

  console.log(username);

  useFetchUserData(setUserData);

  async function updateUsername() {
    if (username === userData?.username)
      return setUsernameError('Cannot submit your current username');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setUsernameError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setUsernameError(null);
      setEditUsername(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="username" className={styles.label}>
        Username
      </label>

      {/* <h2 className={styles.label}>Username</h2> */}
      {editUsername ? (
        <div className={styles.edit}>
          <input
            type="text"
            name="username"
            id="username"
            autoComplete="off"
            className={styles['input-text']}
            onChange={(event) => setUsername(event.target.value)}
          />
          {usernameError && <p className={styles.taken}>{usernameError}</p>}
          <div className={styles['btn-container']}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setEditUsername(false)}
            >
              Cancel
            </button>

            <button className={styles['edit-btn']} onClick={updateUsername}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.edit}>
          {userData?.username && (
            <p className={styles.text}>@{userData?.username}</p>
          )}
          <button
            className={styles['edit-btn']}
            onClick={() => setEditUsername(true)}
          >
            Change your username
          </button>
        </div>
      )}
    </div>
  );
}

export default Username;
