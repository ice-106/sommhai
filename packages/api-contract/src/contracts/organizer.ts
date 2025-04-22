import {
  eventInviteBaseInfo,
  eventInviteWithResponsesOutput,
  eventInvResponse,
  eventInvSend,
  eventOrganizerInfo,
  questionBaseInfo,
} from '@sommhai/shared-type';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const organizerContract = c.router({
  getEvents: {
    method: 'GET',
    path: '/org/events',
    query: z.object({
      search: z.string().optional(),
      date: z.date().optional(),
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      status: z.string().optional(),
      userId: z.string().optional(),
    }),
    responses: {
      200: z.array(eventOrganizerInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getEvent: {
    method: 'GET',
    path: '/org/events/:eventId',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: eventOrganizerInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  createEvent: {
    method: 'POST',
    path: '/org/events',
    body: z.object({
      uid: z.string(),
      name: z.string(),
    }),
    responses: {
      201: eventOrganizerInfo,
      500: z.object({ message: z.string() }),
    },
  },
  updateEvent: {
    method: 'PUT',
    path: '/org/events/:eventId/details',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      name: z.string().optional(),
      date: z.string().datetime().optional(),
      time: z.date().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
      invite_list: z.number().optional(),
      memory: z.string().optional(),
      picture: z.array(z.string()).optional(),
      status: z.string().optional(),
      message: z.string().optional(),
    }),
    responses: {
      201: eventOrganizerInfo,
      500: z.object({ message: z.string() }),
    },
  },
  deleteEvent: {
    method: 'DELETE',
    path: '/org/events/:eventId',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      204: eventOrganizerInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  inviteOrganizers: {
    method: 'POST',
    path: '/org/events/:eventId/adinv',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      uids: z.array(z.string()),
    }),
    responses: {
      201: eventInvSend,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  inviteAttendees: {
    method: 'POST',
    path: '/org/events/:eventId/inv',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      uids: z.array(z.string()),
    }),
    responses: {
      201: eventInvSend,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getEventInvites: {
    method: 'GET',
    path: '/org/events/:eventId/invites',
    pathParams: z.object({
      eventId: z.string(),
    }),
    query: z.object({
      role: z.enum(['ORGANIZER', 'ATTENDEE']).optional(),
      accept: z.boolean().optional(),
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
    }),
    responses: {
      200: z.array(eventInviteBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getEventInvite: {
    method: 'GET',
    path: '/org/events/:eventId/invites/:inviteId',
    pathParams: z.object({
      eventId: z.string(),
      inviteId: z.string(),
    }),
    responses: {
      200: eventInviteBaseInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  deleteEventInvite: {
    method: 'DELETE',
    path: '/org/events/:eventId/invites',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      inviteIds: z.array(z.string()),
    }),
    responses: {
      200: z.array(eventInviteBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  respondOrganizerInvite: {
    method: 'PUT',
    path: '/org/events/:inviteId/respond',
    pathParams: z.object({
      inviteId: z.string(),
    }),
    body: z.object({
      accept: z.boolean().nullable(),
    }),
    responses: {
      200: eventInvResponse,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getEventQuestions: {
    method: 'GET',
    path: '/org/events/:eventId/questions',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: z.array(questionBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getEventQuestion: {
    method: 'GET',
    path: '/org/events/:eventId/questions/:questionId',
    pathParams: z.object({
      eventId: z.string(),
      questionId: z.string(),
    }),
    responses: {
      200: questionBaseInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  createEventQuestions: {
    method: 'POST',
    path: '/org/events/:eventId/questions',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      questions: z.array(
        z.object({
          question: z.string(),
          type: z.enum(['SHORT_ANSWER', 'MULTIPLE_CHOICE', 'CHECKBOX']),
          required: z.boolean().default(false),
          options: z.array(z.string()).optional(),
        }),
      ),
    }),
    responses: {
      201: z.array(questionBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  updateEventQuestion: {
    method: 'PUT',
    path: '/events/:eventId/questions/:questionId',
    pathParams: z.object({
      eventId: z.string(),
      questionId: z.string(),
    }),
    body: z.object({
      question: z.string().optional(),
      type: z.enum(['SHORT_ANSWER', 'MULTIPLE_CHOICE', 'CHECKBOX']).optional(),
      required: z.boolean().optional(),
      options: z.array(z.string()).optional(),
    }),
    responses: {
      200: questionBaseInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  deleteEventQuestion: {
    method: 'DELETE',
    path: '/org/events/:eventId/questions/:questionId',
    pathParams: z.object({
      eventId: z.string(),
      questionId: z.string(),
    }),
    responses: {
      200: questionBaseInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  deleteEventQuestions: {
    method: 'DELETE',
    path: '/org/events/:eventId/questions',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      questionIds: z.array(z.string()),
    }),
    responses: {
      200: z.array(questionBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  deleteAllEventQuestions: {
    method: 'DELETE',
    path: '/org/events/:eventId/questions/all',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: z.array(questionBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  respondOrganizerInviteWithQuestions: {
    method: 'PUT',
    path: '/org/events/:inviteId/respond-with-questions',
    pathParams: z.object({
      inviteId: z.string(),
    }),
    body: z.object({
      accepted: z.boolean(),
      responses: z.array(
        z.object({
          questionId: z.string(),
          answer: z.string(),
        }),
      ),
    }),
    responses: {
      200: eventInviteWithResponsesOutput,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
