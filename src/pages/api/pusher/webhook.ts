import { type NextApiHandler } from "next";
import pusher from "~/server/common/pusher";
import type { Readable } from 'node:stream';



async function buffer(readable: Readable) {
    const chunks = [];
    for await (const chunk of readable) {
        chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk);
    }
    return Buffer.concat(chunks);
}


const handler: NextApiHandler = async (req, res) => {

    const buf = await buffer(req);
    const rawBody = buf.toString('utf8');


    const webhook = pusher.webhook({
        headers: req.headers,
        rawBody: rawBody,
    });

    if (webhook.isValid()) {
        webhook.getEvents().forEach((event) => {
            switch (event.name) {
                case "channel_occupied":
                    console.log("Channel occupied:", event.channel);
                    break;
                case "channel_vacated":
                    console.log("Channel vacated:", event.channel);
                    break;
                case "member_added":
                    console.log("Member added:", event.channel, event.data);
                    break;
                case "member_removed":
                    console.log("Member removed:", event.channel, event.data);
                    break;
                case "client_event":
                    console.log("Client event:", event.channel, event.name, event.data);
                    break;
                case "client_connected":
                    console.log("Client connected:", event.channel, event.socket_id);
                    break;
                case "client_disconnected":
                    console.log("Client disconnected:", event.channel, event.socket_id);
                    break;
            }
        });
    }

    res.status(200).json({ status: "ok" });
}

export default handler;

export const config = {
    api: {
        bodyParser: false,
    },
};
