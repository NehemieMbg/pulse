import React from 'react';

import styles from './HomeNavigationSkeleton.module.scss';

function HomeNavigationSkeleton() {
  return (
    <div className={styles.navbar}>
      <ul className={styles['post-navigation']}>
        <li className={styles.active}></li>
        <li className={styles.second}></li>
      </ul>
    </div>
  );
}

export default HomeNavigationSkeleton;
