import { z } from 'zod';

export const userInfo = z.object({
  uid: z.string(),
  username: z.string(),
  phone: z.string().optional().nullable(),
  email: z.string().optional().nullable(),
  payment_method: z.string().optional().nullable(),
  subscription_plan: z.string().optional(),
  picture: z.string(),
});
