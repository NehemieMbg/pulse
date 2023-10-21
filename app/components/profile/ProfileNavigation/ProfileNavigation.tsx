import React from 'react';

import Link from 'next/link';
import ArrowLongLeft from '../../ui/ArrowLongLeft';

import styles from './ProfileNavigation.module.scss';

function ProfileNavigation() {
  return (
    <Link href={'/'} className={styles.navigation}>
      <ArrowLongLeft className={styles['icon-navigation']} />
      <p>back to home</p>
    </Link>
  );
}

export default ProfileNavigation;
