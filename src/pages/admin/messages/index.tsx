import React from "react";
import ChatMessage from "../../../components/ChatMessage";
import { GetServerSideProps } from "next";
import { adminServerSideProps } from "~/utils/serverSideProps";
const Messages = () => {
  return (
    <React.Fragment>
      <ChatMessage />
    </React.Fragment>
  );
};
export default Messages;

export const getServerSideProps: GetServerSideProps = adminServerSideProps;
