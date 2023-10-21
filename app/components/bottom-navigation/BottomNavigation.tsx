'use client';

import React, { useEffect, useState } from 'react';

import styles from './BottomeNavigation.module.scss';
import Link from 'next/link';
import HomeIcon from '../ui/HomeIcon';
import SearchIcon from '../ui/SearchIcon';
import AirplainIcon from '../ui/AirplainIcon';
import BellIcon from '../ui/BellIcon';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { usePathname } from 'next/navigation';
import {
  openNavigation,
  openBackdrop,
} from '@/app/store/slices/navigation-slice';
import { useGetUser } from '@/app/hooks/useFetchUserData';
import { User } from '@/app/types/user-type';
import { setNotification } from '@/app/store/slices/notification-slice';
import { pusherClient } from '@/app/lib/pusher';

function BottomNavigation() {
  let accessNav = false;
  const pathname = usePathname();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<User | null>();
  useGetUser(setUserData);

  if (
    pathname !== '/' &&
    pathname !== '/login' &&
    pathname !== '/sign-up' &&
    pathname !== '/password_reset'
  )
    accessNav = true;

  useEffect(() => {
    if (userData?.openedNotifications) dispatch(setNotification());

    if (!userData?.username) return;
    // Subscribe to the user's notification channel
    const channel = pusherClient.subscribe(userData?.username as string);

    // Hanlde incoming notifications
    // Bind to the notification event
    channel.bind('notification:new', () => dispatch(setNotification()));

    // Cleanup: Unsubscribe and unbind
    return () => {
      channel.unbind('notification:new', () => dispatch(setNotification()));
      pusherClient.unsubscribe('nehemie');
    };
  }, [userData?.username, dispatch, userData?.openedNotifications]);

  return (
    accessNav && (
      <div className={styles.navigation}>
        <ul className={styles.list}>
          <li>
            <Link href={'/home'}>
              <HomeIcon className={styles.icon} />
            </Link>
          </li>
          <li>
            <Link href={'/explore'}>
              <SearchIcon className={styles.icon} />
            </Link>
          </li>
          {/* <li>
            <Link href={'/message'}>
              <AirplainIcon className={styles.icon} />
            </Link>
          </li> */}
          <li>
            <Link href={'/notifications'}>
              <BellIcon className={styles.icon} />
            </Link>
          </li>
          <li
            onClick={() => {
              dispatch(openNavigation());
              dispatch(openBackdrop());
            }}
          >
            <Image
              src={'/user-profile.jpg'}
              width={100}
              height={100}
              alt="user profile"
              className={styles['user-profile-picture']}
            />
          </li>
        </ul>
      </div>
    )
  );
}

export default BottomNavigation;
