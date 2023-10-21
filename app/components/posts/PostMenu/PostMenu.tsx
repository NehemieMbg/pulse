'use client';

import { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';

import DotsVerticalIcon from '../../ui/Dots/DotsVerticalIcon';
import UserPlusIcon from '../../ui/UserPlusIcon';
import BlockIcon from '../../ui/BlockIcon';
import FlagIcon from '../../ui/FlagIcon';

import styles from './PostMenu.module.scss';

function PostMenu(props: { username: string }) {
  const { username } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  function openMenu() {
    setMenuIsOpen(true);
  }

  useClickOutside(menuRef, () => setMenuIsOpen(false));

  return (
    <div className={styles['menu-container']}>
      <div className={`${styles.menu}`} onClick={openMenu}>
        <DotsVerticalIcon />
      </div>

      <div
        ref={menuRef}
        className={`${styles['menu-action']} ${
          !menuIsOpen ? `${styles['navigation-hidden']}` : ''
        }`}
      >
        <div>
          <UserPlusIcon className={styles.icon} />
          <p>Follow @{username}</p>
        </div>

        {/* <div>
          <BlockIcon className={styles.icon} />
          <p>Block {'@sarah_ill'}</p>
        </div>

        <div>
          <FlagIcon className={styles.icon} />
          <p>Report post</p>
        </div> */}
      </div>
    </div>
  );
}

export default PostMenu;
