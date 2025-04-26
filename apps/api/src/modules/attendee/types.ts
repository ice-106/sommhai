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

export interface GetEventLeaderboardOptions {
  eventId: string;
}

export interface RespondToEventInviteOptions {
  inviteId: string;
  accept: boolean;
}

export type InviteEntity = Prisma.InviteGetPayload<{
  include: {
    event: true;
    user: true;
  };
}>;

export interface RespondWithQuestionsOptions {
  inviteId: string;
  accepted: boolean;
  responses: {
    questionId: string;
    answer: string;
  }[];
}

export interface isAttendingOptions {
  eventId: string;
  userId: string;
}
