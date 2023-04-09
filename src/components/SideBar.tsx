import React, { useEffect, useState } from "react";
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
import Link from "next/link";

const SideBar = () => {
  const [open, setOpen] = useState(true);
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const [color, setColor] = useState("text-gray-600");
  const [clicked, setClicked] = useState("/admin");
  const router = useRouter();
  useEffect(() => {
    function handleResize() {
      setOpen(window.innerWidth >= 767);
    }
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [menu, setMenu] = useState([
    {
      title: "Overviews",
      visible: false,
      haveSub: false,
      icon:
        clicked === router.pathname ? (
          <SiDatabricks color={"#131313"} />
        ) : (
          <SiDatabricks color={"#13131380"} />
        ),
      linkurl: "/admin",
    },
    {
      title: "Customers",
      visible: false,
      haveSub: false,
      icon:
        clicked === router.pathname ? (
          <TbUsers color={"#131313"} />
        ) : (
          <TbUsers color={"#13131380"} />
        ),
      linkurl: "/admin/customers",
    },
    {
      title: "Orders",
      visible: false,
      haveSub: true,
      child: [
        { title: "All type" },
        { title: "Active" },
        { title: "Comolete" },
        { title: "Cancel" },
      ],
      icon:
        clicked === router.pathname ? (
          <CiShop color={"#131313"} />
        ) : (
          <CiShop color={"#13131380"} />
        ),
      linkurl: "/admin/orders",
    },
    {
      title: "Messages",
      visible: false,
      haveSub: false,
      icon:
        clicked === router.pathname ? (
          <BiMessageSquareDetail color={"#131313"} />
        ) : (
          <BiMessageSquareDetail color={"#13131380"} />
        ),
      linkurl: "/admin/messages",
    },
    {
      title: "Settings",
      visible: false,
      haveSub: true,
      child: [
        { title: "Personal Inormations" },
        { title: "Account" },
        { title: "Emails" },
        { title: "Security" },
        { title: "Notifications" },
        { title: "Stripe" },
      ],
      icon:
        clicked === router.pathname ? (
          <SlSettings color={"#131313"} />
        ) : (
          <SlSettings color={"#13131380"} />
        ),
      linkurl: "/admin/settings",
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
    <div className="flex    h-screen items-end justify-end">
      <button
        className="fixed left-2 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full text-4xl text-white drop-shadow-lg lg:hidden"
        onClick={toggleSidebar}
      >
        <AiOutlineMenu size={24} className="text-black" />
      </button>

      <div
        className={` ${
          open ? "sidebar visible" : "w-0"
        } SmoothAnimation fixed bottom-0 left-0 top-0  z-20 overflow-hidden border-r  bg-white lg:w-[190px]  2xl:w-[256px]`}
      >
        <div className="mt-3   justify-center  px-2">
          <div
            className={`flex justify-between pr-3  text-center text-2xl font-medium  text-white  ${
              !open && "sidebar visible "
            }`}
          >
            <Link href={"/admin"}>
              <Image
                width={158}
                height={60}
                alt="loog"
                src={LogoIcon}
                className={`ml-4 lg:w-[140px] ${
                  !open && "sidebar "
                } cursor-pointer`}
              />
            </Link>
            <button
              onClick={toggleSidebar}
              className={`block md:hidden ${!open && "sidebar visible "}`}
            >
              <AiOutlineMenu size={24} className="text-black" />
            </button>
          </div>
        </div>

        <ul
          className={`SmoothAnimation pl-2   pt-6 ${
            !open && "sidebar visible "
          }`}
        >
          {menu.map((menu, index) => (
            <div key={index}>
              <ul>
                {/* <Link> */}
                <Link href={menu.linkurl}>
                  <li className="ml-4">
                    <div
                      className={`flex border-r-4 ${
                        !open && "sidebar visible "
                      } mt-3 w-full items-center space-x-3 py-[5px]  text-gray-400 ${
                        clicked === menu.linkurl
                          ? "text--font border-[#007AFF] font-[600] text-[#131313]"
                          : "border-r-0"
                      } `}
                      onClick={() => {
                        onMenuClick(index);
                        setClicked(menu.linkurl);
                      }}
                    >
                      {React.cloneElement(menu.icon, { color })}
                      <span>{menu.title}</span>
                    </div>
                    <div className="SmoothAnimation ml-8 mt-0">
                      {menu.haveSub && menu.visible && (
                        <ul className="SmoothAnimation text-[12px]  text-gray-400 ">
                          {menu.child.map((item, index) => (
                            <li className="SmoothAnimation mt-2" key={index}>
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
      </div>
    </div>
  );
};

export default SideBar;
