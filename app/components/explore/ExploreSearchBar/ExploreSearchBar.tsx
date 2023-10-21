'use client';

import React, { useRef, useState, useEffect } from 'react';

import styles from './ExploreSearchBar.module.scss';
import SearchIcon from '../../ui/SearchIcon';
import ExploreList from '../ExploreList/ExploreList';
import XmarkIcon from '../../ui/XmarkIcon';
import { User } from '@/app/types/user-type';

function ExploreSearchBar() {
  const inputRef = useRef<HTMLDivElement | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const valueRef = useRef<HTMLInputElement | null>(null);

  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);
  const [input, setInput] = useState('');
  const [userList, setUserList] = useState<User[] | null>([]);

  const handler = (event: any) => {
    // when user clicks outsite of the input and the search div
    if (
      menuRef!.current &&
      !menuRef!.current.contains(event.target) &&
      inputRef!.current &&
      !inputRef!.current.contains(event.target)
    ) {
      setMenuIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handler);

    // Clears the event listeners
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, [input]);

  function clearInput() {
    if (valueRef.current) valueRef.current.value = '';
    setInput('');
    setUserList([]);
  }

  async function getUserList() {
    if (input === '') return;

    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: input }),
      });

      const data = await response.json();
      setUserList(data);
    } catch (error) {
      console.error(error);
    }
  }

  function searchUserHandler(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.value === '') {
      return setUserList([]);
    }
    setInput(event.target.value);
    getUserList();
  }

  return (
    <div className={styles.search}>
      <div className={styles.container}>
        <div className={styles['search-container']} ref={inputRef}>
          <input
            type="text"
            className={styles.searchbar}
            placeholder="Search Pulse"
            onClick={() => setMenuIsOpen(true)}
            onChange={searchUserHandler}
            ref={valueRef}
          />
          <SearchIcon
            className={`${styles['searchbar-icon']} ${
              menuIsOpen ? `${styles['icon-focus']}` : ``
            }`}
          />

          <div
            onClick={clearInput}
            className={`${styles['clear-input']} ${
              input !== '' ? `` : `${styles['input-hidden']}`
            }`}
          >
            <XmarkIcon className={styles['clear-icon']} />
          </div>
        </div>

        <div
          ref={menuRef}
          className={`${styles.result} ${
            !menuIsOpen ? `${styles['menu-hidden']}` : ``
          }`}
        >
          <div className={styles['result-container']}>
            <div className={styles.top}>
              <h2 className={styles.heading}>Result</h2>
              {/* <button className={styles.clear}>Clear all</button> */}
            </div>

            <div className={styles['main-content']}>
              <ExploreList userList={userList} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExploreSearchBar;
