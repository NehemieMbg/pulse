import React from 'react';

import styles from './PostCardSkeleton.module.scss';

function PostCardSkeleton() {
  return (
    <>
      <div className={styles.post}>
        <div className={styles['post-card']}>
          <div className={styles['top-card-container']}>
            <div className={styles['top-card']}>
              <div className={styles['no-image']}></div>

              <div className={styles['profile-info-container']}>
                <div className={styles['profile-info']}>
                  <div className={styles.name}>
                    <h2 className={styles.fullname}></h2>
                    <p className={styles.username}></p>
                  </div>
                </div>
                <p className={styles['posted-time']}></p>
              </div>
            </div>
          </div>

          <div className={styles['main-picture']} />

          <div className={styles['bottom-card']}>
            <div className={styles['user-bio']}>
              <p className={styles['user-bio-text']}></p>
              <p className={styles['user-bio-text']}></p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles['post-card']}>
          <div className={styles['top-card-container']}>
            <div className={styles['top-card']}>
              <div className={styles['no-image']}></div>

              <div className={styles['profile-info-container']}>
                <div className={styles['profile-info']}>
                  <div className={styles.name}>
                    <h2 className={styles.fullname}></h2>
                    <p className={styles.username}></p>
                  </div>
                </div>
                <p className={styles['posted-time']}></p>
              </div>
            </div>
          </div>

          <div className={styles['main-picture']} />

          <div className={styles['bottom-card']}>
            <div className={styles['user-bio']}>
              <p className={styles['user-bio-text']}></p>
              <p className={styles['user-bio-text']}></p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles['post-card']}>
          <div className={styles['top-card-container']}>
            <div className={styles['top-card']}>
              <div className={styles['no-image']}></div>

              <div className={styles['profile-info-container']}>
                <div className={styles['profile-info']}>
                  <div className={styles.name}>
                    <h2 className={styles.fullname}></h2>
                    <p className={styles.username}></p>
                  </div>
                </div>
                <p className={styles['posted-time']}></p>
              </div>
            </div>
          </div>

          <div className={styles['main-picture']} />

          <div className={styles['bottom-card']}>
            <div className={styles['user-bio']}>
              <p className={styles['user-bio-text']}></p>
              <p className={styles['user-bio-text']}></p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.post}>
        <div className={styles['post-card']}>
          <div className={styles['top-card-container']}>
            <div className={styles['top-card']}>
              <div className={styles['no-image']}></div>

              <div className={styles['profile-info-container']}>
                <div className={styles['profile-info']}>
                  <div className={styles.name}>
                    <h2 className={styles.fullname}></h2>
                    <p className={styles.username}></p>
                  </div>
                </div>
                <p className={styles['posted-time']}></p>
              </div>
            </div>
          </div>

          <div className={styles['main-picture']} />

          <div className={styles['bottom-card']}>
            <div className={styles['user-bio']}>
              <p className={styles['user-bio-text']}></p>
              <p className={styles['user-bio-text']}></p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default PostCardSkeleton;
