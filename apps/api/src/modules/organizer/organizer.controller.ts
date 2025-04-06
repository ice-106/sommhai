/* eslint-disable @typescript-eslint/no-explicit-any */
import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { OrganizerService } from './organizer.service';

function nullToUndefined(obj: any): any {
  if (obj === null || obj === undefined || typeof obj !== 'object') {
    return obj;
  }

  const result: any = Array.isArray(obj) ? [] : {};

  for (const key in obj) {
    const value = obj[key];
    result[key] = value === null ? undefined : typeof value === 'object' ? nullToUndefined(value) : value;
  }

  return result;
}

function safeEventObject(event: any) {
  const { date, time, ...restOfEvent } = event;

  return {
    ...restOfEvent,
    ...(date instanceof Date ? { date } : {}),
    ...(time instanceof Date ? { time } : {}),
  };
}

export const OrganizerController: RouterImplementation<typeof contract.organizer> = {
  getEvents: async ({ query: { type, date, before, status, take, skip } }) => {
    try {
      const events = await OrganizerService.getEvents({ type, date, before, status, take, skip });
      const nullsTransformed = nullToUndefined(events);

      const transformedEvents = nullsTransformed.map((event: any) => safeEventObject(event));

      return {
        status: 200,
        body: transformedEvents,
      };
    } catch (error) {
      console.error('Error fetching events:', error);
      return {
        status: 500,
        body: { message: 'Failed to fetch events' },
      };
    }
  },

  getEvent: async ({ params: { eventId } }) => {
    try {
      const eventData = await OrganizerService.getEvent({ eventId });
      const nullsTransformed = nullToUndefined(eventData);
      const event = nullsTransformed.Event;

      const fixedEvent = safeEventObject(event);

      return {
        status: 200,
        body: { Event: fixedEvent },
      };
    } catch (error) {
      console.error('Error fetching event:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return {
          status: 404,
          body: { message: error.message },
        };
      }
      return {
        status: 500,
        body: { message: 'Failed to fetch event' },
      };
    }
  },

  createEvent: async ({ body: { name } }) => {
    try {
      const eventData = await OrganizerService.createEvent({ name });
      const nullsTransformed = nullToUndefined(eventData);
      const event = nullsTransformed.Event;

      const fixedEvent = safeEventObject(event);

      return {
        status: 200,
        body: { Event: fixedEvent },
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        status: 500,
        body: { message: 'Failed to create event' },
      };
    }
  },

  updateEventDetails: async ({
    params: { eventId },
    body: { name, date, description, invite_list, memory, location, time, picture },
  }) => {
    try {
      const eventData = await OrganizerService.updateEventDetails({
        eventId,
        name,
        date,
        description,
        invite_list,
        memory,
        location,
        time,
        picture: picture ?? [],
      });

      const nullsTransformed = nullToUndefined(eventData);
      const event = nullsTransformed.Event;

      const fixedEvent = safeEventObject(event);

      return {
        status: 200,
        body: { Event: fixedEvent },
      };
    } catch (error) {
      console.error('Error updating event details:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return {
          status: 404,
          body: { message: error.message },
        };
      }
      return {
        status: 500,
        body: { message: 'Failed to update event details' },
      };
    }
  },

  getEventDetails: async ({ params: { eventId } }) => {
    try {
      const eventData = await OrganizerService.getEventDetails({ eventId });
      const nullsTransformed = nullToUndefined(eventData);
      const event = nullsTransformed.Event;

      const fixedEvent = safeEventObject(event);

      return {
        status: 200,
        body: { Event: fixedEvent },
      };
    } catch (error) {
      console.error('Error fetching event details:', error);
      if (error instanceof Error && error.message.includes('not found')) {
        return {
          status: 404,
          body: { message: error.message },
        };
      }
      return {
        status: 500,
        body: { message: 'Failed to fetch event details' },
      };
    }
  },
};
