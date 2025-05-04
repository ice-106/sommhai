import { contract } from '@sommhai/api-contract';
import { RouterImplementation } from '@ts-rest/express/src/lib/types';

import { UserAdapter } from './user.adapter';
import { UserService } from './user.service';

export const UserController: RouterImplementation<typeof contract.user> = {
  createUser: async ({ body }) => {
    const newUser = await UserService.createUser({
      username: body.username,
      uid: body.uid,
      picture: body.picture,
    });

    return {
      status: 201,
      body: UserAdapter.toUserInfo(newUser),
    };
  },
  updateUser: async ({ params: { uid }, body }) => {
    const updatedUser = await UserService.updateUser({
      uid,
      userData: body,
    });
    return {
      status: 204,
      body: UserAdapter.toUserInfo(updatedUser),
    };
  },
  getUser: async ({ params: { uid } }) => {
    const user = await UserService.getUser({ uid });
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
  getUserHistory: async ({ params: { uid }, query: { search, skip, take } }) => {
    const history = await UserService.getUserHistory({ search, uid, skip, take });
    return {
      status: 200,
      body: history.simplifiedEvents,
    };
  },
  createUserHistory: async ({ body: { eid, uid } }) => {
    const history = await UserService.createUserHistory({ eid, uid });
    return {
      status: 201,
      body: history,
    };
  },
};
