import { eventAttendeeInfo, eventInviteWithResponsesOutput, eventInvResponse } from '@sommhai/shared-type';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const attendeeContract = c.router({
  getAtdEvents: {
    method: 'GET',
    path: '/atd/events',
    query: z.object({
      search: z.string().optional(),
      date: z.date().optional(),
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      status: z.string().optional(),
    }),
    responses: {
      200: z.array(eventAttendeeInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getAtdEvent: {
    method: 'GET',
    path: '/atd/events/:eventId',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: eventAttendeeInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  respondAttendeeInvite: {
    method: 'PUT',
    path: '/atd/events/:inviteId/respond',
    pathParams: z.object({
      inviteId: z.string(),
    }),
    body: z.object({
      accept: z.boolean(),
    }),
    responses: {
      200: eventInvResponse,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  respondAttendeeInviteWithQuestions: {
    method: 'PUT',
    path: '/atd/events/:inviteId/respond-with-questions',
    pathParams: z.object({
      inviteId: z.string(),
    }),
    body: z.object({
      accepted: z.boolean(),
      responses: z.array(
        z.object({
          questionId: z.string(),
          answer: z.union([z.string(), z.array(z.string()), z.null()]),
        }),
      ),
    }),
    responses: {
      200: eventInviteWithResponsesOutput,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  isAttending: {
    method: 'GET',
    path: '/atd/events/:eventId/attending',
    pathParams: z.object({
      eventId: z.string(),
    }),
    query: z.object({
      userId: z.string(),
    }),
    responses: {
      200: z.object({
        isAttending: z.boolean(),
        userId: z.string(),
        eventId: z.string(),
      }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
