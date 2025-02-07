import React from 'react';

import { client } from '@/libs/apiClient';

const PostPage = async () => {
  const { data, isLoading, isError } = client.post.getPosts.useQuery(['posts'], {});
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const posts = data?.body.posts;

  return (
    <div>
      {posts?.map((post) => {
        return (
          <div key={post.title}>
            <h1>{post.title}</h1>
            <p>{post.content}</p>
          </div>
        );
      })}
    </div>
  );
};

export default PostPage;
