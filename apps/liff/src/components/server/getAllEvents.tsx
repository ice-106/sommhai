'use server';
import type { Events } from '@sommhai/shared-type/src/index';

import { SERVER_URL } from '@/env';

export const getAllEvents = async () => {
  const res = await fetch(`${SERVER_URL}/org/events`, {
    method: 'GET',
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  const events = await res.json();
  return events as Events[];
};
