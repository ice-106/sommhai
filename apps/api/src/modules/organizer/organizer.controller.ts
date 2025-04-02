import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { OrganizerService } from './organizer.service';

export const OrganizerController: RouterImplementation<typeof contract.organizer> = {
  getEvents: async ({ query: { type, date, before, status, take, skip } }) => {
    try {
      const events = await OrganizerService.getEvents({ type, date, before, status, take, skip });
      return {
        status: 200,
        body: events,
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
      const event = await OrganizerService.getEvent({ eventId });
      return {
        status: 200,
        body: event,
      };
    } catch (error) {
      console.error('Error fetching event:', error);
      return {
        status: 500,
        body: { message: 'Failed to fetch event' },
      };
    }
  },
  createEvent: async ({ body: { name } }) => {
    try {
      const event = await OrganizerService.createEvent({ name });
      return {
        status: 200,
        body: event,
      };
    } catch (error) {
      console.error('Error creating event:', error);
      return {
        status: 500,
        body: { message: 'Failed to create event' },
      };
    }
  },
  updateEventDetails: async ({ body: { name, date, description, invite_list, memory, location, time, picture } }) => {
    try {
      const event = await OrganizerService.updateEventDetails({
        name,
        date,
        description,
        invite_list,
        memory,
        location,
        time,
        picture,
      });
      return {
        status: 200,
        body: event,
      };
    } catch (error) {
      console.error('Error updating event details:', error);
      return {
        status: 500,
        body: { message: 'Failed to update event details' },
      };
    }
  },
  getEventDetails: async ({ params: { eventId } }) => {
    try {
      const event = await OrganizerService.getEventDetails({ eventId });
      return {
        status: 200,
        body: event,
      };
    } catch (error) {
      console.error('Error fetching event details:', error);
      return {
        status: 500,
        body: { message: 'Failed to fetch event details' },
      };
    }
  },
};
