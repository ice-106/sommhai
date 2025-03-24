import { user } from '@sommhai/shared-type';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const userContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users/create',
    body: z.object({
      user: z.string(),
      email: z.string(),
      description: z.string().optional(),
    }),
    responses: {
      201: z.object({ user }),
      500: z.object({ message: z.string() }),
    },
  },
  getUser: {
    method: 'GET',
    path: '/users/:userId',
    pathParams: z.object({ userId: z.string().regex(/^\d+$/).transform(Number) }),
    responses: {
      200: z.object({ user }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getUsers: {
    method: 'GET',
    path: '/users',
    query: z.object({
      userIds: z.array(z.string().regex(/^\d+$/).transform(Number)),
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      search: z.string().optional(),
    }),
    responses: {
      200: z.object({
        users: z.array(user),
        total: z.number(),
      }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
