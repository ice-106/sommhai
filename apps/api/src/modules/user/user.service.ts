import { Prisma } from '@prisma/client';

import { ConflictException, InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import {
  CreateUserHistoryOptions,
  CreateUserOptions,
  GetManyUsersOptions,
  GetUserHistoryOptions,
  GetUserOptions,
  UpdateUserOptions,
} from './types';

export const UserService = {
  createUser: async ({ uid, username, picture }: CreateUserOptions) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          uid,
          username,
          picture,
        },
      });

      if (existingUser) {
        throw new ConflictException('User with this uid already exists');
      }

      const userData: Prisma.UserCreateInput = {
        uid,
        username,
        picture,
      };

      const newUser = await prisma.user.create({
        data: userData,
        include: {},
      });

      return newUser;
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      console.error('Error creating user:', error);
      throw new InternalServerErrorException('Failed to create user');
    }
  },
  updateUser: async ({ uid, userData }: UpdateUserOptions) => {
    const existingUser = await prisma.user.findUnique({
      where: {
        uid,
      },
    });

    if (!existingUser) {
      throw new NotFoundException(`User with uid ${uid} not found`);
    }

    const updatedUser = await prisma.user.update({
      where: {
        uid,
      },
      data: userData,
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
        histories: true,
        creates: true,
        mediaTaken: true,
        invites: true,
        responses: true,
      },
    });

    return updatedUser;
  },
  getUser: async ({ uid }: GetUserOptions) => {
    const user = await prisma.user.findUnique({
      where: {
        uid,
      },
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
        histories: true,
        creates: true,
        mediaTaken: true,
        invites: true,
        responses: true,
      },
    });

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  },
  getUsers: async ({ search, skip, take }: GetManyUsersOptions) => {
    let whereCondition: Prisma.UserWhereInput = {};

    if (search) {
      whereCondition = {
        OR: [
          {
            uid: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            username: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
        ],
      };
    }

    const total = await prisma.user.count({
      where: whereCondition,
    });

    const users = await prisma.user.findMany({
      take,
      skip,
      where: whereCondition,
      include: {
        attendees: true,
        attendings: true,
        organizers: true,
        histories: true,
        creates: true,
        mediaTaken: true,
        invites: true,
        responses: true,
      },
      orderBy: {
        username: 'asc',
      },
    });

    return { users, total };
  },
  getUserHistory: async ({ uid, take, skip }: GetUserHistoryOptions) => {
    try {
      const user = await prisma.user.findUnique({
        where: { uid },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${uid} not found`);
      }

      const historyEntries = await prisma.history.findMany({
        where: { uid },
        take,
        skip,
        include: {
          event: true,
        },
        orderBy: {
          event: {
            date: 'desc',
          },
        },
      });

      const simplifiedEvents = historyEntries.map((entry) => ({
        eid: entry.eid,
        uid: entry.uid,
        name: entry.event.name,
        date: entry.event.date,
      }));

      return {
        simplifiedEvents,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error getting user history:', error);
      throw new InternalServerErrorException(error, 'Failed to get user history');
    }
  },
  createUserHistory: async ({ uid, eid }: CreateUserHistoryOptions) => {
    try {
      const user = await prisma.user.findUnique({
        where: { uid },
      });

      if (!user) {
        throw new NotFoundException(`User with ID ${uid} not found`);
      }

      const existingEntry = await prisma.history.findUnique({
        where: {
          eid_uid: {
            uid,
            eid,
          },
        },
      });
      if (existingEntry) {
        throw new ConflictException('User history entry already exists');
      }

      const event = await prisma.event.findUnique({
        where: { eid },
        select: {
          name: true,
          date: true,
        },
      });

      if (!event) {
        throw new NotFoundException(`Event with ID ${eid} not found`);
      }

      const historyEntry = await prisma.history.create({
        data: {
          uid,
          eid,
        },
      });

      if (historyEntry) {
        await prisma.event.update({
          where: { eid: eid },
          data: {
            status: 'Completed',
          },
        });
      }

      if (!historyEntry) {
        throw new InternalServerErrorException('Failed to create user history');
      }

      return {
        eid,
        uid,
        name: event.name,
        date: event.date,
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      console.error('Error creating user history:', error);
      throw new InternalServerErrorException(error, 'Failed to create user history');
    }
  },
};
