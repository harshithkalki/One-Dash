import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { BsChevronDown } from "react-icons/bs";
const PersonalInfo = () => {
  return (
    <React.Fragment>
      <div className="font-play  flex w-full flex-col rounded-[8px] bg-white p-4 px-6 shadow-sm lg:w-[37%]">
        <div className="flex items-center justify-between py-2">
          <p className="text-[16px] font-medium  text-black">My Details</p>
          <div className="flex space-x-2 font-normal">
            <button className="border p-2 px-4 py-2 text-sm text-blue-500">
              Cancel
            </button>
            <button className="border bg-blue-500 p-2 px-4 py-2 text-sm text-white">
              Save
            </button>
          </div>
        </div>
        <div className="flex w-full items-center justify-between gap-4 py-0 text-base font-normal">
          <div className="w-1/2">
            <p className="py-2.5 text-[14px] text-black">First Name</p>
            <input
              type="text"
              placeholder="FirstName"
              className="w-full border px-3 py-2 text-[14px] outline-none"
              defaultValue={"john"}
            />
          </div>
          <div className="w-1/2">
            <p className="py-2.5 text-[14px] text-black">Last Name</p>
            <input
              placeholder="LastName"
              type="text"
              className="w-full border  px-3 py-2 text-[14px] outline-none"
              defaultValue={"Sam"}
            />
          </div>
        </div>
        <div className="py-2 text-base font-normal">
          <p className="py-2.5 text-[14px] text-black">Email</p>
          <input
            placeholder="Email"
            type="email"
            className="w-full border px-3  py-2 text-[14px] outline-none"
            defaultValue={"johnsteady@gmail.com"}
          />
        </div>
        <div className="py-2">
          <p className="py-2 text-[14px] font-normal">Profile Picture</p>
          <div className="flex items-center space-x-4">
            <img
              src="/img/user/Avatar_3.png"
              width={60}
              height={60}
              alt="pic"
            />
            <div className="flex border text-[12px] sm:text-sm">
              <input
                type="text"
                className="w-full  px-3  py-2 text-[14px]"
                placeholder="No file selected"
              />
              <button className="w-32 bg-blue-500 text-[14px] text-white">
                Choose File
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

const Account = () => {
  return (
    <div className="h-36 w-96 overflow-y-auto text-black">
      <p className="py-2 text-black">This Setting Account</p>
    </div>
  );
};

const EmailSetting = () => {
  return (
    <div className="py-6 text-white">
      <p className="py-2 text-black">Component Email</p>
    </div>
  );
};

const SecuritySetting = () => {
  return (
    <div className="py-6 text-white">
      <p className="py-2 text-black">Component Security</p>
    </div>
  );
};

const SettingNotification = () => {
  return (
    <div className="py-6 text-white">
      <p className="py-2 text-black">Notifications</p>
    </div>
  );
};

const SettingStripe = () => {
  return (
    <div className="py-6 text-white">
      <p className="py-2 text-black">Strip</p>
    </div>
  );
};
const options = [
  { option: "Personal Information", value: "Personal Information" },
  { option: "Accounts", value: "Accounts" },
  { option: "Emails", value: "Emails" },
  { option: "Security", value: "Security" },
  { option: "Notifications", value: "Notifications" },
  { option: "Stripe", value: "Stripe" },
];

const TabComponent = () => {
  //console.log(owner)
  const [activeTab, setActiveTab] = useState("tab1");
  const [visibility, setVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleTab1 = () => {
    setActiveTab("tab1");
  };
  const handleTab2 = () => {
    setActiveTab("tab2");
  };

  const handleTab3 = () => {
    setActiveTab("tab3");
  };
  const handleTab4 = () => {
    setActiveTab("tab4");
  };

  const handleTab5 = () => {
    setActiveTab("tab5");
  };

  const handleTab6 = () => {
    setActiveTab("tab6");
  };

  return (
    <React.Fragment>
      <div className="font-play hidden flex-wrap items-center gap-6 pb-2 font-medium text-gray-500 md:w-2/3 md:text-lg  lg:flex">
        <p
          onClick={handleTab1}
          className={
            activeTab === "tab1"
              ? "active border-b-2 border-gray-400 py-2 text-[14px] text-black"
              : "text-[14px]"
          }
        >
          Personal Information
        </p>
        <p
          onClick={handleTab2}
          className={
            activeTab === "tab2"
              ? "active border-b-2 border-gray-400 py-2 text-[14px]  text-black"
              : " text-[14px]"
          }
        >
          Accounts
        </p>

        <p
          onClick={handleTab3}
          className={
            activeTab === "tab3"
              ? "active border-b-2 border-gray-400 py-2 text-[14px]  text-black"
              : " text-[14px]"
          }
        >
          Emails
        </p>
        <p
          onClick={handleTab4}
          className={
            activeTab === "tab4"
              ? "active border-b-2 border-gray-400 py-2 text-[14px] text-black"
              : " text-[14px]"
          }
        >
          Security
        </p>

        <p
          onClick={handleTab5}
          className={
            activeTab === "tab5"
              ? "active border-b-2 border-gray-400 py-2 text-[14px] text-black"
              : " text-[14px]"
          }
        >
          Notifications
        </p>

        <p
          onClick={handleTab6}
          className={
            activeTab === "tab6"
              ? "active border-b-2 border-gray-400 py-2 text-[14px] text-black"
              : " text-[14px]"
          }
        >
          Stripe
        </p>
      </div>

      <div className="relative mb-4 mt-2 block w-full lg:hidden">
        <div
          className="select relative  block h-[45px] w-full  cursor-pointer bg-white  px-[16px]  text-black"
          onClick={(e) => {
            setVisibility(!visibility);
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
            <div className="options absolute  left-0 top-[50px] max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3  ">
              <ul>
                {options.map(({ option }, index) => (
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

      <div className="mt-2 w-full 2xl:w-2/3">
        {activeTab === "tab1" ? (
          <PersonalInfo />
        ) : activeTab === "tab2" ? (
          <Account />
        ) : activeTab === "tab4" ? (
          <SecuritySetting />
        ) : activeTab === "tab5" ? (
          <SettingNotification />
        ) : activeTab === "tab6" ? (
          <SettingStripe />
        ) : (
          <EmailSetting />
        )}
      </div>
    </React.Fragment>
  );
};

export default TabComponent;
