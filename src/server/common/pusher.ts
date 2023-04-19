import Pusher from "pusher";
import { env } from "~/env.mjs";

const pusher = new Pusher({
    appId: env.PUSHER_APPID,
    key: env.NEXT_PUBLIC_PUSHER_KEY,
    secret: env.PUSHER_SECRET,
    cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
    useTLS: true
});

export default pusher;