import { z } from 'zod';

export const leaderboardEntry = z.object({
  name: z.string(),
  uid: z.string(),
  eid: z.string(),
  score: z.number().nullable(),
});

export const leaderboardData = z.array(leaderboardEntry);

export const createLeaderboardEntry = z.object({
  name: z.string(),
  uid: z.string(),
  score: z.number().optional(),
});

export const updateLeaderboardEntry = z.object({
  name: z.string().optional(),
  score: z.number().optional(),
});
