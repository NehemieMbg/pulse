import MessageNavigation from '../components/message/MessageNavigation/MessageNavigation';
import { isLoggedOut } from '../utils/session/serverSide/session';
import styles from './layout.module.scss';

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await isLoggedOut();

  return (
    <div className={styles.layout}>
      <div className={styles.navigation}>
        <MessageNavigation />
      </div>
      <div className={styles['main-content']}>{children}</div>
    </div>
  );
}
