import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { AttendeeAdapter } from './attendee.adapter';
import { AttendeeService } from './attendee.service';

export const AttendeeController: RouterImplementation<typeof contract.attendee> = {
  getAtdEvent: async ({ params: { eventId } }) => {
    const event = await AttendeeService.getAtdEvent({ eventId });

    return {
      status: 200,
      body: AttendeeAdapter.toEventAttendeeInfo(event),
    };
  },
  getAtdEvents: async ({ query: { search, date, take, skip, status, userId } }) => {
    const events = await AttendeeService.getAtdEvents({ search, date, take, skip, status, userId });

    return {
      status: 200,
      body: events.map((event) => AttendeeAdapter.toEventAttendeeInfo(event)),
    };
  },
  respondAttendeeInvite: async ({ params: { inviteId }, body: { accept } }) => {
    const result = await AttendeeService.respondToInvite({
      inviteId,
      accept: accept ?? false,
    });

    return {
      status: 200,
      body: result,
    };
  },
  respondAttendeeInviteWithQuestions: async ({ params: { inviteId }, body: { accepted, responses } }) => {
    const result = await AttendeeService.respondToInviteWithQuestions({
      inviteId,
      accepted,
      responses: responses.map((response) => ({
        ...response,
        answer: Array.isArray(response.answer) ? response.answer.join(', ') : (response.answer ?? ''),
      })),
    });

    return {
      status: 200,
      body: result,
    };
  },
  isAttending: async ({ params: { eventId }, query: { userId } }) => {
    const result = await AttendeeService.isAttending({ eventId, userId });

    return {
      status: 200,
      body: {
        isAttending: result.isAttending,
        inviteId: result.inviteId,
        userId,
        eventId,
      },
    };
  },
};
