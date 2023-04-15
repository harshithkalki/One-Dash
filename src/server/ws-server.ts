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

    jwt.verify(token, env.WS_JWT_SECRET, (err, decoded) => {
        if (err) {
            return next(new Error("Authentication error"));
        }
        const userId = decoded as string;
        users.set(userId, socket.id);
        next();
    }
    );
});


io.on("connect", (socket) => {
    socket.to(socket.id).emit("Connected", "You are connected to the server!");
});
