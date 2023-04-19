import React, { useEffect } from "react";
import { BsChevronRight } from "react-icons/bs";
import ProjectInput from "../../../components/ProjectInput";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { api } from "~/utils/api";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
const NewProject = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      void router.push("/login");
    }
  }, [router, status]);

  const id = router.query.id;
  const order = api.order.order.useQuery({
    id: id as string,
  });
  const data = order.data;
  const updateOrder = api.order.update.useMutation();
  const getQuoteUpdate = api.order.getQuoteUpdate.useMutation();
  if (order.isLoading)
    return (
      <div className="flex items-center justify-center">
        <AiOutlineLoading3Quarters className="animate-spin" size={24} />
      </div>
    );

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
            isupdate={true}
            values={{
              name: data?.name as string,
              type: data?.type as string,
              notes: data?.notes as string,
              referenceLinks: data?.referenceLinks as string,
              attachments: [],
            }}
            // isupdate={true}
            formSubmit={async (values) => {
              return updateOrder
                .mutateAsync({ id: id as string, ...values })
                .then((res) => {
                  return res;
                });
            }}
            getQuote={async (values) => {
              return getQuoteUpdate
                .mutateAsync({
                  id: id as string,
                  ...values,
                })
                .then((res) => {
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
