import DetailProject from "~/components/card/DetailProject";
import ProgressBar from "~/components/ProgressBar";
import ListTeam from "~/components/ListTeam";
import Requiretment from "~/components/Requiretment";
import { BsChevronRight } from "react-icons/bs";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import useOrderStore from "~/store/orderStore";
import Popup from "reactjs-popup";
import Link from "next/link";
import OrderHistory from "~/components/OrderHistory/OrderHistory";
import OrderInput from "~/components/OrderHistory/OrderInput";

const ProjectDetail = () => {
  const router = useRouter();
  const id = router.query.id;
  const order = api.order.order.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      refetchOnMount: false,
    }
  );
  const [open, setOpen] = React.useState(false);
  const [removeOpen, setremoveOpen] = React.useState(-1);
  const [addMemLoading, setAddMemLoading] = React.useState(-1);
  const teamMebers = api.user.teamMembers.useQuery();
  const addTeamMember = api.order.addTeamMember.useMutation();

  const closeModal = () => {
    setOpen(false);
    setremoveOpen(-1);
  };

  const { setOrder } = useOrderStore((state) => {
    return { setOrder: state.setOrder };
  });

  useEffect(() => {
    if (order.data) {
      setOrder({ ...order.data, user: order.data.User });
    }
  }, [order.data]);

  return (
    <React.Fragment>
      <div className="mt-20 overflow-y-auto p-4  pl-6 pt-1 ">
        <div className="w-full py-4">
          <p className="flex items-center space-x-2 py-1 text-gray-400">
            <span>Order</span> <BsChevronRight /> <span>#{order.data?.id}</span>
          </p>
          <h3 className="text-font text-3xl font-[600] leading-[110%] text-[#131313] xl:text-2xl">
            {order.data?.name}
          </h3>
        </div>
        <div className="flex  w-full flex-wrap space-x-0 lg:flex-nowrap">
          <div className="flex w-full flex-col pl-0 lg:hidden lg:w-1/3 2xl:pl-16">
            <div className="py-2">
              <ListTeam
                team={
                  order.data?.team.map((mem) => {
                    return { img: mem.profile ?? "/img/user/Avatar.png" };
                  }) || []
                }
                setOpen={setOpen}
              />
            </div>
            <div className="py-2">
              <DetailProject
                itemData={{
                  dateTime: order.data?.createdAt.toString() as string,
                  status: order.data?.orderStatus as string,
                  amount: 100,
                  id: order.data?.id as string,
                  logo: order.data?.logo ?? "/img/product/product_1.png",
                  name: order.data?.name as string,
                  progress: 0,
                  userName: order.data?.User.firstName as string,
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
            <div className="smooth-tras py-2">
              <Requiretment />
            </div>
            <OrderHistory />
            <OrderInput />
          </div>
          <div className="hidden w-full flex-col pl-0 lg:flex lg:w-[30%] xl:pl-5 2xl:pl-10">
            <div className="py-2">
              <DetailProject
                itemData={{
                  dateTime: order.data?.createdAt.toString() as string,
                  status: order.data?.orderStatus as string,
                  amount: 100,
                  id: order.data?.id as string,
                  logo: order.data?.logo ?? "/img/product/product_1.png",
                  name: order.data?.name as string,
                  progress: 0,
                  userName: order.data?.User.firstName as string,
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
                  order.data?.team.map((mem) => {
                    return { img: mem.profile ?? "/img/user/Avatar.png" };
                  }) ?? []
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
                        void order.refetch();
                      })
                      .catch((err) => {
                        setAddMemLoading(-1);
                        console.log(err);
                      });
                  }}
                  disabled={addTeamMember.isLoading && addMemLoading === index}
                >
                  {addTeamMember.isLoading && addMemLoading === index
                    ? "Adding"
                    : order.data?.team.map((mem) => mem.id).includes(value.id)
                    ? "Added"
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

import { type GetServerSideProps } from "next";
import { createSSG } from "~/utils/ssg";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const ssg = await createSSG(context);

  const orderid = context.query.id as string;

  await ssg.order.order.prefetch({ id: orderid });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
