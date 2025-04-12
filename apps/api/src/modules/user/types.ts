import { Prisma } from '@prisma/client';

export interface GetUserOptions {
  userId: string;
}

export interface GetManyUsersOptions {
  search?: string;
  skip?: number;
  take?: number;
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
