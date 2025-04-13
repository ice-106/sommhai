import { z } from 'zod';

import { userInfo } from './user';

export const attendee = z.object({
  uid: z.string(),
  eid: z.string(),
  user: userInfo.optional(),
});
