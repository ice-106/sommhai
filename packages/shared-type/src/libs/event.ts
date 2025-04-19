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

export const eventInvInfo = z.object({
  eventId: z.string(),
  invitations: z.array(
    z.object({
      success: z.boolean(),
      uid: z.string(),
      invitationId: z.string().optional(),
      error: z.string().optional(),
    }),
  ),
});

export const eventInvResponse = z.object({
  iid: z.string(),
  eventId: z.string(),
  accepted: z.boolean(),
});

export const leaderboardEntry = z.object({
  name: z.string(),
  uid: z.string(),
  eid: z.string(),
  score: z.number().nullable(),
});

export const leaderboardData = z.array(leaderboardEntry);

export const eventOrganizerInfo = eventBaseInfo;
export const eventAttendeeInfo = eventBaseInfo;

export const eventOrganizerInvInfo = eventInvInfo;
export const eventAttendeeInvInfo = eventInvInfo;

export const eventOrganizerInvResponse = eventInvResponse;
export const eventAttendeeInvResponse = eventInvResponse;
