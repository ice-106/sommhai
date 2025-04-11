import { z } from 'zod';

import { attendee } from './attendee';
import { organizer } from './organizer';

export const eventBaseInfo = z.object({
  eid: z.string(),
  name: z.string(),
  date: z.date(),
  time: z.date(),
  picture: z.array(z.string()),
  location: z.string(),
  description: z.string().nullable(),
  invite_list: z.number(),
  memory: z.string().nullable(),
  host: z.string(),
  host_uid: z.string(),
  attendees: z.array(attendee),
  attendings: z.array(attendee),
  organizers: z.array(organizer),
  status: z.string(),
});

export const eventOrganizerInfo = eventBaseInfo;
