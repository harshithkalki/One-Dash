import { type NotificationEvent } from "@prisma/client"
import { prisma } from "~/server/db"
import pusher from "~/server/common/pusher"

type Props = {
    event: NotificationEvent
    userId: string | string[]
    message: string
    sendNotification?: boolean
}

export const createNotification = async ({ event, message, userId, sendNotification = false }: Props) => {
    if (typeof userId === "string") {
        const notification = await prisma.notification.create({
            data: {
                event,
                message,
                userId,
            }
        })
        if (sendNotification) {
            await pusher.sendToUser(userId, "notification", notification)
        }

        return notification
    }


    const notifications = await prisma.notification.createMany({
        data: userId.map((id) => ({
            event,
            message,
            userId: id,
        }))
    })

    if (sendNotification) {
        await Promise.all(userId.map((id, index) => pusher.sendToUser(id, "notification", {
            id: index,
            event,
            message,
            userId: id,
            createdAt: new Date().toISOString(),
        })))
    }

    return notifications
}
