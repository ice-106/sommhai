import { userPost } from '@sommhai/shared-type';
import { initContract } from '@ts-rest/core';
import { z } from 'zod';

const c = initContract();

export const postContract = c.router({
  createPost: {
    method: 'POST',
    path: '/posts',
    body: z.object({
      title: z.string(),
      content: z.string(),
      published: z.boolean().optional(),
      description: z.string().optional(),
    }),
    responses: {
      201: z.object({ userPost }),
      500: z.object({ message: z.string() }),
    },
  },
  getPosts: {
    method: 'GET',
    path: '/posts',
    query: z.object({
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      search: z.string().optional(),
    }),
    responses: {
      200: z.object({
        posts: z.array(userPost),
        total: z.number(),
      }),
      500: z.object({ message: z.string() }),
    },
  },
});
