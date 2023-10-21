'use client';

import { UserProfile } from '@/app/types/user-type';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setChanges } from '@/app/store/slices/user-slice';

function ActionBtn(props: {
  userData: UserProfile | undefined;
  followUser: boolean;
}) {
  const { userData, followUser } = props;
  const dispatch = useDispatch();
  const [followsUser, setFollowUser] = useState(false);

  useEffect(() => {
    if (userData?.followUser) setFollowUser(true);
    else setFollowUser(false);
  }, [userData?.followUser]);

  async function handleFollow() {
    if (!followsUser) setFollowUser(true);
    try {
      const response = await fetch(`/api/follow/${userData?.user.id}`, {
        method: 'POST',
      });

      if (!response.ok) {
        setFollowUser(false);
        throw new Error(await response.text());
      }
      dispatch(setChanges(await response.json()));
    } catch (error) {
      console.error(error);
    }
  }

  async function handleUnfollow() {
    if (followsUser) setFollowUser(false);
    try {
      const response = await fetch(`/api/follow/${userData?.user.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        setFollowUser(true);
        throw new Error(await response.text());
      }
      dispatch(setChanges(await response.json()));
    } catch (error) {
      console.error(error);
    }
  }

  return (
    !userData?.isUser && (
      <>
        {followsUser ? (
          <>
            <button onClick={() => handleUnfollow()}>unfollow</button>
          </>
        ) : (
          <button onClick={() => handleFollow()}>follow</button>
        )}
      </>
    )
  );
}

export default ActionBtn;
