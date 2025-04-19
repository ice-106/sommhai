/* eslint-disable unused-imports/no-unused-vars */
import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { InternalServerErrorException } from '../../common/exception/http';
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
  getAtdEvents: async ({ query: { search, date, take, skip, status } }) => {
    const events = await AttendeeService.getAtdEvents({ search, date, take, skip, status });

    return {
      status: 200,
      body: events.map((event) => AttendeeAdapter.toEventAttendeeInfo(event)),
    };
  },
  getAtdEventLeaderboard: async ({ params: { eventId } }) => {
    const leaderboard = await AttendeeService.getAtdEventLeaderboard({ eventId });
    return {
      status: 200,
      body: leaderboard.map((entry) => AttendeeAdapter.toLeaderboardEntry(entry)),
    };
  },
  respondAttendeeInvite: async ({ params: { inviteId }, body: { accept } }) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const response = await AttendeeService.respondToInvite({ inviteId, accept });
    throw new InternalServerErrorException('Not implemented');
  },
};
