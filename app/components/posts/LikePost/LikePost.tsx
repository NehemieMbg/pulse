'use client';

import { useState, useEffect } from 'react';
import HeartIcon from '../../ui/HeartIcon';

import styles from './LikePost.module.scss';
import Likes from './Likes/Likes';
import { Like, Post } from '@/app/types/posts-type';
import { useGetLikes } from '@/app/hooks/useFetchUserData';
import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';

function LikePost(props: { className: string; postData: Post }) {
  const dispatch = useDispatch();
  const { className, postData } = props;
  const [sectionIsOpen, setSectionIsOpen] = useState(false);
  const [likesData, setLikesData] = useState<Like | null>(null);
  const [likedPost, setLikedPost] = useState(false);

  useGetLikes(postData.id, setLikesData);

  useEffect(() => {
    if (likesData?.likedPost) setLikedPost(true);
    else setLikedPost(false);
  }, [likesData?.likedPost]);

  function openSectionHandler() {
    setSectionIsOpen(true);
  }

  function closeSectionHandler() {
    setSectionIsOpen(false);
  }

  async function handleLike() {
    if (!likedPost) setLikedPost(true);
    if (likedPost) setLikedPost(false);

    try {
      const response = await fetch('/api/posts/[postId]/likes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },

        body: JSON.stringify({
          id: postData.id,
          authorId: postData.author.id,
          username: postData.author.username,
          imageName: postData.imageName,
        }),
      });

      if (!response.ok) {
        setLikedPost(!likedPost);
        throw new Error(await response.text());
      }

      dispatch(setChanges(await response.json()));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className={className}>
      <div className={` ${styles.like}`}>
        <div onClick={handleLike}>
          <HeartIcon
            className={`${styles.icon} ${likedPost ? `${styles.liked}` : ''}`}
          />
        </div>
        <p onClick={openSectionHandler}>{likesData?.likes.length || 0} </p>
      </div>

      <Likes
        sectionIsOpen={sectionIsOpen}
        closeSectionHandler={closeSectionHandler}
        userLikes={likesData?.likes!}
      />
    </div>
  );
}

export default LikePost;
