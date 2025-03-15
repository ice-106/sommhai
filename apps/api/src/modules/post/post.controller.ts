import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { InternalServerErrorException } from '../../common/exception/http';
import { PostService } from './post.service';

export const PostController: RouterImplementation<typeof contract.post> = {
  createPost: async () => {
    throw new InternalServerErrorException('Not implemented');
  },
  getPost: async ({ params: { postId } }) => {
    const post = PostService.getPost({
      postId,
    });
    throw new InternalServerErrorException('Not implemented');
  },
  getPosts: async ({ query: { postIds, search, skip, take } }) => {
    // const posts = await PostService.getManyPosts({ postIds, search, skip, take });

    return {
      status: 200,
      body: {
        posts: [
          {
            id: 1,
            title: 'Post 1',
            content: 'Content 1',
          },
          {
            id: 2,
            title: 'Post 2',
            content: 'Content 2',
          },
          {
            id: 3,
            title: 'Post 3',
            content: 'Content 3',
          },
          {
            id: 4,
            title: 'Post 4',
            content: 'Content 4',
          },
        ],
        total: 2,
      },
    };
  },
};
