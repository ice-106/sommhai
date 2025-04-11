import { Prisma } from '@prisma/client';

import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import { GetEventOptions, GetManyEventsOptions } from './types';

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
  createEvent: async ({ event }: { event: Prisma.EventUncheckedCreateInput }) => {
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
          ...event,
          host: testUser.pref_name,
          host_uid: testUser.uid,
          status: 'Upcoming',
          attendees: {
            create: [
              {
                uid: testUser.uid,
              },
            ],
          },
        },
      });
    } catch (error) {
      console.error('Error creating event:', error);
      throw new InternalServerErrorException('Failed to create event');
    }
  },
  updateEventDetails: async ({ eventId, event }: { eventId: string; event: Prisma.EventUncheckedUpdateInput }) => {
    try {
      return await prisma.event.update({
        where: {
          eid: eventId,
        },
        data: { ...event },
      });
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error updating event details:', error);
      throw new InternalServerErrorException('Failed to update event details');
    }
  },
};
