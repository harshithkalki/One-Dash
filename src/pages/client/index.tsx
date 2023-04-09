import {
  optionsData,
  optionsData2,
  products,
} from "../../components/data/dataContents";
import CardProject from "../../components/card/CardProject";
import { BsSearch, BsChevronDown } from "react-icons/bs";
import { useRouter } from "next/router";
// import { SiGooglechat } from "react-icons/si";
import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useSession } from "next-auth/react";
//BsSearch

const Client = () => {
  const router = useRouter();
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [weekvisibility, setWeekVisibility] = useState(false);
  const [weekselectedOption, weeksetSelectedOption] = useState("");
  const { data: session, status } = useSession();
  console.log(session);
  console.log(status);

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

  return (
    <React.Fragment>
      <div className="mt-20 overflow-y-auto p-4 pt-4">
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
          <div className="h-full">
            <div className="mt-6 flex w-full flex-wrap items-center justify-center gap-2 lg:justify-start">
              {products.map((product, index) => (
                <div key={index}>
                  <CardProject product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Client;
