'use client';

import React, { useRef, useState } from 'react';
import Logo from '../logo/Logo';
import useClickOutside from '../../hooks/useClickOutside';

import styles from './Navbar.module.scss';

import { useEffect } from 'react';
import { NavigationType } from '@/app/types/navigation-type';
import UserCard from './UserCard/UserCard';
import Navigation from './Navigation/Navigation';
import More from './More/More';
import { useSelector, useDispatch } from 'react-redux';
import {
  closeNavigation,
  closeBackdrop,
} from '@/app/store/slices/navigation-slice';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  let accessNav = false;
  const pathname = usePathname();

  const dispatch = useDispatch();
  const menuRef = useRef<HTMLDivElement | null>(null);

  const navigationIsOpen = useSelector(
    (state: { navigation: NavigationType }) => state.navigation.navigationIsOpen
  );

  useClickOutside(menuRef, () => dispatch(closeNavigation()));

  if (
    pathname !== '/' &&
    pathname !== '/login' &&
    pathname !== '/sign-up' &&
    pathname !== '/password_reset'
  )
    accessNav = true;

  useEffect(() => {
    if (navigationIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [navigationIsOpen]);

  function closeNavigationHandler() {
    dispatch(closeNavigation());
    dispatch(closeBackdrop());
  }

  return (
    accessNav && (
      <nav
        ref={menuRef}
        className={`${styles.navbar} ${
          !navigationIsOpen ? `${styles.hidden}` : ''
        } `}
      >
        <div className={styles['logo-container']}>
          <Logo />
        </div>

        <div className={styles.menu}>
          <div>
            <UserCard closeNavigation={() => closeNavigationHandler()} />

            <div className={styles['navigation-container']}>
              <Navigation closeNavigation={() => closeNavigationHandler()} />
            </div>
          </div>
          <More closeNavigation={() => closeNavigationHandler()} />
        </div>
      </nav>
    )
  );
}
