import React, { useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import ProjectInput from "../../../components/ProjectInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
const NewProject = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const createOrder = api.order.createOrder.useMutation();
  const getQuoteCreate = api.order.getQuoteCreate.useMutation();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [router, status]);

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
            <div className="flex min-w-full items-center justify-between py-2">
              <h3 className="text-[27px] font-[600] lg:text-[24px] 2xl:text-[27px]">
                Order Detail
              </h3>
              <h4 className="pr-9 text-[13px]">Status: Draft</h4>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col pt-1">
          <ProjectInput
            userin={false}
            isupdate={false}
            values={{
              name: "",
              type: "",
              attachments: [],
              notes: "",
              referenceLinks: "",
            }}
            // isupdate={false}
            formSubmit={async (values) => {
              return createOrder.mutateAsync(values).then((res) => {
                void router.push(`/client/create/${res.id}`);
                return res;
              });
            }}
            getQuote={async (values) => {
              return getQuoteCreate.mutateAsync(values).then((res) => {
                void router.push(`/client`);
                return res;
              });
            }}
          />
        </div>
      </div>
    </React.Fragment>
  );
};
export default NewProject;
