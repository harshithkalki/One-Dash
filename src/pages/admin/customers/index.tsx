import React from "react";
import Link from "next/link";
import Image from "next/image";
import { customers } from "../../../components/data/dataContents";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import { BsSearch } from "react-icons/bs";
import { MdEdit } from "react-icons/md";
import { GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
import { api } from "~/utils/api";
const Customer = () => {
  const Data = api.user.customers.useQuery();
  const customers = Data?.data;
  return (
    <React.Fragment>
      <div className="mt-20 p-4 pt-4">
        <div className="flex w-full flex-col">
          <div className="font-play overflow-x-auto">
            <p className="text-sm text-gray-400 md:text-base">Overview</p>
            <div className="inline-block min-w-full py-2 md:flex md:items-center md:justify-between">
              <Link
                href="/customers"
                className="py-4 text-xl font-semibold md:text-3xl"
              >
                Customers
              </Link>

              <div className="flex items-center space-x-3">
                <div className="relative mt-2 w-full border md:w-[100%]">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                    <button
                      type="submit"
                      className="focus:shadow-outline p-1 focus:outline-none"
                    >
                      <BsSearch />
                    </button>
                  </span>
                  <input
                    type="text"
                    placeholder="Search"
                    className="w-full py-2.5 pl-10 outline-none"
                  />
                </div>
              </div>
            </div>
          </div>
          {Data.isLoading ? (
            <div className="flex h-screen items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            </div>
          ) : (
            <div className="block w-full lg:hidden">
              {customers?.map((member, index) => {
                return (
                  <div className="mb-2 border bg-white p-4" key={index}>
                    <div className="mb-1 mt-1 flex items-center justify-between gap-2">
                      <div className="flex space-x-2">
                        <img
                          src={member.profile || "/img/user/Avatar_4.png"}
                          alt="pic"
                          width={45}
                          height={40}
                        />
                        <div>
                          <Link
                            // href={"customers/" + member.id}
                            href={`/customers/${member.id}`}
                            key={member.id}
                          >
                            {" "}
                            {member.firstName}
                          </Link>

                          <p className="text-sm text-gray-400">{member.id}</p>
                        </div>
                      </div>

                      <div>
                        <p className="text-gray-400">{member.orders.length}</p>
                      </div>
                    </div>
                    <div>
                      <p className="text-lg"> {member.country || "--"}</p>
                      <div className="flex justify-between">
                        <p className="text-base text-gray-400">
                          {" "}
                          {member.email}
                        </p>
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M9 5.625C9.62132 5.625 10.125 5.12132 10.125 4.5C10.125 3.87868 9.62132 3.375 9 3.375C8.37868 3.375 7.875 3.87868 7.875 4.5C7.875 5.12132 8.37868 5.625 9 5.625Z"
                            fill="#131313"
                          />
                          <path
                            d="M9 10.125C9.62132 10.125 10.125 9.62132 10.125 9C10.125 8.37868 9.62132 7.875 9 7.875C8.37868 7.875 7.875 8.37868 7.875 9C7.875 9.62132 8.37868 10.125 9 10.125Z"
                            fill="#131313"
                          />
                          <path
                            d="M9 14.625C9.62132 14.625 10.125 14.1213 10.125 13.5C10.125 12.8787 9.62132 12.375 9 12.375C8.37868 12.375 7.875 12.8787 7.875 13.5C7.875 14.1213 8.37868 14.625 9 14.625Z"
                            fill="#131313"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {Data.isLoading ? (
            <div className="flex h-screen items-center justify-center">
              <AiOutlineLoading3Quarters className="animate-spin" size={24} />
            </div>
          ) : (
            <div className="hidden overflow-x-auto border bg-white p-2 lg:block">
              <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                <div className="overflow-hidden">
                  <table className="min-w-full">
                    <thead>
                      <tr className="text-sm md:text-xl">
                        <th
                          scope="col"
                          className="whitespace-nowrap px-4 py-4 text-left text-[19px] font-bold font-medium xl:text-[18px]"
                        >
                          Name
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-0 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                        >
                          Customer ID
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-4 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                        >
                          Country
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-4 py-4 text-left text-[19px] font-medium text-gray-900 xl:text-[18px]"
                        >
                          Email
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-12 py-4 text-center text-[19px] font-medium text-gray-900 xl:text-[18px]"
                        >
                          Total Orders
                        </th>
                        <th
                          scope="col"
                          className="whitespace-nowrap px-4 py-4 text-center text-[19px] font-medium text-gray-900 xl:text-[18px]"
                        >
                          Status
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {customers?.map((member, index) => {
                        //console.log(member, index)
                        return (
                          <>
                            <tr className="text-sm   md:text-base">
                              <td className="flex items-start justify-start gap-3 px-0 py-1 text-sm font-light">
                                <img
                                  className="pt-3"
                                  src={
                                    member.profile || "/img/user/Avatar_4.png"
                                  }
                                  alt="pic"
                                  width={40}
                                  height={40}
                                />
                                <span className="my-auto pt-2 font-semibold">
                                  {member.firstName}
                                </span>
                              </td>
                              <td className="px-0 py-1  text-sm font-light font-medium text-gray-500">
                                {member.id}
                              </td>
                              <td className="px-4 py-1  text-sm font-light font-medium text-gray-500">
                                {member.country || "---"}
                              </td>
                              <td className="px-4 py-1  text-left text-sm font-light font-medium text-gray-500">
                                {member.email}
                              </td>
                              <td className="px-12 py-1 text-center text-sm font-light  font-medium text-gray-500">
                                {member.orders.length}
                              </td>
                              <td className="mb-6  flex justify-center px-4 py-1 font-light font-medium text-gray-500">
                                <Link
                                  // href={"customers/" + member.id}
                                  href={`customers/${member.id}`}
                                  key={member.id}
                                >
                                  <MdEdit color="#9FA5B4" size={18} />
                                </Link>
                              </td>
                            </tr>
                          </>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </React.Fragment>
  );
};
export default Customer;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
