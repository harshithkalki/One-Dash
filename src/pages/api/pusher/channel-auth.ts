import pusher from "~/server/common/pusher";
import { getServerAuthSession } from "~/server/common/get-server-auth-session"
import { type NextApiHandler } from "next";
import { z } from "zod";
import { type Channel } from "~/types/pusher";
import { prisma } from "~/server/db";


const ZBody = z.object({
    channel_name: z.string(),
    socket_id: z.string(),
})


const handler: NextApiHandler = async (req, res) => {
    const session = await getServerAuthSession({ req, res });

    if (!session) {
        res.status(403).send({
            success: false,
            error: "Unauthorized",
        });
        return;
    }

    try {
        const { channel_name, socket_id } = ZBody.parse(req.body);

        const { id, ...userData } = session.user;

        const channeldata = channel_name.split("-");

        const channel = channeldata[1] as Channel;

        if (channel === "user") {
            if (channeldata[2] !== id) {
                res.status(403).send({
                    success: false,
                    error: "Unauthorized",
                });
                return;
            }
            const auth = pusher.authorizeChannel(socket_id, channel_name, {
                user_id: id,
                user_info: userData,
            });
            res.send(auth);
            return;
        } else if (channel === "chat") {
            const room = await prisma.privateChat.findUnique({
                where: {
                    id: channeldata[2],
                }
            });

            if (!room) {
                res.status(403).send({
                    success: false,
                    error: "Unauthorized",
                });
                return;
            }

            const isUser = room.user1Id === id || room.user2Id === id || userData.role === "admin";

            if (!isUser) {
                res.status(403).send({
                    success: false,
                    error: "Unauthorized",
                });
                return;
            }

            const auth = pusher.authorizeChannel(socket_id, channel_name, {
                user_id: id,
                user_info: userData,
            });
            res.send(auth);
            return;
        } else if (channel === "order") {

            const order = await prisma.order.findUnique({
                where: {
                    id: channeldata[2],
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
                            id,
                        },
                        select: {
                            id: true,
                        }
                    }
                },
            });

            if (!order) {
                res.status(403).send({
                    success: false,
                    error: "Unauthorized",
                });
                return;
            }

            const isUser = order.User.id === id || order.team.find((team) => team.id === id) || userData.role === "admin";


            if (!isUser) {
                res.status(403).send({
                    success: false,
                    error: "Unauthorized",
                });
                return;
            }

            const auth = pusher.authorizeChannel(socket_id, channel_name, {
                user_id: id,
                user_info: userData,
            });

            res.send(auth);

        } else if (channel === "global") {
            const auth = pusher.authorizeChannel(socket_id, channel_name, {
                user_id: id,
                user_info: userData,
            });
            res.send(auth);
            return;
        }
        else {
            res.status(403).send({
                success: false,
                error: "Unauthorized",
            });
            return;
        }

    } catch (error) {
        res.status(403).send({
            success: false,
            error: "Bad Request",
        });
        return;
    }
}


export default handler;