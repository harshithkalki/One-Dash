import {
  ordersdata,
  optionsData,
  optionsData2,
} from "../../components/data/dataContents";
import CardProject from "../../components/card/CardProject";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import CardOrder from "../../components/card/CardOrder";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { api } from "~/utils/api";
import { type GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { adminServerSideProps } from "~/utils/serverSideProps";
import { orderProgress } from "~/utils/Progress";
import { type orderStatus } from "@prisma/client";

const OrderStatus: { value: orderStatus | "all"; label: string }[] = [
  { value: "all", label: "All" },
  { value: "DRAFT", label: "Draft" },
  { value: "completed", label: "Completed" },
  { value: "deliverd", label: "Deliverd" },
  { value: "inProduction", label: "In Production" },
  { value: "inRepair", label: "In Repair" },
  { value: "pendingQuote", label: "Pending Quote" },
  { value: "pendingReview", label: "Pending Review" },
  { value: "pendingpayment", label: "Pending Payment" },
];

const SortByTime = [
  {
    value: "thisWeek",
    label: "This Week",
  },
  {
    value: "thisMonth",
    label: "Month",
  },
  {
    value: "thisYear",
    label: "Year",
  },
  {
    value: "day",
    label: "Day",
  },
] as const;

const AdminDashboard = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [sortByOrderStatus, setSortByOrderStatus] = useState<
    (typeof OrderStatus)[number]
  >({ value: "all", label: "All" });
  const [weekvisibility, setWeekVisibility] = useState(false);
  const [weekselectedOption, weeksetSelectedOption] = useState<
    (typeof SortByTime)[number]
  >({ label: "This Week", value: "thisWeek" });
  const [search, setSearch] = useState("");

  const { data } = api.order.ordersSelect.useQuery();

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref: React.RefObject<HTMLDivElement>) {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setVisibility(false);
          setWeekVisibility(false);
        }
      }
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref]);
  }
  return (
    <React.Fragment>
      <div className="mt-20 p-4 pt-4">
        <div className="flex h-full w-full flex-col">
          <div ref={wrapperRef} className="font-play">
            <p className="text-sm text-gray-400 md:text-base">Overview</p>
            <div className="inline-block min-w-full py-2 md:items-center md:justify-between lg:flex">
              <h3 className="text-xl font-semibold md:text-3xl">Orders</h3>
              <div className="flex flex-wrap items-center gap-1">
                <div className="relative mt-2 w-28 border md:w-[25%]">
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
                    placeholder="Search"
                    className="w-full py-2.5 pl-10 outline-none"
                    onChange={(e) => setSearch(e.target.value)}
                    value={search}
                  />
                </div>
                <div className="relative mt-2 w-[33%] border md:w-[23%]">
                  <div
                    className="select relative block h-[45px] w-full  cursor-pointer bg-white  px-[16px]  text-black"
                    onClick={(e) => {
                      setWeekVisibility(!weekvisibility);
                      setVisibility(false);
                    }}
                  >
                    <div className="selected-option relative flex h-full items-center justify-between  ">
                      <span
                        className="flex items-center gap-4 !text-[13px]"
                        title={weekselectedOption.label}
                      >
                        {weekselectedOption.label.length <= 20
                          ? weekselectedOption.label
                          : `${weekselectedOption.label.slice(0, 20)}...`}
                      </span>
                      <img
                        className={`${
                          weekvisibility
                            ? "rotate-[0deg] transition-all"
                            : "rotate-[180deg] transition-all"
                        }`}
                        width={20}
                        height={20}
                        src="/img/icon/ArrowUp 2.svg"
                        alt="icon"
                      />
                    </div>
                    {weekvisibility && (
                      <div className="options absolute left-0 top-[50px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
                        <ul>
                          {SortByTime.map((value, index) => (
                            <li
                              key={index}
                              className={
                                weekselectedOption.value === value.value
                                  ? "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                  : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                              }
                              onClick={() => {
                                weeksetSelectedOption(value);
                              }}
                            >
                              {value.label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative mt-2 w-[30%] border md:w-[25%]">
                  <div
                    className="select relative  block h-[45px] w-full  cursor-pointer bg-white  px-[16px]  text-black"
                    onClick={(e) => {
                      setVisibility(!visibility);
                      setWeekVisibility(false);
                    }}
                  >
                    <div className="selected-option  relative flex h-full items-center justify-between ">
                      <span
                        className="flex items-center gap-4 !text-[13px]"
                        title={sortByOrderStatus.label}
                      >
                        {sortByOrderStatus.label.length <= 20
                          ? sortByOrderStatus.label
                          : `${sortByOrderStatus.label.slice(0, 20)}...`}
                      </span>
                      <img
                        className={`${
                          visibility
                            ? "rotate-[0deg] transition-all"
                            : "rotate-[180deg] transition-all"
                        }`}
                        width={20}
                        height={20}
                        src="/img/icon/ArrowUp 2.svg"
                        alt="icon"
                      />
                    </div>
                    {visibility && (
                      <div className="options absolute left-0  top-[50px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
                        <ul>
                          {OrderStatus.map(({ label, value }, index) => (
                            <li
                              key={index}
                              className={
                                sortByOrderStatus?.value === value
                                  ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                  : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                              }
                              onClick={() => {
                                setSortByOrderStatus({ label, value });
                              }}
                            >
                              {label}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mt-2 w-full md:w-24">
                  <button
                    onClick={() => void router.push("/admin/create")}
                    className="w-full bg-blue-500 py-2.5 text-[15px] text-white"
                  >
                    New Order
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="h-full">
            <div className="w-full ">
              <h4 className="py-4 text-xl font-semibold text-blue-500 md:text-3xl">
                Active Order
              </h4>
              <div className="mt-0 flex w-full flex-wrap items-start justify-start gap-2 gap-y-4 lg:justify-start">
                {data
                  ?.filter(
                    (order) =>
                      order.orderStatus === sortByOrderStatus?.value ||
                      sortByOrderStatus?.value === "all"
                  )
                  .filter((order) => {
                    if (weekselectedOption.value === "thisWeek") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 7))
                      );
                    } else if (weekselectedOption.value === "day") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 1))
                      );
                    } else if (weekselectedOption.value === "thisMonth") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 30))
                      );
                    } else if (weekselectedOption.value === "thisYear") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 365))
                      );
                    } else return true;
                  })
                  .filter((order) => {
                    if (search) {
                      return order.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else return true;
                  })
                  .map(
                    (product) =>
                      product.orderStatus !== "DRAFT" &&
                      product.orderStatus !== "pendingQuote" && (
                        <div key={product.id}>
                          <CardOrder
                            product={{
                              id: product.id,
                              // name: product.name,
                              status: product.orderStatus as orderStatus,
                              dateTime: product.createdAt.toISOString(),
                              img: product.logo ?? "/img/product/product_1.png",
                              // progress: orderProgress(product.orderStatus),
                              title: product.name,
                              users: {
                                id: product.User.id,
                                name: product.User.firstName,
                                img:
                                  product.User.profile ??
                                  "/img/user/Avatar_team1.svg",
                              },
                              amount:
                                product.invoices
                                  .reduce((a, b) => a + b.amount, 0)
                                  .toFixed(2) || "--",
                            }}
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
            <div className="w-full">
              <h4 className="py-4 text-xl font-semibold text-blue-500 md:text-3xl">
                Awaiting
              </h4>
              <div className="mt-0 flex flex-wrap items-start justify-start gap-2 gap-y-4 lg:justify-start">
                {data
                  ?.filter(
                    (order) =>
                      order.orderStatus === sortByOrderStatus?.value ||
                      sortByOrderStatus?.value === "all"
                  )
                  .filter((order) => {
                    if (weekselectedOption.value === "thisWeek") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 7))
                      );
                    } else if (weekselectedOption.value === "day") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 1))
                      );
                    } else if (weekselectedOption.value === "thisMonth") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 30))
                      );
                    } else if (weekselectedOption.value === "thisYear") {
                      return (
                        order.createdAt >=
                        new Date(new Date().setDate(new Date().getDate() - 365))
                      );
                    } else return true;
                  })
                  .filter((order) => {
                    if (search) {
                      return order.name
                        .toLowerCase()
                        .includes(search.toLowerCase());
                    } else return true;
                  })
                  .map(
                    (product) =>
                      product.orderStatus === "pendingQuote" && (
                        <div key={product.id}>
                          <CardOrder
                            product={{
                              id: product.id,
                              // name: product.name,
                              status: product.orderStatus as orderStatus,
                              dateTime: product.createdAt.toISOString(),
                              img: product.logo ?? "/img/product/product_1.png",
                              // progress: 0,
                              title: product.name,
                              users: {
                                id: product.User.id,
                                name: product.User.firstName,
                                img:
                                  product.User.profile ??
                                  "/img/user/Avatar_team1.svg",
                              },
                              amount: "---",
                            }}
                          />
                        </div>
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default AdminDashboard;

// export const getServerSideProps: GetServerSideProps = async (context) => {
//   const session = await getSession({ req: context.req });

//   if (session?.user.role !== "admin") {
//     // redirect to login page
//     return {
//       redirect: {
//         destination: "/client",
//         permanent: false, // set to true if the redirect is permanent
//       },
//     };
//   }
//   return {
//     props: {},
//   };
// };

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
