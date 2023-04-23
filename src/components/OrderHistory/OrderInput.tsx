import { type Discussions } from "@prisma/client";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect } from "react";
import useOrderStore from "~/store/orderStore";
import { api } from "~/utils/api";
import InputMessage from "../InputMessage";
import { env } from "~/env.mjs";

const PusherKey = env.NEXT_PUBLIC_PUSHER_KEY;
const PusherCluster = env.NEXT_PUBLIC_PUSHER_CLUSTER;

const OrderInput = () => {
  const { addDiscussion, order } = useOrderStore((state) => ({
    order: state.order,
    setOrder: state.setOrder,
    addDiscussion: state.addDiscussion,
  }));
  const { mutateAsync } = api.discussion.addMessage.useMutation();
  const { user } = useSession().data ?? {};

  useEffect(() => {
    if (!order) return;

    Pusher.logToConsole = true;

    const pusher = new Pusher(PusherKey, {
      cluster: PusherCluster,
    });

    const channel = pusher.subscribe(`order-${order.id}`);

    channel.bind(
      "new-message",
      function (
        dis: Discussions & {
          user: {
            name: string;
          };
        }
      ) {
        if (dis.userId != user?.id) {
          addDiscussion({
            ...dis,
            user: {
              firstName: dis.user.name,
            },
          });
        }
      }
    );

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <div className="py-2">
      <InputMessage
        onSend={async (message) => {
          if (!order) return;
          const discussion = await mutateAsync({
            message: message,
            orderId: order.id,
          });
          addDiscussion({
            ...discussion,
            user: {
              firstName: user?.firstName ?? "Me",
            },
          });
        }}
      />
    </div>
  );
};

export default OrderInput;
