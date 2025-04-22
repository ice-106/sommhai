import { userInfo } from '@sommhai/shared-type';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const userContract = c.router({
  createUser: {
    method: 'POST',
    path: '/users/create',
    body: z.object({
      uid: z.string(),
      username: z.string(),
    }),
    responses: {
      201: userInfo,
      500: z.object({ message: z.string() }),
    },
  },
  getUser: {
    method: 'GET',
    path: '/users/:uid',
    pathParams: z.object({ uid: z.string() }),
    responses: {
      200: userInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getUsers: {
    method: 'GET',
    path: '/users',
    query: z.object({
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      search: z.string().optional(),
    }),
    responses: {
      200: z.object({
        users: z.array(userInfo),
        total: z.number(),
      }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
