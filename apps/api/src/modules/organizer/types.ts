import { InviteRole, Prisma, QuestionType } from '@prisma/client';

export interface GetEventOptions {
  eventId: string;
}

export interface GetManyEventsOptions {
  search?: string;
  date?: Date;
  take?: number;
  skip?: number;
  status?: string;
  userId?: string;
}

export interface CreateEventOptions {
  uid: string;
  name: string;
}

export interface DeleteEventOptions {
  eventId: string;
}

export type EventEntity = Prisma.EventGetPayload<{
  include: {
    attendees: true;
    attendings: true;
    organizers: true;
  };
}>;

export interface CreateEventInviteOptions {
  eventId: string;
  userIds: string[];
  role: InviteRole;
}

export interface GetEventInviteOptions {
  inviteId: string;
  eventId: string;
}
export interface GetManyEventInvitesOptions {
  eventId: string;
  role?: InviteRole;
  accept?: boolean;
  take?: number;
  skip?: number;
}

export interface DeleteEventInviteOptions {
  eventId: string;
  inviteIds: string[];
}

export interface RespondToEventInviteOptions {
  inviteId: string;
  accept: boolean;
}

export interface GetEventLeaderboardOptions {
  eventId: string;
}

export interface CreateLeaderboardOptions {
  eventId: string;
  uid: string;
  score?: number;
}

export interface UpdateLeaderboardOptions {
  eventId: string;
  entryId: string;
  updates: {
    uid?: string;
    score?: number;
  };
}

export interface DeleteLeaderboardEntryOptions {
  eventId: string;
  entryId: string;
}

export type LeaderboardEntity = Prisma.LeaderboardGetPayload<object>;

export type InviteEntity = Prisma.InviteGetPayload<{
  include: {
    event: true;
    user: true;
  };
}>;

export interface GetEventQuestionOptions {
  eventId: string;
  questionId: string;
}

export interface GetManyEventQuestionOptions {
  eventId: string;
  take?: number;
  skip?: number;
}

export interface CreateManyEventQuestionOptions {
  eventId: string;
  questions: Array<{
    question: string;
    type: QuestionType;
    required?: boolean;
    options?: string[];
  }>;
}

export interface UpdateEventQuestionOptions {
  eventId: string;
  questionId: string;
  question: string;
  type: QuestionType;
  required: boolean;
  options?: string[];
}

export interface DeleteEventQuestionOptions {
  eventId: string;
  questionId: string;
}

export interface DeleteManyEventQuestionOptions {
  eventId: string;
  questionIds: string[];
}

export interface DeleteAllEventQuestionOptions {
  eventId: string;
}
