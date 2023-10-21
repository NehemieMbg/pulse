'use client';

import React, { useRef, useState } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';

import styles from './NewMessage.module.scss';
import XmarkIcon from '../../ui/XmarkIcon';
import MessageUserList from '../MessageUserList/MessageUserList';
import SearchIcon from '../../ui/SearchIcon';

function NewMessage(props: { menuIsOpen: boolean; closeMenu: () => void }) {
  const { menuIsOpen, closeMenu } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => closeMenu());

  return (
    <div
      className={`${styles['new-message']} ${
        menuIsOpen ? '' : `${styles.hidden}`
      }`}
    >
      <div className={styles.container} ref={menuRef}>
        <div className={styles.nav}>
          <div className={styles.subcontainer}>
            <div
              className={styles['close-icon-container']}
              onClick={() => closeMenu()}
            >
              <XmarkIcon className={styles['close-icon']} />
            </div>
            <h2 className={styles.heading}>New Message</h2>
          </div>

          <div className={styles['searchbar-container']}>
            <label htmlFor="search" className={styles['search-icon-container']}>
              <SearchIcon className={`${styles['search-icon']} `} />
            </label>
            <input
              type="text"
              id="search"
              placeholder="Search people"
              className={styles.searchbar}
              autoComplete="off"
            />
          </div>
        </div>
        <MessageUserList />
      </div>
    </div>
  );
}

export default NewMessage;
