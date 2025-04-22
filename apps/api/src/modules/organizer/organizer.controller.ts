import { InviteRole, QuestionType } from '@prisma/client';
import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { OrganizerAdapter } from './organizer.adapter';
import { OrganizerService } from './organizer.service';

export const OrganizerController: RouterImplementation<typeof contract.organizer> = {
  getEvent: async ({ params: { eventId } }) => {
    const event = await OrganizerService.getEvent({ eventId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventOrganizerInfo(event),
    };
  },
  getEvents: async ({ query: { search, date, take, skip, status, userId } }) => {
    const events = await OrganizerService.getEvents({ search, date, take, skip, status, userId });

    return {
      status: 200,
      body: events.map((event) => OrganizerAdapter.toEventOrganizerInfo(event)),
    };
  },
  createEvent: async ({ body: { uid, name } }) => {
    const newEvent = await OrganizerService.createEvent({
      uid,
      name,
    });

    const event = await OrganizerService.getEvent({ eventId: newEvent.eid });

    return {
      status: 201,
      body: event,
    };
  },

  updateEvent: async ({
    params: { eventId },
    body: { name, date, description, invite_list, memory, location, time, picture },
  }) => {
    await OrganizerService.updateEvent({
      eventId,
      event: {
        name,
        date,
        description,
        invite_list,
        memory,
        location,
        time,
        picture: picture ?? [],
      },
    });

    const event = await OrganizerService.getEvent({ eventId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventOrganizerInfo(event),
    };
  },
  deleteEvent: async ({ params: { eventId } }) => {
    const event = await OrganizerService.getEvent({ eventId });
    await OrganizerService.deleteEvent({ eventId });

    return {
      status: 204,
      body: OrganizerAdapter.toEventOrganizerInfo(event),
    };
  },
  inviteAttendees: async ({ params: { eventId }, body: { uids } }) => {
    const result = await OrganizerService.createInvites({
      eventId,
      userIds: uids,
      role: InviteRole.ATTENDEE,
    });

    return {
      status: 201,
      body: result,
    };
  },

  inviteOrganizers: async ({ params: { eventId }, body: { uids } }) => {
    const result = await OrganizerService.createInvites({
      eventId,
      userIds: uids,
      role: InviteRole.ORGANIZER,
    });

    return {
      status: 201,
      body: result,
    };
  },
  getEventInvites: async ({ params: { eventId }, query: { role, accept, take, skip } }) => {
    let inviteRole: InviteRole | undefined;
    if (role) {
      inviteRole = role === 'ATTENDEE' ? InviteRole.ATTENDEE : InviteRole.ORGANIZER;
    }

    const result = await OrganizerService.getEventInvites({
      eventId,
      role: inviteRole,
      accept: accept,
      take: take ? Number(take) : undefined,
      skip: skip ? Number(skip) : undefined,
    });

    return {
      status: 200,
      body: result.map((invite) => OrganizerAdapter.toEventInviteInfo(invite)),
    };
  },
  getEventInvite: async ({ params: { eventId, inviteId } }) => {
    const result = await OrganizerService.getEventInvite({ eventId, inviteId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventInviteInfo(result),
    };
  },
  deleteEventInvite: async ({ params: { eventId }, body: { inviteIds } }) => {
    const results = await OrganizerService.deleteEventInvite({
      eventId,
      inviteIds,
    });

    return {
      status: 200,
      body: results.map((result) => OrganizerAdapter.toEventInviteInfo(result)),
    };
  },
  respondOrganizerInvite: async ({ params: { inviteId }, body: { accept } }) => {
    const result = await OrganizerService.respondToInvite({
      inviteId,
      accept: accept ?? false,
    });

    return {
      status: 200,
      body: result,
    };
  },
  getEventQuestions: async ({ params: { eventId } }) => {
    const questions = await OrganizerService.getEventQuestions({ eventId });
    return {
      status: 200,
      body: questions.map((questions) => OrganizerAdapter.toEventQuestionInfo(questions)),
    };
  },
  getEventQuestion: async ({ params: { eventId, questionId } }) => {
    const question = await OrganizerService.getEventQuestion({ eventId, questionId });

    return {
      status: 200,
      body: OrganizerAdapter.toEventQuestionInfo(question),
    };
  },
  createEventQuestions: async ({ params: { eventId }, body: { questions } }) => {
    const createdQuestions = await OrganizerService.createEventQuestions({
      eventId,
      questions: questions.map((q) => ({
        question: q.question,
        type: q.type as QuestionType,
        required: q.required,
        options: q.options,
      })),
    });

    return {
      status: 201,
      body: createdQuestions.map((q) => OrganizerAdapter.toEventQuestionInfo(q)),
    };
  },
  updateEventQuestion: async ({ params: { eventId, questionId }, body: { question, type, required, options } }) => {
    const updatedQuestion = await OrganizerService.updateEventQuestion({
      eventId,
      questionId,
      question: question ?? '',
      type: type as QuestionType,
      required: required ?? false,
      options,
    });

    return {
      status: 200,
      body: OrganizerAdapter.toEventQuestionInfo(updatedQuestion),
    };
  },
  deleteEventQuestion: async ({ params: { eventId, questionId } }) => {
    const deletedQuestion = await OrganizerService.deleteEventQuestion({
      eventId,
      questionId,
    });

    return {
      status: 200,
      body: OrganizerAdapter.toEventQuestionInfo(deletedQuestion),
    };
  },
  deleteEventQuestions: async ({ params: { eventId }, body: { questionIds } }) => {
    const deletedQuestions = await OrganizerService.deleteEventQuestions({
      eventId,
      questionIds,
    });
    return {
      status: 200,
      body: deletedQuestions.map((q) => OrganizerAdapter.toEventQuestionInfo(q)),
    };
  },
  deleteAllEventQuestions: async ({ params: { eventId } }: { params: { eventId: string } }) => {
    const deletedQuestions = await OrganizerService.deleteAllEventQuestions({ eventId });

    return {
      status: 200,
      body: deletedQuestions.map((q) => OrganizerAdapter.toEventQuestionInfo(q)),
    };
  },
  getLeaderboard: async ({ params: { eventId } }) => {
    const leaderboard = await OrganizerService.getEventLeaderboard({ eventId });

    return {
      status: 200,
      body: leaderboard.map((entry) => OrganizerAdapter.toLeaderboardEntry(entry)),
    };
  },

  createLeaderboard: async ({ params: { eventId }, body: { uid, score } }) => {
    const newEntry = await OrganizerService.createLeaderboard({
      eventId,
      uid,
      score,
    });

    return {
      status: 201,
      body: OrganizerAdapter.toLeaderboardEntry(newEntry),
    };
  },

  updateLeaderboard: async ({ params: { eventId, entryId }, body: { uid, score } }) => {
    const updatedEntry = await OrganizerService.updateLeaderboard({
      eventId,
      entryId,
      updates: {
        uid,
        score,
      },
    });

    return {
      status: 200,
      body: OrganizerAdapter.toLeaderboardEntry(updatedEntry),
    };
  },

  deleteLeaderboardEntry: async ({ params: { eventId, entryId } }) => {
    const deletedEntry = await OrganizerService.deleteLeaderboardEntry({ eventId, entryId });

    return {
      status: 204,
      body: OrganizerAdapter.toLeaderboardEntry(deletedEntry),
    };
  },
};
