import Link from 'next/link';

import styles from './Logo.module.scss';

export default function Logo() {
  return (
    <h1 className={styles.logo}>
      <Link href={'/'}>PULSE</Link>
    </h1>
  );
}
