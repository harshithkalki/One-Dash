import useOrderStore, { type OrderState } from "~/store/orderStore";
import Invoice from "../Invoice";
import Discussion from "../Discussion";
import { type Discussions, type Order, type User } from "@prisma/client";
import Delivery from "../Delivery";
import { useSession } from "next-auth/react";
import { api, type RouterOutputs } from "~/utils/api";
import { mergeSortedArrays } from "~/utils";
import { useRouter } from "next/router";
import { shallow } from "zustand/shallow";
import { useEffect } from "react";

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

  return (
    <>
      {orderhistory.map((item, index) => {
        if ("message" in item) {
          const user = order?.team.find((user) => user.id === item.userId);
          discussions.push({
            ...item,
            user: {
              name:
                user?.firstName ?? item.userId === me?.id
                  ? "Me"
                  : order?.user.firstName ?? "Unknown",
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
                invoice={item as Invoice & { user: User; order: Order }}
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
    </>
  );
};

export default OrderHistory;
