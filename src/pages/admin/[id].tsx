import { ordersdata, dataUser } from "../../components/data/dataContents";
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
import Satisfied from "../../components/Satisfied";
import CardExtendDeliver from "../../components/card/CardExtendDeliver";
import WorkDelivery from "../../components/WorkDelivery";
import { BsChevronRight } from "react-icons/bs";

import React, { useState } from "react";
export const getStaticPaths = async () => {
  const paths = ordersdata.map((itemData) => ({
    params: { id: itemData.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const data = ordersdata.filter((p) => p.id.toString() === id);
  return {
    props: {
      itemData: JSON.parse(JSON.stringify(data[0])),
    },
  };
};

const ProjectDetailAdmin = ({ itemData }) => {
  return (
    <React.Fragment>
      <div className="mt-20 p-4 pt-4 ">
        <div className="h-full w-full  overflow-y-auto py-4">
          <p className="flex items-center space-x-2 py-1 text-gray-400">
            <span>Order</span> <BsChevronRight />{" "}
            <span>#{itemData.order_id}</span>
          </p>
          <h3 className="text-xl md:text-3xl">Project Name 1</h3>
          <div className="flex  w-full flex-wrap gap-2 overflow-y-auto lg:flex-nowrap">
            <div className="flex w-full flex-col pl-0 lg:hidden lg:w-1/3 2xl:pl-16">
              <div className="py-2">
                <ListTeam team={itemData.team} />
              </div>
              {itemData.status != "Completed" ? (
                <div className="py-2">
                  <CardExtendDeliver />
                </div>
              ) : (
                <div className="py-2">
                  <CardExtendDeliver />
                </div>
              )}

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
              <div className="py-2">
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
                <WorkDelivery />
              </div>
              <div className="py-2">
                <Satisfied />
              </div>

              <div className="py-2">
                <OrderRating />
              </div>
              <div className="py-2">
                <InputMessage />
              </div>
            </div>

            <div className="hidden w-full flex-col pl-0  lg:flex lg:w-1/3 2xl:pl-16">
              {itemData.status != "Completed" ? (
                <div className="py-2">
                  <CardExtendDeliver />
                </div>
              ) : (
                <div className="py-2">
                  <CardExtendDeliver />
                </div>
              )}

              <div className="py-2">
                <DetailProject itemData={itemData} />
              </div>
              <div className="py-2">
                <div className="font-play border bg-white p-4 font-medium shadow-sm">
                  <p className="py-2">Your order is on progress.</p>
                  <ProgressBar progressPercentage={itemData.progress} />
                </div>
              </div>
              <div className="py-2">
                <ListTeam team={itemData.team} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default ProjectDetailAdmin;
