import React from 'react';

import styles from './page.module.scss';
import NotificationList from '@/app/components/notifications/NotificationList/NotificationList';
import { getUserSession } from '@/app/utils/functions/user';
import { getUser } from '@/app/utils/user-utils';

async function page() {
  const email = await getUserSession();
  const user = await getUser(email as string);

  return (
    <div className={styles.notifications}>
      <div className={styles['heading-container']}>
        <h1 className={styles.heading}>Notifications</h1>
      </div>

      <NotificationList username={user?.username!} />
    </div>
  );
}

export default page;
