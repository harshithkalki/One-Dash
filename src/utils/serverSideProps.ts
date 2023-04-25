import { type GetServerSideProps } from "next";
import { getSession } from "next-auth/react";

export const adminServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session?.user.role !== "admin") {
    // redirect to login page
    return {
      redirect: {
        destination: "/client",
        permanent: false, // set to true if the redirect is permanent
      },
    };
  }
  return {
    props: {},
  };
};

export const clientServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (session?.user.role !== "client") {
    // redirect to login page
    return {
      redirect: {
        destination: "/admin",
        permanent: false, // set to true if the redirect is permanent
      },
    };
  }
  return {
    props: {},
  };
};
