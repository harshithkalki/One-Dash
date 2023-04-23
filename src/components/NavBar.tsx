// import ImgLogo from "../public/img/Logo.svg"
import DropdownUser from "./DropdownUser";
import Notifications from "./Notifications";
import Image from "next/image";
import logores from "../../public/img/logores.svg";
import Link from "next/link";
const NavBar = () => {
  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-10 flex h-20 items-center justify-end space-x-4 bg-white shadow-sm">
        <div className="centered absolute  left-[50%] top-0 flex items-center justify-center md:hidden">
          <Link href={"/admin"}>
            <img src={"/img/logores.svg"} alt="logo" />
          </Link>
        </div>
        <div className="flex items-center justify-end space-x-4 px-4">
          <Notifications />
          <div className="h-[20px] w-[1x]  border-[1px] border-[#EBEBEB]" />
          <DropdownUser />
        </div>
      </header>
    </>
  );
};
export default NavBar;
