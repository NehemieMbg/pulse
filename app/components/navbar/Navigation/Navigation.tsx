'use client';

import Link from 'next/link';
import HomeFillIcon from '@/app/components/ui/HomeFillIcon';
import { usePathname } from 'next/navigation';

import SearchIcon from '@/app/components/ui/SearchIcon';
import AirplainIcon from '@/app/components/ui/AirplainIcon';
import PlusCircleIcon from '@/app/components/ui/PlusCircleIcon';
import BellIcon from '@/app/components/ui/BellIcon';

import styles from './Navigation.module.scss';
import ProfileIcon from '../../ui/ProfileIcon';
import HomeIcon from '../../ui/HomeIcon';
import SearchIconFill from '../../ui/SearchIconFill';
import AirPlainIconFill from '../../ui/AirPlainIconFill';
import BellIconFill from '../../ui/BellIconFill';
import { User } from '@/app/types/user-type';
import { useEffect, useState } from 'react';
import { useGetUser } from '@/app/hooks/useFetchUserData';
import { useDispatch, useSelector } from 'react-redux';
import { openNewPost } from '@/app/store/slices/navigation-slice';
import { pusherClient } from '@/app/lib/pusher';
import { setNotification } from '@/app/store/slices/notification-slice';

function Navigation(props: { closeNavigation: () => void }) {
  const dispatch = useDispatch();
  const { closeNavigation } = props;
  const notification = useSelector(
    (state: { notifications: { newNotification: boolean } }) =>
      state.notifications.newNotification
  );

  // fetch the data from the user which is connected
  const [userData, setUserData] = useState<User>();
  useGetUser(setUserData);
  const pathname = usePathname();

  console.log(userData);

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
    <>
      <ul className={styles.navigation}>
        <li className={styles.home}>
          <Link href={'/home'} className={styles.active}>
            {pathname !== '/home' ? (
              <HomeIcon className={styles.icon} />
            ) : (
              <HomeFillIcon className={`${styles.icon}`} />
            )}
            <p>Home</p>
          </Link>
        </li>

        <li className={styles.search}>
          <Link href={'/explore'}>
            {pathname === '/explore' ? (
              <SearchIconFill className={`${styles.icon}`} />
            ) : (
              <SearchIcon className={`${styles.icon}`} />
            )}
            <p>Explore</p>
          </Link>
        </li>

        {/* <li className={styles.message}>
          <Link href={'/message'}>
            {pathname !== '/message' ? (
              <AirplainIcon className={`${styles.icon}`} />
            ) : (
              <AirPlainIconFill className={`${styles.icon}`} />
            )}
            <p>Message</p>
          </Link>
        </li> */}

        <li className={styles.create}>
          <div
            onClick={() => {
              closeNavigation();
              dispatch(openNewPost());
            }}
          >
            <PlusCircleIcon className={`${styles.icon}`} />
            <p className={styles['create-text']}>Create</p>
          </div>
        </li>

        <li className={styles.notification}>
          <Link href={'/notifications'}>
            {pathname !== '/notifications' ? (
              <div className={styles['notif-container']}>
                <div
                  className={`${styles.notif} 
                  ${notification ? `${styles['notif-active']}` : ''}
                  `}
                ></div>
                <BellIcon className={`${styles.icon}`} />
              </div>
            ) : (
              <BellIconFill className={`${styles.icon}`} />
            )}
            <p>Notification</p>
          </Link>
        </li>

        <li className={styles.profile}>
          <Link
            href={`/${userData?.username!}`}
            onClick={() => closeNavigation()}
          >
            <ProfileIcon className={`${styles.icon}`} />
            <p>My Profile</p>
          </Link>
        </li>
      </ul>
    </>
  );
}

export default Navigation;
