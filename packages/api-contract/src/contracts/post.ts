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
  getPost: {
    method: 'GET',
    path: '/posts/:postId',
    pathParams: z.object({ postId: z.string().regex(/^\d+$/).transform(Number) }),
    responses: {
      200: z.object({ userPost }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  getPosts: {
    method: 'GET',
    path: '/posts',
    query: z.object({
      postIds: z.array(z.string().regex(/^\d+$/).transform(Number)),
      postTitles: z.array(z.string()).optional(),
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      search: z.string().optional(),
    }),
    responses: {
      200: z.object({
        posts: z.array(userPost),
        total: z.number(),
      }),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
