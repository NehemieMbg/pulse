import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './Name.module.scss';

function Name(props: { userData: User; setUserData: (obj: any) => void }) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const [editName, setEditName] = useState(false);
  const [name, setName] = useState<String | null>();
  const [nameError, setNameError] = useState<String | null>();

  useFetchUserData(setUserData);

  async function updateName() {
    if (name === userData?.name)
      return setNameError('Cannot submit your current name');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setNameError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setNameError(null);
      setEditName(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="name" className={styles.label}>
        Name
      </label>

      {editName ? (
        <div className={styles.edit}>
          <input
            type="text"
            name="name"
            id="name"
            autoComplete="off"
            className={styles['input-text']}
            placeholder="Jon Doe"
            onChange={(event) => setName(event.target.value)}
          />
          {nameError && <p className={styles.taken}>{nameError}</p>}
          <div className={styles['btn-container']}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setEditName(false)}
            >
              Cancel
            </button>

            <button className={styles['edit-btn']} onClick={updateName}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.edit}>
          {userData?.name && <p className={styles.text}>{userData?.name}</p>}
          <button
            className={styles['edit-btn']}
            onClick={() => setEditName(true)}
          >
            Change your name
          </button>
        </div>
      )}
    </div>
  );
}

export default Name;
