import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { GrNotification } from "react-icons/gr";
import { BiMessageSquareDetail } from "react-icons/bi";
import { AiOutlineMore, AiOutlineMenu } from "react-icons/ai";
import { RiTeamLine } from "react-icons/ri";
import { SiDatabricks } from "react-icons/si";
import { TbUsers } from "react-icons/tb";
import { SlSettings } from "react-icons/sl";
import { MdEdit } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import LogoIcon from "../../public/img/Logo.svg";
import Image from "next/image";
import HelpCenter from "./HelpCenter";
import Link from "next/link";
import { IconContext } from "react-icons";

const SideClient = () => {
  const router = useRouter();
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [clicked, setClicked] = useState("/client");
  const [color, setColor] = useState("text-gray-600");
  useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth >= 767);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const [menu, setMenu] = useState([
    {
      title: "My Project",
      visible: false,
      haveSub: false,
      icon:
        clicked === router.pathname ? (
          <SiDatabricks color={"#131313"} />
        ) : (
          <SiDatabricks color={"#13131380"} />
        ),
      linkurl: "/client",
    },
    {
      title: "Team",
      visible: false,
      haveSub: false,
      icon:
        clicked === router.pathname ? (
          <TbUsers color={"#131313"} />
        ) : (
          <TbUsers color={"#13131380"} />
        ),

      linkurl: "/client/team",
    },
  ]);

  const onMenuClick = (index) => {
    menu[index].visible = !menu[index].visible;
    setMenu([...menu]);
  };

  const toggleSidebar = () => {
    setOpen(!open);
  };
  return (
    <div className="flex h-screen items-end justify-end ">
      <button
        className="fixed left-2 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-4xl text-white drop-shadow-lg lg:hidden  "
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} className="text-black" />
      </button>

      <div
        className={` ${
          open ? "sidebar visible" : "w-0"
        } SmoothAnimation  fixed bottom-0  left-0 top-0 z-20 h-screen border-r bg-white   duration-500 lg:w-[190px]  2xl:w-[256px]`}
      >
        <div className="mt-3  justify-center px-2">
          <div
            className={`flex justify-between text-center  text-2xl font-medium text-white  ${
              !open && "sidebar"
            }`}
          >
            <img
              width={158}
              height={60}
              alt="loog"
              src={LogoIcon}
              className={`ml-4 md:w-[158px] lg:w-[140px] 2xl:w-[158px] ${
                !open && "sidebar visible"
              } cursor-pointer`}
            />
            <button
              onClick={toggleSidebar}
              className={`block md:hidden ${!open && "sidebar visible"}`}
            >
              <AiOutlineMenu size={24} className="text-black" />
            </button>
          </div>
        </div>
        <ul className={`pl-2  pt-6   ${!open && "sidebar "}`}>
          {menu.map((menu, index) => (
            <div
              className={`w-full  border-r-4 ${
                clicked === menu.linkurl
                  ? "border-[#007AFF]  text-[#131313]"
                  : "border-r-0"
              } ${!open && "sidebar"}  `}
              key={index}
            >
              <ul>
                {/* <Link href={"#"}> */}
                <Link href={menu.linkurl}>
                  <li className="ml-4 ">
                    <div
                      className={`mt-6 flex  h-[33px] items-center space-x-3 text-center text-gray-400 ${
                        clicked === menu.linkurl
                          ? "text--font font-[600] text-[#131313]"
                          : null
                      }`}
                      onClick={() => {
                        onMenuClick(index);
                        setClicked(menu.linkurl);
                      }}
                    >
                      {React.cloneElement(menu.icon, { color })}
                      <span>{menu.title}</span>
                    </div>
                    <div className="ml-8 mt-4">
                      {menu.haveSub && menu.visible && (
                        <ul className="duration-400' text-[12px] text-gray-400">
                          {menu.child.map((item, index) => (
                            <li className="mt-2" key={index}>
                              {item.title}
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </li>
                </Link>
                {/* </Link> */}
              </ul>
            </div>
          ))}
        </ul>
        <div className="absolute  bottom-8 left-16">
          <HelpCenter />
        </div>
      </div>
    </div>
  );
};

export default SideClient;
