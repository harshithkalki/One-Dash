import Image from "next/image";
import { type Discussions } from "@prisma/client";
import dayjs from "dayjs";

const CardDisscussion = ({
  discussions,
}: {
  discussions: (Discussions & {
    user: {
      name: string;
    };
  })[];
}) => {
  return (
    <>
      <div className="font-play p-2  text-white">
        {discussions.map((discuss) => {
          return (
            <div key={discuss.id} className="mb-4 flex space-x-0 border-b">
              <div className="w-[120px] md:w-[55px]">
                <img
                  className="w-[90px] md:w-[45px]"
                  src={"/img/user/Avatar.png"}
                  alt="pic"
                  width={45}
                  height={45}
                />
              </div>
              <div className="block py-0 pl-2 lg:pl-0">
                <h4 className="text-[20px] font-medium text-black xl:text-[16px] 2xl:text-[16px]">
                  {discuss.user.name}
                </h4>
                <p className="max-w-2xl py-1 text-[16px] font-normal text-black xl:text-[13px] 2xl:text-[16px]">
                  {discuss.message}.
                </p>
                <p className="py-2 text-sm font-normal text-gray-400">
                  {dayjs(discuss.createdAt).format("H:m MMMM D, YYYY")}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
};
export default CardDisscussion;
