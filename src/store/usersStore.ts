import { create } from "zustand";

type User = {
    id: string;
    lastSeen: Date;
    online: boolean;
}

export type UserState = {
    users: Map<string, User>;
    setUsers: (users: User[]) => void;
    addUser: (user: User) => void;
    offlineUser: (id: string) => void;
}


const useUserStore = create<UserState>((set, get) => ({
    users: new Map(),
    setUsers: (users) => {
        const usersMap = new Map<string, User>();
        users.forEach((user) => {
            usersMap.set(user.id, user);
        });
        set({ users: usersMap });
    }
    ,
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

}));


export default useUserStore;