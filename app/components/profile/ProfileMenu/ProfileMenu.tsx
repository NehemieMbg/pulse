'use client';

import React, { useState, useRef } from 'react';
import DotsVerticalIcon from '../../ui/Dots/DotsVerticalIcon';

import styles from './ProfileMenu.module.scss';
import useClickOutside from '@/app/hooks/useClickOutside';
import BlockIcon from '../../ui/BlockIcon';
import FlagIcon from '../../ui/FlagIcon';
import { Profile, UserProfile } from '@/app/types/user-type';

import Link from 'next/link';

function ProfileMenu(props: { userData: UserProfile }) {
  const { userData } = props;

  const [menuIsActive, setMenuIsActive] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useClickOutside(menuRef, () => setMenuIsActive(false));

  return (
    userData?.isUser && (
      <div className={styles['profile']}>
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
            {!userData.isUser ? (
              <>
                <li>
                  <BlockIcon className={styles.icon} />
                  <p>
                    Block <span>{' @karry'}</span>
                  </p>
                </li>
                <li>
                  <FlagIcon className={styles.icon} />
                  <p>
                    Report <span>{' @karry'}</span>
                  </p>
                </li>{' '}
              </>
            ) : (
              <li>
                <Link href={'/settings/account/my-profile'}>
                  <p>Edit my profile</p>
                </Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    )
  );
}

export default ProfileMenu;
