'use client';

import ChatIcon from '../../ui/ChatIcon';

import styles from './CommentPost.module.scss';
import { Post } from '@/app/types/posts-type';
import Link from 'next/link';

function CommentPost(props: { className: string; postData: Post }) {
  const { className, postData } = props;

  return (
    <div className={styles['comments-container']}>
      <Link
        href={`/post/${postData.id}`}
        className={`${className} ${styles['comment-icon']}`}
      >
        <ChatIcon className={styles.icon} />
        <p>{postData.comments?.length}</p>
      </Link>
    </div>
  );
}

export default CommentPost;
