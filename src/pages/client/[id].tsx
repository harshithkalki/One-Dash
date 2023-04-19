import { products, dataUser } from "../../components/data/dataContents";
import DetailProject from "../../components/card/DetailProject";
import ProgressBar from "../../components/ProgressBar";
import ListTeam from "../../components/ListTeam";
import Image from "next/image";
import Invoice from "../../components/Invoice";
import Requiretment from "../../components/Requiretment";
import Discussion from "../../components/Discussion";
import Delivery from "../../components/Delivery";
import OrderRating from "../../components/OrderRating";
import InputMessage from "../../components/InputMessage";
import { BsChevronRight } from "react-icons/bs";
import CardExtendDeliver from "../../components/card/CardExtendDeliver";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import {
  type Delivery as DeliveryModel,
  type Discussions,
  type Invoice as InvoiceModel,
} from "@prisma/client";
import useOrderStore, { type OrderState } from "~/store/orderStore";
import { shallow } from "zustand/shallow";

// export const getStaticPaths = async () => {
//   const paths = products.map((itemData) => ({
//     params: { id: itemData.id.toString() },
//   }));
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps = async (context) => {
//   const id = context.params.id;
//   const data = products.filter((p) => p.id.toString() === id);
//   return {
//     props: {
//       itemData: data[0],
//     },
//   };
// };

const OrderInput = () => {
  const { addDiscussion, orderId } = useOrderStore((state) => ({
    orderId: state.orderId,
    addDiscussion: state.addDiscussion,
  }));
  const { mutateAsync } = api.discussion.addMessage.useMutation();

  return (
    <div className="py-2">
      <InputMessage
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSend={async (message) => {
          const discussion = await mutateAsync({
            message: message,
            orderId: orderId,
          });
          addDiscussion(discussion);
        }}
      />
    </div>
  );
};

const selector = (state: OrderState): OrderState => ({
  orderhistory: state.orderhistory,
  addDelivery: state.addDelivery,
  addInvoice: state.addInvoice,
  addDiscussion: state.addDiscussion,
  orderId: state.orderId,
  setOrderId: state.setOrderId,
});

const ProjectDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const { status } = useSession();
  const itemData = api.order.order.useQuery({
    id: id as string,
  });

  const { orderhistory, setOrderId } = useOrderStore(selector, shallow);

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);

  useEffect(() => {
    if (id) {
      setOrderId(id as string);
    }
  }, [id]);

  return (
    <React.Fragment>
      <div className="mt-20 overflow-y-auto p-4  pl-6 pt-1">
        <div className="w-full py-4">
          <p className="flex items-center space-x-2 py-1 text-gray-400">
            <span>Order</span> <BsChevronRight />{" "}
            <span>#{itemData.data?.id}</span>
          </p>
          <h3 className="text-font text-3xl font-[600] leading-[110%] text-[#131313] xl:text-2xl">
            {itemData.data?.name}
          </h3>
        </div>
        <div className="flex  w-full flex-wrap space-x-0 lg:flex-nowrap">
          <div className="flex w-full flex-col pl-0 lg:hidden lg:w-1/3 2xl:pl-16">
            {/* {itemData.status != "Completed" ? (
              <div className="py-2">
                <CardExtendDeliver />
              </div>
            ) : null} */}
            <div className="py-2">
              <ListTeam
                team={
                  itemData.data?.team.map((mem) => {
                    return { img: mem.profile ?? "/img/user/Avatar.png" };
                  }) || []
                }
              />
            </div>

            <div className="py-2">
              <DetailProject
                itemData={{
                  dateTime: itemData.data?.createdAt.toString() as string,
                  status: itemData.data?.orderStatus as string,
                  amount: 100,
                  id: itemData.data?.id as string,
                  logo: itemData.data?.logo ?? "/img/product/product_1.png",
                  name: itemData.data?.name as string,
                  progress: 0,
                  userName: itemData.data?.User.firstName as string,
                }}
              />
            </div>
            <div className="py-2">
              <div className="font-play border bg-white p-4 font-medium shadow-sm">
                <p className="py-2">Your order is on progress.</p>
                <ProgressBar progressPercentage={0} />
              </div>
            </div>
          </div>
          <div className="w-full pr-0 md:pr-9 lg:w-[75%]">
            {orderhistory.map((item, index) => {
              if (Array.isArray(item)) {
                return (
                  <div className="py-2" key={index}>
                    <Discussion discussions={item} />
                  </div>
                );
              } else if ("paymentId" in item) {
                return (
                  <div className="py-2" key={item.id}>
                    <Invoice />
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
            <OrderInput />
          </div>
          <div className="hidden w-full flex-col pl-0 lg:flex lg:w-[30%] xl:pl-5 2xl:pl-10">
            {/* {itemData.status != "Completed" ? (
              <div className="py-2">
                <CardExtendDeliver />
              </div>
            ) : null} */}

            <div className="py-2">
              <DetailProject
                itemData={{
                  dateTime: itemData.data?.createdAt.toString() as string,
                  status: itemData.data?.orderStatus as string,
                  amount: 100,
                  id: itemData.data?.id as string,
                  logo: itemData.data?.logo ?? "/img/product/product_1.png",
                  name: itemData.data?.name as string,
                  progress: 0,
                  userName: itemData.data?.User.firstName as string,
                }}
              />
            </div>
            <div className="py-2">
              <div className="font-play border bg-white p-4 font-medium shadow-sm">
                <p className="py-0 text-[12px] font-[600]">
                  Your order is on progress.
                </p>
                <ProgressBar progressPercentage={0} />
              </div>
            </div>
            <div className="py-2">
              <ListTeam
                team={
                  itemData.data?.team.map((mem) => {
                    return { img: mem.profile ?? "/img/user/Avatar.png" };
                  }) || []
                }
              />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetail;
