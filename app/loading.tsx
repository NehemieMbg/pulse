import React from 'react';

import styles from './loading.module.scss';

function loading() {
  return (
    <section className={styles.loading}>
      <h1 className={styles.logo}>PULSE</h1>
    </section>
  );
}

export default loading;
