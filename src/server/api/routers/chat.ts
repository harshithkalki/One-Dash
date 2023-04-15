import { prisma } from "~/server/db";
import { createTRPCRouter, protectedProcedure } from "~/server/api/trpc"
import { z } from "zod";


export const chatRouter = createTRPCRouter({
    sendMessage: protectedProcedure.input(z.object({
        message: z.string(),
        attachment: z.string().optional(),
        receiverId: z.string(),
    })).mutation(async ({ ctx, input }) => {

        const message = await prisma.message.create({
            data: {
                message: input.message,
                attachment: input.attachment,
                senderId: ctx.session.user.id,
                receiverId: input.receiverId,
            }
        })

        return message
    }),

})