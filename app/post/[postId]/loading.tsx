import UserPostSkeleton from '@/app/components/skeletons/UserPostSkeleton/UserPostSkeleton';
import React from 'react';

function loading() {
  return (
    <section>
      <UserPostSkeleton />
    </section>
  );
}

export default loading;
