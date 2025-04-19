import { InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import { GetEventLeaderboardOptions, GetEventOptions, GetManyEventsOptions, RespondToEventInviteOptions } from './types';

export const AttendeeService = {
  getAtdEvents: async ({ search, date, take, skip, status }: GetManyEventsOptions) => {
  getAtdEvents: async ({ search, date, take, skip, status }: GetManyEventsOptions) => {
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
          status: {
            contains: status,
            mode: 'insensitive',
          },
          status: {
            contains: status,
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
  getAtdEvent: async ({ eventId }: GetEventOptions) => {
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
  getAtdEventLeaderboard: async ({ eventId }: GetEventLeaderboardOptions) => {
    try {
      const event = await prisma.event.findUnique({
        where: { eid: eventId },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eventId} not found`);
      }

      const leaderboardEntries = await prisma.leaderboard.findMany({
        where: { eid: eventId },
        orderBy: { score: 'desc' },
      });

      return leaderboardEntries;
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting event leaderboard:', error);
      throw new InternalServerErrorException(error, 'Failed to get event leaderboard');
    }
  },
  respondToInvite: async ({ inviteId, accept }: RespondToEventInviteOptions) => {
    const response = await prisma.invite.update({
      where: {
        id: inviteId,
      },
      data: {
        accept,
      },
    });

    return response;
  },
};
