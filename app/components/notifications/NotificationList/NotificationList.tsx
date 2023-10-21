'use client';

import React, { useEffect, useState } from 'react';

import styles from './NotificationList.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { pusherClient } from '@/app/lib/pusher';
import { find } from 'lodash';
import { Notification } from '@/app/types/notifications-type';
import { postTimeConverter } from '@/app/utils/functions/post-time';
import { useGetNotifications } from '@/app/hooks/useFetchUserData';
import NotificationsSkeleton from '../../skeletons/NotificationSkeleton/NotificationsSkeleton';
import {
  closeNotification,
  setNotification,
} from '@/app/store/slices/notification-slice';
import { useDispatch } from 'react-redux';

function NotificationList(props: { username: string }) {
  const { username } = props;
  const dispatch = useDispatch();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  useGetNotifications(setNotifications);

  useEffect(() => {
    dispatch(closeNotification());
  }, [dispatch]);

  useEffect(() => {
    // Subscribe to the user's notification channel
    const channel = pusherClient.subscribe(username as string);

    // Hanlde incoming notifications
    const notificationHandler = (notification: Notification) => {
      dispatch(setNotification());
      setNotifications((current) => {
        const existing = current.find((item) => item.id === notification.id);
        if (existing) {
          return current;
        }

        return [notification, ...current];
      });
    };

    // Bind to the notification event
    channel.bind('notification:new', notificationHandler);

    // Cleanup: Unsubscribe and unbind
    return () => {
      channel.unbind('notification:new', notificationHandler);
      pusherClient.unsubscribe('nehemie');
    };
  }, [username, dispatch]);

  return (
    <>
      {notifications.length > 0 ? (
        <ul className={styles['notifications-list']}>
          {notifications.map((notification, idx) => (
            <li className={styles.notification} key={idx}>
              <Link href={notification.link}>
                <div className={styles.container}>
                  {notification.user.image ? (
                    <Image
                      src={notification.user.image}
                      alt="profile picture"
                      width={100}
                      height={200}
                      className={styles.image}
                    />
                  ) : (
                    <div className={styles['no-image']}></div>
                  )}
                  <p>
                    <span>@{notification.senderName}</span>{' '}
                    {notification.message}{' '}
                  </p>
                </div>
                <p className={styles.time}>
                  {postTimeConverter(String(notification.timestamp))}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <NotificationsSkeleton />
      )}
    </>
  );
}

export default NotificationList;
