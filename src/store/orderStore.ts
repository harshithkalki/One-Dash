import { type Order, type Delivery, type Discussions, type Invoice, type User } from "@prisma/client";
import { create } from "zustand";

type OrderHistory = (Invoice | (Discussions & { user: { firstName: string } }) | Delivery)[];

export type OrderState = {
    order: (Order & {
        user: User;
        team: User[];
    }) | null;
    orderhistory: OrderHistory;
    addDiscussion: (Discussion: Discussions & { user: { firstName: string } }) => void;
    addInvoice: (invoice: Invoice) => void;
    addDelivery: (delivery: Delivery) => void;
    setOrder: (order: OrderState['order']) => void;
    setOrderHistory: (orderhistory: OrderHistory) => void;
}

const useOrderStore = create<OrderState>((set, get) => ({
    orderhistory: [],
    order: null,
    team: [],
    setOrder: (order: OrderState['order']) => { set({ order }) },
    addDiscussion: (Discussion: Discussions & { user: { firstName: string } }) => {
        const orderhistory = get().orderhistory;
        set({ orderhistory: [...orderhistory, Discussion] });
    },
    addInvoice: (invoice: Invoice) => {
        const orderhistory = get().orderhistory;
        set({ orderhistory: [...orderhistory, invoice] });
    },
    addDelivery: (delivery: Delivery) => {
        const orderhistory = get().orderhistory;
        set({ orderhistory: [...orderhistory, delivery] });
    },
    setOrderHistory: (orderhistory: OrderHistory) => set({ orderhistory })
}));


export default useOrderStore;