'use client';

import React, {
  useRef,
  useEffect,
  useState,
  ChangeEvent,
  FormEvent,
} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useClickOutside from '@/app/hooks/useClickOutside';
import { closeNewPost } from '@/app/store/slices/navigation-slice';
import ArrowLongLeft from '../../ui/ArrowLongLeft';
import PhotoIcon from '../../ui/PhotoIcon';
import Image from 'next/image';
import { User } from '@/app/types/user-type';
import useFetchUserData from '@/app/hooks/useFetchUserData';
import PlusCircleIcon from '../../ui/PlusCircleIcon';
import TrashIcon from '../../ui/TrashIcon';
import PostLinks from '../../posts/PostCard/PostLinks/PostLinks';
import CircularIndeterminate from '../../ui/CircularInterminate';
import { PostLink as UserPostLink } from '@/app/types/posts-type';

import styles from './NewPost.module.scss';

enum PostStep {
  STEP_1 = 'STEP_1',
  STEP_2 = 'STEP_2',
}

enum PostLink {
  ENTER_STATE = 'ENTER_STATE',
  DISPLAY_STATE = 'DISPLAY_STATE',
}

export default function NewPost() {
  const dispatch = useDispatch();

  // ? Open and closes the post section
  const menuRef = useRef<HTMLDivElement | null>(null);
  useClickOutside(menuRef, () => dispatch(closeNewPost()));

  const [loading, setLoading] = useState(false);
  const [postLinkStep, setPostLinkStep] = useState(PostLink.ENTER_STATE);
  const [currentStep, setCurrentStep] = useState(PostStep.STEP_1);
  const [file, setFile] = useState<File | null>();
  const [imageSrc, setImageSrc] = useState<String | null>(null);
  const [postLink, setPostLink] = useState<UserPostLink>({
    itemName: '',
    itemLink: '',
  });

  const [postData, setPostData] = useState({
    caption: '',
    postLinks: [] as UserPostLink[],
  });

  const [userData, setUserData] = useState<User | null>();
  useFetchUserData(setUserData);

  // ? Sets the user file
  const newPostIsOpen = useSelector(
    (state: { navigation: { newPostIsOpen: boolean } }) =>
      state.navigation.newPostIsOpen
  );

  useEffect(() => {
    if (newPostIsOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'auto';
  }, [newPostIsOpen]);

  function handleReturn() {
    if (currentStep === PostStep.STEP_1) {
      dispatch(closeNewPost());
    }

    if (currentStep === PostStep.STEP_2) {
      setCurrentStep(PostStep.STEP_1);
      setFile(null);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    setFile(selectedFile || null);

    if (selectedFile) {
      const reader = new FileReader();
      reader.onload = () => {
        setImageSrc(reader.result as string);
      };
      reader.readAsDataURL(selectedFile);
      setCurrentStep(PostStep.STEP_2);
    } else {
      setImageSrc(null);
    }
  }

  async function handleNextBtn() {
    setLoading(true);
    if (!file) return;

    try {
      const data = new FormData();
      data.set('file', file);
      data.append('postData', JSON.stringify(postData));

      const response = await fetch('/api/posts', {
        method: 'POST',
        body: data,
      });

      if (!response.ok) throw new Error(await response.text());

      setPostLink({
        itemName: '',
        itemLink: '',
      });
      setFile(null);
      setImageSrc(null);
      setCurrentStep(PostStep.STEP_1);
      setPostLinkStep(PostLink.ENTER_STATE);
      dispatch(closeNewPost());
    } catch (error) {
      console.error(error);
    }

    setLoading(false);
  }

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

  return (
    newPostIsOpen && (
      <div className={styles['new-post']}>
        <div
          ref={menuRef}
          className={`${styles.container} ${
            currentStep === PostStep.STEP_2 ? `${styles['container-2']}` : ''
          }`}
        >
          <div className={styles.nav}>
            <div className={styles['return-container']} onClick={handleReturn}>
              <ArrowLongLeft className={styles['return-icon']} />
            </div>

            <h1 className={styles.heading}>Create new post</h1>

            {currentStep === PostStep.STEP_2 && (
              <div className={styles.next}>
                <button
                  onClick={handleNextBtn}
                  disabled={loading}
                  className={styles.share}
                >
                  Share
                </button>
                {loading && (
                  <CircularIndeterminate className={styles.loading} />
                )}
              </div>
            )}
          </div>

          <div className={styles.test}>
            {currentStep === PostStep.STEP_1 && (
              <div className={styles['post-picture']}>
                <PhotoIcon className={styles['photo-icon']} />
                <input
                  type="file"
                  name="file"
                  id="file"
                  onChange={handleFileChange}
                  className={styles['input-file']}
                />
                <label htmlFor="file">Select from computer</label>
              </div>
            )}

            {currentStep !== PostStep.STEP_1 && (
              <div className={styles['post-container']}>
                <div className={styles['post-picture']}>
                  <div className={styles['image-container']}>
                    {imageSrc && (
                      <Image
                        src={imageSrc as string}
                        alt={'Selected File'}
                        width={800}
                        height={800}
                        className={styles.image}
                      />
                    )}
                  </div>
                </div>
                <div className={styles['post-data']}>
                  <div className={styles.user}>
                    {userData?.image ? (
                      <Image
                        src={userData?.image}
                        alt="profile picture"
                        height={100}
                        width={100}
                        className={styles['profile-picture']}
                      />
                    ) : (
                      <div className={styles['no-image']}></div>
                    )}
                    {userData?.username && <p>@{userData?.username}</p>}
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
                      Please enter the link(s) from where you bought your
                      clothes.
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
                            <button
                              className={styles['add-outfit']}
                              type="submit"
                            >
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
            )}
          </div>
        </div>
      </div>
    )
  );
}

/*
<div className={styles.item}>
<label htmlFor="item-1"></label>
<input
  type="text"
  name="item-2"
  placeholder="Past your link here..."
  onChange={(event) =>
    setPostData({
      ...postData,
      postLink2: event.target.value,
    })
  }
/>
</div>
<div className={styles.item}>
<label htmlFor="item-1"></label>
<input
  type="text"
  name="item-2"
  placeholder="Past your link here..."
  onChange={(event) =>
    setPostData({
      ...postData,
      postLink3: event.target.value,
    })
  }
/>
</div>
<div className={styles.item}>
<label htmlFor="item-1"></label>
<input
  type="text"
  name="item-2"
  placeholder="Past your link here..."
  onChange={(event) =>
    setPostData({
      ...postData,
      postLink4: event.target.value,
    })
  }
/>
</div>
<div className={styles.item}>
<label htmlFor="item-1"></label>
<input
  type="text"
  name="item-2"
  placeholder="Past your link here..."
  onChange={(event) =>
    setPostData({
      ...postData,
      postLink5: event.target.value,
    })
  }
/>
</div>
*/
