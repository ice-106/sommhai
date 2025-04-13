import { z } from 'zod';

export const userInfo = z.object({
  uid: z.string(),
  user: z.string(),
  email: z.string(),
  dob: z.date().optional(),
  pref_name: z.string().optional(),
  first_name: z.string().optional(),
  last_name: z.string().optional(),
  payment_method: z.string().optional(),
  subscription_plan: z.string().optional(),
});
