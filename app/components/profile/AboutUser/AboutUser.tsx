'use client';

import React, { Suspense, useEffect, useState } from 'react';

import Image from 'next/image';
import BadgeCheckIcon from '@/app/components/ui/CheckMark/BadgeCheckIcon';

import styles from './AboutUser.module.scss';
import ProfileMenu from '../ProfileMenu/ProfileMenu';
import { UserProfile } from '@/app/types/user-type';
import ActionBtn from './ActionBtn/ActionBtn';
import { useGetProfile } from '@/app/hooks/useFetchUserData';
import { useParams } from 'next/navigation';
import Followers from '../../follow/Followers/Followers';
import Following from '../../follow/Following/Following';
import AboutUserSkeleton from '../../skeletons/AboutUserSkeleton/AboutUserSkeleton';

function AboutUser() {
  const { username } = useParams();

  const [followUser, setFollowUser] = useState(false);
  const [userData, setUserData] = useState<UserProfile | null>();
  const [followerIsOpen, setFollowersIsOpen] = useState<boolean>(false);
  const [followingIsOpen, setFollowingsIsOpen] = useState<boolean>(false);

  useGetProfile(username as string, setUserData);

  useEffect(() => {
    try {
      if (!userData?.followUser) setFollowUser(false);
      else setFollowUser(true);
    } catch (error) {
      console.error(error);
    }
  }, [userData?.followUser]);

  return (
    <>
      {userData ? (
        <div className={styles['about-user']}>
          {userData?.user.image ? (
            <Image
              src={userData?.user.image}
              alt="user profile"
              width={400}
              height={600}
              className={styles['profile-picture']}
            />
          ) : (
            <div className={styles['no-image']}></div>
          )}

          <div className={styles.info}>
            <div className={styles['fullname-container']}>
              <div className={styles['fullname-subcontainer']}>
                <div className={styles.fullname}>
                  <div className={styles['badge-container']}>
                    <p>{userData?.user.name}</p>
                    {userData?.user.emailVerified && <BadgeCheckIcon />}
                  </div>
                  {userData?.user.username && (
                    <p className={styles.username}>
                      @{userData?.user.username}
                    </p>
                  )}
                </div>

                <div className={styles.following}>
                  <p onClick={() => setFollowersIsOpen(true)}>
                    <span>{userData?.user.following?.length}</span>{' '}
                    {userData?.user.following &&
                    userData?.user.following?.length > 1
                      ? 'followers'
                      : 'follower'}
                  </p>

                  <p onClick={() => setFollowingsIsOpen(true)}>
                    <span>{userData?.user.followedBy?.length}</span> following
                  </p>
                </div>

                <Followers
                  userUsername={userData?.user.username!}
                  followers={userData?.user.following!}
                  followerIsOpen={followerIsOpen}
                  setFollowersIsOpen={setFollowersIsOpen}
                />

                <Following
                  userUsername={userData?.user.username!}
                  following={userData?.user.followedBy!}
                  followingIsOpen={followingIsOpen}
                  setFollowingIsOpen={setFollowingsIsOpen}
                />
              </div>

              <div className={styles['action-btn']}>
                {userData && (
                  <ActionBtn userData={userData} followUser={followUser!} />
                )}
                <div className={styles['icon-container']}>
                  <ProfileMenu userData={userData!} />
                </div>
              </div>
            </div>

            <p className={styles.bio}>{userData?.user.bio}</p>

            <div className={styles['user-links']}>
              {userData?.user.link && (
                <a href={`${userData?.user.link}`} target="_blank">
                  {userData?.user.link.slice(0, 20)}...
                </a>
              )}
            </div>

            <div className={styles.location}>
              <p>{userData?.user.city}</p>
            </div>
          </div>
        </div>
      ) : (
        <AboutUserSkeleton />
      )}
    </>
  );
}

export default AboutUser;
