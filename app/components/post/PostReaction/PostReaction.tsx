import React from 'react';

import styles from './PostReaction.module.scss';
import HeartIcon from '../../ui/HeartIcon';

import ShoppingBagIcon from '../../ui/ShoppingBagIcon';
import LikePost from '../../posts/LikePost/LikePost';
import { Post } from '@/app/types/posts-type';
import OutfitPost from '../../posts/OutfitPost/OutfitPost';

function PostReaction(prpos: { postData: Post }) {
  const { postData } = prpos;

  return (
    <div className={styles['icon-container']}>
      <LikePost className={styles.likes} postData={postData} />

      <OutfitPost className={styles.views} postData={postData} />
    </div>
  );
}

export default PostReaction;
