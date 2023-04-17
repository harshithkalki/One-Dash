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
});
