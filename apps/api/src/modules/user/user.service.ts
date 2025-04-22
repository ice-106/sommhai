import { Prisma } from '@prisma/client';

import { ConflictException, InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import { CreateUserOptions, GetManyUsersOptions, GetUserOptions, UpdateUserOptions } from './types';

export const UserService = {
  createUser: async ({ uid, username }: CreateUserOptions) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          uid,
          username,
        },
      });

      if (existingUser) {
        throw new ConflictException('User with this uid already exists');
      }

      const userData: Prisma.UserCreateInput = {
        uid,
        username,
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
        leaderboard: true,
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
        leaderboard: true,
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
        leaderboard: true,
      },
      orderBy: {
        username: 'asc',
      },
    });

    return { users, total };
  },
};
