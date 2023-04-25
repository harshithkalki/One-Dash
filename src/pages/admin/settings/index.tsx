import React from "react";
import Link from "next/link";
import Image from "next/image";
import TabComponent from "../../../components/TabComponent";
import { GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
const Settings = () => {
  return (
    <React.Fragment>
      <div className="mt-20 p-4 pt-4">
        <div className="font-play overflow-x-auto">
          <p className="text-[13px] text-gray-400">Settings</p>
          <div className=" flex min-w-full items-center justify-between py-0">
            <Link href="/customers" className="py-0 text-[25px] font-[600]">
              Settings
            </Link>
          </div>
        </div>
        <TabComponent />
      </div>
    </React.Fragment>
  );
};
export default Settings;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
