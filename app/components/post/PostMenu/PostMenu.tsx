'use client';

import React, { useState, useRef, SetStateAction, Dispatch } from 'react';

import styles from './PostMenu.module.scss';
import useClickOutside from '@/app/hooks/useClickOutside';
import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';
import { useRouter } from 'next/navigation';

function PostMenu(props: {
  menuIsOpen: boolean;
  setMenuIsOpen: Dispatch<SetStateAction<boolean>>;
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  postId: string;
}) {
  const { menuIsOpen, setMenuIsOpen, setEditIsOpen, postId } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, setMenuIsOpen);

  async function deletePost() {
    try {
      const response = await fetch(`/api/posts/${postId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error(await response.text());

      dispatch(setChanges(await response.json()));
      router.back();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    menuIsOpen && (
      <div className={styles.container} ref={menuRef}>
        <div className={styles.menu}>
          <p className={styles.btn} onClick={() => setEditIsOpen(true)}>
            Edit
          </p>
          <p className={styles.btn} onClick={deletePost}>
            Delete
          </p>
        </div>
      </div>
    )
  );
}

export default PostMenu;
