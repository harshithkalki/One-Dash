import { z } from "zod";

export const CreateInvoice = z.object({
    orderId: z.string(),
    amount: z.number(),
    deliveryTime: z.number().int(),
    notes: z.string().optional(),
});

