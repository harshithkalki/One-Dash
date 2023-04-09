import React, { useState } from "react";
import Popup from "reactjs-popup";
import { BsChevronDown } from "react-icons/bs";
import { AiOutlineClose, AiOutlineSmile, AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import { Days } from "../data/dataContents";
import CloseIcon from "../../../public/img/icon/Close Icon.svg";
const CardExtendDeliver = () => {
  const [open, setOpen] = useState(false);
  const closeModal = () => setOpen(false);
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [textarea, setteatarea] = useState("");

  return (
    <React.Fragment>
      <div className="font-play border bg-white">
        <div className="flex justify-between p-4">
          <div className="text-center">
            <h3 className="py-1 text-2xl font-semibold text-black">02</h3>
            <h3 className="py-1 text-xl text-gray-400">Days</h3>
          </div>
          <div className="text-center">
            <h3 className="py-1 text-2xl font-semibold text-black">26</h3>
            <h3 className="py-1 text-xl text-gray-400">Hours</h3>
          </div>
          <div className="text-center">
            <h3 className="py-1 text-2xl font-semibold text-black">30</h3>
            <h3 className="py-1 text-xl text-gray-400">Minutes</h3>
          </div>
          <div className="text-center">
            <h3 className="py-1 text-2xl font-semibold text-black">42</h3>
            <h3 className="py-1 text-xl text-gray-400">Seconds</h3>
          </div>
        </div>
        <div className="p-4">
          <button
            className="w-full border border-blue-500 px-3 py-3 text-blue-500"
            onClick={() => setOpen(!open)}
          >
            Extends Delivery Date
          </button>
        </div>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="font-play flex  w-[678px] flex-col items-center rounded-[10px] bg-white p-6 shadow-md">
          <div className="flex w-full justify-between pb-4">
            <p className="text-xl font-semibold text-black">
              Request: Extend Delivery Date
            </p>
            <Image
              className="cursor-pointer"
              src={CloseIcon}
              onClick={closeModal}
              alt="Close"
            />
          </div>
          <div className="w-full">
            <p className="text-xl text-black">
              How many days do you want to add to original date?
            </p>
          </div>
          <div className="mb-4 mt-4 flex w-full">
            <div className="relative inline-block w-[96px]">
              <div
                className="select relative block  h-[40px] w-[100%] cursor-pointer   border  bg-white   px-[16px] text-black"
                onClick={(e) => {
                  setVisibility(!visibility);
                }}
              >
                <div className="selected-option relative flex h-full items-center justify-between">
                  <span
                    className="flex items-center gap-4 !text-[13px]"
                    title={selectedOption === "" ? "1days" : selectedOption}
                  >
                    {selectedOption === ""
                      ? "1days"
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
                  <div className="options absolute left-0 top-[50px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3 ">
                    <ul>
                      {Days.map(({ option }, index) => (
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
          </div>
          <div className="w-full border-t-[1px] border-[#DBDBDB]">
            <p className="pb-2 pt-2 text-xl text-black">
              Help the buyer understand
            </p>
          </div>
          <div className="w-full">
            <div className="relative w-full">
              <div className="absolute bottom-2 right-2 flex items-center space-x-2">
                <span className="font-light text-gray-400">{textarea}/400</span>
                <AiOutlineSmile size={24} />
              </div>
              <textarea
                maxLength={400}
                onChange={(e) => setteatarea(e.target.value.length)}
                className="mt-2 w-full rounded-lg border p-2 px-3 text-gray-700 focus:outline-none"
                placeholder="Explain why you need more time"
                rows="6"
              />
            </div>

            <div className="mt-2 flex justify-end space-x-2">
              <button className="border border-blue-500 bg-white p-2.5 px-6 text-blue-500">
                Cancel
              </button>
              <button className="bg-blue-500 p-2.5 px-6 text-white">
                Send Request
              </button>
            </div>
          </div>
        </div>
      </Popup>
    </React.Fragment>
  );
};
export default CardExtendDeliver;
