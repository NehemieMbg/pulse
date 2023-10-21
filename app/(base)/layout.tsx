import Footer from '@/app/components/footer/Footer';
import styles from './base.module.scss';
import { isLoggedOut } from '../utils/session/serverSide/session';

export default async function BaseLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  await isLoggedOut();

  return (
    <div className={styles.base}>
      <div className={styles['main-content']}>{children}</div>
      <div className={styles['secondary-content']}>
        <Footer />
      </div>
    </div>
  );
}
