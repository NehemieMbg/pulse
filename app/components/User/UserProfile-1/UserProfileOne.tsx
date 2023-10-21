import Image from 'next/image';
import BadgeCheckIcon from '../../ui/CheckMark/BadgeCheckIcon';

import styles from './UserProfileOne.module.scss';

function UserProfileOne(props: { text: string }) {
  const { text } = props;
  return (
    <div className={styles['top-card']}>
      <Image
        src={'/user-profile.jpg'}
        alt="user-profile-picture"
        width={100}
        height={100}
        className={styles['profile-picture']}
      />

      <div className={styles['profile-info-container']}>
        <div className={styles['profile-info']}>
          <div className={styles.name}>
            <h2 className={styles.fullname}>Sarah Illonei</h2>
            <BadgeCheckIcon />
            <p className={styles.username}>@sarah_ill</p>
            <p className={styles['posted-time']}>· Few minutes ago</p>
          </div>
        </div>
        <p className={styles['user-description']}>{text}</p>
      </div>
    </div>
  );
}

export default UserProfileOne;
