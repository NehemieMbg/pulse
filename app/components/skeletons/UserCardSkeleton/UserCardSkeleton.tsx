import React from 'react';

import styles from './UserCardSkeleton.module.scss';

function UserCardSkeleton() {
  return (
    <div className={styles['user-profile']}>
      <div className={styles.container}>
        <div className={styles['my-profile-container']}>
          <div className={styles['no-image']}></div>

          <div className={styles['user-profile-text']}>
            <h3 className={styles.name}></h3>

            <h4 className={styles.username}></h4>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserCardSkeleton;
