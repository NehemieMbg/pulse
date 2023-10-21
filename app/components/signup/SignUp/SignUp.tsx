import React from 'react';
import SignUpForm from '../Form/SignUpForm';

import styles from './SignUp.module.scss';

function SignUp() {
  return (
    <div className={styles.signup}>
      <SignUpForm />
    </div>
  );
}

export default SignUp;
