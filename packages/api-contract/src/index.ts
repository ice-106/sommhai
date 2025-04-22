import { initContract } from '@ts-rest/core';

import { attendeeContract } from './contracts/attendee';
import { organizerContract } from './contracts/organizer';
import { userContract } from './contracts/user';

const c = initContract();

export const contract = c.router({
  user: userContract,
  organizer: organizerContract,
  attendee: attendeeContract,
});
