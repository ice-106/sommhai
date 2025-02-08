import { contract } from '@sommhai/api-contract';
import { initServer } from '@ts-rest/express';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { PostController } from './modules/post/post.controller';

const s = initServer();

export const router: RouterImplementation<typeof contract> = s.router(contract, {
  post: PostController,
});
