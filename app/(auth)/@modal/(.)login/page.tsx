import AuthModal from '@/app/components/modal/AuthModal/AuthModal';
import styles from './page.module.scss';
import CloseModal from '@/app/components/modal/CloseModal/CloseModal';

import SignIn from '@/app/components/singin/SignIn/SignIn';

async function page() {
  return (
    <AuthModal>
      <div className={styles.nav}>
        <CloseModal />
        <h1>PULSE</h1>
      </div>
      <SignIn />
    </AuthModal>
  );
}

export default page;
