import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { transporter } from "~/config/nodemailer";
import * as bcrypt from "bcrypt";

export const userRouter = createTRPCRouter({
  members: protectedProcedure.query(async ({ ctx }) => {
    const mem = await ctx.prisma.user.findMany({
      where: {
        role: "client",
      },
    });
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
        role: "client",
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

  removeTeamMember: protectedProcedure
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
              disconnect: {
                id: input.id,
              },
            },
          },
        });
      }
    }),

  signup: publicProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.create({
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          emailVerified: true,
        },
      });
      const pass = bcrypt.hashSync("123456", 12);

      const Credentials = await ctx.prisma.credentials.create({
        data: {
          userID: user.id,
          password: pass,
        },
      });
      const res = await transporter.sendMail({
        from: "test-mail-dev@3dcontentstudio.com",
        to: input.email,
        subject: "thanks for siging up to 3dContentStudio",
        html: "<h1>thanks for siging up</h1> <p>your password is 123456</p>",
      });
      console.log(res);
      return user;
    }),
});
