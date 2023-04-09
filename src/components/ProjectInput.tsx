import React, { useState } from "react";
import { useRouter } from "next/router";
import { GrDocumentUpload } from "react-icons/gr";
import Image from "next/image";

import uploadicon from "../../public/img/icon/u_file-upload-alt.svg";
const ProjectInput = ({ userin }) => {
  const router = useRouter();
  const [weekvisibility, setWeekVisibility] = useState(false);
  const [visibility, setVisibility] = useState(false);
  const [weekselectedOption, weeksetSelectedOption] = useState("");
  const [selectedOption, setSelectedOption] = useState("");
  const options1 = [
    { option: "3D Animation", value: "3D Animation" },
    { option: "3D Hologram Content", value: "3D Hologram Content" },
    { option: "3D Product Modelling", value: "3D Product Modelling" },
    { option: "AR / VR", value: "AR / VR" },
    { option: "Custom", value: "Custom" },
  ];
  return (
    <React.Fragment>
      <div className="font-play border bg-white py-2 shadow-sm">
        <div className="px-4 pt-[2px]">
          <div className="py-2">
            {userin && (
              <div
                className="select focus:shadow-outline relative block h-[45px] w-full cursor-pointer appearance-none rounded border bg-white px-4 py-3 pr-8 leading-tight text-black   text-gray-400  focus:outline-none"
                onClick={(e) => {
                  setVisibility(!visibility);
                }}
              >
                <div className="selected-option relative flex h-full items-center justify-between  ">
                  <span
                    className="flex items-center gap-4 !text-[13px]"
                    title={
                      selectedOption === "" ? "Select User" : selectedOption
                    }
                  >
                    <img src="/img/icon/user-search.svg" />
                    {selectedOption === ""
                      ? "Select User"
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
                  <div className="options absolute left-0  top-[50px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
                    <ul>
                      {options1.map(({ option }, index) => (
                        <li
                          key={index}
                          className={
                            selectedOption === option
                              ? "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
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
            )}
          </div>
          <div className="">
            <input
              className="focus:shadow-outline w-full appearance-none rounded border px-3 py-3 text-[13px] leading-tight text-gray-700 placeholder-gray-400 focus:outline-none"
              id="address"
              type="text"
              placeholder="Project Name"
            />
          </div>
          <div className="py-2">
            <div className="relative inline-block w-full">
              <div
                className="select focus:shadow-outline relative block h-[45px] w-full cursor-pointer appearance-none rounded border bg-white px-4 py-3 pr-8 leading-tight text-black   text-gray-400  focus:outline-none"
                onClick={(e) => {
                  setWeekVisibility(!weekvisibility);
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
                      {options1.map(({ option }, index) => (
                        <li
                          key={index}
                          className={
                            weekselectedOption === option
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
          </div>

          <div className="py-2">
            <p className="text-[14px] lg:text-[13px] 2xl:text-[14px]">
              Today at 1.18 PM
            </p>
          </div>
        </div>
      </div>
      <div className="sadow-sm mt-4 border bg-white py-4">
        <div className="block gap-2 space-x-0 p-4 md:justify-between lg:flex lg:space-x-6">
          <div className="w-full md:basis-3/4">
            <textarea
              className="mb-2 w-full border px-3 py-2 text-[16px] text-gray-700 focus:outline-none lg:text-[15px] 2xl:text-[16px]"
              rows={4}
              placeholder="Notes (Brief description of your project)"
            />
            <textarea
              className="mt-2 w-full border px-3 py-2 text-[16px] text-gray-700 focus:outline-none lg:text-[15px] 2xl:text-[16px]"
              rows={4}
              placeholder="Reference Links"
            />
          </div>

          <div className="mt-3  lg:mt-0">
            <label className="custome--border relative flex h-full w-full flex-col items-center justify-center space-x-5  border-0  border-dashed border-gray-300 bg-[#F2F8FF]">
              <div className="mt-6 flex max-w-full  flex-col items-center justify-center text-blue-600 md:max-w-[400px] lg:mt-0">
                {/* <GrDocumentUpload size={36} /> */}
                <Image
                  src={"/img/icon/u_file-upload-alt.svg"}
                  width={35}
                  height={35}
                  alt="icon"
                />

                <p className="max-w-[220px] py-2 text-center text-[14px] text-[#007AFF]">
                  Upload References Photos, Documents, Design Files or Folders (
                  Max File Size 2GB )
                </p>
              </div>
              <input type="file" className="opacity-0" />
            </label>
          </div>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-4 px-4 md:justify-end">
          <button className="w-36 border bg-white px-3 py-2 md:w-44">
            Save
          </button>
          <button
            className="w-36 border bg-white px-3 py-2 md:w-44"
            onClick={() => void router.push("/client")}
          >
            Save and Close
          </button>
          <button className="w-full border bg-blue-500 px-3 py-2 text-white md:w-44">
            Get Quote
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ProjectInput;
