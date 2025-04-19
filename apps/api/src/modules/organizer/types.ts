import { Prisma } from '@prisma/client';

export interface GetEventOptions {
  eventId: string;
}

export interface GetManyEventsOptions {
  search?: string;
  date?: Date;
  take?: number;
  skip?: number;
  status?: string;
}

export type EventEntity = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    attendings: true;
    organizers: true;
  };
}>;

export interface CreateOrganizerInviteOptions {
  eventId: string;
  uids: string[];
}

export interface CreateAttendeeInviteOptions {
  eventId: string;
  uids: string[];
}

export interface RespondOrganizerInviteOptions {
  invitationId: string;
  accept: boolean;
}

export interface GetEventLeaderboardOptions {
  eventId: string;
}

export interface createLeaderboardOptions {
  eventId: string;
  name: string;
  uid: string;
  score?: number;
}

export interface updateLeaderboardOptions {
  eventId: string;
  name: string;
  updates: {
    name?: string;
    score?: number;
  };
}

export interface DeleteLeaderboardEntryOptions {
  eventId: string;
  name: string;
}

export type LeaderboardEntity = Prisma.LeaderboardGetPayload<object>;
