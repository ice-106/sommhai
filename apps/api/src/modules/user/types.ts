import { Prisma } from '@prisma/client';

export interface GetUserOptions {
  uid: string;
}

export interface GetManyUsersOptions {
  search?: string;
  skip?: number;
  take?: number;
}

export interface CreateUserOptions {
  uid: string;
  username: string;
}

export interface UpdateUserOptions {
  uid: string;
  userData: {
    username?: string;
    phone?: string;
    email?: string;
    payment_method?: string;
    subscription_plan?: string;
  };
}

export type UserEntityFull = Prisma.UserGetPayload<{
  include: {
    attendees: true;
    attendings: true;
    organizers: true;
    histories: true;
    creates: true;
    mediaTaken: true;
    receives: true;
    leaderboards: true;
    attendeeInvitations: true;
    organizerInvitations: true;
  };
}>;

export type UserEntityBasic = Prisma.UserGetPayload<object>;

export type UserEntity = UserEntityFull | UserEntityBasic;
