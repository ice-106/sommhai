import { z } from 'zod';

import { userInfo } from './user';

export const organizer = z.object({
  uid: z.string(),
  eid: z.string(),
  user: userInfo.optional(),
});
