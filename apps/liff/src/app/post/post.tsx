'use client';

import { tsr } from '@/libs/tsr';

export function ClientPostPage() {
  const { data, isError } = tsr.post.getPosts.useSuspenseQuery({
    queryKey: ['post'],
    queryData: {
      query: {
        postIds: ['1', '2'],
      },
    },
  });

  return (
    <div>
      {data.body.posts.map((post) => (
        <div key={post.id}>{post.title}</div>
      ))}
    </div>
  );
}
