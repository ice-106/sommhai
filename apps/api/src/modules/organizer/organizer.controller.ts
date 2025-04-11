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
  getEvents: async ({ query: { search, date, take, skip, status } }) => {
    const events = await OrganizerService.getEvents({ search, date, take, skip, status });

    return {
      status: 200,
      body: events.map((event) => OrganizerAdapter.toEventOrganizerInfo(event)),
    };
  },
  createEvent: async ({ body: { name } }) => {
    const newEvent = await OrganizerService.createEvent({
      event: {
        name,
        date: new Date(),
        time: new Date(),
        location: '',
        description: '',
        invite_list: 0,
        memory: '',
        picture: [],
        host: '',
        host_uid: '',
        status: 'Upcoming',
      },
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
    await OrganizerService.updateEventDetails({
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
};
