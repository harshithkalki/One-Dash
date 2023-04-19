import { Prisma } from "@prisma/client";
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
      console.log("createOrderCalled");
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
      return order;
    }),

  orders: protectedProcedure.query(async ({ ctx }) => {
    const orders = await ctx.prisma.order.findMany({
      where: {
        userId: ctx.session.user.id,
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
      });
      console.log(order);
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
});
