import React from 'react';
import AboutUserSkeleton from '../components/skeletons/AboutUserSkeleton/AboutUserSkeleton';
import styles from './loading.module.scss';

export default function Loading() {
  return (
    <div className={styles.profile}>
      <div className={styles.navigation}></div>
      <AboutUserSkeleton />
    </div>
  );
}
