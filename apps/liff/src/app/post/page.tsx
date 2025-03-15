import { dehydrate, HydrationBoundary } from '@tanstack/react-query';
import React, { Suspense } from 'react';

import { getQueryClientRsc } from '@/libs/reactQuery';
import { tsr } from '@/libs/tsr';

import Loading from './loading';
import { ClientPostPage } from './post';

export const dynamic = 'force-dynamic';

const PostPage = () => {
  const tsrQueryClient = tsr.initQueryClient(getQueryClientRsc(true));

  tsrQueryClient.post.getPosts.prefetchQuery({
    queryKey: ['post'],
    queryData: {
      query: {
        postIds: ['1', '2'],
      },
    },
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(tsrQueryClient)}>
        <h1>Post Page</h1>
        <Suspense fallback={<Loading />}>
          <ClientPostPage />
        </Suspense>
      </HydrationBoundary>
    </div>
  );
};

export default PostPage;
