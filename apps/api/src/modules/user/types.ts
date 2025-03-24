export interface GetUserOptions {
  userId: number;
}

export interface GetManyUsersOptions {
  userIds: number[];
  search?: string;
  skip?: number;
  take?: number;
}
