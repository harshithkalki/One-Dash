import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import productimg from "../../public/img/product/product_1.png";
import userImg from "../../public/img/user/Avatar_4.png";
import { BiTime } from "react-icons/bi";
import ProgressBar from "../ProgressBar";
import Link from "next/link";

type ProductType = {
  id: string;
  img: string;
  title: string;
  amount: string;
  users: {
    id: string;
    name: string;
    img: string;
  };
  status: string;
  dateTime: string;
  progress: number;
};

const CardOrder = ({ product }: { product: ProductType }) => {
  // const { product } = props
  return (
    <div className="font-play w-[350px] rounded-[6px] bg-white px-3 py-3 md:w-[530px] xl:w-[296px] 2xl:w-[300px]">
      <div className="flex justify-between  py-2">
        <div className="flex items-center space-x-2">
          <Image src={product.users.img} alt="pic" width={35} height={35} />
          <div className="">
            <p className="text-[12px] font-[600] 2xl:text-[16px]">
              {product.users.name}
            </p>
            <p className="text-[12px] font-normal text-gray-300 2xl:text-[14px]">
              Last seen 32 minutes ago
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <GrNotification size={15} />
          <div className="text-[14px] font-semibold text-black">
            $ {product.amount}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <h4 className="text-[14px] font-[600] text-black">{product.title}</h4>
          <p className="py-2 text-[14px] text-[#13131380]">
            {product.dateTime}
          </p>
        </div>
        <Image src={product.img} width={66} height={66} alt="product" />
      </div>

      <div className="flex items-center justify-between space-x-3 py-1">
        <div className="mt-1  w-2/3">
          <ProgressBar progressPercentage={product.progress} />
        </div>

        {/*<Link href={'/'+ product.id} key={product.id}>*/}
        <li className="mb-2 mt-4 block w-1/3 bg-blue-500 py-[7px] text-center font-semibold text-white md:w-1/3">
          <Link href={`admin/${product.id}`} key={product.id}>
            View
          </Link>
        </li>
        {/*</Link>*/}
      </div>
      <div className="items flex justify-between">
        <p className="text-[12px] text-black">{product.status}</p>
        <div className="flex space-x-2">
          <BiTime />
          <span className="text-[12px] text-black">23h, 30m</span>
        </div>
      </div>
    </div>
  );
};
export default CardOrder;
