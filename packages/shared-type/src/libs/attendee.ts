import { z } from 'zod';

import { user } from './user';

export const attendee = z.object({
  uid: z.string(),
  eid: z.string(),
  user: user.optional(),
});
