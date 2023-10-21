import NotificationsSkeleton from '@/app/components/skeletons/NotificationSkeleton/NotificationsSkeleton';
import React from 'react';
import styles from './page.module.scss';

function loading() {
  return (
    <section>
      <div className={styles['heading-container']}>
        <h1 className={styles.heading}>Notifications</h1>
      </div>
      <NotificationsSkeleton />
    </section>
  );
}

export default loading;
