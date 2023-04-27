import React from "react";
import { BsChevronRight } from "react-icons/bs";
import ProjectInput from "../../components/ProjectInput";
import { type GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
const NewProject = () => {
  return (
    <React.Fragment>
      <div className="mt-20 h-[calc(100vh-80px)] overflow-y-auto p-4 pt-4">
        <div className="flex w-full flex-col">
          <div className="font-play overflow-x-auto">
            <div className="flex space-x-2">
              <p className="flex items-center space-x-2 py-1 text-gray-400">
                <span className="text--font text-[16px] text-[500] lg:text-[14px] 2xl:text-[16px] ">
                  My Projects
                </span>{" "}
                <BsChevronRight size={13} />{" "}
                <span className="text--font text-[16px] text-[500] lg:text-[14px] 2xl:text-[16px]">
                  New Project
                </span>
              </p>
            </div>
            <div className="inline-block flex min-w-full items-center justify-between py-2">
              <h3 className="text-[27px] font-[600] lg:text-[24px] 2xl:text-[27px]">
                Order Detail
              </h3>
              <h4 className="pr-2 text-[13px] md:pr-9">Status: Draft</h4>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col pt-1">
          <ProjectInput
            userin={true}
            isupdate={false}
            values={{
              name: "",
              type: "",
              attachments: [],
              notes: "",
              referenceLinks: "",
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default NewProject;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
