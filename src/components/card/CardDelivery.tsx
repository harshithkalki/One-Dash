import Image from "next/image";
import { SiHackthebox } from "react-icons/si";
import { BsDownload } from "react-icons/bs";
import PicAtach from "../../../public/img/pic_delivery.png";
import imgPic from "../../../public/img/user/Avatar_5.png";
import Cubebox from "../../../public/img/icon/cubeboxicon.svg";
const CardDelivery = () => {
  return (
    <div className="font-play p-2 pt-5 text-gray-400 text-white">
      <div className="mb-4 flex justify-between space-x-2">
        <div className="flex space-x-4">
          <div className="w-[45px]">
            <Image src={imgPic} alt="pic" width={45} height={45} />
          </div>
          <div className="block">
            <h4 className="text-[20px] font-[600] text-black xl:text-[16px] 2xl:text-[20px]">
              3D Content Studio
            </h4>
            <p className="hidden max-w-sm py-1 text-[16px] font-normal  text-black md:block xl:text-[14px] 2xl:text-[16px]">
              Thanks again for your oder! Your delivery is enclosed.Thanks again
              and have a great day :).
            </p>
          </div>
        </div>
        {/* <SiHackthebox size={70} className="text-blue-500" /> */}
        <Image
          width={67}
          height={67}
          alt="loog"
          src={Cubebox}
          className="ml-4 hidden md:block"
        />
      </div>
      <p className="max-w-full py-1 text-[16px] font-normal text-[#00000080] md:hidden md:text-black xl:text-[14px] 2xl:text-[16px]">
        Thanks again for your oder! Your delivery is enclosed.Thanks again and
        have a great day :).
      </p>
      <h5 className="text--font pt-2 text-[16px] font-[500] leading-[20px] text-[#131313] xl:text-[14px] 2xl:text-[16px]">
        ATTACHMENTS
      </h5>
      <div className="mt-2 max-w-[270px] cursor-pointer overflow-hidden rounded border-[1px] border-[#EBEBEB] text-[12px] xl:text-[14px] 2xl:text-[12px]">
        <Image
          className="w-full"
          width={326}
          height={220}
          src={PicAtach}
          alt="Pic"
        />
        <div className="flex items-center justify-between px-2 py-2">
          <p className="text-sm font-semibold text-black">
            3D Model.jpg <span className="text-gray-400">(24MB)</span>
          </p>
          <BsDownload size={24} className="text-blue-500" />
        </div>
      </div>
      <p className="mt-2 p-2 text-sm font-medium text-gray-400">
        22:50 August 1, 2021
      </p>
    </div>
  );
};
export default CardDelivery;
