import HomePageNavigation from '@/app/components/homepage-navigation/HomePageNavigation';
import PostCard from '@/app/components/posts/PostCard/PostCard';
import styles from './page.module.scss';
import { Post } from '@/app/types/posts-type';
import { getUserSession } from '@/app/utils/functions/user';
import HomeNavigationSkeleton from '@/app/components/skeletons/HomeNavigationSkeleton/HomeNavigationSkeleton';

export default async function Home() {
  await getUserSession();
  // Retrieve the post data from the post api routes
  const route = await import('@/app/api/posts/route');
  const response = await route.GET();
  const data: Post[] = await response.json();

  return (
    <div className={styles.main}>
      <HomePageNavigation />

      <div className={styles['main-content']}>
        <PostCard data={data} />
      </div>
    </div>
  );
}
