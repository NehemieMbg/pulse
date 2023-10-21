'use client';

import React from 'react';
import XmarkIcon from '../XmarkIcon';

import styles from './CloseComponent.module.scss';

function CloseComponent(props: { closeSection: () => void }) {
  const { closeSection } = props;

  return (
    <div
      className={styles['icon-container']}
      onClick={() => {
        closeSection();
      }}
    >
      <XmarkIcon className={styles.icon} />
    </div>
  );
}

export default CloseComponent;
