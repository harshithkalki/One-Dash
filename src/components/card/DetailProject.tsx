import Image from "next/image";
import ProgressBar from "../ProgressBar";

type itemDataType = {
  id: string;
  logo: string;
  name: string;
  amount: number;
  userName: string;
  status: string;
  dateTime: string;
  progress: number;
};

const DetailProject = ({ itemData }: { itemData: itemDataType }) => {
  // const { itemData } = props;

  //const imgStatus = itemData.status == 'Pending Payment' ? '/img/icon/document_pending.svg' : '/img/icon/documents_review.svg'
  const imgStatus =
    itemData.status == "Pending Payment"
      ? "/img/icon/documents_review.svg"
      : itemData.status == "Completed"
      ? "/img/icon/delivery-truck.svg"
      : itemData.status == "In Repair"
      ? "/img/icon/inproduction.svg"
      : "/img/icon/documents_review.svg";

  return (
    <>
      <div className="font-play border bg-white p-5 shadow-sm xl:px-4 xl:py-3">
        <div className="flex w-full items-center justify-between space-x-4 p-1">
          <img
            src={itemData.logo}
            width={91}
            height={91}
            alt="product"
            className="w-1/4 object-contain"
          />
          <div className="flex w-1/2 items-center justify-between font-medium">
            <div className="full">
              <p className="py-1 text-[12px] font-semibold text-black lg:text-[13px] 2xl:text-base">
                {itemData.name}
              </p>

              <div
                className={`w-[120px] rounded-full py-[7px] text-center text-[10px] text-white xl:w-[90px] 2xl:w-36 ${
                  itemData.status == "Completed"
                    ? "bg-green-500"
                    : "bg-[#F9C152]"
                }`}
              >
                {itemData.status}
              </div>
            </div>
          </div>
          <img
            src={imgStatus}
            width={60}
            height={60}
            alt="product"
            className="w-1/5"
          />
        </div>
        <div className="font-play flex  w-full flex-col text-[10px] font-[600] sm:text-[13px] lg:text-[13px] 2xl:text-sm">
          <ul className="flex w-full justify-between px-2 pt-2">
            <li className="text-[#131313] ">Order By</li>
            <li className="text-blue-500 ">{itemData.userName}</li>
          </ul>
          <ul className="flex w-full justify-between px-2 pt-2">
            <li className="text-[#131313]">Delivery Date</li>
            <li className="text-[#003672]">July 28, 2021 at 3.45 PM</li>
          </ul>
          <ul className="flex w-full justify-between px-2 pb-2 pt-2">
            <li className="text-black">Order Number</li>
            <li className="text-[#003672]">#{itemData.id}</li>
          </ul>
        </div>
      </div>
    </>
  );
};
export default DetailProject;
