'use client';

import React, { useRef } from 'react';
import styles from './AuthModal.module.scss';
import { useRouter, usePathname } from 'next/navigation';
import useClickOutside from '@/app/hooks/useClickOutside';

function AuthModal(props: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const menuRef = useRef<HTMLDivElement | null>(null);

  function returnHomeHandler() {
    router.push('/');
  }

  useClickOutside(menuRef, () => returnHomeHandler());

  return (
    pathname !== '/' && (
      <div className={styles.modal}>
        <div className={styles['modal-container']} ref={menuRef}>
          {props.children}
        </div>
      </div>
    )
  );
}

export default AuthModal;
