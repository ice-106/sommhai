import { z } from 'zod';

export const userPost = z.object({
  id: z.number(),
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
  description: z.string().optional(),
});
