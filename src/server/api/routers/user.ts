import { z } from "zod";
import * as bcrypt from "bcrypt";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const userRouter = createTRPCRouter({
  members: protectedProcedure.query(async ({ ctx }) => {
    const mem = await ctx.prisma.user.findMany();
    return mem;
  }),
});
