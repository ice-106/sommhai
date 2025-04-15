'use server';

import { z } from 'zod';

const FromSchema = z.object({
  id: z.string(),
  eventId: z.string({
    invalid_type_error: 'Please select an existing event',
  }),
});

export type State = {
  error?: {
    eventId?: string[];
  };
  message?: string | null;
};

const UpdatedEvent = FromSchema.omit({ id: true });
export async function updateEvent(formData: FormData) {}
