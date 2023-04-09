import React from "react";
import { BsSearch, BsCheckAll } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import Image from "next/image";
import { ImAttachment } from "react-icons/im";
import { RiEmotionHappyLine } from "react-icons/ri";
import { calculateOverrideValues } from "next/dist/server/font-utils";
const ChatMessage = () => {
  return (
    <React.Fragment>
      <div className="font-play relative mt-20 flex h-[calc(100vh-80px)] w-full bg-[#FAFAFA]">
        <div className="w-full border-r bg-white md:w-2/5 lg:w-[50%] xl:w-[40%]">
          <div className="flex items-center justify-between">
            <h4 className="p-4 text-3xl">Messages</h4>
            <AiOutlineMore />
          </div>
          <div className="px-4 py-2">
            <div className="relative w-full text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="focus:shadow-outline p-1 focus:outline-none"
                >
                  <BsSearch />
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="w-full border py-3 pl-10 text-sm text-white focus:bg-white focus:text-gray-900 focus:outline-none"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
            <div className="relative mt-2 flex w-full space-x-2 border-b bg-gray-50 p-1 pt-4 sm:border-none">
              <Image
                src="/img/user/Avatar_2.png"
                alt="pic"
                width={40}
                height={40}
              />
              <div className="absolute bottom-1 left-6 h-2 w-2 rounded-full bg-green-500"></div>

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm lg:text-base">Angelina Lee</p>
                  <span className="truncate text-[10px] text-gray-400">
                    10 min ago
                  </span>
                </div>
                <p className="w-36 truncate text-[12px] text-gray-400">
                  Lorem ipsum dolor sit amet .
                </p>
              </div>
            </div>
            <div className="flex w-full space-x-2 border-b p-1 pt-4 sm:border-none">
              <Image
                src="/img/user/Avatar_4.png"
                alt="pic"
                width={40}
                height={40}
              />

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm lg:text-base">John Doe</p>
                  <span className="truncate text-[10px] text-gray-400">
                    10 min ago
                  </span>
                </div>
                <p className="w-36 truncate text-[12px] text-gray-400">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
            <div className="flex w-full space-x-2 border-b p-1 pt-4 sm:border-none">
              <Image
                src="/img/user/Avatar_4.png"
                alt="pic"
                width={40}
                height={40}
              />

              <div className="w-full">
                <div className="flex items-center justify-between">
                  <p className="text-sm lg:text-base">John Doe</p>
                  <span className="truncate text-[10px] text-gray-400">
                    10 min ago
                  </span>
                </div>
                <p className="w-36 truncate text-[12px] text-gray-400">
                  Lorem ipsum dolor sit amet.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden bg-white md:block md:w-3/5 lg:w-5/6">
          <div className="flex h-16 w-full items-center justify-between border-b px-4">
            <div className="flex space-x-2">
              <div className="relative">
                <Image
                  src="/img/user/Avatar_2.png"
                  alt="pic"
                  width={40}
                  height={40}
                />
                <div className="absolute bottom-1 right-0 h-2 w-2 rounded-full bg-green-500"></div>
              </div>
              <div className="block">
                <p className="text-base font-normal">Angelina Lee</p>
                <p className="text-[12px] font-normal text-gray-400">Online</p>
              </div>
            </div>
            <div className="p-2">
              <AiOutlineMore />
            </div>
          </div>
          <div className="w-full">
            <div>
              <p className="py-2 text-center text-[12px] text-gray-400">
                Today
              </p>
              <div className="flex justify-end px-8 py-2">
                <p className="max-w-md rounded-b-lg bg-gray-100 p-2 text-sm font-light">
                  consectetur adipiscing elit
                </p>
              </div>
              <div className="flex justify-end px-8 py-2">
                <p className="max-w-md rounded-b-lg bg-gray-100 p-2 text-sm font-light">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
              <div className="flex items-center justify-end px-8 text-[11px]  text-gray-400">
                10.12 AM <BsCheckAll className="text-blue-500" />
              </div>
            </div>
          </div>
          <div className="w-full">
            <div>
              <div className="flex justify-start px-8 py-2">
                <p className="max-w-md rounded-b-lg bg-blue-500 p-2.5 text-sm font-light text-white">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit
                </p>
              </div>
              <div className="flex items-center justify-start px-8 text-[11px]  text-gray-400">
                10.12 AM{" "}
              </div>
            </div>
          </div>
          <div className="absolute bottom-0 w-full">
            <form>
              <label for="chat" className="sr-only">
                Your message
              </label>
              <div className="relative flex items-center rounded-lg bg-gray-50 px-3 py-2">
                <div className="absolute right-20 flex space-x-4 rounded-lg bg-gray-50 px-2 py-2">
                  <RiEmotionHappyLine size={18} />
                  <ImAttachment size={18} />
                </div>
                <textarea
                  id="chat"
                  rows="2"
                  className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none"
                  placeholder="Your message..."
                />
                <button
                  type="submit"
                  className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
                >
                  <svg
                    className="h-6 w-6 rotate-90"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
                  </svg>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ChatMessage;
