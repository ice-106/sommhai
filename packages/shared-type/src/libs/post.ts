import { z } from 'zod';

export const userPost = z.object({
  title: z.string(),
  content: z.string(),
  published: z.boolean().optional(),
  description: z.string().optional(),
});
