import React, { useEffect, useRef } from "react";
import { BsSearch, BsCheckAll } from "react-icons/bs";
import { AiOutlineMore } from "react-icons/ai";
import Image from "next/image";
import { ImAttachment } from "react-icons/im";
import { RiEmotionHappyLine } from "react-icons/ri";
import { cn } from "~/utils/cn";
import { Message } from "@prisma/client";
import { useSession } from "next-auth/react";
import Pusher from "pusher-js";
import { env } from "~/env.mjs";
import { api } from "~/utils/api";

const MessageInput = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (message: string) => void;
  disabled?: boolean;
}) => {
  const [value, setValue] = React.useState<string>("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setValue("");
        onSubmit(value);
      }}
    >
      <label className="sr-only">Your message</label>
      <div className="relative flex items-center rounded-lg bg-gray-50 px-3 py-2">
        <div className="absolute right-20 flex space-x-4 rounded-lg bg-gray-50 px-2 py-2">
          <RiEmotionHappyLine size={18} />
          <ImAttachment size={18} />
        </div>
        <textarea
          id="chat"
          rows={2}
          className="mx-4 block w-full rounded-lg border border-gray-300 bg-white p-2.5 text-sm text-gray-900 outline-none"
          placeholder="Your message..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
        <button
          type="submit"
          className="inline-flex cursor-pointer justify-center rounded-full p-2 text-blue-600 hover:bg-blue-100 dark:text-blue-500 dark:hover:bg-gray-600"
          disabled={value.length === 0 || disabled}
        >
          <svg
            className="h-6 w-6 rotate-90"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
          </svg>
        </button>
      </div>
    </form>
  );
};

const Message = ({ message, isMe }: { isMe?: boolean; message: string }) => {
  return (
    <div>
      <div
        className={cn("flex justify-start px-8 py-2", isMe && "justify-end")}
      >
        <p
          className={cn(
            "max-w-md rounded-b-lg p-2.5 text-sm font-light",
            isMe ? "bg-gray-100" : "bg-blue-500  text-white"
          )}
        >
          {message}
        </p>
      </div>
      <div
        className={cn(
          "flex items-center justify-start px-8 text-[11px]  text-gray-400",
          isMe && "justify-end"
        )}
      >
        10.12 AM {isMe && <BsCheckAll className="text-blue-500" />}
      </div>
    </div>
  );
};

const Users = ({
  onUserSelect,
}: {
  onUserSelect: (user: {
    id: string;
    firstName: string;
    isOnline: boolean;
  }) => void;
}) => {
  const { data: users } = api.user.allUsers.useQuery();

  return (
    <>
      {users?.map((val) => (
        <div
          key={val.id}
          className="relative mt-2 flex w-full space-x-2 border-b bg-gray-50 p-1 pt-4 sm:border-none"
          onClick={() =>
            onUserSelect({
              id: val.id,
              firstName: val.firstName,
              isOnline: false,
            })
          }
        >
          <img src="/img/user/Avatar_2.png" alt="pic" width={40} height={40} />
          <div className="absolute bottom-1 left-6 h-2 w-2 rounded-full bg-green-500"></div>
          <div className="w-full">
            <div className="flex items-center justify-between">
              <p className="text-sm lg:text-base">{val.firstName}</p>
              <span className="truncate text-[10px] text-gray-400">
                10 min ago
              </span>
            </div>
            <p className="w-36 truncate text-[12px] text-gray-400">
              {val.receivedMessages[0]?.message ?? ""}
            </p>
          </div>
        </div>
      ))}
    </>
  );
};

const ChatMessage = () => {
  const scrollToBottom = useRef<HTMLDivElement>(null);
  const [messages, setMessages] = React.useState<Message[]>([]);
  const { user } = useSession().data ?? {};
  const [user2, setUser2] = React.useState<{
    id: string;
    firstName: string;
    isOnline: boolean;
  }>({
    id: "clg88crr60000vulgnhhtbsck",
    firstName: "kalki",
    isOnline: true,
  });
  const { mutateAsync: sendMsg, isLoading: messageLoading } =
    api.user.message.useMutation();

  useEffect(() => {
    if (!user) return;

    Pusher.logToConsole = true;

    const pusher = new Pusher(env.NEXT_PUBLIC_PUSHER_KEY, {
      cluster: env.NEXT_PUBLIC_PUSHER_CLUSTER,
      channelAuthorization: {
        endpoint: "/api/pusher/channel-auth",
        transport: "ajax",
        params: {
          user_id: user?.id,
        },
      },
    });

    const channel = pusher.subscribe(`private-chat-${user?.id}-${user2?.id}`);

    channel.bind("new-message", function (msg: Message) {
      if (msg.senderId !== user.id) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    channel.bind("subscription_count", function (count: number) {
      console.log("subscription_count", count);
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, []);

  return (
    <React.Fragment>
      <div className="font-play relative mt-20 flex h-[calc(100vh-80px)] w-full bg-[#FAFAFA]">
        <div className="flex h-full w-full flex-col overflow-hidden border-r bg-white md:w-2/5 lg:w-[50%] xl:w-[40%]">
          <div className="flex items-center justify-between">
            <h4 className="p-4 text-3xl">Messages</h4>
            <AiOutlineMore />
          </div>
          <div className="flex flex-1 flex-col overflow-hidden px-4 py-2">
            <div className="relative w-full text-gray-600 focus-within:text-gray-400">
              <span className="absolute inset-y-0 left-0 flex items-center pl-2">
                <button
                  type="submit"
                  className="focus:shadow-outline p-1 focus:outline-none"
                >
                  <BsSearch />
                </button>
              </span>
              <input
                type="search"
                name="q"
                className="w-full border py-3 pl-10 text-sm text-white focus:bg-white focus:text-gray-900 focus:outline-none"
                placeholder="Search..."
                autoComplete="off"
              />
            </div>
            <div className="flex-1 overflow-y-scroll">
              <Users
                onUserSelect={(user) => {
                  setUser2(user);
                }}
              />
              <div className="relative mt-2 flex w-full space-x-2 border-b bg-gray-50 p-1 pt-4 sm:border-none">
                <img
                  src="/img/user/Avatar_2.png"
                  alt="pic"
                  width={40}
                  height={40}
                />
                <div className="absolute bottom-1 left-6 h-2 w-2 rounded-full bg-green-500"></div>
                <div className="w-full">
                  <div className="flex items-center justify-between">
                    <p className="text-sm lg:text-base">name</p>
                    <span className="truncate text-[10px] text-gray-400">
                      10 min ago
                    </span>
                  </div>
                  <p className="w-36 truncate text-[12px] text-gray-400">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="relative hidden flex-col overflow-scroll bg-white md:flex md:w-3/5 lg:w-5/6">
          <div className="flex h-16 w-full items-center justify-between border-b px-4">
            <div className="flex space-x-2">
              <div className="relative">
                <Image
                  src="/img/user/Avatar_2.png"
                  alt="pic"
                  width={40}
                  height={40}
                />
                {user2.isOnline && (
                  <div className="absolute bottom-1 right-0 h-2 w-2 rounded-full bg-green-500"></div>
                )}
              </div>
              <div className="block">
                <p className="text-base font-normal">{user2.firstName}</p>
                <p className={cn("text-[12px] font-normal text-gray-400")}>
                  {user2.isOnline ? "Online" : "Offline"}
                </p>
              </div>
            </div>
            <div className="p-2">
              <AiOutlineMore />
            </div>
          </div>
          <div className="flex-1 overflow-scroll">
            <div className="w-full">
              {messages.map((message) => (
                <Message
                  key={message.id}
                  message={message.message}
                  isMe={message.senderId === user?.id ? true : false}
                />
              ))}
            </div>
          </div>
          <div style={{ float: "left", clear: "both" }} ref={scrollToBottom} />
          <div className="w-full">
            <MessageInput
              onSubmit={(msg) => {
                if (!user) return;
                void sendMsg({
                  message: msg,
                  to: user2.id,
                }).then((msg) => {
                  setMessages((prev) => [...prev, msg]);
                  scrollToBottom.current?.scrollIntoView({
                    behavior: "smooth",
                  });
                });
              }}
              disabled={messageLoading}
            />
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};
export default ChatMessage;
