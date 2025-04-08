import { eventOrganizerInfo } from '@sommhai/shared-type';
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
    path: '/orgs/events',
    body: z.object({
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
      date: z.date().optional(),
      time: z.date().optional(),
      location: z.string().optional(),
      description: z.string().optional(),
      invite_list: z.number().optional(),
      memory: z.string().optional(),
      picture: z.array(z.string()).optional(),
    }),
    responses: {
      201: eventOrganizerInfo,
      500: z.object({ message: z.string() }),
    },
  },
});
