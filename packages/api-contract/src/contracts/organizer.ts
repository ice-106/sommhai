import {
  eventAttendeeInvInfo,
  eventOrganizerInfo,
  eventOrganizerInvInfo,
  eventOrganizerInvResponse,
  leaderboardData,
  leaderboardEntry,
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
      status: z.string().optional(),
    }),
    responses: {
      201: eventOrganizerInfo,
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
      201: eventOrganizerInvInfo,
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
      201: eventAttendeeInvInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  respondOrganizerInvite: {
    method: 'PUT',
    path: '/org/events/:invitationId/respond',
    pathParams: z.object({
      invitationId: z.string(),
    }),
    body: z.object({
      accept: z.boolean(),
    }),
    responses: {
      200: eventOrganizerInvResponse,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getLeaderboard: {
    method: 'GET',
    path: '/org/events/:eventId/leaderboard',
    pathParams: z.object({
      eventId: z.string(),
    }),
    responses: {
      200: leaderboardData,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  createLeaderboard: {
    method: 'POST',
    path: '/org/events/:eventId/leaderboard',
    pathParams: z.object({
      eventId: z.string(),
    }),
    body: z.object({
      name: z.string(),
      uid: z.string(),
      score: z.number().optional(),
    }),
    responses: {
      201: leaderboardEntry,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  updateLeaderboard: {
    method: 'PUT',
    path: '/org/events/:eventId/leaderboard/:name',
    pathParams: z.object({
      eventId: z.string(),
      name: z.string(),
    }),
    body: z.object({
      name: z.string().optional(),
      score: z.number().optional(),
    }),
    responses: {
      200: leaderboardEntry,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  deleteLeaderboardEntry: {
    method: 'DELETE',
    path: '/org/events/:eventId/leaderboard/:name',
    pathParams: z.object({
      eventId: z.string(),
      name: z.string(),
    }),
    responses: {
      204: z.null(),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
