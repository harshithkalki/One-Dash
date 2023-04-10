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
const AdminDashboard = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [weekvisibility, setWeekVisibility] = useState(false);
  const [weekselectedOption, weeksetSelectedOption] = useState("");

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef);
  function useOutsideAlerter(ref) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
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
                        title={
                          weekselectedOption === ""
                            ? "This Week"
                            : weekselectedOption
                        }
                      >
                        {weekselectedOption === ""
                          ? "This Week"
                          : weekselectedOption.length <= 20
                          ? weekselectedOption
                          : `${weekselectedOption.slice(0, 20)}...`}
                      </span>
                      <Image
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
                      <div className="options absolute  left-0 top-[50px] max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
                        <ul>
                          {optionsData2.map(({ option }, index) => (
                            <li
                              key={index}
                              className={
                                selectedOption === option
                                  ? "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                  : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                              }
                              onClick={() => {
                                weeksetSelectedOption(option);
                              }}
                            >
                              {option}
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
                        title={selectedOption === "" ? "All" : selectedOption}
                      >
                        {selectedOption === ""
                          ? "All"
                          : selectedOption.length <= 20
                          ? selectedOption
                          : `${selectedOption.slice(0, 20)}...`}
                      </span>
                      <Image
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
                      <div className="options absolute  left-0 top-[50px] max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
                        <ul>
                          {optionsData.map(({ option }, index) => (
                            <li
                              key={index}
                              className={
                                selectedOption === option
                                  ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                  : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                              }
                              onClick={() => {
                                setSelectedOption(option);
                              }}
                            >
                              {option}
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
                {ordersdata.map(
                  (product, index) =>
                    product.status_order == "active" && (
                      <div key={index}>
                        <CardOrder product={product} />
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
                {ordersdata.map(
                  (product, index) =>
                    product.status_order == "awaiting" && (
                      <div key={index}>
                        <CardOrder product={product} />
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
