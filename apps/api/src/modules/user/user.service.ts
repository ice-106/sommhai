import { InternalServerErrorException } from '../../common/exception/http';
import { GetManyUsersOptions, GetUserOptions } from './types';

export const UserService = {
  createUser: async () => {
    throw new InternalServerErrorException('Not implemented');
  },
  getUser: async ({ userId }: GetUserOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
  getManyUsers: async ({ userIds, search, skip, take }: GetManyUsersOptions) => {
    throw new InternalServerErrorException('Not implemented');
  },
};
