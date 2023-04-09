import { z } from "zod";
import * as bcrypt from "bcrypt";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";

export const loginRouter = createTRPCRouter({
  login: publicProcedure
    .input(z.object({ email: z.string(), password: z.string() }))
    .mutation(async ({ input, ctx }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });

      if (!user)
        throw new TRPCError({
          message: "Invalid email or password",
          code: "NOT_FOUND",
        });

      const cred = await ctx.prisma.credentials.findUnique({
        where: {
          userID: user.id,
        },
      });

      if (!cred) {
        throw new TRPCError({
          message: "Invalid email or password",
          code: "NOT_FOUND",
        });
      }

      const valid = await bcrypt.compare(input.password, cred.password);
      if (!valid) {
        throw new Error("Invalid password");
      }
      // console.log("userss", user);

      return user;
    }),

  Gmailregister: publicProcedure
    .input(
      z.object({
        email: z.string(),
        emailVerified: z.boolean(),
        firstName: z.string(),
        profile: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const existUser = await ctx.prisma.user.findUnique({
        where: {
          email: input.email,
        },
      });
      if (!existUser) {
        const user = await ctx.prisma.user.create({
          data: {
            email: input.email,
            emailVerified: input.emailVerified,
            firstName: input.firstName,
          },
        });
        return user;
      }
    }),
});
