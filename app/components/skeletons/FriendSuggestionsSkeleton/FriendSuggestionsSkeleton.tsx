import React from 'react';

import styles from './FriendSuggestion.module.scss';

export default function FriendSuggestionsSkeleton() {
  return (
    <>
      <div className={styles['suggestion-container']}>
        <div className={styles.suggestion}>
          <div className={styles['suggestion-text']}>
            <div className={styles.user}>
              <div className={styles['no-image']}></div>

              <div className={styles['text-container']}>
                <h2 className={styles.name}></h2>

                <p className={styles.username}></p>
              </div>
            </div>
          </div>

          <button className={styles.btn}></button>
        </div>
      </div>
      <div className={styles['suggestion-container']}>
        <div className={styles.suggestion}>
          <div className={styles['suggestion-text']}>
            <div className={styles.user}>
              <div className={styles['no-image']}></div>

              <div className={styles['text-container']}>
                <h2 className={styles.name}></h2>

                <p className={styles.username}></p>
              </div>
            </div>
          </div>

          <button className={styles.btn}></button>
        </div>
      </div>
      <div className={styles['suggestion-container']}>
        <div className={styles.suggestion}>
          <div className={styles['suggestion-text']}>
            <div className={styles.user}>
              <div className={styles['no-image']}></div>

              <div className={styles['text-container']}>
                <h2 className={styles.name}></h2>

                <p className={styles.username}></p>
              </div>
            </div>
          </div>

          <button className={styles.btn}></button>
        </div>
      </div>
      <div className={styles['suggestion-container']}>
        <div className={styles.suggestion}>
          <div className={styles['suggestion-text']}>
            <div className={styles.user}>
              <div className={styles['no-image']}></div>

              <div className={styles['text-container']}>
                <h2 className={styles.name}></h2>

                <p className={styles.username}></p>
              </div>
            </div>
          </div>

          <button className={styles.btn}></button>
        </div>
      </div>
      <div className={styles['suggestion-container']}>
        <div className={styles.suggestion}>
          <div className={styles['suggestion-text']}>
            <div className={styles.user}>
              <div className={styles['no-image']}></div>

              <div className={styles['text-container']}>
                <h2 className={styles.name}></h2>

                <p className={styles.username}></p>
              </div>
            </div>
          </div>

          <button className={styles.btn}></button>
        </div>
      </div>
    </>
  );
}
