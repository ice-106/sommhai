/* eslint-disable @typescript-eslint/no-explicit-any */
import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { OrganizerService } from './organizer.service';

// Runtime utility to convert nulls to undefined
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

// Properly map event objects to the expected structure
function mapToEventStructure(event: any) {
  return {
    eid: event.eid,
    name: event.name,
    picture: event.picture || [],
    host: event.host,
    host_uid: event.host_uid,
    // Convert date strings/objects to actual Date objects
    date: event.date ? new Date(event.date) : undefined,
    time: event.time ? new Date(event.time) : undefined,
    location: event.location,
    description: event.description,
    invite_list: event.invite_list,
    memory: event.memory,
    // Only include these if they exist in the object
    ...(event.attendees && { attendees: event.attendees }),
    ...(event.organizers && { organizers: event.organizers }),
    ...(event.attending && { attending: event.attending }),
  };
}

export const OrganizerController: RouterImplementation<typeof contract.organizer> = {
  getEvents: async ({ query: { type, date, before, status, take, skip } }) => {
    try {
      const events = await OrganizerService.getEvents({ type, date, before, status, take, skip });

      // First convert nulls to undefined
      const nullsTransformed = nullToUndefined(events);

      // Then map to the expected structure
      const transformedEvents = nullsTransformed.map(mapToEventStructure);

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

      // Convert nulls to undefined
      const nullsTransformed = nullToUndefined(eventData);

      // Get the Event object
      const event = nullsTransformed.Event;

      // Debug the date and time values
      console.log('Original date value:', event.date);
      console.log('Original time value:', event.time);

      // Create a proper Date object for date and time
      // If the date is already a string in ISO format, this will handle it
      // If it's a Date object that's been serialized, this will create a new valid Date
      // If it's a timestamp number, this will also work
      const fixedEvent = {
        ...event,
        date: event.date ? new Date(typeof event.date === 'string' ? event.date : event.date.toString()) : undefined,
        time: event.time ? new Date(typeof event.time === 'string' ? event.time : event.time.toString()) : undefined,
      };

      // Debug the fixed date values
      console.log('Fixed date value:', fixedEvent.date);
      console.log('Fixed time value:', fixedEvent.time);

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

      // Convert nulls to undefined
      const nullsTransformed = nullToUndefined(eventData);

      // Get the Event object
      const event = nullsTransformed.Event;

      // Map to expected structure
      const transformedEvent = mapToEventStructure(event);

      return {
        status: 200,
        body: { Event: transformedEvent },
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

      // Convert nulls to undefined
      const nullsTransformed = nullToUndefined(eventData);

      // Get the Event object
      const event = nullsTransformed.Event;

      // Map to expected structure
      const transformedEvent = mapToEventStructure(event);

      return {
        status: 200,
        body: { Event: transformedEvent },
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

      // Convert nulls to undefined
      const nullsTransformed = nullToUndefined(eventData);

      // Get the Event object
      const event = nullsTransformed.Event;

      // Map to expected structure
      const transformedEvent = mapToEventStructure(event);

      return {
        status: 200,
        body: { Event: transformedEvent },
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
