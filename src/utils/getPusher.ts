import Pusher from "pusher-js";
import { useEffect, useState } from "react";
import { env } from "~/env.mjs";

const getPusher = (params?: Record<string, any>
) => {

    Pusher.logToConsole = true

    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
        cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
        channelAuthorization: {
            endpoint: "/api/pusher/channel-auth",
            transport: "ajax",
            params
        },
        userAuthentication: {
            endpoint: "/api/pusher/user-auth",
            transport: "ajax",
            params
        }
    });



    return pusher;
}


export default getPusher;