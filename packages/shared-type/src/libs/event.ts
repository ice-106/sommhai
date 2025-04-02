import { z } from 'zod';

import { attendee } from './attendee';
import { organizer } from './organizer';

export const Event = z.object({
  eid: z.string(),
  name: z.string(),
  date: z.string(),
  time: z.string(),
  picture: z.string().optional(),
  location: z.string(),
  description: z.string().optional(),
  invite_list: z.number(),
  memory: z.string().optional(),
  host: z.string(),
  host_uid: z.string(),
  attendees: z.array(attendee).optional(),
  attending: z.array(attendee).optional(),
  organizers: z.array(organizer).optional(),
});
