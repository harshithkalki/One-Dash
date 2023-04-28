import { type NotificationEvent, type Notification } from "@prisma/client";
import moment from "moment";

const event: Record<NotificationEvent, string> = {
  deliveryCreated: "Delivery Created",
  deliveryUpdated: "Delivery Updated",
  deliveryDeleted: "Delivery Deleted",
  discussionCreated: "Discussion Created",
  discussionUpdated: "Discussion Updated",
  discussionDeleted: "Discussion Deleted",
  invoiceDeleted: "Invoice Deleted",
  invoiceUpdated: "Invoice Updated",
  invoiceCreated: "Invoice Created",
  orderCreated: "Order Created",
  orderUpdated: "Order Updated",
  orderDeleted: "Order Deleted",
};

const ListNotifications = ({
  notification,
}: {
  notification: Notification;
}) => {
  return (
    <div className="font-play mb-2  mt-2 max-w-full px-6  lg:max-w-full">
      <div className="flex  items-center space-x-4">
        <div className="flex h-[42px] w-[52px] items-center justify-center rounded-full bg-[#007AFF1A] p-2">
          <img src="/img/icon/Notificationicon2.svg" />
        </div>
        <div className="w-[97%] py-1">
          <span className="w-full text-[14px] font-[400] leading-[150%] text-[#131313CC]">
            {notification.message}{" "}
          </span>
          <div className="text-[12px] font-[400] leading-[150%] text-[#13131399]">
            {moment(notification.createdAt).fromNow()}
          </div>
        </div>
        <img width={44} height={44} alt="pic" className="rounded-full" />
      </div>
    </div>
  );
};
export default ListNotifications;
