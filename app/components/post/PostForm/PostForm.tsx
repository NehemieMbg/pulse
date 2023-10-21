'use client';

import React, { FormEvent, useState, useRef, useEffect } from 'react';
import styles from './PostForm.module.scss';
import { useParams } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';

function PostForm() {
  const dispatch = useDispatch();
  const params = useParams();
  const { postId } = params;
  const [comment, setComment] = useState<String | null>();
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const adjustHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  useEffect(() => {
    adjustHeight();
  }, []);

  async function HandleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const response = await fetch('/api/posts/[postId]/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId, comment }),
      });

      if (!response.ok) throw new Error(await response.text());
      const data = await response.json();
      dispatch(setChanges(data));
      setComment(null);

      textareaRef.current!.value = '';
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <form action="" onSubmit={HandleSubmit} className={styles.form}>
      <div className={styles['add-comment']}>
        <label htmlFor="comment"></label>
        <textarea
          ref={textareaRef}
          className={styles.input}
          rows={1}
          name="comment"
          placeholder="Add a comment..."
          onChange={(event) => {
            setComment(event.target.value);
            adjustHeight();
          }}
        />
        <button
          className={`${styles.btn} ${
            comment ? `${styles['btn-active']}` : ''
          }`}
          disabled={!comment}
        >
          post
        </button>
      </div>
    </form>
  );
}

export default PostForm;
