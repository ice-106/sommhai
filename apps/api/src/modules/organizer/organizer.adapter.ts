import { EventQuestion } from '@prisma/client';

import { EventEntity, InviteEntity } from './types';

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
};
