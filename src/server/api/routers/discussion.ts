import pusher from "~/server/common/pusher";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";


export const discussionRouter = createTRPCRouter({
    addMessage: protectedProcedure.
        input(z.object({
            orderId: z.string(),
            message: z.string(),
        })).mutation(async ({ ctx, input }) => {
            const { orderId, message } = input;
            const { user } = ctx.session;

            const order = await ctx.prisma.order.findUnique({
                where: {
                    id: orderId,
                },
                include: {
                    team: true,
                }
            })

            const isUserAllowed = order?.userId === user.id || order?.team.find((team) => team.id === user.id)

            if (!isUserAllowed) {
                throw new TRPCError({
                    message: "You are not allowed to add messages to this order",
                    code: "UNAUTHORIZED",
                })
            }

            const discusstion = await ctx.prisma.discussions.create({
                data: {
                    message: message,
                    orderId: orderId,
                    userId: user.id,
                }
            })

            await pusher.trigger(`order-${orderId}`, "new-message", {
                message: discusstion.message,
                user: {
                    id: user.id,
                }
            })

            return discusstion;
        }),

})