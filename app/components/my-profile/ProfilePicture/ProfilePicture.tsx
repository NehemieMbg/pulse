import React, { ChangeEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import { setChanges } from '@/app/store/slices/user-slice';

import styles from './ProfilePicture.module.scss';
import Image from 'next/image';

export default function ProfilePicture(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const dispatch = useDispatch();
  const { userData, setUserData } = props;
  const [fileError, setFileError] = useState<String | null>();

  async function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    await uploadFile(file);
  }

  async function uploadFile(file: File) {
    const data = new FormData();
    data.set('file', file);

    try {
      const response = await fetch('/api/user/profile-image', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) {
        const errorMessage = await response.text();
        setFileError(errorMessage);
        throw new Error(errorMessage);
      }
      const updatedData = await response.json();

      // Update the Redux user store so it updates the entire page
      dispatch(setChanges(updatedData));
      setFileError(null);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      {userData?.image ? (
        <Image
          src={userData?.image}
          alt="user profile image"
          className={styles['profile-image']}
          width={100}
          height={100}
        />
      ) : (
        <div className={styles['no-image']}></div>
      )}

      {/* {editUsername ? ( */}
      <div className={styles.edit}>
        <input
          type="file"
          name="file"
          id="file"
          autoComplete="off"
          className={styles['input-file']}
          onChange={handleFileChange}
        />
        <label htmlFor="file">Select from computer</label>
        {fileError && <p className={styles.taken}>{fileError}</p>}
        <div className={styles['btn-container']}></div>
      </div>
    </div>
  );
}
