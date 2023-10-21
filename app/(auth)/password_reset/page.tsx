import { isLoggedIn } from '@/app/utils/session/serverSide/session';
import React from 'react';
import styles from './page.module.scss';
import PasswordReset from '@/app/components/password_reset/PasswordReset/PasswordReset';
import CloseModal from '@/app/components/modal/CloseModal/CloseModal';

async function page() {
  await isLoggedIn();

  return (
    <div className={styles.reset}>
      <div>
        <CloseModal />
        <PasswordReset />
      </div>
    </div>
  );
}

export default page;
