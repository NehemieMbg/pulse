import { Post } from '@/app/types/posts-type';
import { NextRequest } from 'next/server';
import UserPost from '@/app/components/post/Post/UserPost';

export default async function page({ params }: { params: { postId: string } }) {
  const { postId } = params;
  // Retrieve the post data from the post api routes
  const route = await import(`@/app/api/posts/[postId]/route`);
  const response = await route.GET(NextRequest, { params: { postId: postId } });
  const postData: Post = await response.json();

  return (
    <>
      <UserPost postData={postData} />
    </>
  );
}
