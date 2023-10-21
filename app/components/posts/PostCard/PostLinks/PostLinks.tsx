import React, { useRef, useEffect } from 'react';

import useClickOutside from '@/app/hooks/useClickOutside';
import styles from './PostLinks.module.scss';
import CloseComponent from '@/app/components/ui/CloseComponent/CloseComponent';
import Image from 'next/image';
import { Post, PostLink } from '@/app/types/posts-type';
import ArrowUpRightIcon from '@/app/components/ui/ArrowUpRightIcon';

function PostLinks(props: {
  postData: Post;
  menuIsOpen: boolean;
  closeMenu: () => void;
}) {
  const { menuIsOpen, closeMenu, postData } = props;
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (menuIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [menuIsOpen]);

  useClickOutside(menuRef, () => closeMenu());

  const username = postData.author.username;

  return (
    <div
      className={
        menuIsOpen
          ? `${styles['outfit-links-container']}`
          : `${styles['outfit-hidden']}`
      }
    >
      <div className={styles['outfit-link']} ref={menuRef}>
        <div className={styles['top-container']}>
          <CloseComponent closeSection={() => closeMenu()} />
          {username && (
            <p>
              <span>@{username}</span> outfit items
            </p>
          )}
        </div>

        <ul className={styles['outfit-list']}>
          {postData?.items?.map((item: PostLink, idx: number) => (
            <li className={styles.outfit} key={idx}>
              <a href={item.itemLink!} target="_blank">
                <div className={styles.text}>
                  <h2 className={styles['heading-item']}>{item.itemName}</h2>
                  <ArrowUpRightIcon className={styles.icon} />
                </div>
              </a>
            </li>
          ))}
        </ul>

        {postData.items?.length === 0 && (
          <div className={styles['no-item-container']}>
            <h2 className={styles.noitem}>0 item available</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default PostLinks;
