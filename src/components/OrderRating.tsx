import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { useSpring, animated } from "react-spring";
import CardRating from "./card/CardRating";

type props = {
  userProfile: string;
  userName: string;
  rating: number;
};
const OrderRating = (props: props) => {
  const [clicked, setClicked] = useState(true);
  const fade = useSpring({
    opacity: clicked ? 1 : 0,
  });
  return (
    <React.Fragment>
      <div className="font-play border bg-white p-3 shadow-sm">
        <div
          className="flex w-full flex-col bg-white"
          onClick={() => setClicked(!clicked)}
        >
          <div className="flex justify-between p-2">
            <div className="flex items-center space-x-2">
              <div className="h-full w-[2px] bg-blue-500"></div>
              <p className="text-base font-semibold text-black">Order Rating</p>
            </div>
            <span className="text-black">
              {clicked === false ? <BsChevronDown /> : <BsChevronUp />}
            </span>
          </div>
        </div>
        <animated.div style={fade}>
          {clicked ? (
            <CardRating
              rating={props.rating}
              userName={props.userName}
              userProfile={props.userProfile}
            />
          ) : null}
        </animated.div>
      </div>
    </React.Fragment>
  );
};
export default OrderRating;
