import { type Delivery, type Discussions, type Invoice } from "@prisma/client";
import { create } from "zustand";



type OrderHistory = (Invoice | (Discussions & { user: { name: string } })[] | Delivery)[];

export type OrderState = {
    orderId: string;
    orderhistory: OrderHistory;
    addDiscussion: (Discussion: Discussions & { user: { name: string } }) => void;
    addInvoice: (invoice: Invoice) => void;
    addDelivery: (delivery: Delivery) => void;
    setOrderId: (orderId: string) => void;
}

const useOrderStore = create<OrderState>((set, get) => ({
    orderhistory: [],
    orderId: "",
    setOrderId: (orderId: string) => set({ orderId }),
    addDiscussion: (Discussion: Discussions & { user: { name: string } }) => {
        const orderhistory = get().orderhistory;
        const discussion = orderhistory[orderhistory.length - 1] as Discussions[]; // get last discussion
        if (Array.isArray(discussion)) {
            discussion.push(Discussion);
        } else {
            orderhistory.push([Discussion]);
        } set({
            orderhistory: [
                ...orderhistory
            ]
        });
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