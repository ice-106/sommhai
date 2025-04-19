import { eventAttendeeInfo } from '@sommhai/shared-type';
import { leaderboardData } from '@sommhai/shared-type';
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
  getAtdEventLeaderboard: {
    method: 'GET',
    path: '/atd/events/:eventId/leaderboard',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: leaderboardData,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
