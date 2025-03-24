import { z } from 'zod';

export const user = z.object({
  id: z.number(),
  user: z.string(),
  email: z.string(),
  description: z.string().optional(),
});
