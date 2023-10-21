import React from 'react';

import styles from './UserPostSkeleton.module.scss';
import PostForm from '../../post/PostForm/PostForm';

function UserPostSkeleton() {
  return (
    <div className={styles['post-container']}>
      <div className={styles.post}>
        <div className={styles.return}>
          <div className={styles['return-container']}>
            <p>return</p>
          </div>
        </div>

        <div className={styles['user-profile-mobile']}>
          <div className={styles['profile-picture']}>
            <div className={styles['no-image']}></div>
            <p className={styles['profile-username']}></p>
          </div>
          <div className={styles.menu}></div>
        </div>

        <div className={styles['image-container']}>
          <div className={styles.image}></div>
        </div>

        <div className={styles.comment}>
          <div className={styles['user-profile']}>
            <div className={styles['profile-picture']}>
              <div className={styles['no-image']}></div>
              <p className={styles['profile-username']}></p>
            </div>
            <div className={styles.menu}></div>
          </div>

          {/* //? Dont forget to add submit hanlder */}
          <div className={styles['aciton-container']}>
            <PostForm />
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserPostSkeleton;
