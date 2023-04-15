import { createContext } from "react";
import { type Socket } from "socket.io-client";

export interface ISocketContextState {
  socket: Socket | undefined;
}

export const defaultSocketContextState: ISocketContextState = {
  socket: undefined,

};

export type TSocketContextActions = "update_socket" | "update_userId";
export type TSocketContextPayload = string | string[] | Socket | undefined;

export interface ISocketContextActions {
  type: TSocketContextActions;
  payload: TSocketContextPayload;
}

export const SocketReducer = (
  state: ISocketContextState,
  action: ISocketContextActions
): ISocketContextState => {
  switch (action.type) {
    case "update_socket":
      return { ...state, socket: action.payload as Socket };
    default:
      return state;
  }
};

export interface ISocketContextProps {
  SocketState: ISocketContextState;
  SocketDispatch: React.Dispatch<ISocketContextActions>;
}

const SocketContext = createContext<ISocketContextProps>({
  SocketState: defaultSocketContextState,
  SocketDispatch: () => null,
});

export const SocketContextConsumer = SocketContext.Consumer;
export const SocketContextProvider = SocketContext.Provider;

export default SocketContext;
