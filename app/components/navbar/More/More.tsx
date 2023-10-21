'use client';

import Link from 'next/link';

import { useState, useRef } from 'react';
import useClickOutside from '@/app/hooks/useClickOutside';
import { signOut } from 'next-auth/react';

import styles from './More.module.scss';
import MenuIcon from '../../ui/MenuIcon';
import SettingsIcon from '../../ui/SettingsIcon';
import ClockIcon from '../../ui/ClockIcon';

import LogoutIcon from '../../ui/LogoutIcon';

function More(props: { closeNavigation: () => void }) {
  const { closeNavigation } = props;

  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  function openMenu() {
    setMenuIsOpen(true);
  }

  useClickOutside(menuRef, () => setMenuIsOpen(false));

  return (
    <div>
      <div
        ref={menuRef}
        id="more-menu"
        className={`${styles['more-container']} ${
          !menuIsOpen ? `${styles['navigation-hidden']}` : ''
        }`}
      >
        <ul className={styles.navigation}>
          <li
            onClick={() => {
              setMenuIsOpen(false);
              closeNavigation();
            }}
          >
            <Link href={'/settings'}>
              <SettingsIcon className={styles.icon} />
              <p>Settings</p>
            </Link>
          </li>
          {/* <li
            onClick={() => {
              setMenuIsOpen(false);
              closeNavigation();
            }}
          >
            <Link href={''}>
              <ClockIcon className={styles.icon} />
              <p>Your activity</p>
            </Link>
          </li> */}
          {/* <li
            onClick={() => {
              setMenuIsOpen(false);
              closeNavigation();
            }}
          >
            <Link href={''}>
              <BookmarkIcon className={styles.icon} />
              <p>Saved</p>
            </Link>
          </li> */}
          {/* <li
            onClick={() => {
              setMenuIsOpen(false);
              closeNavigation();
            }}
          >
            <Link href={''}>
              <FlagIcon className={styles.icon} />
              <p>Report a problem</p>
            </Link>
          </li> */}

          <li className={styles['logout-btn-container']}>
            <button onClick={() => signOut()}>
              <LogoutIcon className={styles.icon} /> <p>Log out</p>
            </button>
          </li>
        </ul>
      </div>

      <div className={styles.more} onClick={openMenu}>
        <MenuIcon className={styles.icon} />
        <p>More</p>
      </div>
    </div>
  );
}

export default More;
