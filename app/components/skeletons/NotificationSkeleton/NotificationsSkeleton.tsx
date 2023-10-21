import React from 'react';

import styles from './NotificationsSkeleton.module.scss';

function NotificationsSkeleton() {
  return (
    <>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
      <div className={styles.notification}>
        <div className={styles.container}>
          <div className={styles['no-image']}></div>

          <p className={styles.username}></p>
          <div className={styles.time}></div>
        </div>
      </div>
    </>
  );
}

export default NotificationsSkeleton;
