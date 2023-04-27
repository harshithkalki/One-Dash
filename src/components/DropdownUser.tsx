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
import { AiOutlineCamera, AiOutlineLoading3Quarters } from "react-icons/ai";
import { useRouter } from "next/router";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";
import { useFormik } from "formik";
import { User } from "@prisma/client";
import { api } from "~/utils/api";
import { userInfo } from "os";
import UserForm from "./UserForm";
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
      {/* user form  */}
      <UserForm open={open} closeModal={closeModal} />
    </React.Fragment>
  );
};
export default DropdownUser;
