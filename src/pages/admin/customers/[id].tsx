import { customers } from "../../../components/data/dataContents";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { US, IN, DE, ID, PH, AU, GB } from "country-flag-icons/react/3x2";
import { GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
import { useRouter } from "next/router";
import { api } from "~/utils/api";

const DetailCustomer = () => {
  const router = useRouter();
  const id = router.query.id;
  const item = api.user.getUser.useQuery({
    id: id as string,
  });
  const itemData = item.data;
  const allUserOrders = api.order.getUserOrdersWithId.useQuery({
    id: id as string,
  });

  return (
    <React.Fragment>
      <div className="font-play mt-20 p-4 pt-0">
        <div className="w-full py-4">
          <p className="flex  items-center space-x-2 py-1 text-gray-400">
            <Link
              href="/admin/customers"
              className="text-[16px] font-[600] lg:text-[14px] 2xl:text-[16px]"
            >
              Customers
            </Link>{" "}
            <BsChevronRight />{" "}
            <span className="text-[16px] font-[600] lg:text-[14px] 2xl:text-[16px]">
              Customers Detail
            </span>
          </p>
          <div className="flex items-center justify-between">
            <h3 className="py-1 text-[20px] font-semibold lg:text-[24px] 2xl:text-[25px]">
              Customers Detail
            </h3>
            <button className="border bg-blue-500 p-2 px-6 py-[10px] text-sm text-white">
              Save
            </button>
          </div>
        </div>
        <div className="mt-2 w-full bg-white py-0">
          <div className="flex items-center space-x-2 p-2">
            <img
              src={itemData?.profile || "/img/user/Avatar_4.png"}
              alt="pic"
              width={105}
              height={105}
              className="p-2"
            />
            <div className="block">
              <p className="text-[20px] font-semibold text-black lg:text-[17px] 2xl:text-[20px]">
                {itemData?.firstName}
              </p>
              <p className="text-[11px] text-gray-400">
                Last seen 32 minutes ago
              </p>
            </div>
          </div>
          <div className="block w-4/5 md:flex md:w-2/3 md:justify-between">
            <div className="p-4 text-[20px] md:text-[17px] 2xl:text-[20px]">
              <div className="p-2">
                <p className="text-[16px] font-[600] text-blue-500 lg:text-[15px] 2xl:text-[16px]">
                  CustomerID
                </p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  CS15072021001
                </p>
              </div>
              <div className="p-2">
                <p className="text-[16px] font-[600] text-blue-500 lg:text-[15px] 2xl:text-[16px]">
                  Email Address
                </p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  {itemData?.email}
                </p>
              </div>
              <div className="p-2">
                <p className="text-[16px] font-[600] text-blue-500 lg:text-[15px] 2xl:text-[16px] ">
                  Phone Number
                </p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  {itemData?.phone || "N/A"}
                </p>
              </div>
            </div>
            <div className="p-4  text-[16px] lg:text-[15px] 2xl:text-[16px]">
              <div className="p-2">
                <p className="text-blue-500 ">Total Value Orders</p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  $
                  {allUserOrders.data?.orders.reduce(
                    (a, b) => a + b.invoices.reduce((a, b) => a + b.amount, 0),
                    0
                  ) || 0}
                </p>
              </div>
              <div className="p-2">
                <p className="text-blue-500">Country</p>
                <div className="flex items-center space-x-2">
                  <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                    {itemData?.country}
                  </p>
                  {itemData?.country == "india" ? (
                    <IN className="h-auto w-8" />
                  ) : itemData?.country == "US" ? (
                    <US className="h-auto w-8" />
                  ) : itemData?.country == "DE" ? (
                    <DE className="h-auto w-8" />
                  ) : itemData?.country == "PH" ? (
                    <PH className="h-auto w-8" />
                  ) : (
                    <AU className="h-auto w-8" />
                  )}
                </div>
              </div>

              <div className="p-2">
                <button className="bg-blue-500 p-3 px-4 text-white">
                  Manage Teams
                </button>
              </div>
            </div>
          </div>
          <div className="w-full py-0 sm:w-9/12 lg:w-2/5">
            <div className="px-6">
              <p className="text-[16px] text-blue-500 lg:text-[15px] 2xl:text-[16px]">
                Billing Address
              </p>
              <div className="py-1 text-xl font-semibold md:flex md:gap-2">
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/2 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.addressFirstname || ""}
                  placeholder="Address First Name"
                />
                <input
                  type="text"
                  className="mt-3 w-full border  p-2 text-[16px] outline-none md:basis-1/2 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.addressLastname || ""}
                  placeholder="Address Last Name"
                />
              </div>
              <div className="py-2 text-xl font-semibold">
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.address || ""}
                  placeholder="Address"
                />
              </div>
              <div className="gap-2 py-2 text-xl font-semibold md:flex md:items-center">
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.city || ""}
                  placeholder="City"
                />
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.country || ""}
                  placeholder="Country"
                />
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData?.zipcode || ""}
                  placeholder="Zip Code"
                />
              </div>

              {/* */}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default DetailCustomer;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
