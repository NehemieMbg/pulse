'use client';

import React, { useState } from 'react';

import styles from './MessageNavigation.module.scss';
import WriteIcon from '../../ui/WriteIcon';
import NewMessage from '../NewMessage/NewMessage';

function MessageNavigation() {
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <div className={styles.navigation}>
      <div className={styles.nav}>
        <h2 className={styles.heading}>Messages</h2>
        <div
          className={styles['icon-container']}
          onClick={() => setMenuIsOpen(true)}
        >
          <WriteIcon className={styles.icon} />
        </div>
      </div>
      <NewMessage
        menuIsOpen={menuIsOpen}
        closeMenu={() => setMenuIsOpen(false)}
      />
    </div>
  );
}

export default MessageNavigation;
