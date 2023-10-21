import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './Location.module.scss';

export default function Location(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const { userData, setUserData } = props;
  const dispatch = useDispatch();

  const [editCity, setEditCity] = useState(false);
  const [city, setCity] = useState<String | null>();
  const [cityError, setCityError] = useState<String | null>();

  useFetchUserData(setUserData);

  async function updateCity() {
    if (city === userData?.city)
      return setCityError('Cannot submit your current username');

    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ city }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setCityError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      setUserData(updatedData);

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setCityError(null);
      setEditCity(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="city" className={styles.label}>
        Location
      </label>

      {editCity ? (
        <div className={styles.edit}>
          <input
            type="text"
            name="city"
            id="city"
            autoComplete="off"
            className={styles['input-text']}
            placeholder={userData.city || 'City, Country'}
            onChange={(event) => setCity(event.target.value)}
          />
          {cityError && <p className={styles.taken}>{cityError}</p>}
          <div className={styles['btn-container']}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setEditCity(false)}
            >
              Cancel
            </button>

            <button className={styles['edit-btn']} onClick={updateCity}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.edit}>
          {userData?.city && <p className={styles.text}>{userData?.city}</p>}
          <button
            className={styles['edit-btn']}
            onClick={() => setEditCity(true)}
          >
            Change your location
          </button>
        </div>
      )}
    </div>
  );
}
