'use client';

import React, { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import DotsVerticalIcon from '../../ui/Dots/DotsVerticalIcon';

import styles from './TrendMenu.module.scss';
import SadIcon from '../../ui/SadIcon';

function TrendMenu() {
  const [menuIsActive, setMenuIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setMenuIsActive(false));

  return (
    <div className={styles['trend-menu']}>
      <div
        className={styles['icon-container']}
        onClick={() => setMenuIsActive(true)}
      >
        <DotsVerticalIcon />
      </div>

      <div
        ref={menuRef}
        className={
          menuIsActive
            ? `${styles['menu-container']}`
            : `${styles['menu-hidden']}`
        }
      >
        <ul className={styles['list']}>
          <li>
            <SadIcon className={styles.icon} /> <p>Not interested</p>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default TrendMenu;
