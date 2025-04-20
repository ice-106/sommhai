import { Prisma } from '@prisma/client';

import { ConflictException, InternalServerErrorException, NotFoundException } from '../../common/exception/http';
import prisma from '../../common/libs/prisma';
import { GetManyUsersOptions, GetUserOptions } from './types';

export const UserService = {
  createUser: async ({ user, email }: { user: string; email: string }) => {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (existingUser) {
        throw new ConflictException('User with this email already exists');
      }

      const userData: Prisma.UserCreateInput = {
        email,
        pref_name: user,
        first_name: user.split(' ')[0] || user,
        last_name: user.split(' ').slice(1).join(' ') || '',
        phone: '',
        dob: new Date(),
        subscription_plan: 'Free',
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
  getUser: async ({ userId }: GetUserOptions) => {
    const user = await prisma.user.findUnique({
      where: {
        uid: userId,
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
            first_name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            last_name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            pref_name: {
              contains: search,
              mode: 'insensitive' as Prisma.QueryMode,
            },
          },
          {
            email: {
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
        pref_name: 'asc',
      },
    });

    return { users, total };
  },
};
