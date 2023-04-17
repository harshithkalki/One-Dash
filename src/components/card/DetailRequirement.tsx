import Image from "next/image";
import { BsFillImageFill, BsCheckCircle } from "react-icons/bs";
import { GrDocumentZip } from "react-icons/gr";
import photoicon from "../../../public/img/icon/photoicon.svg";
import zipicon from "../../../public/img/icon/zipicon.svg";
import { api } from "~/utils/api";
import { useRouter } from "next/router";
import dayjs from "dayjs";
//GrDocumentZip
const DetailREquiretment = () => {
  const router = useRouter();
  const id = router.query.id;

  const order = api.order.order.useQuery({ id: id as string });
  return (
    <div className="SmoothAnimation smooth-tras font-play p-2 text-gray-400 text-white">
      <div className="flex space-x-6 pt-3 sm:space-x-6 md:space-x-24">
        <div className="block py-2 font-normal">
          <p className="py-1 text-sm text-[#131313] xl:text-[12px] 2xl:text-[14px] ">
            Created
          </p>
          <p className="py-1 text-sm text-[#131313] xl:text-[12px]  2xl:text-[14px]">
            Project Type
          </p>
          <p className="py-1 text-sm text-[#131313] xl:text-[12px]  2xl:text-[14px]">
            Reference Links
          </p>
          <p className="py-1 text-sm text-[#131313] xl:text-[12px]  2xl:text-[14px]">
            Description
          </p>
        </div>
        <div className="block pt-2 text-base font-semibold">
          <p className="text--font py-1 text-[16px] font-[600] text-[#131313] xl:text-[14px] 2xl:text-[16px]">
            {dayjs(order.data?.createdAt).format("DD MMMM YYYY")}
          </p>
          <p className="text--font py-1 text-[16px] font-[600] text-[#131313] xl:text-[14px] 2xl:text-[16px]">
            {order.data?.type}
          </p>
          <p className="text--font py-1 text-[16px] font-[600] text-[#131313] xl:text-[14px] 2xl:text-[16px]">
            {order.data?.referenceLinks}
          </p>
        </div>
      </div>
      <p className="text--font py-0 text-[16px] font-[400] text-black  xl:text-[14px] 2xl:text-[16px]">
        {order.data?.notes}
      </p>
      <div className="flex items-center space-x-2 py-4">
        <div className="flex h-[50x] w-[120px] items-center space-x-2 bg-gray-100 py-1  md:w-[165px]">
          <Image
            width={32}
            height={32}
            alt="loog"
            src={"/img/icon/photoicon.svg"}
            className="ml-4 w-[25px] md:w-[32px]"
          />
          <div className="block">
            <p className="py-1 text-[12px] text-black md:text-sm">shoes.jpg</p>
            <p className="text-[10px] text-gray-400">12 Mb</p>
          </div>
        </div>
        <div className="flex h-[50px] w-[135px] items-center space-x-2 bg-gray-100 py-1 md:w-[165px]">
          <Image
            width={32}
            height={32}
            alt="loog"
            src={"/img/icon/zipicon.svg"}
            className="ml-4 w-[25px] md:w-[32px]"
          />
          <div className="block">
            <p className="py-1 text-[12px] text-black md:text-sm">
              reference.zip
            </p>
            <p className="text-[10px] text-gray-400">135 Mb</p>
          </div>
        </div>
      </div>
      <div className="flex items-center space-x-2 py-2">
        <BsCheckCircle size={16} className="text-gray-400" />
        <p className="text-[16px] font-medium text-[#13131380] xl:text-[13px]  2xl:text-[16px]">
          The information I provided is accurate and clear. Any changes at this
          point require approval and may cost extra.
        </p>
      </div>
    </div>
  );
};
export default DetailREquiretment;
