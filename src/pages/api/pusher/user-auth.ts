import { type NextApiHandler } from "next";
import pusher from "~/server/common/pusher";
import { getServerAuthSession } from "~/server/common/get-server-auth-session"


const handler: NextApiHandler = async (req, res) => {

    const session = await getServerAuthSession({ req, res });

    if (!session) {
        res.status(403).send({
            success: false,
            error: "Unauthorized",
        });
        return;
    }

    const { socket_id } = req.body as { socket_id: string };

    const { id, ...userData } = session.user;


    const user = {
        id: id,
        user_info: userData,
        watchlist: []
    };


    const auth = pusher.authenticateUser(socket_id, user);

    res.send(auth);
}

export default handler;

