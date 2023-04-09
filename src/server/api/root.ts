import { createTRPCRouter } from "~/server/api/trpc";
import { exampleRouter } from "~/server/api/routers/example";
import { loginRouter } from "~/server/api/routers/login";
import { userRouter } from "~/server/api/routers/user";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  example: exampleRouter,
  login: loginRouter,
  user: userRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
