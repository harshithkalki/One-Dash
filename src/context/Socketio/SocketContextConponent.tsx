import React, {
  type PropsWithChildren,
  useEffect,
  useReducer,
  useState,
} from "react";
import { useSocket } from "~/Hooks/useSocket";
import {
  defaultSocketContextState,
  SocketContextProvider,
  SocketReducer,
} from "./SocketContext";
import { client } from "~/utils/api";

export type ISocketContextComponentProps = PropsWithChildren;

const SocketContextComponent: React.FunctionComponent<
  ISocketContextComponentProps
> = (props) => {
  const { children } = props;

  const socket = useSocket("ws://localhost:3001", {
    reconnectionAttempts: 5,
    reconnectionDelay: 1000,
    autoConnect: false,
  });
  const [SocketState, SocketDispatch] = useReducer(
    SocketReducer,
    defaultSocketContextState
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void client.user.getSocketToken.query().then((token) => {
      socket.auth = {
        token: token,
      };
      socket.connect();
    });

    socket.on("connect", () => {
      console.info("Connected to socket");
      setLoading(false);
    });
    socket.on("connect_error", (error) => {
      console.info("Connection error: ", error);
      setLoading(false);
    });
    SocketDispatch({ type: "update_socket", payload: socket });
    StartListeners();
    // eslint-disable-next-line
  }, []);

  const StartListeners = () => {
    /** Messages */
    socket.on("user_disconnected", () => {
      console.info("User disconnected message received");
      SocketDispatch({ type: "update_socket", payload: undefined });
    });

    /** Connection / reconnection listeners */
    socket.io.on("reconnect", (attempt) => {
      console.info("Reconnected on attempt: " + attempt.toString());
    });

    socket.io.on("reconnect_attempt", (attempt) => {
      console.info("Reconnection Attempt: " + attempt.toString());
    });

    socket.io.on("reconnect_error", (error) => {
      console.info("Reconnection error: ", error);
    });

    socket.io.on("reconnect_failed", () => {
      console.info("Reconnection failure.");
      alert(
        "We are unable to connect you to the chat service.  Please make sure your internet connection is stable or try again later."
      );
    });
  };

  if (loading) return <p>... loading Socket IO ....</p>;

  return (
    <SocketContextProvider value={{ SocketState, SocketDispatch }}>
      {children}
    </SocketContextProvider>
  );
};

export default SocketContextComponent;
