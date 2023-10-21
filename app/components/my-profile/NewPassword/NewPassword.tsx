import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import styles from './NewPassword.module.scss';
import { ErrorMsg } from '@/app/utils/enums/error-msg';

export default function NewPassword(props: {
  userData: User;
  setUserData: (obj: any) => void;
}) {
  const [editPassword, setEditPassword] = useState(false);

  const [currPassword, setCurrPassword] = useState<String | null>();
  const [newPassword, setNewPassword] = useState<String | null>();
  const [confirmPassword, setConfirmPassword] = useState<String | null>();

  const [currPasswordError, setCurrPasswordError] = useState<String | null>();
  const [newPasswordError, setNewPasswordError] = useState<String | null>();
  const [confirmPasswordError, setConfirmPasswordError] =
    useState<String | null>();

  async function updatePassword() {
    try {
      const response = await fetch('/api/user', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ currPassword, newPassword, confirmPassword }),
      });

      if (!response.ok) {
        const errorMessage = await response.text();

        if (errorMessage === ErrorMsg.PASSWORD_MISSING) {
          setCurrPasswordError(errorMessage);
          setNewPasswordError(null);
          setConfirmPasswordError(null);
        }

        if (errorMessage === ErrorMsg.PASSWORD_INVALID) {
          setCurrPasswordError(errorMessage);
          setNewPasswordError(null);
          setConfirmPasswordError(null);
        }

        if (errorMessage === ErrorMsg.NEW_PASSWORD_MISSING) {
          setNewPasswordError(errorMessage);
          setCurrPasswordError(null);
          setConfirmPasswordError(null);
        }

        if (errorMessage === ErrorMsg.CONFIRM_PASSWORD_MISSING) {
          setConfirmPasswordError(errorMessage);
          setCurrPasswordError(null);
          setNewPasswordError(null);
        }

        if (errorMessage === ErrorMsg.PASSWORD_DO_NOT_MATCH) {
          setConfirmPasswordError(errorMessage);
          setNewPasswordError(errorMessage);
          setCurrPasswordError(null);
        }

        if (errorMessage === ErrorMsg.PASSWORD_ERROR) {
          setConfirmPassword(errorMessage);
        }
        throw new Error(errorMessage);
      }

      setCurrPasswordError(null);
      setNewPasswordError(null);
      setConfirmPasswordError(null);
      setEditPassword(false);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={styles.container}>
      <label htmlFor="password" className={styles.label}>
        Password
      </label>

      {editPassword ? (
        <div className={styles.edit}>
          <input
            type="password"
            placeholder="Current password"
            name="password"
            id="password"
            autoComplete="off"
            className={styles['input-text']}
            onChange={(event) => setCurrPassword(event.target.value)}
          />
          {currPasswordError && (
            <p className={styles.taken}>{currPasswordError}</p>
          )}
          <input
            type="password"
            placeholder="New password"
            name="password"
            id="password"
            autoComplete="off"
            className={styles['input-text']}
            onChange={(event) => setNewPassword(event.target.value)}
          />
          {newPasswordError && (
            <p className={styles.taken}>{newPasswordError}</p>
          )}
          <input
            type="password"
            name="password"
            placeholder="Confirm password"
            id="password"
            autoComplete="off"
            className={styles['input-text']}
            onChange={(event) => setConfirmPassword(event.target.value)}
          />
          {confirmPasswordError && (
            <p className={styles.taken}>{confirmPasswordError}</p>
          )}
          <div className={styles['btn-container']}>
            <button
              className={styles['cancel-btn']}
              onClick={() => setEditPassword(false)}
            >
              Cancel
            </button>

            <button className={styles['edit-btn']} onClick={updatePassword}>
              Submit
            </button>
          </div>
        </div>
      ) : (
        <div className={styles.edit}>
          {<p className={styles.text}>•••••••••••••••••</p>}
          <button
            className={styles['edit-btn']}
            onClick={() => setEditPassword(true)}
          >
            Change your password
          </button>
        </div>
      )}
    </div>
  );
}
