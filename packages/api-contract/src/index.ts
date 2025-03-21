import { initContract } from '@ts-rest/core';

import { postContract } from './contracts/post';

const c = initContract();

export const contract = c.router({
  post: postContract,
});
