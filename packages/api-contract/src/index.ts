import { initContract } from '@ts-rest/core';

import { organizerContract } from './contracts/organizer';
import { postContract } from './contracts/post';
import { userContract } from './contracts/user';

const c = initContract();

export const contract = c.router({
  post: postContract,
  user: userContract,
  organizer: organizerContract,
});
