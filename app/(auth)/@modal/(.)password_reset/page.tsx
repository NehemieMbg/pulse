import AuthModal from '@/app/components/modal/AuthModal/AuthModal';
import CloseModal from '@/app/components/modal/CloseModal/CloseModal';
import React from 'react';

import styles from './page.module.scss';
import PasswordReset from '@/app/components/password_reset/PasswordReset/PasswordReset';

function page() {
  return (
    <AuthModal>
      <div className={styles.nav}>
        <CloseModal />
        <h1>PULSE</h1>
      </div>
      <PasswordReset />
    </AuthModal>
  );
}

export default page;
