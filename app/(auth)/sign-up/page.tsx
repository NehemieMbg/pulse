import SignUp from '@/app/components/signup/SignUp/SignUp';
import React from 'react';

import styles from './page.module.scss';
import { isLoggedIn } from '@/app/utils/session/serverSide/session';

async function page() {
  await isLoggedIn();

  return (
    <div className={styles.signup}>
      <SignUp />
    </div>
  );
}

export default page;
