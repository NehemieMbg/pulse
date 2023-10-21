'use client';

import { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import ArrowUpTrayIcon from '../../ui/ArrowUpTrayIcon';
import AirplainIcon from '../../ui/AirplainIcon';
import BookmarkIcon from '../../ui/BookmarkIcon';
import LinkIcon from '../../ui/LinkIcon';

import styles from './ReactionMenu.module.scss';

function ReactionMenu(props: { className: string }) {
  const { className } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  function opentMenu() {
    setMenuIsOpen(true);
  }

  useClickOutside(menuRef, () => setMenuIsOpen(false));

  return (
    <div className={styles['menu-container']}>
      <div className={`${className} ${styles.menu}`} onClick={opentMenu}>
        <ArrowUpTrayIcon className={styles.icon} />
      </div>

      <div
        ref={menuRef}
        className={`${styles['menu-action']} ${
          !menuIsOpen ? `${styles['navigation-hidden']}` : ''
        }`}
      >
        <div>
          <LinkIcon className={styles.icon} />
          <p>Copy link</p>
        </div>

        <div>
          <AirplainIcon className={styles.icon} />
          <p>Send via Direct Message</p>
        </div>

        <div>
          <BookmarkIcon className={styles.icon} />
          <p>Bookmard</p>
        </div>
      </div>
    </div>
  );
}

export default ReactionMenu;
