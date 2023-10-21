'use client'; // Error components must be Client Components

import { useRouter } from 'next/navigation';

import styles from './error.module.scss';

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  const router = useRouter();

  return (
    <div className={styles.error}>
      <h1>Sorry this page is not available</h1>
      <button className={styles.return} onClick={() => router.push('/home')}>
        return home
      </button>
    </div>
  );
}
