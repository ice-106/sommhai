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
  getEvents: async ({ search, date, take, skip }: GetManyEventsOptions) => {
    const events = await prisma.event.findMany({
      take,
      skip,
      where: {
        date,
        AND: {
          name: {
            contains: search,
            mode: 'insensitive',
          },
          description: {
            contains: search,
            mode: 'insensitive',
          },
        },
      },
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
      },

      orderBy: {
        date: 'desc',
      },
    });

    return events;
  },
  getEvent: async ({ eventId }: GetEventOptions) => {
    const event = await prisma.event.findUnique({
      where: {
        eid: eventId,
      },
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
      },
    });

    if (!event) {
      throw new NotFoundException(`Event not found`);
    }

    return event;
  },
  createEvent: async ({ name }: CreateEventOptions) => {
    try {
      let testUser = await prisma.user.findFirst();

      if (!testUser) {
        // Create a test user if none exists
        testUser = await prisma.user.create({
          data: {
            phone: '1234567890',
            email: 'test@example.com',
            dob: new Date(),
            pref_name: 'Test User',
            first_name: 'Test',
            last_name: 'User',
            subscription_plan: 'free',
          },
        });
      }

      return await prisma.event.create({
        data: {
          name: name,
          date: new Date(),
          time: new Date(),
          picture: [],
          location: '',
          description: '',
          invite_list: 0,
          memory: '',
          host: testUser.pref_name,
          host_uid: testUser.uid,
        },
      });
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
