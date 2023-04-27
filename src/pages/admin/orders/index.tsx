import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ordersdata } from "../../../components/data/dataContents";
import { AiOutlinePlus, AiOutlineClose } from "react-icons/ai";
// import { picImg } from "../../../public/img/user/Avatar_team.png";
import { BsSearch } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
import { api } from "~/utils/api";
import dayjs from "dayjs";
const Order = () => {
  const orders = api.order.getAllOrders.useQuery();
  return (
    <React.Fragment>
      <div className="mt-20 p-4 pt-4">
        <div className="flex h-full w-full flex-col">
          <p className="text-sm text-gray-400 md:text-base">Orders</p>
          <div className="inline-block min-w-full py-2 md:flex md:items-center md:justify-between">
            {/* <a className="py-4 text-xl md:text-3xl"> */}
            <Link href="/customers" className="py-4 text-xl md:text-3xl">
              All Type
            </Link>
            {/* </a> */}
            <div className="relative mt-2 w-full border md:w-44">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="focus:shadow-outline p-1 focus:outline-none"
                >
                  <BsSearch />
                </button>
              </span>
              <input
                type="text"
                placeholder="search"
                className="w-full py-2.5 pl-10"
              />
            </div>
          </div>

          <div className="block w-full lg:hidden">
            {orders?.data?.orders.map((order, index) => {
              const orderDays = order.invoices.reduce(
                (acc, invoice) => acc + invoice.deliveryTime,
                0
              );
              return (
                <div className="mb-2 border bg-white p-4" key={index}>
                  <div className="mb-1 mt-1 flex items-center justify-between gap-2">
                    <div className="flex space-x-2">
                      <img
                        src="/img/user/Avatar_4.png"
                        alt="pic"
                        width={45}
                        height={45}
                      />
                      <div>
                        Angeline Lee
                        <p className="text-sm text-gray-400"> {order.id}</p>
                      </div>
                    </div>

                    <div
                      className={`flex h-6 items-center justify-center rounded-lg px-2 text-[12px] ${
                        order.orderStatus === "completed"
                          ? "bg-green-50 text-green-500"
                          : order.orderStatus === "pendingpayment"
                          ? "bg-orange-100 text-orange-400"
                          : order.orderStatus === "inRepair"
                          ? "bg-red-100 text-red-400"
                          : "bg-gray-200 text-gray-400"
                      }`}
                    >
                      <Link href={`/admin/${order.id}`} key={order.id}>
                        {" "}
                        {order.orderStatus}
                      </Link>
                    </div>
                  </div>
                  <div>
                    <p className="pt-2 text-lg font-[600]"> {order.name}</p>
                    <p className="pt-2 text-base text-gray-400">
                      {" "}
                      {dayjs(order.createdAt)
                        .add(orderDays, "days")
                        .format("DD MMM YYYY")}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="hidden h-full overflow-x-auto overflow-y-auto border bg-white p-2 lg:block">
            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="text-sm md:text-xl">
                      <th
                        scope="col"
                        className="text-back whitespace-nowrap px-6 py-4 text-left text-[19px] font-bold font-medium xl:text-[18px]"
                      >
                        Customer Name
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                      >
                        Order Id
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                      >
                        Project Name
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                      >
                        Delivery Date
                      </th>
                      <th
                        scope="col"
                        className="whitespace-nowrap px-6 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                      >
                        Amount
                      </th>
                      <th
                        scope="col"
                        className="flex items-center justify-center px-6 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                      >
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="overflow-x-auto">
                    {orders.data?.orders.map((order, index) => {
                      //console.log(order, index)
                      const orderDays = order.invoices.reduce(
                        (acc, invoice) => acc + invoice.deliveryTime,
                        0
                      );
                      return (
                        <>
                          <tr className="text-sm md:text-base">
                            <td className="flex items-center space-x-2 px-6 py-4">
                              <img
                                src="/img/user/Avatar_4.png"
                                alt="pic"
                                width={40}
                                height={40}
                              />
                              <span className="font-semibold font-semibold text-black">
                                {order.User.firstName}
                              </span>
                            </td>
                            <td className="px-6 py-2 text-sm font-light font-medium text-gray-500">
                              {order.id}
                            </td>
                            <td className="px-6 py-2 text-sm font-light font-medium text-gray-500 ">
                              {order.name}
                            </td>
                            <td className="px-6  py-2 text-sm font-light font-medium text-gray-500">
                              {dayjs(order.createdAt)
                                .add(orderDays, "days")
                                .format("DD MMM YYYY")}
                            </td>
                            <td className="px-6 py-2 text-sm font-light font-medium text-gray-500">
                              ${" "}
                              {order.invoices.reduce(
                                (acc, invoice) => acc + invoice.amount,
                                0
                              )}
                            </td>
                            {/* <td className="text-gray-500 text-sm font-medium font-light py-2 flex justify-center items-center">
                              <div
                                className={`p-1 px-2 py-1 text-center font-normal rounded-2xl text-[12px] ${
                                  order.status === "Completed"
                                    ? "text-green-500 bg-green-50"
                                    : order.status === "Pending Payment"
                                    ? "text-orange-400 bg-orange-100"
                                    : order.status === "In Repair"
                                    ? "text-red-400 bg-red-100"
                                    : "text-gray-400 bg-gray-200"
                                }`}
                              >
                                <Link
                                  href={"/admin/" + order.id}
                                  key={order.id}
                                >
                                  {" "}
                                  {order.status}
                                </Link>
                              </div>
                              $ {order.amount}
                            </td> */}
                            <td className="px-6 py-2 text-sm font-light font-medium text-gray-500">
                              <div
                                className={`rounded-2xl py-1 text-center text-[12px] font-normal ${
                                  order.orderStatus === "completed"
                                    ? "bg-green-50 text-green-500"
                                    : order.orderStatus === "pendingpayment"
                                    ? "bg-orange-100 text-orange-400"
                                    : order.orderStatus === "inRepair"
                                    ? "bg-red-100 text-red-400"
                                    : "bg-gray-200 text-gray-400"
                                }`}
                              >
                                <Link
                                  href={`/admin/${order.id}`}
                                  key={order.id}
                                >
                                  {" "}
                                  {order.orderStatus}
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Order;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
