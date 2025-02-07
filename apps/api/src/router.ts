import { contract } from "@sommhai/api-contract";
import { initServer } from "@ts-rest/express";
import { PostController } from "./modules/post/post.controller";
import { RouterImplementation } from "@ts-rest/express/src/lib/types";

const s = initServer();

export const router: RouterImplementation<typeof contract> = s.router(
  contract,
  {
    post: PostController,
  }
);
