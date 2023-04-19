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
import Pusher from "pusher-js";
import { env } from "~/env.mjs";

import Popup from "reactjs-popup";
import Link from "next/link";
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
  const {} = useSession();

  useEffect(() => {
    if (!orderId) return;

    Pusher.logToConsole = true;

    const pusher = new Pusher("6628667fe199b2a488b4", {
      cluster: "ap2",
    });

    const channel = pusher.subscribe(`order-${orderId}`);

    channel.bind("new-message", function (data: string) {
      alert(JSON.stringify(data));
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [orderId]);

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
  const [open, setOpen] = React.useState(false);
  const [removeOpen, setremoveOpen] = React.useState(-1);
  const [addMemLoading, setAddMemLoading] = React.useState(-1);
  const teamMebers = api.user.teamMembers.useQuery();
  const addTeamMember = api.order.addTeamMember.useMutation();

  const closeModal = () => {
    setOpen(false);
    setremoveOpen(-1);
  };

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
      <div className="mt-20 overflow-y-auto p-4  pl-6 pt-1 ">
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
                setOpen={setOpen}
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
              {/* <DetailProject
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
              /> */}
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
                setOpen={setOpen}
              />
            </div>
          </div>
        </div>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="z-50 mx-auto flex w-[90%] flex-col items-center justify-center rounded-[8px] bg-white p-4 shadow-md md:w-[600px]">
          <div className="flex w-full items-center justify-between">
            <span className="font-play text-[18px] font-[500] text-black">
              Add Members
            </span>
            <Link className="close" onClick={closeModal} href={"#"}>
              <img src={"/img/icon/Close Icon.svg"} alt="close" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between space-x-6 py-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border py-2 pl-3 outline-none"
            />
            <button className="w-36 rounded-[2px] bg-blue-500 px-6 py-2 text-white">
              Search
            </button>
          </div>
          {teamMebers?.data?.length === 0 ? (
            <div className="flex w-full items-center justify-center py-4">
              <span className="font-play text-[14px] font-[500] text-black">
                No member found
              </span>
            </div>
          ) : (
            teamMebers?.data?.map((value, index) => (
              <div
                className="flex w-full items-center justify-between py-2"
                key={index}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={value.profile ?? "/img/user/Avatar_team1.svg"}
                    width={48}
                    height={48}
                    alt="pic"
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{value.firstName}</span>
                </div>
                <button
                  className="w-20 rounded-[2px] border border-blue-500 px-2 py-1 text-sm text-blue-500"
                  onClick={() => {
                    setAddMemLoading(index);
                    addTeamMember
                      .mutateAsync({
                        id: id as string,
                        userId: value.id,
                      })
                      .then((res) => {
                        setAddMemLoading(-1);
                        void teamMebers.refetch();
                      })
                      .catch((err) => {
                        setAddMemLoading(-1);
                        console.log(err);
                      });
                  }}
                  disabled={addTeamMember.isLoading && addMemLoading === index}
                >
                  {addTeamMember.isLoading && addMemLoading === index
                    ? "Loading"
                    : "Add"}
                </button>
              </div>
            ))
          )}
        </div>
      </Popup>
    </React.Fragment>
  );
};

export default ProjectDetail;
