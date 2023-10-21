import ExploreSearchSkeleton from '@/app/components/skeletons/ExploreSearchSkeleton/ExploreSearchSkeleton';
import PostCardSkeleton from '@/app/components/skeletons/PostCardSkeleton/PostCardSkeleton';
import React from 'react';

function loading() {
  return (
    <section>
      <ExploreSearchSkeleton />
      <PostCardSkeleton />
    </section>
  );
}

export default loading;
