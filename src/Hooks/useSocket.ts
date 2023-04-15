import { useEffect, useRef } from "react";
import io, { type ManagerOptions, type SocketOptions } from "socket.io-client";


export const useSocket = (uri: string, opts?: Partial<ManagerOptions & SocketOptions> | undefined) => {
    const { current: socket } = useRef(io(uri, opts));

    useEffect(() => {
        return () => {
            if (socket) {
                socket.disconnect();
            }
        };
    }, [socket]);



    return socket;
}