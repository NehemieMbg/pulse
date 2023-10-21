'use client';

import React, { useEffect } from 'react';

import styles from './Comments.module.scss';

import Image from 'next/image';
import XmarkIcon from '@/app/components/ui/XmarkIcon';
import { useSelector, useDispatch } from 'react-redux';
import { closeComments } from '@/app/store/slices/navigation-slice';
import { NavigationType } from '@/app/types/navigation-type';
import UserProfileOne from '@/app/components/User/UserProfile-1/UserProfileOne';

function Comments(props: { className: string }) {
  const { className } = props;
  const dispatch = useDispatch();
  const commentIsOpen = useSelector(
    (state: { navigation: NavigationType }) => state.navigation.commentsIsOpen
  );

  const textarea = document.getElementById('comment');

  function resizeTextarea() {
    textarea!.style.height = 'auto';
    textarea!.style.height = `${textarea?.scrollHeight}px`;
  }

  useEffect(() => {
    textarea?.addEventListener('input', resizeTextarea);
  }, []);

  function submitFormHandler(event: any) {
    event.preventDefault();
  }

  return (
    <div
      className={`${className} ${
        commentIsOpen ? `${styles['comments-container']}` : `${styles.hidden}`
      }`}
    >
      <div className={styles['comments-section__container']}>
        <div
          className={styles['icon-container']}
          onClick={() => dispatch(closeComments())}
        >
          <XmarkIcon className={styles.icon} />
        </div>

        <div className={styles['comment-section']}>
          <div className={styles['user-description']}>
            <UserProfileOne text={'His favourite view'} />
          </div>

          <form onSubmit={submitFormHandler} className={styles.form}>
            <div className={styles['user-new-comment']}>
              <Image
                src={'/user-profile.jpg'}
                alt="user-profile-picture"
                width={100}
                height={100}
                className={styles['profile-picture']}
              />
              <label htmlFor="comment"></label>
              <textarea
                id="comment"
                placeholder="Add a comment..."
                maxLength={280}
              />
            </div>
            <div className={styles['btn-container']}>
              <button>Post</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Comments;
