import Image from "next/image";
import { GrNotification } from "react-icons/gr";
import productimg from "../../public/img/product/product_1.png";
import ProgressBar from "../ProgressBar";
import Link from "next/link";
import dayjs from "dayjs";
import { useRouter } from "next/router";

type ProductType = {
  id: string;
  logo: string;
  name: string;

  status: string;
  createdAt: string;
  // progress: number;
};

const CardProject = ({ product }: { product: ProductType }) => {
  const router = useRouter();
  return (
    <div className="font-play w-[350px] rounded-[6px] bg-white px-3 py-3 md:w-[530px] xl:w-[290px] 2xl:w-[300px]">
      <div className="flex justify-between py-2">
        <div className="rounded-full bg-[#F5F5F5] px-2 py-2 text-[12px] text-[#13131380]">
          {product.status}
        </div>
        <div className="flex items-center space-x-2">
          <div className="font-play text-[13px] font-[600] text-black">
            Nov 10, 1:27 PM
          </div>
          <GrNotification />
        </div>
      </div>
      <div className="flex items-center justify-between py-2">
        <div>
          <h4 className="text-[16px] font-[600] text-black">{product.name}</h4>
          <p className="py-2 text-[14px] text-[#13131380]">
            {dayjs(product.createdAt).format("DD MMM YYYY")}
          </p>
        </div>
        <Image src={product.logo} width={66} height={66} alt="product" />
      </div>

      <div className="flex items-center justify-between space-x-4 py-2">
        <div className="w-2/3">
          <ProgressBar progressPercentage={0} />
        </div>

        {/*<Link href={'/'+ product.id} key={product.id}>*/}
        <li
          className="mb-2 mt-4  block w-1/3 cursor-pointer bg-blue-500 py-2 text-center font-semibold text-white "
          onClick={() => {
            if (product.status === "DRAFT") {
              void router.push(`/client/create/${product.id}`);
            } else {
              void router.push(`/client/${product.id}`);
            }
          }}
        >
          {/* <Link href={"client/" + product.id} key={product.id}> */}
          View
          {/* <Link  key={product.id}>
            View
          </Link> */}
        </li>
        {/*</Link>*/}
      </div>
    </div>
  );
};
export default CardProject;
