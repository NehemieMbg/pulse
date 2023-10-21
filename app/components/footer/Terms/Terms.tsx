import React from 'react';
import styles from './Terms.module.scss';

function Terms() {
  const currYear = new Date().getFullYear();

  return (
    <div className={styles.terms}>
      <ul className={styles['terms-list']}>
        <li>Terms of service</li>&middot;
        <li>Privacy policy</li>&middot;
        <li>Cookie policy</li>&middot;
        <li>Accessibility</li>&middot;
        <li>&copy; {currYear} Pulse</li>
      </ul>
    </div>
  );
}

export default Terms;
