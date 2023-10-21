'use client';

import { useState } from 'react';
import PostLinks from '../PostCard/PostLinks/PostLinks';

import styles from './OutfitPost.module.scss';
import { Post } from '@/app/types/posts-type';
import ShoppingBagIcon from '../../ui/ShoppingBagIcon';

function OutfitPost(props: { className: string; postData: Post }) {
  const { className, postData } = props;
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  return (
    <>
      <div
        className={`${className} ${styles.item}`}
        onClick={() => setMenuIsOpen(true)}
      >
        <ShoppingBagIcon className={styles.icon} />
        <p>Item</p>
      </div>

      <PostLinks
        menuIsOpen={menuIsOpen}
        postData={postData}
        closeMenu={() => setMenuIsOpen(false)}
      />
    </>
  );
}
<div className={styles.item}></div>;
export default OutfitPost;
