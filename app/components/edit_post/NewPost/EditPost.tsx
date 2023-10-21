'use client';

import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
  SetStateAction,
  Dispatch,
} from 'react';

import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';
import useClickOutside from '@/app/hooks/useClickOutside';
import ArrowLongLeft from '../../ui/ArrowLongLeft';
import Image from 'next/image';
import PlusCircleIcon from '../../ui/PlusCircleIcon';
import TrashIcon from '../../ui/TrashIcon';

import CircularIndeterminate from '../../ui/CircularInterminate';
import { Post, PostLink as UserPostLink } from '@/app/types/posts-type';

import styles from './EditPost.module.scss';

enum PostLink {
  ENTER_STATE = 'ENTER_STATE',
  DISPLAY_STATE = 'DISPLAY_STATE',
}

export default function EditPost(props: {
  editIsOpen: boolean;
  setEditIsOpen: Dispatch<SetStateAction<boolean>>;
  postData: Post;
}) {
  const { editIsOpen, setEditIsOpen, postData: post } = props;
  const dispatch = useDispatch();

  // ? Open and closes the post section
  const menuRef = useRef<HTMLDivElement | null>(null);
  const captionRef = useRef<HTMLTextAreaElement | null>(null);
  useClickOutside(menuRef, () => setEditIsOpen(false));

  const [loading, setLoading] = useState(false);
  const [postLinkStep, setPostLinkStep] = useState(PostLink.ENTER_STATE);
  const [postLink, setPostLink] = useState<UserPostLink>({
    itemName: '',
    itemLink: '',
  });

  const [postData, setPostData] = useState({
    caption: '',
    postLinks: [] as UserPostLink[],
  });

  useEffect(() => {
    setPostData({ caption: post.caption, postLinks: post.items });

    if (captionRef.current) captionRef.current.value = post.caption;
    if (editIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [editIsOpen, post.caption, post.items]);

  function handleBtnSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!postLink.itemName || !postLink.itemLink) return;
    if (postData.postLinks.length > 5) return;

    const linkArray = postData.postLinks;
    linkArray.push(postLink);

    setPostData({ ...postData, postLinks: linkArray });
    setPostLinkStep(PostLink.DISPLAY_STATE);
  }

  function handleNewInputBtn() {
    if (postLinkStep !== PostLink.DISPLAY_STATE) return;
    setPostLinkStep(PostLink.ENTER_STATE);
  }

  function handleRemoveItem(index: number) {
    const updatedArr = postData.postLinks.filter(
      (item, itemIndex) => itemIndex !== index
    );
    setPostData({ ...postData, postLinks: updatedArr });
  }

  function handleItemMessage() {
    const itemCount = postData.postLinks.length;

    if (itemCount === 0)
      return `You haven't shared any outfits yet! You can post up to 5.`;
    else if (itemCount > 0 && itemCount < 5)
      return `You've shared ${itemCount} out of 5 outfits items!`;
    else if (itemCount === 5) return `You've maxed out! 5 of 5 items shared.`;
  }

  function handleCancelBtn() {
    setPostLinkStep(PostLink.DISPLAY_STATE);
  }

  async function handleSubmition() {
    setLoading(true);

    try {
      const response = await fetch(`/api/posts/${post.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(postData),
      });

      if (!response.ok) {
        setLoading(false);
        throw new Error(await response.text());
      }

      dispatch(setChanges(await response.json()));
      setEditIsOpen(false);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    editIsOpen && (
      <div className={styles['new-post']}>
        <div
          ref={menuRef}
          className={`${styles.container}  ${styles['container-2']}
        }`}
        >
          <div className={styles.nav}>
            <div
              className={styles['return-container']}
              onClick={() => setEditIsOpen(false)}
            >
              <ArrowLongLeft className={styles['return-icon']} />
            </div>

            <h1 className={styles.heading}>Edit your post</h1>

            <div className={styles.next}>
              <button
                disabled={loading}
                className={styles.share}
                onClick={handleSubmition}
              >
                Confirm
              </button>
              {loading && <CircularIndeterminate className={styles.loading} />}
            </div>
          </div>

          <div className={styles['post-container']}>
            <div className={styles['post-picture']}>
              <div className={styles['image-container']}>
                <Image
                  src={post.imageUrl}
                  alt={'Selected File'}
                  width={800}
                  height={800}
                  className={styles.image}
                />
              </div>
            </div>
            <div className={styles['post-data']}>
              <div className={styles.user}>
                <Image
                  src={'/user-profile-2.jpg'}
                  alt="profile picture"
                  height={100}
                  width={100}
                  className={styles['profile-picture']}
                />
                {post.author.username && <p>@{post.author.username}</p>}
              </div>

              <form
                action=""
                className={styles.from}
                onSubmit={handleBtnSubmit}
              >
                <div className={styles.caption}>
                  <label htmlFor="caption"></label>
                  <textarea
                    name="caption"
                    id=""
                    ref={captionRef}
                    cols={30}
                    rows={10}
                    className={styles['caption-text']}
                    placeholder="Write a caption..."
                    onChange={(event) =>
                      setPostData({
                        ...postData,
                        caption: event.target.value,
                      })
                    }
                  />
                </div>

                <h2 className={styles.heading}>
                  Please enter the link(s) from where you bought your clothes.
                </h2>

                {postData.postLinks && (
                  <>
                    <ul className={styles.list}>
                      {postData.postLinks.map((item, idx) => (
                        <li className={styles.item} key={idx}>
                          <div className={styles['item-text']}>
                            <h3 className={styles['item-heading']}>
                              {item.itemName}
                            </h3>
                            <p className={styles['item-link']}>
                              {item.itemLink?.slice(0, 25)}
                              ...
                            </p>
                          </div>

                          <div className={styles['icon-container']}>
                            <div onClick={() => handleRemoveItem(idx)}>
                              <TrashIcon className={styles.delete} />
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                    <p className={styles['item-count']}>
                      {handleItemMessage()}
                    </p>
                    <div
                      className={styles.pluscontainer}
                      onClick={handleNewInputBtn}
                    >
                      {postLinkStep === PostLink.DISPLAY_STATE &&
                        postData.postLinks.length < 5 && (
                          <PlusCircleIcon className={styles.plus} />
                        )}
                    </div>
                  </>
                )}

                {postLinkStep === PostLink.ENTER_STATE &&
                  postData.postLinks.length < 5 && (
                    <>
                      <div className={styles.item}>
                        <label htmlFor="item-name"></label>
                        <input
                          type="text"
                          name="item-name"
                          placeholder="Enter the name"
                          onChange={(event) =>
                            setPostLink({
                              ...postLink,
                              itemName: event.target.value,
                            })
                          }
                        />
                        <label htmlFor="item-link"></label>
                        <input
                          type="text"
                          name="item-link"
                          placeholder="Past your link here..."
                          onChange={(event) =>
                            setPostLink({
                              ...postLink,
                              itemLink: event.target.value,
                            })
                          }
                        />
                      </div>
                      <div className={styles['add-outfit-container']}>
                        <button className={styles['add-outfit']} type="submit">
                          add
                        </button>
                        {postData.postLinks.length > 0 && (
                          <p
                            className={styles['cancel-outfit']}
                            onClick={handleCancelBtn}
                          >
                            cancel
                          </p>
                        )}
                      </div>
                    </>
                  )}
              </form>
            </div>
          </div>
        </div>
      </div>
    )
  );
}
