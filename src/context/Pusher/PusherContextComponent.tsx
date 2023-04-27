import React, { type PropsWithChildren, useEffect } from "react";
import getPusher from "~/utils/getPusher";
import { type role } from "@prisma/client";
import useUserStore from "~/store/usersStore";

export type IPusherContextComponentProps = PropsWithChildren;

const PusherContextComponent: React.FunctionComponent<
  IPusherContextComponentProps
> = (props) => {
  const { setUsers, addUser, offlineUser } = useUserStore((state) => ({
    setUsers: state.setUsers,
    addUser: state.addUser,
    offlineUser: state.offlineUser,
  }));

  useEffect(() => {
    const pusher = getPusher();
    pusher?.signin();

    const global = pusher?.subscribe(`presence-global`);

    global?.bind(
      "pusher:subscription_succeeded",
      function ({
        members,
      }: {
        members: {
          [key: string]: {
            email: string;
            firstName: string;
            image: string;
            role: role;
          };
        };
      }) {
        const users = Object.keys(members).map((member) => {
          return {
            id: member,
            lastSeen: new Date(),
            online: true,
          };
        });

        setUsers(users);
      }
    );

    global?.bind(
      "pusher:member_added",
      function (members: {
        id: string;
        info: {
          email: string;
          firstName: string;
          image: string;
          role: role;
        };
      }) {
        addUser({
          id: members.id,
          lastSeen: new Date(),
          online: true,
        });
      }
    );

    global?.bind(
      "pusher:member_removed",
      function (members: {
        id: string;
        info: {
          email: string;
          firstName: string;
          image: string;
          role: role;
        };
      }) {
        offlineUser(members.id);
      }
    );

    return () => {
      pusher?.unsubscribe(`presence-global`);
      pusher.unbind_all();
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <>{props.children}</>;
};

export default PusherContextComponent;
