export interface GetPostOptions {
  postId: number;
}

export interface GetManyPostsOptions {
  postIds: number[];
  search?: string;
  skip?: number;
  take?: number;
}
