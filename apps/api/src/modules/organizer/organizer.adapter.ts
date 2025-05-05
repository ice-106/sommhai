import { EventQuestion } from '@prisma/client';

import { EventEntity, InviteEntity, QuestionsWithResponses, QuestionWithResponses } from './types';

export const OrganizerAdapter = {
  toEventOrganizerInfo: (event: EventEntity) => {
    return {
      eid: event.eid,
      name: event.name,
      date: event.date,
      time: event.time,
      picture: event.picture,
      location: event.location,
      description: event.description,
      invite_list: event.invite_list,
      memory: event.memory,
      host: event.host,
      host_uid: event.host_uid,
      host_picture: event.hostUser?.picture,
      attendees: event.attendees,
      attendings: event.attendings,
      organizers: event.organizers,
      status: event.status,
      message: event.message,
    };
  },
  toEventInviteInfo: (invite: InviteEntity) => {
    return {
      inviteId: invite.id,
      eventId: invite.eventId,
      userId: invite.userId,
      role: invite.role,
      accept: invite.accept,
    };
  },
  toEventQuestionInfo: (question: EventQuestion) => {
    return {
      qid: question.id,
      eventId: question.eventId,
      question: question.question,
      type: question.type,
      required: question.required,
      options: question.options,
      createdAt: question.createdAt,
      updatedAt: question.updatedAt,
    };
  },

  toEventQuestionWithResponses: (data: QuestionWithResponses) => {
    return {
      qid: data.question.id,
      eventId: data.question.eventId,
      question: data.question.question,
      type: data.question.type,
      required: data.question.required,
      options: data.question.options,
      createdAt: data.question.createdAt,
      updatedAt: data.question.updatedAt,
      responses: data.responses,
    };
  },

  toEventQuestionsWithResponses: (data: QuestionsWithResponses) => {
    return data.map((item) => ({
      qid: item.question.id,
      eventId: item.question.eventId,
      question: item.question.question,
      type: item.question.type,
      required: item.question.required,
      options: item.question.options,
      createdAt: item.question.createdAt,
      updatedAt: item.question.updatedAt,
      responses: item.responses,
    }));
  },
};
