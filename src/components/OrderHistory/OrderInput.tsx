import { type Discussions } from "@prisma/client";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { useEffect } from "react";
import useOrderStore, { type OrderState } from "~/store/orderStore";
import { type RouterOutputs, api } from "~/utils/api";
import InputMessage from "../InputMessage";
import { mergeSortedArrays } from "~/utils";

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

    const pusher = new Pusher("6628667fe199b2a488b4", {
      cluster: "ap2",
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
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
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
