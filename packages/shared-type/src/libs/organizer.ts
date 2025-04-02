import { z } from 'zod';

import { user } from './user';

export const organizer = z.object({
  uid: z.string(),
  eid: z.string(),
  user: user.optional(),
});
