import { InternalServerErrorException } from '../../common/exception/http';
import { GetManyPostsOptions, GetPostOptions } from './types';

export const PostService = {
  createPost: async () => {
    throw new InternalServerErrorException('Not implemented');
  },
  getPost: async ({ postId }: GetPostOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  getManyPosts: async ({ postIds, search, skip, take }: GetManyPostsOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
};
