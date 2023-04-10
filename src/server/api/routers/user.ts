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
  teamMembers: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        teamMembers: true,
      },
    });
    if (!user) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    } else {
      const team = user?.teamMembers;
      return team;
    }
  }),
  notTeamMembers: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findMany({
      where: {
        NOT: {
          id: ctx.session.user.id,
        },
        AND: {
          NOT: {
            heads: {
              some: {
                id: ctx.session.user.id,
              },
            },
          },
        },
      },
    });
  }),
  addTeamMember: protectedProcedure
    .input(z.object({ id: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: ctx.session.user.id,
        },
        include: {
          teamMembers: true,
        },
      });
      const teamMember = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      if (!user || !teamMember) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      } else {
        const team = user?.teamMembers;
        return await ctx.prisma.user.update({
          where: {
            id: ctx.session.user.id,
          },
          data: {
            teamMembers: {
              connect: {
                id: input.id,
              },
            },
          },
        });
      }
    }),
});
