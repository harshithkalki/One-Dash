import { optionsData2 } from "../../components/data/dataContents";
import CardProject from "../../components/card/CardProject";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

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

const Client = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [sortByOrderStatus, setSortByOrderStatus] = useState<
    (typeof OrderStatus)[number]
  >({ value: "all", label: "All" });
  const [weekvisibility, setWeekVisibility] = useState(false);
  const [weekselectedOption, weeksetSelectedOption] = useState<
    (typeof SortByTime)[number]
  >({ label: "This Week", value: "thisWeek" });
  const { status } = useSession();
  const [search, setSearch] = useState("");

  const wrapperRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);

  const { data, fetchNextPage } = api.order.orderPaginate.useInfiniteQuery(
    { limit: 10 },
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
    }
  );

  const handleScroll = () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (data?.pages[data?.pages.length - 1]?.cursor !== null) {
        void fetchNextPage();
      }
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <React.Fragment>
      <div className="mt-20 h-full overflow-y-auto p-4 pt-4">
        {/* <div className="p-4 fixed  bottom-2 right-2 bg-blue-600 rounded-full">
          <SiGooglechat className="text-white" size={32} />
        </div> */}
        <div className="flex w-full flex-col">
          <div className=" font-play">
            <p className="text-gray-400">Overview</p>
            <div className="block w-full flex-wrap py-2 md:flex md:items-center md:justify-between md:gap-2">
              <div className="flex w-full items-center justify-between lg:block lg:w-44">
                <h3 className="text-xl font-semibold md:text-3xl">
                  My Projects
                </h3>
                <div className="mt-2 block w-1/2 md:w-1/3 lg:hidden">
                  <button
                    className="w-full bg-blue-500 py-2.5  text-[14px] text-white md:text-[15px]"
                    onClick={() => void router.push("/client/create")}
                  >
                    New Project Request
                  </button>
                </div>
              </div>

              <div
                ref={wrapperRef}
                className="flex w-full  flex-wrap items-center justify-between gap-2 md:flex-nowrap lg:w-[60%]"
              >
                <div className="relative mt-2 w-[100%] border bg-[white] md:w-[39%]">
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
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                  />
                </div>
                <div className="relative mt-2 w-[48%] border md:w-[29%]">
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
                <div className="relative mt-2   w-[48%] border md:w-[29%]">
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
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <BsChevronDown className="font-medium text-white" />
                  </div>
                </div>
                <div className="mt-2 hidden w-full md:w-52 lg:block">
                  <button
                    className="w-full bg-blue-500 py-2.5 text-[14px] text-white"
                    onClick={() => void router.push("/client/create")}
                  >
                    New Project Request
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1">
            <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2 lg:justify-start">
              {data?.pages?.map(({ orders }) =>
                orders
                  .filter(
                    (order) =>
                      order.orderStatus === sortByOrderStatus?.value ||
                      sortByOrderStatus?.value === "all"
                  )
                  .filter((order) => {
                    console.log(weekselectedOption.value);
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
                  .map((product) => (
                    <div key={product.id}>
                      <CardProject
                        product={{
                          createdAt: product.createdAt.toISOString(),
                          id: product.id,
                          name: product.name,
                          status: product.orderStatus,
                          logo: product.logo ?? "/img/product/product_1.png",
                        }}
                      />
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Client;

import { type GetServerSideProps } from "next";
import { createSSG } from "~/utils/ssg";
import { orderStatus } from "@prisma/client";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { ssg, session } = await createSSG(context);

  if (!session) {
    return {
      redirect: {
        destination: "/login",
        permanent: false,
      },
    };
  }

  if (session.user.role !== "client") {
    return {
      redirect: {
        destination: "/admin",
        permanent: false,
      },
    };
  }

  await ssg.order.orderPaginate.prefetchInfinite({ limit: 10 });

  return {
    props: {
      trpcState: ssg.dehydrate(),
    },
  };
};
