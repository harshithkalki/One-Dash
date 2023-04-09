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
export const getStaticPaths = async () => {
  const paths = products.map((itemData) => ({
    params: { id: itemData.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = products.filter((p) => p.id.toString() === id);
  return {
    props: {
      itemData: data[0],
    },
  };
};

const ProjectDetail = ({ itemData }) => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);

  return (
    <React.Fragment>
      <div className="mt-20 overflow-y-auto p-4  pl-6 pt-1">
        <div className="w-full py-4">
          <p className="flex items-center space-x-2 py-1 text-gray-400">
            <span>Order</span> <BsChevronRight />{" "}
            <span>#{itemData.order_id}</span>
          </p>
          <h3 className="text-font text-3xl font-[600] leading-[110%] text-[#131313] xl:text-2xl">
            Project Name 1
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
              <ListTeam team={itemData.team} />
            </div>

            <div className="py-2">
              <DetailProject itemData={itemData} />
            </div>
            <div className="py-2">
              <div className="font-play border bg-white p-4 font-medium shadow-sm">
                <p className="py-2">Your order is on progress.</p>
                <ProgressBar progressPercentage={itemData.progress} />
              </div>
            </div>
          </div>
          <div className="w-full pr-0 md:pr-9 lg:w-[75%]">
            <div className="smooth-tras py-2">
              <Requiretment />
            </div>
            <div className="py-2">
              <Invoice />
            </div>
            <div className="py-2">
              <Discussion />
            </div>
            <div className="py-2">
              <Delivery />
            </div>

            <div className="py-2">
              <InputMessage />
            </div>
          </div>
          <div className="hidden w-full flex-col pl-0 lg:flex lg:w-[30%] xl:pl-5 2xl:pl-10">
            {/* {itemData.status != "Completed" ? (
              <div className="py-2">
                <CardExtendDeliver />
              </div>
            ) : null} */}

            <div className="py-2">
              <DetailProject itemData={itemData} />
            </div>
            <div className="py-2">
              <div className="font-play border bg-white p-4 font-medium shadow-sm">
                <p className="py-0 text-[12px] font-[600]">
                  Your order is on progress.
                </p>
                <ProgressBar progressPercentage={itemData.progress} />
              </div>
            </div>
            <div className="py-2">
              <ListTeam team={itemData.team} />
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetail;
