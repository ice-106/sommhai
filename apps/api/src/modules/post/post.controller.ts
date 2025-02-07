import { contract } from "@sommhai/api-contract";
import { InternalServerErrorException } from "../../common/exception/http";
import { RouterImplementation } from "@ts-rest/express/src/lib/types";

export const PostController: RouterImplementation<typeof contract.post> = {
  createPost: async () => {
    throw new InternalServerErrorException("Not implemented");
  },
  getPosts: async ({ query: { search, skip, take }, res }) => {
    throw new InternalServerErrorException("Not implemented");
  },
};
