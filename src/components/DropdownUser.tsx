import React, { useEffect, useRef, useState } from "react";
import Popup from "reactjs-popup";
import Image from "next/image";
// import { AiOutlineClose, AiOutlineCamera } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { FiLogOut } from "react-icons/fi";
import ImgAvatar from "../../public/img/user/Avatar.png";
import PicImg from "../../public/img/user/Avatar_3.png";
// import ArrowUp2 from "../../public/img/icon/ArrowUp 2.svg";
import { FaRegUserCircle } from "react-icons/fa";
import Closeicon from "../../public/img/icon/Close Icon.svg";
import { AiOutlineCamera } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
// import Link from "next/link";
const DropdownUser = () => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(false);
  const closeModal = () => setOpen(false);
  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpen);
  const clickTes = () => {
    console.log("rest");
  };
  const openModal = () => {
    setOpen(true);
    setClicked(false);
  };

  const { data: session } = useSession();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Do something with the form data
  };

  function useOutsideAlerter(
    ref: React.RefObject<HTMLElement>,
    setVisibility: React.Dispatch<React.SetStateAction<boolean>>
  ) {
    useEffect(() => {
      /**
       * Alert if clicked on outside of element
       */
      function handleClickOutside(event: MouseEvent) {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          setVisibility(false);
        }
      }
      // Bind the event listener
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, setVisibility]);
  }
  const [visibility, setVisibility] = useState(false);
  const [statevisibility, setStateVisibility] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [stateselectedOption, setStateSelectedOption] = useState("");
  const [flagOption, setflagedOption] = useState("");
  const [search, setSearch] = useState("");
  const options = [
    {
      countryName: "United States",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },

    {
      countryName: "United Kingdom",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    },

    {
      countryName: "Canada",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    },

    {
      countryName: "Australia",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    },

    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
  ];
  const options1 = [
    {
      countryName: "United States",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/a4/Flag_of_the_United_States.svg",
    },

    {
      countryName: "United Kingdom",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/a/ae/Flag_of_the_United_Kingdom.svg",
    },

    {
      countryName: "Canada",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/d/d9/Flag_of_Canada_%28Pantone%29.svg",
    },

    {
      countryName: "Australia",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/commons/8/88/Flag_of_Australia_%28converted%29.svg",
    },

    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
    {
      countryName: "France",
      flagImgUrl:
        "https://upload.wikimedia.org/wikipedia/en/c/c3/Flag_of_France.svg",
    },
  ];
  console.log(session);

  return (
    <React.Fragment>
      <div className="menu cursor-pointer">
        <Popup
          trigger={
            <div className="font-play flex cursor-pointer items-center space-x-2 py-2 font-medium text-black">
              <div className="relative">
                <div className="absolute -right-1 -top-1 z-20 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 text-[10px] text-white">
                  1
                </div>
                <img
                  src={session?.user.image ?? "/img/user/Avatar.png"}
                  width={32}
                  height={32}
                  className="rounded-full"
                  alt="avatar"
                />
              </div>
              <span className="hidden md:block">
                {session?.user?.firstName}
              </span>
              <BsChevronDown size={18} className="hidden md:block" />
            </div>
          }
          position="top center"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        >
          <div className="fixed right-0  top-6 mt-12 flex w-60 cursor-pointer flex-col bg-white px-3 shadow-md">
            <li
              className="flex items-center space-x-2 border-b border-gray-300 p-2 py-2.5"
              onClick={openModal}
            >
              <FaRegUserCircle size={22} className="text-gray-400" />
              <Link href={"#"} className="text-sm text-gray-400 md:text-base">
                {" "}
                My Profile
              </Link>
            </li>
            <li
              className="flex items-center space-x-2 p-2 py-2.5"
              onClick={() => {
                void signOut();
              }}
            >
              <FiLogOut size={22} className="text-gray-400" />{" "}
              <span className="text-sm text-gray-400 md:text-base">
                Log out
              </span>
            </li>
          </div>
        </Popup>
      </div>
      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="font-play  mx-auto max-w-[90%] cursor-pointer rounded-[8px] border-[1px] border-[#EBEBEB] bg-white shadow-2xl sm:max-w-[550px]">
          <form onSubmit={handleSubmit}>
            <div className="EditProfile--gap flex flex-col p-3   py-1 sm:p-0 sm:px-6 md:py-1 lg:px-8">
              <div className="mt-0 flex items-center justify-between md:mt-2">
                <h3 className="text-[18px] font-[600] text-[#131313]">
                  Edit Profile
                </h3>
                <Image
                  onClick={closeModal}
                  className="cursor-pointer "
                  src={Closeicon}
                  alt="close"
                />
              </div>
              <div className="flex items-center justify-center py-0 md:py-2">
                <div className="relative">
                  <div className="absolute -bottom-2 -right-2 rounded-full bg-white p-1 shadow-md">
                    <AiOutlineCamera
                      size={25}
                      className="EditProfile--subimg rounded-full   bg-blue-500 p-1 text-white"
                    />
                  </div>
                  <Image
                    src={PicImg}
                    className="EditProfile--img"
                    width={76}
                    height={76}
                    alt="pic"
                  />
                </div>
              </div>
              <div className="EditProfile flex  justify-between  space-x-5 py-1 md:py-1">
                <div className="basis-1/2">
                  <label className="font-play mb-0 block text-sm font-[500] md:mb-0">
                    First Name
                  </label>
                  <div className="relative">
                    <input
                      className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                      id="firstname"
                      type="text"
                      placeholder="First Name"
                      required
                    />
                  </div>
                </div>
                <div className="basis-1/2">
                  <label className="font-play mb-0 block text-sm font-[500] md:mb-0">
                    Last Name
                  </label>
                  <div className="relative">
                    <input
                      className="focus:shadow-outline   mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                      id="lastname"
                      type="text"
                      placeholder="Last Name"
                      required
                    />
                  </div>
                </div>
              </div>
              <div className="EditProfile EditProfile py-1 md:py-0">
                <label
                  className="font-play mb-0 block text-sm font-[500] md:mb-1"
                  htmlFor="username"
                >
                  Email
                </label>
                <input
                  required
                  className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                  id="email"
                  type="email"
                  placeholder="Email"
                />
              </div>
              <div className="EditProfile EditProfile--gap py-1 md:py-2">
                <label
                  className="font-play mb-0 block text-sm font-[500] md:mb-1"
                  htmlFor="username"
                >
                  Phone Number
                </label>
                <input
                  required
                  className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                  id="phone"
                  type="text"
                  placeholder="Phone Number"
                />
              </div>
              <div className="EditProfile font-play py-1 text-sm font-[500]  md:py-0">
                <p>Country</p>
              </div>
              <div className="EditProfile py-1 md:py-2">
                <div
                  className="select relative block  h-8 w-[100%] cursor-pointer   border  bg-white   px-[16px] text-[14px] text-black"
                  onClick={(e) => {
                    setVisibility(!visibility);
                    setSearch("");
                  }}
                >
                  <div className="selected-option relative flex h-full items-center justify-between">
                    <span
                      className="focus:shadow-outline mb-0  flex w-full    appearance-none items-center gap-4 rounded leading-tight  !text-gray-700 focus:outline-none"
                      title={
                        selectedOption === ""
                          ? "Select a Country"
                          : selectedOption
                      }
                    >
                      {flagOption === "" ? (
                        ""
                      ) : (
                        <Image
                          width={35}
                          height={35}
                          src={flagOption}
                          alt="flag"
                        />
                      )}
                      {selectedOption === ""
                        ? "Select a Country"
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
                    <div className="options absolute left-0 top-[40px] z-50 max-h-[209px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3 ">
                      <ul>
                        {options.map(({ countryName, flagImgUrl }, index) => (
                          <li
                            key={index}
                            className={
                              selectedOption === countryName
                                ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                            }
                            onClick={() => {
                              setSelectedOption(countryName);
                              setflagedOption(flagImgUrl);
                            }}
                          >
                            {countryName}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="font-play EditProfile  py-1 text-sm font-[500] md:py-1">
                <p>Billing Address</p>
              </div>

              <div className="EditProfile flex justify-between space-x-4 py-2 md:py-0">
                <div className="basis-1/2">
                  <div className="relative">
                    <input
                      className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3  text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none md:mb-0"
                      id="firstnameaddress"
                      type="text"
                      required
                      placeholder="First Name"
                    />
                  </div>
                </div>
                <div className="basis-1/2">
                  <div className="relative">
                    <input
                      className="focus:shadow-outline mb-0 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none md:mb-0"
                      id="lastnameaddress"
                      type="text"
                      required
                      placeholder="Last Name"
                    />
                  </div>
                </div>
              </div>
              <div className="EditProfile py-1 md:py-2">
                <input
                  className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                  id="company"
                  type="text"
                  required
                  placeholder="Company Name Optional"
                />
              </div>
              <div className="EditProfile py-1 md:py-1">
                <input
                  className="focus:shadow-outline h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                  id="address"
                  required
                  type="text"
                  placeholder="Address"
                />
              </div>
              <div className="EditProfile flex justify-between space-x-4 py-1 md:py-1">
                <div className="basis-1/3">
                  <div className="relative">
                    <input
                      className="focus:shadow-outline mb-3 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                      id="ciry"
                      required
                      type="text"
                      placeholder="City"
                    />
                  </div>
                </div>
                <div className="relative basis-1/3">
                  <div
                    className="select relative block  h-8 w-[100%] cursor-pointer   border  bg-white   px-[16px] text-black"
                    onClick={(e) => {
                      setStateVisibility(!statevisibility);
                    }}
                  >
                    <div className="selected-option relative flex h-full items-center justify-between">
                      <span
                        className="flex items-center gap-1 !text-[13px]"
                        title={
                          stateselectedOption === ""
                            ? "State"
                            : stateselectedOption
                        }
                      >
                        {stateselectedOption === ""
                          ? "State"
                          : stateselectedOption.length <= 20
                          ? stateselectedOption
                          : `${stateselectedOption.slice(0, 20)}...`}
                      </span>
                      <Image
                        className={`${
                          statevisibility
                            ? "rotate-[0deg] transition-all"
                            : "rotate-[180deg] transition-all"
                        }`}
                        width={20}
                        height={20}
                        src="/img/icon/ArrowUp 2.svg"
                        alt="icon"
                      />
                    </div>
                    {statevisibility && (
                      <div className="options absolute left-0 top-[35px] z-50 max-h-[100px] w-full overflow-y-scroll border-[1px] border-[#f3dcdc] bg-white px-3 ">
                        <ul>
                          {options1.map(
                            ({ countryName, flagImgUrl }, index) => (
                              <li
                                key={index}
                                className={
                                  stateselectedOption === countryName
                                    ? "active-option font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                    : "font-play mt-[10px] flex h-[37px] w-[100%] items-start justify-start border-b-[1px] border-[#EBEBEB] py-2 text-[12px] font-[400] leading-[17px] text-[#131313]"
                                }
                                onClick={() => {
                                  setStateSelectedOption(countryName);
                                }}
                              >
                                {countryName}
                              </li>
                            )
                          )}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>
                <div className="basis-1/3">
                  <div className="relative">
                    <input
                      className="focus:shadow-outline mb-3 h-8 w-full appearance-none rounded border px-3 text-[14px] leading-tight text-gray-700 placeholder-gray-300 focus:outline-none"
                      id="zipcode"
                      required
                      type="text"
                      placeholder="Zip Code"
                    />
                  </div>
                </div>
              </div>
              <div className="EditProfile mb-2 py-1 md:py-2">
                <button className="w-full bg-blue-500 px-2 py-2 text-white md:py-3">
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </Popup>
    </React.Fragment>
  );
};
export default DropdownUser;
