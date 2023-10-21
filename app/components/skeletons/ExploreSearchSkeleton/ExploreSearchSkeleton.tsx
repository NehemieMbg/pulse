import React from 'react';

import styles from './ExploreSearchSkeleton.module.scss';

function ExploreSearchSkeleton() {
  return (
    <div className={styles.search}>
      <div className={styles.container}>
        <div className={styles['search-container']}>
          <div className={styles.input}></div>
        </div>
      </div>
    </div>
  );
}

export default ExploreSearchSkeleton;
