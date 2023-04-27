import React, { useState, useEffect, useRef } from "react";
import { usePopper } from "react-popper";
import styled from "styled-components";
import { GrNotification } from "react-icons/gr";
import { useMobile } from "../Hooks/Mobile";
import { api } from "~/utils/api";
import { Waypoint } from "react-waypoint";
import ListNotifications from "./card/ListNotifications";
import getPusher from "~/utils/getPusher";

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

  const notifications = api.user.notifications.useInfiniteQuery(
    {},
    {
      getNextPageParam: (lastPage) => lastPage.cursor,
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

  function handleDropdownClick() {
    setVisibility(!visible);
  }

  useEffect(() => {
    const pusher = getPusher();

    pusher.user.bind("notification", (data: any) => {
      console.log(data);
    });
  }, []);

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
              <img
                className="w-5"
                src={"/img/icon/Notification.svg"}
                alt="icon"
              />
              <span className="text-[ #131313] text-[18px] font-[500] leading-[25px]">
                Notification
              </span>
            </div>

            <img
              onClick={handleDropdownClick}
              className="cursor-pointer"
              src={"/img/icon/Close Icon.svg"}
              alt="icon"
            />
          </div>
          <hr className="mx-auto flex h-[1px] w-[93%] items-center justify-center bg-[#EBEBEB]" />

          {notifications.data?.pages.map((page, index) => (
            <React.Fragment key={index}>
              {page.notifications.map((notification, index) => (
                <div key={notification.id}>
                  <ListNotifications notification={notification} />
                  {index === page.notifications.length - 2 && (
                    <Waypoint
                      onEnter={() => {
                        console.log("enter");
                      }}
                    />
                  )}
                  <hr className="mx-auto flex h-[1px] w-[93%] items-center justify-center bg-[#EBEBEB]" />
                </div>
              ))}
            </React.Fragment>
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
