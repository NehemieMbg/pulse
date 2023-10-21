'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Trends.module.scss';
import Image from 'next/image';
import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';
import { useGetSuggestion } from '@/app/hooks/useFetchUserData';
import FriendSuggestions from '../../skeletons/FriendSuggestionsSkeleton/FriendSuggestionsSkeleton';
import FriendSuggestionsSkeleton from '../../skeletons/FriendSuggestionsSkeleton/FriendSuggestionsSkeleton';

interface Suggestion {
  username: string | null;
  name: string | null;
  id: string;
  imageName: string | null;
  image: string;
}

function Trends() {
  const dispatch = useDispatch();
  const [suggestions, setSuggestions] = useState<Suggestion[]>();
  // const [follow, setFollow] = useState<'follow' | 'unfollow'>('follow');
  const [follow, setFollow] = useState<string[]>([]);
  useGetSuggestion(setSuggestions);

  async function handleFollowing(userId: string) {
    if (!follow.includes(userId))
      setFollow((prevFollow) => [...prevFollow, userId]);

    try {
      const response = await fetch(`/api/follow/${userId}`, { method: 'POST' });
      if (!response.ok) {
        if (follow.includes(userId))
          setFollow((prevFollow) => [
            ...prevFollow.filter((id) => id !== userId),
          ]);
        throw new Error(await response.text());
      }

      dispatch(setChanges({ id: userId }));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUnfollow(userId: string) {
    if (follow.includes(userId))
      setFollow((prevFollow) => [...prevFollow.filter((id) => id !== userId)]);

    try {
      const response = await fetch(`/api/follow/${userId}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        if (!follow.includes(userId))
          setFollow((prevFollow) => [...prevFollow, userId]);
        throw new Error(await response.text());
      }
      dispatch(setChanges({ id: userId }));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      {suggestions ? (
        <ul className={styles.list}>
          {suggestions?.map((user: Suggestion) => (
            <li className={styles['suggestion-container']} key={user.id}>
              <div className={styles.suggestion}>
                <div className={styles['suggestion-text']}>
                  <Link href={`/${user.username}`} className={styles.user}>
                    {user.image ? (
                      <Image
                        src={user.image}
                        alt="profile image"
                        width={100}
                        height={100}
                        className={styles.image}
                      />
                    ) : (
                      <div className={styles['no-image']}></div>
                    )}
                    <div className={styles['text-container']}>
                      <h2 className={styles.name}>{user.name}</h2>
                      {user.username && (
                        <p className={styles.username}>@{user.username}</p>
                      )}
                    </div>
                  </Link>
                </div>
                {follow.includes(user.id) ? (
                  <button
                    className={styles.btn}
                    onClick={() => handleUnfollow(user.id)}
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    className={styles.btn}
                    onClick={() => handleFollowing(user.id)}
                  >
                    follow
                  </button>
                )}
              </div>
            </li>
          ))}
          {!suggestions || suggestions?.length === 0 ? (
            <li className={styles.nosuggestion}>
              <h2 className={styles['no-suggestion-title']}>
                No Friend suggestions
              </h2>
            </li>
          ) : (
            ''
          )}
        </ul>
      ) : (
        <FriendSuggestionsSkeleton />
      )}
    </>
  );
}

export default Trends;
