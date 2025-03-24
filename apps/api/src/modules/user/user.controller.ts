import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { InternalServerErrorException } from '../../common/exception/http';
import { prisma } from '../../common/libs/prisma';
import { UserService } from './user.service';

export const UserController: RouterImplementation<typeof contract.user> = {
  createUser: async () => {
    throw new InternalServerErrorException('Not implemented');
  },
  getUser: async ({ params: { userId } }) => {
    const user = UserService.getUser({
      userId,
    });
    throw new InternalServerErrorException('Not implemented');
  },
  getUsers: async ({ query: { userIds, search, skip, take } }) => {
    prisma.user.findMany();
    // const users = await Service.getManyUsers({ userIds, search, skip, take });
    return {
      status: 200,
      body: {
        users: [
          {
            id: 1,
            user: 'User 1',
            email: 'user1@example.com',
            description: 'Content 1',
          },
          {
            id: 2,
            user: 'User 2',
            email: 'user2@example.com',
            description: 'Content 2',
          },
          {
            id: 3,
            user: 'User 3',
            email: 'user3@example.com',
            description: 'Content 3',
          },
          {
            id: 4,
            user: 'User 4',
            email: 'user4@example.com',
            description: 'Content 4',
          },
        ],
        total: 2,
      },
    };
  },
};
