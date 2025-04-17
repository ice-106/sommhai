import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { AttendeeAdapter } from './attendee.adapter';
import { AttendeeService } from './attendee.service';

export const AttendeeController: RouterImplementation<typeof contract.attendee> = {
  getatdEvent: async ({ params: { eventId } }) => {
    const event = await AttendeeService.getatdEvent({ eventId });

    return {
      status: 200,
      body: AttendeeAdapter.toEventAttendeeInfo(event),
    };
  },
  getatdEvents: async ({ query: { search, date, take, skip, status } }) => {
    const events = await AttendeeService.getatdEvents({ search, date, take, skip, status });

    return {
      status: 200,
      body: events.map((event) => AttendeeAdapter.toEventAttendeeInfo(event)),
    };
  },
};
