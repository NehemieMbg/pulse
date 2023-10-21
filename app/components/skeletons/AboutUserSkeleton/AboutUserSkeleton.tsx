import React from 'react';

import styles from './AboutUserSkeleton.module.scss';

export default function AboutUserSkeleton() {
  return (
    <div className={styles['about-user']}>
      <div className={`${styles['no-image']} ${styles.skeleton}`}></div>

      <div className={styles.info}>
        <div className={styles['fullname-container']}>
          <div className={styles['fullname-subcontainer']}>
            <div className={`${styles.fullname} ${styles.skeleton}`}></div>

            <div className={`${styles.following}`}>
              <p className={styles.skeleton}></p>

              <p className={styles.skeleton}></p>
            </div>
          </div>
        </div>

        <p className={`${styles.bio} ${styles.skeleton}`}></p>

        <div className={`${styles['user-links']} ${styles.skeleton}`}>
          <p></p>
        </div>

        <div className={styles.location}>
          <p></p>
        </div>
      </div>
    </div>
  );
}
