import { z } from 'zod';

import { attendee } from './attendee';
import { organizer } from './organizer';

export const Event = z.object({
  eid: z.string(),
  name: z.string(),
  date: z.date().optional(),
  time: z.date().optional(),
  picture: z.array(z.string()),
  location: z.string().optional(),
  description: z.string().optional(),
  invite_list: z.number().optional(),
  memory: z.string().optional(),
  host: z.string(),
  host_uid: z.string(),
  attendees: z.array(attendee).optional(),
  attending: z.array(attendee).optional(),
  organizers: z.array(organizer).optional(),
});
