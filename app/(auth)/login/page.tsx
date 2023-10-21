import React from 'react';
import SignIn from '@/app/components/singin/SignIn/SignIn';

import styles from './page.module.scss';
import { isLoggedIn } from '@/app/utils/session/serverSide/session';

async function page() {
  await isLoggedIn();

  return (
    <div className={styles.login}>
      <SignIn />
    </div>
  );
}

export default page;
