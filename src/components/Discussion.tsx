import React, { useState } from "react";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import CardDisscussion from "./card/CardDiscussion";
import { useSpring, animated } from "react-spring";
import { Discussions } from "@prisma/client";

const Discussion = ({
  discussions,
}: {
  discussions: (Discussions & { user: { name: string } })[];
}) => {
  const [clicked, setClicked] = useState(true);
  const fade = useSpring({
    opacity: clicked ? 1 : 0,
  });
  return (
    <React.Fragment>
      <div className="font-play border bg-white  px-3 py-3 shadow-sm xl:px-3 xl:py-1 2xl:py-3">
        <div
          className="flex w-full flex-col bg-white"
          onClick={() => setClicked(!clicked)}
        >
          <div className="flex justify-between p-2">
            <div className="flex items-center space-x-2">
              <div className="h-full w-[2px] bg-blue-500"></div>
              <p className="text-sm font-semibold text-black xl:text-[13px] 2xl:text-[16px]">
                Discussion
              </p>
            </div>
            <span className="text-black">
              {clicked === false ? <BsChevronDown /> : <BsChevronUp />}
            </span>
          </div>
        </div>
        <animated.div style={fade}>
          {clicked ? <CardDisscussion discussions={discussions} /> : null}
        </animated.div>
      </div>
    </React.Fragment>
  );
};
export default Discussion;
