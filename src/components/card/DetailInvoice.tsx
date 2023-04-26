import { type User, type Invoice, type Order } from "@prisma/client";
import dayjs from "dayjs";
import { useRouter } from "next/router";
import { useRef } from "react";
import { BsDownload } from "react-icons/bs";

const DetailInvoice = ({
  invoice,
}: {
  invoice: Invoice & { user: User; order: Order };
}) => {
  const { push } = useRouter();
  const downloadRef = useRef<HTMLAnchorElement>(null);

  return (
    <>
      <div className="font-play p-2 text-gray-400 text-white">
        <div className="block md:flex md:justify-between">
          <div className="w-full md:py-2">
            <h4 className=" text-[16px] font-bold text-[#007AFF] xl:text-[14px] 2xl:text-[16px]">
              3D Content Studio
            </h4>
            <h4 className="text-[16px] font-[500] font-normal text-gray-700 xl:text-[14px] 2xl:text-[16px]">
              1234 State St <br /> New Delhi, India, 1234{" "}
            </h4>
          </div>
          <div className="w-full font-bold md:block">
            <h3 className="py-1  text-right text-[17px] text-blue-600 md:text-right xl:text-[18px] 2xl:text-[24px]">
              Invoice
            </h3>
            <h3 className="flex  items-end justify-end  text-[17px] text-blue-600 xl:text-[18px] 2xl:text-[24px]">
              #{invoice.id}
            </h3>
          </div>
        </div>
        <div className="mb-2 border-b">
          <h4 className="py-2 text-[16px] text-black xl:text-[14px] 2xl:text-[16px]">
            {`Delivery Time: ${invoice.deliveryTime} Days`}
          </h4>
        </div>
        <div className="mb-2 block">
          <p className="py-2 text-[16px] font-semibold text-blue-500 xl:text-[14px] 2xl:text-[16px]">
            Bill To
          </p>
          <div className="flex justify-between">
            <p className="font-play w-[120px] text-[13px] font-normal text-[#131313] xl:text-[14px] 2xl:text-[16px]">
              {`${invoice.user.firstName} ${invoice.user.address ?? ""}`}
            </p>
            <div className="w-[130px] whitespace-nowrap text-[12px] xl:text-[13px] 2xl:text-[16px]">
              <ul className="flex items-center justify-between ">
                <li className="text-gray-400">Issue Date</li>
                <li className="text-black">
                  {dayjs(invoice.createdAt).format("MMM DD, YYYY")}
                </li>
              </ul>
              <ul className="flex items-center justify-between">
                <li className="text-gray-400">Due Date</li>
                <li className="text-black">
                  {dayjs(invoice.createdAt)
                    .add(invoice.deliveryTime, "days")
                    .format("MMM DD, YYYY")}
                </li>
              </ul>
              <ul className="flex items-center justify-between">
                <li className="text-gray-400">Amount Due</li>
                <li className="text-black">
                  {`$${invoice.amount.toFixed(2)}`}
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="mb-2 flex items-center justify-between border-b text-[16px] font-semibold text-black xl:text-[14px] 2xl:text-[16px]">
          <p className="py-2">{invoice.order.name}</p>
          <p className="py-2">{`$${invoice.amount.toFixed(2)}`}</p>
        </div>
        <div className="mb-4 flex items-center justify-between text-[16px] font-semibold text-black xl:text-[14px] 2xl:text-[16px]">
          <p className="py-2">Total Due</p>
          <p className="py-2">{`$${invoice.amount.toFixed(2)}`}</p>
        </div>
        <button
          className="text-md flex w-full items-center justify-center space-x-2 border-2 border-blue-400 py-3 font-semibold text-[#007AFF]"
          onClick={() => {
            downloadRef.current?.click();
          }}
        >
          <BsDownload />
          <span>Download Invoice</span>
        </button>
        <a
          href={invoice.paymentLink!}
          target="_blank"
          className="text-md mt-2 flex w-full cursor-pointer items-center justify-center space-x-2 bg-blue-500 py-3 font-semibold text-white"
        >
          Pay Now
        </a>
        <a
          ref={downloadRef}
          style={{ display: "none" }}
          href={invoice.pdf ?? ""}
          download
        >
          Download
        </a>
      </div>
    </>
  );
};
export default DetailInvoice;
