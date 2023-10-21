'use client';

import React from 'react';
import XmarkIcon from '../../ui/XmarkIcon';

import styles from './CloseModal.module.scss';
import { useRouter } from 'next/navigation';

function CloseModal() {
  const router = useRouter();

  function returnHomeHandler() {
    router.push('/');
  }

  return (
    <div className={styles['icon-container']} onClick={returnHomeHandler}>
      <XmarkIcon className={styles.icon} />
    </div>
  );
}

export default CloseModal;
