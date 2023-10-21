'use client';

import React, { FormEvent, useState, useRef } from 'react';

import styles from './page.module.scss';
import Link from 'next/link';
import ArrowLongLeft from '@/app/components/ui/ArrowLongLeft';
import useClickOutside from '@/app/hooks/useClickOutside';
import { signOut } from 'next-auth/react';

function Page() {
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [menuIsOpen, setMenuIsOpen] = useState<boolean>(false);

  function openMenu() {
    setMenuIsOpen(true);
  }
  function closeMenu() {
    setMenuIsOpen(false);
  }

  useClickOutside(menuRef, () => setMenuIsOpen(false));

  async function deleteAccount() {
    console.log('hey');

    await fetch('/api/user', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    signOut();
  }

  return (
    <div className={styles.profile}>
      <div className={styles['heading-container']}>
        <Link href={'/settings'}>
          <ArrowLongLeft className={styles.icon} />
        </Link>
        <h1 className={styles.heading}>Deactivate my account</h1>
      </div>

      <div className={styles.message}>
        <p>We are sorry to see you leave. </p>
        <button className={styles.deactivate} onClick={openMenu}>
          {' '}
          Deactivate my account
        </button>
      </div>

      {menuIsOpen && (
        <div className={styles['confirm-container']}>
          <div className={styles.confirm} ref={menuRef}>
            <h2>Are you sure ?</h2>
            <p className={styles.text}>All you data will be deleted.</p>

            <p
              className={styles['confirm-btn-yes']}
              onClick={() => deleteAccount()}
            >
              Yes I want to delete my account
            </p>
            <p className={styles['confirm-btn-no']} onClick={closeMenu}>
              {"No I don't want to delete my account"}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
