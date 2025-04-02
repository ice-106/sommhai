import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { InternalServerErrorException } from '../../common/exception/http';
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
    try {
      // Replace the hardcoded return with actual data that matches your schema
      const users = (await UserService.getManyUsers({ userIds, search, skip, take })) as Array<{
        uid?: string;
        id?: number;
        user: string;
        email: string;
        dob?: string;
        pref_name?: string;
        first_name?: string;
        last_name?: string;
        payment_method?: string;
        subscription_plan?: string;
      }>;

      return {
        status: 200,
        body: {
          users: users.map((user) => ({
            uid: user.uid || String(user.id), // Convert id to uid if needed
            user: user.user,
            email: user.email,
            dob: user.dob || new Date().toISOString(), // Provide defaults for required fields
            pref_name: user.pref_name || user.user,
            first_name: user.first_name || '',
            last_name: user.last_name || '',
            payment_method: user.payment_method || '',
            subscription_plan: user.subscription_plan || 'free',
          })),
          total: users.length,
        },
      };
    } catch (error) {
      console.error('Error fetching users:', error);
      return {
        status: 500,
        body: { message: 'Failed to fetch users' },
      };
    }
  },
};
