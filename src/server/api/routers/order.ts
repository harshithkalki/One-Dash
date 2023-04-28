import { createNotification } from "~/utils/notification";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";

export const orderRouter = createTRPCRouter({
  createOrder: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        notes: z.string().optional(),
        referenceLinks: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {

      const order = await ctx.prisma.order.create({
        data: {
          name: input.name,
          type: input.type,
          notes: input.notes,
          referenceLinks: input.referenceLinks,
          PaymentStatus: "PENDING",
          userId: ctx.session.user.id,
        },
      });

      await createNotification(
        {
          userId: ctx.session.user.id,
          event: "orderCreated",
          message: `Order ${order.name} created`,
          sendNotification: true,
        }
      );

      return order;
    }),

  orders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: {
        userId: ctx.session.user.id,
      },
      include: {
        invoices: true,
      },
    });
    return orders;
  }),
  order: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.findUnique({
        where: {
          id: input.id,
        },
        include: {
          team: true,
          User: true,
        },
      });
      return order;
    }),
  update: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        notes: z.string().optional(),
        referenceLinks: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          type: input.type,
          notes: input.notes,
          referenceLinks: input.referenceLinks,
        },
      });
      return order;
    }),

  getQuoteCreate: protectedProcedure
    .input(
      z.object({
        name: z.string(),
        type: z.string(),
        notes: z.string().optional(),
        referenceLinks: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.create({
        data: {
          name: input.name,
          type: input.type,
          notes: input.notes,
          referenceLinks: input.referenceLinks,
          orderStatus: "pendingQuote",
          userId: ctx.session.user.id,
          PaymentStatus: "PENDING",
        },
        include: {
          team: {
            select: {
              id: true,
            }
          },

        }
      });

      const team = order.team.map((val) => val.id);
      team.push(ctx.session.user.id);
      team.push(order.userId);


      await createNotification(
        {
          userId: team,
          event: "orderCreated",
          message: `Order ${order.name} created`,
          sendNotification: true,
        }
      );

      return order;
    }),

  getQuoteUpdate: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        name: z.string(),
        type: z.string(),
        notes: z.string().optional(),
        referenceLinks: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          name: input.name,
          type: input.type,
          notes: input.notes,
          referenceLinks: input.referenceLinks,
          orderStatus: "pendingQuote",
        },
      });
      console.log(order);
      return order;
    }),
  addTeamMember: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        userId: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          team: {
            connect: {
              id: input.userId,
            },
          },
        },
      });
      return order;
    }),
  ordersSelect: protectedProcedure.query(async ({ ctx, input }) => {
    const orders = await ctx.prisma.order.findMany({
      include: {
        User: true,
        invoices: true,
      },
    });
    return orders;
  }),
  deliverOrder: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        notes: z.string().optional(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const delivery = await ctx.prisma.delivery.create({
        data: {
          notes: input.notes,
          orderId: input.id,
        },
      });
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          orderStatus: "deliverd",
        },
        select: {
          team: {
            select: {
              id: true,
            }
          },
          userId: true,
          name: true,
        }
      });

      const team = order.team.map((val) => val.id);
      team.push(ctx.session.user.id);
      team.push(order.userId);

      await createNotification({
        userId: [...new Set(team)],
        event: "deliveryCreated",
        message: `Delivery created for order ${order.name}`,
        sendNotification: true,
      });

      return delivery;
    }),
  allUserOrders: protectedProcedure.query(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
      include: {
        orders: true,
        teamOrders: true,
      },
    });
    if (!user) throw new Error("User not found");
    return [...user.orders, ...user.teamOrders];
  }),

  orderHistory: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const orderHistory = ctx.prisma.order.findUnique({
        where: { id: input.id },
        include: {
          discussions: {
            orderBy: {
              createdAt: "asc",
            },
          },
          invoices: {
            orderBy: {
              createdAt: "asc",
            },
          },
          deliveries: {
            orderBy: {
              createdAt: "asc",
            },
          },
        },
      });

      return orderHistory;
    }),

  orderPaginate: protectedProcedure
    .input(
      z.object({
        limit: z.number().default(10),
        cursor: z.string().nullish(),
      })
    )
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany({
        skip: input.cursor ? 1 : 0,
        take: input.limit,
        cursor: input.cursor ? { id: input.cursor } : undefined,
        orderBy: {
          createdAt: "desc",
        },
        include: {
          User: true,
        },
      });

      return {
        orders,
        cursor: orders[orders.length - 1]?.id,
      };
    }),
  getAllOrders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      orderBy: {
        createdAt: "desc",
      },
      where: {
        orderStatus: {
          notIn: ["DRAFT", "pendingQuote"],
        },
      },
      include: {
        User: true,
        invoices: true,
      },
    });

    return {
      orders,
    };
  }),
  getUserOrdersWithId: protectedProcedure

    .input(
      z.object({
        id: z.string(),
      })
    )
    .query(async ({ ctx, input }) => {
      const orders = await ctx.prisma.order.findMany({
        where: {
          userId: input.id,
        },
        include: {
          User: true,
          invoices: true,
        },
      });

      return {
        orders,
      };
    }),

  giveRating: protectedProcedure
    .input(
      z.object({
        id: z.string(),
        rating: z.number(),
        ratingComment: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          rating: input.rating,
          ratingComment: input.ratingComment,
          orderStatus: "completed",
        },
      });
      console.log(order);
      return order;
    }),

  Repair: protectedProcedure
    .input(
      z.object({
        id: z.string(),
      })
    )
    .mutation(async ({ ctx, input }) => {
      const order = await ctx.prisma.order.update({
        where: {
          id: input.id,
        },
        data: {
          orderStatus: "inRepair",
        },
      });
      console.log(order);
      return order;
    }),
});
