import { EventQuestion, InviteRole, Prisma, QuestionType } from '@prisma/client';

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
    hostUser: true;
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

export interface RespondWithQuestionsOptions {
  inviteId: string;
  accepted: boolean;
  responses: {
    questionId: string;
    answer: string;
  }[];
}

export interface QuestionResponseTuple {
  answer: string;
  uid: string;
}

export interface QuestionWithResponses {
  question: EventQuestion;
  responses: QuestionResponseTuple[];
}

export type QuestionsWithResponses = QuestionWithResponses[];
