import React from "react";
import Image from "next/image";

import Popup from "reactjs-popup";
import { BsQuestionLg } from "react-icons/bs";
import { useDesktop } from "../Hooks/Mobile";
const HelpCenter = () => {
  const isMobile = useDesktop();
  return (
    <React.Fragment>
      <div className="menu">
        {/* <Popup
          trigger={
            <div className="bg-white p-3 rounded-full border">
              <BsQuestionLg
                size={28}
                className="text-white bg-blue-500 rounded-full p-1"
              />
            </div>
          }
          position="center top"
          on="hover"
          closeOnDocumentClick
          mouseLeaveDelay={300}
          mouseEnterDelay={0}
          contentStyle={{ padding: "0px", border: "none" }}
          arrow={false}
        > */}
        <div
          className={`max-w-[191px] bg-blue-50 md:max-w-[191px] lg:left-4 lg:max-w-[160px] xl:max-w-[160px] 2xl:left-4 2xl:max-w-[221px] ${
            isMobile ? "block " : "hidden"
          } font-play fixed bottom-8 left-8`}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 transform rounded-full border bg-white  p-3">
            <BsQuestionLg
              size={28}
              className="rounded-full bg-blue-500 p-1 text-white"
            />
          </div>
          <img
            src="/img/Ellipse10.png"
            alt="pic"
            width={90}
            height={90}
            className="absolute left-0 top-0"
          />
          <img
            src="/img/Ellipse11.png"
            alt="pic"
            width={90}
            height={90}
            className="absolute bottom-0 right-0"
          />
          <div className="flex flex-col items-center justify-center space-y-4 p-4 pb-6 pt-8">
            <h3 className="text-md text-center font-[600] xl:text-[13px]">
              Help Center
            </h3>
            <p className="pb-2 text-center text-[9px] font-semibold text-gray-400">
              Having trouble in 3D Content Studio. Please contact us for more
              questions.
            </p>
            <button className="w-[117px] bg-blue-500 py-1.5  text-[11px]  font-normal text-white">
              Go To Help Center
            </button>
          </div>
        </div>
        {/* </Popup> */}
      </div>
    </React.Fragment>
  );
};
export default HelpCenter;
