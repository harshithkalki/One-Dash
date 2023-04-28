import imgPic from "../../../public/img/user/Avatar_5.png";
import Image from "next/image";
import { RxStarFilled } from "react-icons/rx";

type props = {
  userProfile: string;
  userName: string;
  rating: number;
};
const CardRating = ({ userProfile, userName, rating }: props) => {
  return (
    <>
      <div className="font-play flex flex-col items-center justify-center rounded-[8px] py-2">
        <img
          src={userProfile}
          alt="pic"
          width={60}
          height={60}
          className="rounded-full"
        />
        <h5 className="text-black">{userName}</h5>
        <p className="text-[12px] text-blue-500">{`Rates ${rating} stars`}</p>
      </div>
      <div className="flex items-center justify-center space-x-0">
        {Array(rating)
          .fill(0)
          .map((_, index) => (
            <RxStarFilled key={index} size={40} className="text-yellow-500 " />
          ))}

        {/* <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" />
        <RxStarFilled size={40} className="text-yellow-500" /> */}
      </div>
    </>
  );
};
export default CardRating;
