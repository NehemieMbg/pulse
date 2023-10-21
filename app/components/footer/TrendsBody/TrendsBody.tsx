import { ReactNode } from 'react';
import styles from './TrendsBody.module.scss';

function TrendsBody(props: { title: string; children: ReactNode }) {
  const { title } = props;
  return (
    <div className={styles['trends-container']}>
      <div className={styles['heading-container']}>
        <h1 className={styles.heading}>{title}</h1>
      </div>

      <ul className={styles['trends-list']}>{props.children}</ul>

      {/* <div className={styles['btn-container']}>
        <Link href={''}>Show More</Link>
      </div> */}
    </div>
  );
}

export default TrendsBody;
