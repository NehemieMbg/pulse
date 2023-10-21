import HomeNavigationSkeleton from '@/app/components/skeletons/HomeNavigationSkeleton/HomeNavigationSkeleton';
import PostCardSkeleton from '@/app/components/skeletons/PostCardSkeleton/PostCardSkeleton';
import React from 'react';

export default function Loading() {
  return (
    <section>
      <HomeNavigationSkeleton />
      <PostCardSkeleton />
    </section>
  );
}
