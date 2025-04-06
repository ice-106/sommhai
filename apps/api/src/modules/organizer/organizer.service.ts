/* eslint-disable @typescript-eslint/no-explicit-any */
import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateEventOptions,
  GetEventDetailsOptions,
  GetEventOptions,
  GetManyEventsOptions,
  UpdateEventDetailsOptions,
} from './types';

export const OrganizerService = {
  getEvents: async ({ type, date, before, status, take = 10, skip = 0 }: GetManyEventsOptions) => {
    try {
      const filter: any = {};

      if (type) {
        filter.type = type;
      }

      if (date) {
        filter.date = date;
      }

      if (status) {
        filter.status = status;
      }

      if (before) {
        filter.date = {
          lt: before,
        };
      }

      const events = await prisma.event.findMany({
        where: filter,
        take,
        skip,
        orderBy: {
          date: 'desc',
        },
      });

      return events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw new InternalServerErrorException('Failed to fetch events');
    }
  },
  getEvent: async ({ eventId }: GetEventOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: {
          eid: eventId,
        },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      return { Event: event };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching unique event:', error);
      throw new InternalServerErrorException('Failed to fetch event');
    }
  },
  createEvent: async ({ name }: CreateEventOptions) => {
    try {
      const event = await prisma.event.create({
        data: {
          name: name,
          date: new Date(),
          time: new Date(),
          picture: [],
          location: '',
          description: '',
          invite_list: 0,
          memory: '',
          host: '',
          host_uid: '',
        },
      });

      return { Event: event };
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerErrorException('Failed to create event');
    }
  },
  updateEventDetails: async ({
    eventId,
    name,
    date,
    description,
    invite_list,
    memory,
    location,
    time,
    picture,
  }: UpdateEventDetailsOptions) => {
    try {
      const existingEvent = await prisma.event.findUnique({
        where: {
          eid: eventId,
        },
      });

      if (!existingEvent) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const updateData: any = {};

      if (name !== undefined) updateData.name = name;
      if (date !== undefined) updateData.date.toLocaleDateString = date;
      if (description !== undefined) updateData.description = description;
      if (invite_list !== undefined) updateData.invite_list = invite_list;
      if (memory !== undefined) updateData.memory = memory;
      if (location !== undefined) updateData.location = location;
      if (time !== undefined) updateData.time = time;
      if (picture !== undefined) updateData.picture = picture;

      const updatedEvent = await prisma.event.update({
        where: {
          eid: eventId,
        },
        data: updateData,
      });

      return { Event: updatedEvent };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating event details:', error);
      throw new InternalServerErrorException('Failed to update event details');
    }
  },

  getEventDetails: async ({ eventId }: GetEventDetailsOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: {
          eid: eventId,
        },
        include: {
          attendees: true,
          organizers: true,
        },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      return { Event: event };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error fetching event details:', error);
      throw new InternalServerErrorException('Failed to fetch event details');
    }
  },
};
