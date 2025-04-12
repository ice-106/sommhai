import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { UserAdapter } from './user.adapter';
import { UserService } from './user.service';

export const UserController: RouterImplementation<typeof contract.user> = {
  createUser: async ({ body }) => {
    const newUser = await UserService.createUser({
      user: body.user,
      email: body.email,
    });

    return {
      status: 201,
      body: UserAdapter.toUserInfo(newUser),
    };
  },
  getUser: async ({ params: { userId } }) => {
    const user = await UserService.getUser({ userId });
    return {
      status: 200,
      body: UserAdapter.toUserInfo(user),
    };
  },
  getUsers: async ({ query: { search, skip, take } }) => {
    const { users, total } = await UserService.getUsers({ search, skip, take });
    return {
      status: 200,
      body: {
        users: users.map((user) => UserAdapter.toUserInfo(user)),
        total,
      },
    };
  },
};
