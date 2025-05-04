import { historyBaseInfo, userInfo } from '@sommhai/shared-type';
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
      phone: z.string().optional(),
      email: z.string().optional(),
      payment_method: z.string().optional(),
      subscription_plan: z.string().optional(),
      picture: z.string(),
    }),
    responses: {
      201: userInfo,
      500: z.object({ message: z.string() }),
    },
  },
  updateUser: {
    method: 'PUT',
    path: '/users/:uid',
    pathParams: z.object({ uid: z.string() }),
    body: z.object({
      username: z.string().optional(),
      phone: z.string().optional(),
      email: z.string().optional(),
      payment_method: z.string().optional(),
      subscription_plan: z.string().optional(),
    }),
    responses: {
      204: userInfo,
      404: z.object({ message: z.string() }),
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
  getUserHistory: {
    method: 'GET',
    path: '/users/:uid/history',
    pathParams: z.object({
      uid: z.string(),
    }),
    query: z.object({
      take: z.string().regex(/^\d+$/).transform(Number).optional(),
      skip: z.string().regex(/^\d+$/).transform(Number).optional(),
      search: z.string().optional(),
    }),
    responses: {
      200: z.array(historyBaseInfo),
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
  createUserHistory: {
    method: 'POST',
    path: '/users/history',
    body: z.object({
      eid: z.string(),
      uid: z.string(),
    }),
    responses: {
      201: historyBaseInfo,
      404: z.object({ message: z.string() }),
      500: z.object({ message: z.string() }),
    },
  },
});
