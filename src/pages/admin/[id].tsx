import DetailProject from "../../components/card/DetailProject";
import ProgressBar from "../../components/ProgressBar";
import ListTeam from "../../components/ListTeam";
import Requiretment from "../../components/Requiretment";
import OrderRating from "../../components/OrderRating";
import { BsChevronRight } from "react-icons/bs";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { api } from "~/utils/api";
import useOrderStore from "~/store/orderStore";
import WorkDelivery from "~/components/WorkDelivery";
import Satisfied from "~/components/Satisfied";
import OrderHistory from "~/components/OrderHistory/OrderHistory";
import OrderInput from "~/components/OrderHistory/OrderInput";

const ProjectDetailAdmin = () => {
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
  const order = api.order.order.useQuery(
    {
      id: id as string,
    },
    {
      enabled: !!id,
      refetchOnMount: false,
    }
  );

  const { setOrder } = useOrderStore((state) => {
    return {
      setOrder: state.setOrder,
    };
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
            <span>Order</span> <BsChevronRight />{" "}
            <span>#{itemData.data?.id}</span>
          </p>
          <h3 className="text-font text-3xl font-[600] leading-[110%] text-[#131313] xl:text-2xl">
            {itemData.data?.name}
          </h3>
        </div>
        <div className="flex  w-full flex-wrap space-x-0 lg:flex-nowrap">
          <div className="flex w-full flex-col pl-0 lg:hidden lg:w-1/3 2xl:pl-16">
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
            <div className="smooth-tras py-2">
              <Requiretment />
            </div>
            <OrderHistory />
            <OrderInput />
            <div className="py-2">
              <WorkDelivery />
            </div>
            <div className="py-2">
              <Satisfied />
            </div>

            <div className="py-2">
              <OrderRating />
            </div>
          </div>

          <div className="hidden w-full flex-col pl-0  lg:flex lg:w-1/3 2xl:pl-16">
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
    </React.Fragment>
  );
};

export default ProjectDetailAdmin;
