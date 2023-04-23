import useOrderStore, { type OrderState } from "~/store/orderStore";
import Invoice from "../Invoice";
import Discussion from "../Discussion";
import { type Discussions } from "@prisma/client";
import Delivery from "../Delivery";
import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";
import { mergeSortedArrays } from "~/utils";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import { useEffect, useRef } from "react";

export const selector = (state: OrderState) => ({
  orderhistory: state.orderhistory,
  addDelivery: state.addDelivery,
  addInvoice: state.addInvoice,
  addDiscussion: state.addDiscussion,
  setOrderHistory: (input: RouterOutputs["order"]["orderHistory"] | null) => {
    const discussions = input?.discussions;
    const deliveries = input?.deliveries;
    const invoices = input?.invoices;
    if (!discussions || !deliveries || !invoices) return;
    state.setOrderHistory(mergeSortedArrays(discussions, deliveries, invoices));
  },
  setOrder: state.setOrder,
});

const OrderHistory = () => {
  const order = useOrderStore((state) => state.order);
  const { orderhistory, setOrderHistory } = useOrderStore(selector, shallow);
  const { user: me } = useSession().data ?? {};
  let discussions: (Discussions & { user: { name: string } })[] = [];
  const router = useRouter();
  const id = router.query.id as string;
  const scrollRef = useRef<HTMLDivElement>(null);

  const { data } = api.order.orderHistory.useQuery(
    { id: id },
    {
      enabled: !!id,
      refetchOnMount: false,
    }
  );

  useEffect(() => {
    if (data) {
      setOrderHistory(data);
    }
  }, [data]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [orderhistory]);

  return (
    <>
      {orderhistory.map((item, index) => {
        if ("message" in item) {
          const user = order?.team.find((user) => user.id === item.userId);
          discussions.push({
            ...item,
            user: {
              name:
                item.userId === me?.id
                  ? "ME"
                  : user?.firstName ?? order?.user.firstName ?? "Unknown",
            },
          });

          if (orderhistory[index + 1] && "message" in orderhistory[index + 1]!)
            return null;

          const temp = discussions;
          discussions = [];

          return (
            <div className="py-2" key={index}>
              <Discussion discussions={temp} />
            </div>
          );
        } else if ("paymentId" in item) {
          return (
            <div className="py-2" key={item.id}>
              <Invoice
                invoice={{
                  ...item,
                  order: order!,
                  user: order!.user,
                }}
              />
            </div>
          );
        } else {
          return (
            <div className="py-2" key={item.id}>
              <Delivery />
            </div>
          );
        }
      })}
      <div style={{ float: "left", clear: "both" }} ref={scrollRef} />
    </>
  );
};

export default OrderHistory;
