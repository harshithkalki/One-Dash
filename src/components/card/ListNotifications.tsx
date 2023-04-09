import { GrNotification } from "react-icons/gr";
import productimg from "../../public/img/product/product_7.png";
import Image from "next/image";

type notificationsType = {
  id: number;
  icon: any;
  title: string;
  dateTime: string;
  item: string;
  img: string;
};

const ListNotifications = ({
  notifications,
}: {
  notifications: notificationsType;
}) => {
  // const { notifications } = props;
  //console.log(notifications)
  return (
    <div className="font-play mb-2  mt-2 max-w-full px-6  lg:max-w-full">
      <div className="flex  items-center space-x-4  ">
        {notifications.icon}

        <div className="w-[97%] py-1">
          <span className="w-full text-[14px] font-[400] leading-[150%] text-[#131313CC]">
            {notifications.title}
          </span>
          <span className="text-[12px] font-[400] leading-[150%] text-[#13131399]">
            {notifications.dateTime} • {notifications.item}
          </span>
        </div>
        <Image
          width={44}
          height={44}
          alt="pic"
          src={notifications.img}
          className="rounded-full"
        />
      </div>
    </div>
  );
};
export default ListNotifications;
