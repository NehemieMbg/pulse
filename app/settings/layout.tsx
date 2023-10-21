import styles from './layout.module.scss';
import { isLoggedOut } from '../utils/session/serverSide/session';

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await isLoggedOut();

  return (
    <div className={styles.base}>
      <div className={styles.main}>{children}</div>
    </div>
  );
}
