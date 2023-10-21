import React from 'react';

import styles from './page.module.scss';
import ExploreSearchBar from '@/app/components/explore/ExploreSearchBar/ExploreSearchBar';
import PostCard from '@/app/components/posts/PostCard/PostCard';
import { Post } from '@/app/types/posts-type';
import ExploreSearchSkeleton from '@/app/components/skeletons/ExploreSearchSkeleton/ExploreSearchSkeleton';

async function page() {
  // Retrieve the post data from the post api routes
  const route = await import('@/app/api/posts/route');
  const response = await route.GET();
  const data: Post[] = await response.json();

  return (
    <div className={styles.explore}>
      <ExploreSearchBar />

      <PostCard data={data} />
    </div>
  );
}

export default page;
