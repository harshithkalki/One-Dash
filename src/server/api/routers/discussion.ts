import pusher from "~/server/common/pusher";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { Channels } from "~/constants";


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
                select: {
                    id: true,
                    User: {
                        select: {
                            id: true,
                        }
                    },
                    team: {
                        where: {
                            id: user.id,
                        },
                        select: {
                            id: true,
                        }
                    }
                }
            })

            if (!order) throw new TRPCError({
                message: "Order not found",
                code: "NOT_FOUND",
            })

            const isUserAllowed = order?.User.id === user.id || order?.team.find((team) => team.id === user.id) || user.role === "admin";

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

            await pusher.trigger(`private-${Channels[0]}-${order.id}`, "new-message", {
                ...discusstion,
                user: {
                    name: user.firstName,
                }
            })

            return discusstion;
        }),

})