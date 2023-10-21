'use client';

import React from 'react';

import styles from './HomePageNavigation.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import {
  setFilterFollowing,
  setFilterForYou,
} from '@/app/store/slices/navigation-slice';

function HomePageNavigation() {
  const dispatch = useDispatch();
  const filter = useSelector(
    (state: { navigation: { filter: 'for_you' | 'following' } }) =>
      state.navigation.filter
  );

  function handleForYou() {
    dispatch(setFilterForYou());
  }

  function handleFollowing() {
    dispatch(setFilterFollowing());
  }

  return (
    <div className={styles.navbar}>
      <ul className={styles['post-navigation']}>
        <li
          className={filter === 'for_you' ? `${styles.active}` : ''}
          onClick={handleForYou}
        >
          For you
        </li>
        <li
          className={filter === 'following' ? `${styles.active}` : ''}
          onClick={handleFollowing}
        >
          Following
        </li>
      </ul>
    </div>
  );
}

export default HomePageNavigation;
