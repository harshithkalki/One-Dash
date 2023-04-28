import Image from "next/image";
import { members } from "../../../components/data/dataContents";
import { AddMemberData } from "../../../components/data/dataContents";
import {
  AiOutlinePlus,
  AiOutlineClose,
  AiOutlineMore,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
// import { picImg } from "../../../public/img/user/Avatar_team.png";
import Popup from "reactjs-popup";
import React, { useEffect, useState } from "react";
import Closeicon from "../../../public/img/icon/Close Icon.svg";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";

interface Members {
  id: number;
  name: string;
  country: string | null;
  email: string;
}

const Team = () => {
  const [open, setOpen] = useState(false);
  const [removeopen, setremoveOpen] = useState<number>();
  // const memberss = api.user.members.useQuery();
  // console.log(memberss);

  const AddTeamMem = api.user.addTeamMember.useMutation();

  const TeamMem = api.user.teamMembers.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });
  const NotTeam = api.user.notTeamMembers.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const RemoveTeamMem = api.user.removeTeamMember.useMutation();
  const inviteTeamMem = api.user.inviteUser.useMutation();
  const [addMemLoading, setAddMemLoading] = useState<number>(-1);

  const [removeopen1, setremoveOpen1] = useState(false);
  const closeModal = () => {
    setOpen(false);
    setremoveOpen(-1);
  };
  const router = useRouter();
  const { status } = useSession();
  const [Search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(NotTeam.data);

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [status]);

  if (TeamMem.isLoading) return <div>Loading...</div>;

  return (
    <React.Fragment>
      <div className="font-play mt-20 flex gap-4 overflow-y-auto p-4 pt-4">
        <div className="flex w-full flex-col   p-2">
          <p className="text-gray-400">Team</p>
          <div className="overflow-x-auto py-2 sm:flex sm:items-center sm:justify-between">
            <h2 className="text-xl font-semibold md:text-3xl">
              Team Member({TeamMem?.data?.length})
            </h2>
            <button
              className="mt-4 flex items-center space-x-2 bg-blue-500 px-4 py-2 text-[14px] text-white sm:mt-0"
              onClick={() => setOpen((o) => !o)}
            >
              <AiOutlinePlus size={24} />
              <span>Add Member</span>
            </button>
          </div>
          <div className="overflow-x-auto border-[#EBEBEB] bg-transparent p-2 md:border-[1px] md:bg-white">
            <div className="inline-block hidden min-w-full py-2 sm:px-6 lg:block lg:px-8">
              <div className="h-auto">
                <table className="min-w-full">
                  <thead>
                    <tr>
                      <th
                        scope="col"
                        className="text-back px-6  py-4 text-left text-lg font-bold "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-lg font-bold text-gray-900"
                      >
                        Country
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-4 text-left text-lg font-bold text-gray-900"
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="flex items-center justify-center px-6 py-4 text-left text-lg font-bold text-gray-900"
                      >
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {TeamMem?.data?.map((member, index) => {
                      return (
                        <>
                          <tr className="relative">
                            <td className="flex items-center space-x-2 whitespace-nowrap px-6 py-4 text-base">
                              <img
                                className="!w-[28px] rounded-full md:w-[32px]"
                                src={
                                  member.profile ?? "/img/user/Avatar_team1.svg"
                                }
                                alt="pic"
                                width={32}
                                height={32}
                              />
                              <span className="text-[14px] font-bold">
                                {member.firstName}
                              </span>
                            </td>
                            <td className="fonr-normal whitespace-nowrap px-6 py-4 text-[14px] font-medium text-gray-500">
                              {member.country || "N/A"}
                            </td>
                            <td className="fonr-normal whitespace-nowrap px-6 py-4 text-[12px] font-medium text-gray-500 md:text-[14px]">
                              {member.email}
                            </td>
                            <td className="fonr-normal relative flex items-center justify-center whitespace-nowrap px-6 py-4 text-[14px] font-medium text-gray-500">
                              {/* {member.act} */}
                              <AiOutlineMore
                                onClick={() => {
                                  if (removeopen === index) setremoveOpen(-1);
                                  else setremoveOpen(index);
                                }}
                                size={24}
                              />
                              {removeopen === index && (
                                <div
                                  key={index}
                                  className="absolute top-12 z-50 cursor-pointer rounded-[5px] border bg-white px-4 py-2"
                                  onClick={() => {
                                    RemoveTeamMem.mutateAsync({ id: member.id })
                                      .then(() => {
                                        setremoveOpen(-1);
                                        void TeamMem.refetch();
                                      })
                                      .catch((e) => {
                                        console.log(e);
                                      });
                                  }}
                                >
                                  {RemoveTeamMem.isLoading ? (
                                    <div className="flex items-center justify-center">
                                      <AiOutlineLoading3Quarters
                                        className="animate-spin"
                                        size={24}
                                      />
                                    </div>
                                  ) : (
                                    "Remove"
                                  )}
                                </div>
                              )}
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
            <div className="block lg:hidden">
              {TeamMem?.data?.map((member, index) => {
                return (
                  <div
                    className="relative mb-2 mt-2 flex gap-2 border-[1px] border-[#DBDBDB] bg-[#FFFFFF] p-2 py-2"
                    key={index}
                  >
                    <img
                      width={45}
                      height={45}
                      alt="pic"
                      src={member.profile ?? "/img/user/Avatar_team1.svg"}
                    />
                    <div className="w-full py-1.5">
                      <div className="relative flex items-center justify-between">
                        <p className="font-play   text-base font-[700] leading-[150%] text-[#131313]">
                          {member.email}
                        </p>
                        <AiOutlineMore
                          onClick={() => setremoveOpen(index)}
                          size={20}
                          className=""
                        />
                      </div>
                      {removeopen === index && (
                        <div
                          key={index}
                          className="absolute right-0 top-12 z-50 cursor-pointer rounded-[5px] border bg-white px-4 py-2"
                        >
                          Remove
                        </div>
                      )}

                      <p className="font-play text-[12px] font-[500] text-[#13131380] sm:text-sm">
                        {member.email}
                      </p>
                      <p className="text-sm text-[#0000004D]">
                        {member.country || "N/A"}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <Popup open={open} closeOnDocumentClick onClose={closeModal}>
        <div className="z-50 mx-auto flex w-[90%] flex-col items-center justify-center rounded-[8px] bg-white p-4 shadow-md md:w-[600px]">
          <div className="flex w-full items-center justify-between">
            <span className="font-play text-[18px] font-[500] text-black">
              Add Members
            </span>
            <Link className="close" onClick={closeModal} href={"#"}>
              <img src={"/img/icon/Close Icon.svg"} alt="close" />
            </Link>
          </div>
          <div className="flex w-full items-center justify-between space-x-6 py-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full border py-2 pl-3 outline-none"
              value={Search}
              onChange={(e) => {
                setSearch(e.target.value);
                const query = e.target.value.toLowerCase();
                const data = NotTeam.data?.filter((item) =>
                  item.email.toLowerCase().includes(query)
                );
                setSortedData(data);
              }}
            />
            <button className="w-36 rounded-[2px] bg-blue-500 px-6 py-2 text-white">
              Search
            </button>
          </div>
          {sortedData?.length === 0 ? (
            <div className="flex w-full items-center justify-center py-4">
              <div className="flex w-full items-center justify-between py-2">
                <div className="flex items-center space-x-2">
                  <img
                    src={"/img/user/Avatar_team1.svg"}
                    width={48}
                    height={48}
                    alt="pic"
                    className="rounded-full"
                  />

                  <span className="text-sm font-medium">{Search}</span>
                </div>
                <button
                  className="w-20 rounded-[2px] border border-blue-500 px-2 py-1 text-sm text-blue-500"
                  onClick={() => {
                    inviteTeamMem
                      .mutateAsync({ email: Search })
                      .then(() => {
                        setSearch("");
                        setSortedData(NotTeam.data);
                      })
                      .catch((e) => {
                        console.log(e);
                        setSearch("");
                        setSortedData(NotTeam.data);
                      });
                  }}
                >
                  {inviteTeamMem.isLoading ? (
                    <div className="flex items-center justify-center">
                      <AiOutlineLoading3Quarters
                        className="animate-spin"
                        size={24}
                      />
                    </div>
                  ) : (
                    "Invite"
                  )}
                </button>
              </div>
            </div>
          ) : (
            sortedData?.map((value, index) => (
              <div
                className="flex w-full items-center justify-between py-2"
                key={index}
              >
                <div className="flex items-center space-x-2">
                  <img
                    src={value.profile ?? "/img/user/Avatar_team1.svg"}
                    width={48}
                    height={48}
                    alt="pic"
                    className="rounded-full"
                  />
                  <span className="text-sm font-medium">{value.email}</span>
                </div>
                <button
                  className="w-20 rounded-[2px] border border-blue-500 px-2 py-1 text-sm text-blue-500"
                  onClick={() => {
                    setAddMemLoading(index);
                    AddTeamMem.mutateAsync({ id: value.id })
                      .then(() => {
                        void NotTeam.refetch();
                        void TeamMem.refetch();
                        setAddMemLoading(-1);
                        console.log("done");
                      })
                      .catch((e) => {
                        console.log(e);
                      });
                  }}
                  disabled={AddTeamMem.isLoading && addMemLoading === index}
                >
                  {AddTeamMem.isLoading && addMemLoading === index
                    ? "Loading"
                    : "Add"}
                </button>
              </div>
            ))
          )}
        </div>
      </Popup>
    </React.Fragment>
  );
};
export default Team;
