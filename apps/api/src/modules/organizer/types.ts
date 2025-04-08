import { Prisma } from '@prisma/client';

export interface GetEventOptions {
  eventId: string;
}

export interface GetManyEventsOptions {
  search?: string;
  date?: Date;
  take?: number;
  skip?: number;
}

export interface CreateEventOptions {
  name: string;
}

export interface UpdateEventDetailsOptions {
  eventId: string;
  name?: string;
  date?: Date;
  time?: Date;
  location?: string;
  description?: string;
  invite_list?: number;
  memory?: string;
  picture: string[];
}

export interface GetEventDetailsOptions {
  eventId: string;
}

export type EventEntity = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    attendings: true;
    organizers: true;
  };
}>;
