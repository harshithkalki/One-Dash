import { env } from "~/env.mjs";
import { Server } from "socket.io";
import jwt from "jsonwebtoken";


const users = new Map<string, string>();

const io = new Server(parseInt(env.WS_PORT), {
    cors: {
        origin: "*",
        credentials: true,
    },
});


io.use((socket, next) => {
    const token = socket.handshake.auth.token as string;
    if (!token) {
        return next(new Error("Authentication error"));
    }

    jwt.verify(token, env.NEXTAUTH_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }
        if (decoded) {
            const { id } = decoded as { id: string };
            users.set(socket.id, id);
            return next();
        }
    });
});





io.on("connect", (socket) => {
    console.info('Message received from ' + socket.id);
});
