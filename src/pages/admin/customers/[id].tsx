import { customers } from "../../../components/data/dataContents";
import { BsChevronRight } from "react-icons/bs";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

import { US, IN, DE, ID, PH, AU, GB } from "country-flag-icons/react/3x2";
export const getStaticPaths = async () => {
  const paths = customers.map((itemData) => ({
    params: { id: itemData.id.toString() },
  }));
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  // const allData = JSON.stringify(customers)
  const data = customers.filter((p) => p.id.toString() === id);
  return {
    props: {
      itemData: JSON.parse(JSON.stringify(data[0])),
    },
  };
};

const DetailCustomer = ({ itemData }) => {
  console.log(itemData);
  return (
    <React.Fragment>
      <div className="font-play mt-20 p-4 pt-0">
        <div className="w-full py-4">
          <p className="flex  items-center space-x-2 py-1 text-gray-400">
            <a className="text-[16px] font-[600] lg:text-[14px] 2xl:text-[16px]">
              <Link href="/admin/customers">Customers</Link>
            </a>{" "}
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
            <Image
              src={itemData.img}
              alt="pic"
              width={105}
              height={105}
              className="p-2"
            />
            <div className="block">
              <p className="text-[20px] font-semibold text-black lg:text-[17px] 2xl:text-[20px]">
                {itemData.name}
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
                  {itemData.email}
                </p>
              </div>
              <div className="p-2">
                <p className="text-[16px] font-[600] text-blue-500 lg:text-[15px] 2xl:text-[16px] ">
                  Phone Number
                </p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  +63-819-001-9187
                </p>
              </div>
            </div>
            <div className="p-4  text-[16px] lg:text-[15px] 2xl:text-[16px]">
              <div className="p-2">
                <p className="text-blue-500 ">Total Value Orders</p>
                <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                  ${itemData.total_orders}
                </p>
              </div>
              <div className="p-2">
                <p className="text-blue-500">Country</p>
                <div className="flex items-center space-x-2">
                  <p className="py-1 text-[20px] font-semibold text-black lg:text-[19px] 2xl:text-[20px]">
                    {itemData.country.name}
                  </p>
                  {itemData.country.flag == "IN" ? (
                    <IN className="h-auto w-8" />
                  ) : itemData.country.flag == "US" ? (
                    <US className="h-auto w-8" />
                  ) : itemData.country.flag == "UK" ? (
                    <UK className="h-auto w-8" />
                  ) : itemData.country.flag == "DE" ? (
                    <DE className="h-auto w-8" />
                  ) : itemData.country.flag == "PH" ? (
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
                  value="David"
                />
                <input
                  type="text"
                  className="mt-3 w-full border  p-2 text-[16px] outline-none md:basis-1/2 lg:text-[15px] 2xl:text-[16px]"
                  value="Morgan"
                />
              </div>
              <div className="py-2 text-xl font-semibold">
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none lg:text-[15px] 2xl:text-[16px]"
                  value={itemData.street}
                />
              </div>
              <div className="gap-2 py-2 text-xl font-semibold md:flex md:items-center">
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData.city}
                />
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData.country.name}
                />
                <input
                  type="text"
                  className="mt-3 w-full border p-2 text-[16px] outline-none md:basis-1/3 lg:text-[15px] 2xl:text-[16px]"
                  value={itemData.zipcode}
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
