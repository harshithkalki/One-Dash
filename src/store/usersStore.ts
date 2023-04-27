import { create } from "zustand";
import { type Notification } from "@prisma/client";

type User = {
    id: string;
    lastSeen: Date;
    online: boolean;
}

export type UserState = {
    users: Map<string, User>;
    notifications: Notification[];
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    offlineUser: (id: string) => void;
    addNotification: (notification: Notification) => void;
}


const useUserStore = create<UserState>((set, get) => ({
    users: new Map(),
    setUsers: (users) => {
        const usersMap = new Map<string, User>();
        users.forEach((user) => {
            usersMap.set(user.id, user);
        });
        set({ users: usersMap });
    },
    notifications: [],
    addUser: (user) => {
        set({
            users: new Map(get().users).set(user.id, user)
        });
    }
    ,
    offlineUser: (id: string) => {
        const users = new Map(get().users);
        const user = users.get(id);
        if (user) {
            users.set(id, { ...user, online: false });
            set({ users });
        }
    },
    addNotification: (notification) => {
        set({
            notifications: [...get().notifications, notification]
        });
    }

}));


export default useUserStore;