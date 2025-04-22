import { z } from 'zod';

import { attendee } from './attendee';
import { organizer } from './organizer';

export const eventBaseInfo = z.object({
  eid: z.string(),
  name: z.string(),
  date: z.date(),
  time: z.date(),
  picture: z.array(z.string()),
  location: z.string().nullable(),
  description: z.string().nullable(),
  invite_list: z.number().nullable(),
  memory: z.string().nullable(),
  host: z.string(),
  host_uid: z.string(),
  attendees: z.array(attendee),
  attendings: z.array(attendee),
  organizers: z.array(organizer),
  status: z.string(),
  message: z.string().nullable(),
});

export const eventInviteBaseInfo = z.object({
  inviteId: z.string(),
  eventId: z.string(),
  userId: z.string(),
  role: z.enum(['ORGANIZER', 'ATTENDEE']),
  accept: z.boolean().optional().nullable(),
});

export const eventInvSend = z.object({
  eventId: z.string(),
  invites: z.array(
    z.object({
      success: z.boolean(),
      uid: z.string(),
      inviteId: z.string().optional(),
      error: z.string().optional(),
    }),
  ),
});

export const eventInvResponse = z.object({
  iid: z.string(),
  eventId: z.string(),
  accepted: z.boolean().nullable(),
});

export const questionBaseInfo = z.object({
  qid: z.string(),
  eventId: z.string(),
  question: z.string(),
  type: z.enum(['SHORT_ANSWER', 'MULTIPLE_CHOICE', 'CHECKBOX']),
  required: z.boolean(),
  options: z.array(z.string()).optional(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const userResponseBaseInfo = z.object({
  id: z.string(),
  questionId: z.string(),
  userId: z.string(),
  answer: z.string().nullable(),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export const historyBaseInfo = z.object({
  uid: z.string(),
  eid: z.string(),
  name: z.string(),
  date: z.date(),
});

export const questionResponseInput = z.object({
  questionId: z.string(),
  answer: z.string().nullable(),
});

export const eventInviteWithResponsesOutput = z.object({
  iid: z.string(),
  eventId: z.string(),
  accepted: z.boolean().nullable(),
  responses: z.array(
    z.object({
      questionId: z.string(),
      submitted: z.boolean(),
    }),
  ),
});

export const eventOrganizerInfo = eventBaseInfo;
export const eventAttendeeInfo = eventBaseInfo;
