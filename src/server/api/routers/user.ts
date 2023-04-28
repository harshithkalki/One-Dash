import { z } from "zod";
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { transporter } from "~/config/nodemailer";
import * as bcrypt from "bcrypt";
import pusher from "~/server/common/pusher";
import { Channels } from "~/constants";

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
  me: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    });
    if (!user) {
      throw new TRPCError({
        message: "User not found",
        code: "NOT_FOUND",
      });
    } else {
      return user;
    }
  }),
  updateMe: protectedProcedure
    .input(
      z.object({
        firstName: z.string(),
        lastName: z.string(),
        email: z.string(),
        phone: z.string(),
        address: z.string(),
        city: z.string(),
        state: z.string(),
        zipcode: z.string(),
        country: z.string(),
        companyName: z.string(),
        addressFirstname: z.string(),
        addressLastname: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.update({
        where: {
          id: ctx.session.user.id,
        },
        data: {
          firstName: input.firstName,
          lastName: input.lastName,
          email: input.email,
          phone: input.phone,
          address: input.address,
          city: input.city,
          state: input.state,
          zipcode: input.zipcode,
          country: input.country,
          companyName: input.companyName,
          addressFirstname: input.addressFirstname,
          addressLastname: input.addressLastname,
        },
      });
      if (!user) {
        throw new TRPCError({
          message: "User not found",
          code: "NOT_FOUND",
        });
      } else {
        return user;
      }
    }),

  message: protectedProcedure
    .input(
      z.object({
        message: z.string(),
        to: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const room = (
        await ctx.prisma.privateChat.findMany({
          where: {
            OR: [
              {
                user1Id: input.to,
                user2Id: ctx.session.user.id,
              },
              {
                user1Id: ctx.session.user.id,
                user2Id: input.to,
              },
            ],
          },
        })
      ).pop();

      let roomId: string;

      if (!room) {
        const newRoom = await ctx.prisma.privateChat.create({
          data: {
            user1Id: ctx.session.user.id,
            user2Id: input.to,
          },
        });

        roomId = newRoom.id;
      } else {
        roomId = room.id;
      }

      const message = await ctx.prisma.message.create({
        data: {
          message: input.message,
          senderId: ctx.session.user.id,
          receiverId: input.to,
          privateChatId: roomId,
        },
      });

      await pusher.trigger(
        `private-${Channels[1]}-${roomId}`,
        "new-message",
        message
      );

      return message;
    }),

  allUsers: protectedProcedure.query(async ({ ctx }) => {
    const users = await ctx.prisma.user.findMany({
      where: {
        // role: "client",
      },
      include: {
        receivedMessages: {
          where: {
            OR: [
              {
                receiverId: ctx.session.user.id,
              },
              {
                senderId: ctx.session.user.id,
              },
            ],
          },
          orderBy: {
            createdAt: "desc",
          },
          take: 1,
        },
      },
    });

    return users;
  }),

  messages: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.string().nullish(),
        receiverId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const messages = await ctx.prisma.message.findMany({
        where: {
          OR: [
            {
              senderId: ctx.session.user.id,
              receiverId: input.receiverId,
            },
            {
              senderId: input.receiverId,
              receiverId: ctx.session.user.id,
            },
          ],
        },
        orderBy: {
          createdAt: "desc",
        },
        take: input.limit,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        skip: input.cursor ? 1 : undefined,
      });

      return {
        messages: messages,
        cursor:
          input.limit === messages.length
            ? messages[messages.length - 1]?.id
            : null,
      };
    }),

  getRoom: protectedProcedure
    .input(
      z.object({
        userId: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const room = (
        await ctx.prisma.privateChat.findMany({
          where: {
            OR: [
              {
                user1Id: input.userId,
                user2Id: ctx.session.user.id,
              },
              {
                user1Id: ctx.session.user.id,
                user2Id: input.userId,
              },
            ],
          },
        })
      ).pop();

      return room ?? null;
    }),

  updateToSeen: protectedProcedure
    .input(
      z.object({
        user2Id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const room = (
        await ctx.prisma.privateChat.findMany({
          where: {
            OR: [
              {
                user1Id: input.user2Id,
                user2Id: ctx.session.user.id,
              },
              {
                user1Id: ctx.session.user.id,
                user2Id: input.user2Id,
              },
            ],
          },
        })
      ).pop();

      if (!room) {
        return false;
      }

      await ctx.prisma.message.updateMany({
        where: {
          receiverId: ctx.session.user.id,
          privateChatId: room?.id,
          isRead: false,
        },
        data: {
          isRead: true,
        },
      });

      await pusher.trigger(`private-${Channels[1]}-${room?.id}`, "seen", {
        senderId: ctx.session.user.id,
      });

      return true;
    }),

  notifications: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const notifications = await ctx.prisma.notification.findMany({
        take: input.limit,
        skip: input.cursor ? 1 : 0,
        cursor: input.cursor
          ? {
              id: input.cursor,
            }
          : undefined,
        where: {
          userId: ctx.session.user.id,
        },
        orderBy: {
          createdAt: "desc",
        },
      });

      return {
        notifications: notifications,
        cursor:
          input.limit === notifications.length
            ? notifications[notifications.length - 1]?.id
            : null,
      };
    }),

  customers: protectedProcedure.query(async ({ ctx }) => {
    const customers = await ctx.prisma.user.findMany({
      where: {
        role: "client",
      },
      include: {
        orders: true,
      },
    });

    return customers;
  }),
  getUser: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const user = await ctx.prisma.user.findUnique({
        where: {
          id: input.id,
        },
      });

      return user;
    }),
  inviteUser: protectedProcedure
    .input(
      z.object({
        email: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const res = await transporter.sendMail({
        from: "test-mail-dev@3dcontentstudio.com",
        to: input.email,
        subject: "You are invited to sigup for 3dContentStudio",
        html: "<h1>Click <a href='http://localhost:3000/signup'>here</a> to signup</h1>",
      });
      console.log(res);
      return true;
    }),
});
