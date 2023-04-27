import imgPic from "../../../public/img/user/Avatar_5.png";
import Image from "next/image";
import { RxStarFilled } from "react-icons/rx";
const CardRating = () => {
  return (
    <>
      <div className="font-play flex flex-col items-center justify-center rounded-[8px] py-2">
        <img src={imgPic} alt="pic" width={60} height={60} />
        <h5 className="text-black">Angeline Lee</h5>
        <p className="text-[12px] text-blue-500">Rates 5 stars</p>
      </div>
      <div className="flex items-center justify-center space-x-0">
        <RxStarFilled size={40} className="text-yellow-500 " />
        <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" />
      </div>
    </>
  );
};
export default CardRating;
