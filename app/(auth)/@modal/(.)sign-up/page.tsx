import AuthModal from '@/app/components/modal/AuthModal/AuthModal';
import styles from './page.module.scss';
import CloseModal from '@/app/components/modal/CloseModal/CloseModal';
import SignUpForm from '@/app/components/signup/Form/SignUpForm';
import SignUp from '@/app/components/signup/SignUp/SignUp';

async function page() {
  return (
    <AuthModal>
      <div className={styles.nav}>
        <CloseModal />
        <h1>PULSE</h1>
      </div>
      <SignUp />
    </AuthModal>
  );
}

export default page;
