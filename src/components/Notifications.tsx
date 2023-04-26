import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import Image from "next/image";
import ListNotifications from "./card/ListNotifications";
import { GrNotification } from "react-icons/gr";
import { AiOutlineClose } from "react-icons/ai";
import { notifications } from "./data/dataContents";
import CloseIcon from "../../public/img/icon/Close Icon.svg";
import { useMobile } from "../Hooks/Mobile";
const Notifications = () => {
  const [visible, setVisibility] = useState<boolean>(false);

  const referenceRef = useRef<HTMLDivElement>(null);
  const popperRef = useRef<HTMLDivElement>(null);
  const { styles, attributes } = usePopper(
    referenceRef.current,
    popperRef.current,
    {
      placement: "bottom",
      modifiers: [
        {
          name: "offset",
          enabled: true,
          options: {
            offset: [0, 10],
          },
        },
      ],
    }
  );
  useEffect(() => {
    document.addEventListener("mousedown", handleDocumentClick);
    return () => {
      document.removeEventListener("mousedown", handleDocumentClick);
    };
  }, []);

  function handleDocumentClick(event: MouseEvent) {
    if (referenceRef.current?.contains(event.target as Node)) {
      return;
    }
    setVisibility(false);
  }

  function handleDropdownClick(event: React.MouseEvent<HTMLDivElement>) {
    setVisibility(!visible);
  }
  return (
    <div ref={referenceRef} className="font-play  relative">
      <div
        onClick={handleDropdownClick}
        className="cursor-pointer rounded-full bg-gray-100 p-2"
      >
        <GrNotification size={16} />
      </div>
      <div
        className={` md:w-[430px] ${
          useMobile() ? "w-[200px]" : ""
        } h-[82vh] w-[365px] md:h-[400px] ${
          visible ? "overflow-y-scroll bg-white " : "hidden"
        }  fixed right-0 top-20 z-50 rounded-[8px] border-[1px] shadow-md sm:right-12 md:top-16 lg:absolute lg:-right-6 `}
        ref={popperRef}
        {...attributes.popper}
      >
        <DropdownContainer
          className="flex  flex-col shadow-sm"
          style={styles.offset}
          visible={visible}
        >
          <div className="sticky top-0 flex w-[100%]  items-center  justify-between space-x-2 bg-[white] px-5 py-4  ">
            <div className="flex   space-x-4">
              {/* <GrNotification size={28} /> */}
              <img
                className="w-5"
                src={"/img/icon/Notification.svg"}
                alt="icon"
              />
              <span className="text-[ #131313] text-[18px] font-[500] leading-[25px]">
                Notification
              </span>
            </div>
            {/* <AiOutlineClose size={28} className="text-gray-400" /> */}
            <img
              onClick={handleDropdownClick}
              className="cursor-pointer"
              src={"/img/icon/Close Icon.svg"}
              alt="icon"
            />
          </div>
          <hr className="mx-auto flex h-[1px] w-[93%] items-center justify-center bg-[#EBEBEB]" />

          {notifications.map((notifications, index) => (
            <div key={index}>
              {/* <ListNotifications notifications={notifications} /> */}
              <hr className="mx-auto flex h-[1px] w-[93%] items-center justify-center bg-[#EBEBEB]" />
            </div>
          ))}
        </DropdownContainer>
      </div>
    </div>
  );
};
const DropdownContainer = styled.div`
  display: ${({ visible }: { visible: boolean }) =>
    visible ? "flex" : "none"};
`;
export default Notifications;
