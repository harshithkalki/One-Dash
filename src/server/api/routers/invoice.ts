import Stripe from "stripe";
import { env } from "~/env.mjs";
import { createTRPCRouter, protectedProcedure } from "../trpc";
import { CreateInvoice } from "~/zod/invoice";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: "2022-11-15",
});

export const invoiceRouter = createTRPCRouter({
  createInvoice: protectedProcedure.input(CreateInvoice).mutation(async ({
    ctx,
    input
  }) => {
    const order = await ctx.prisma.order.update({
      where: {
        id: input.orderId
      },
      data: {
        orderStatus: "pendingpayment"
      },
      include: {
        User: true
      }
    })

    const customer = await stripe.customers.list({
      email: ctx.session.user.email,
    });

    let customerId: string = customer.data[0]?.id ?? "";

    if (customer.data.length === 0) {
      const customer = await stripe.customers.create({
        name: ctx.session.user.firstName,
        address: {
          city: order?.User.city ?? "",
          country: order?.User.country ?? "",
          line1: order?.User.address ?? "",
          postal_code: order?.User.zipcode ?? "",
          state: order?.User.state ?? "",
        },
        email: ctx.session.user.email,
      });

      customerId = customer.id;
    }

    const invoice = await stripe.invoices.create({
      customer: customerId,
      collection_method: "send_invoice",
      days_until_due: 7,
      auto_advance: true,
    });

    await stripe.invoiceItems.create({
      customer: customerId,
      amount: input.amount,
      invoice: invoice.id,
    });

    const invoiceSend = await stripe.invoices.sendInvoice(invoice.id);

    const invoiceDB = await ctx.prisma.invoice.create({
      data: {
        orderId: input.orderId,
        amount: input.amount,
        deliveryTime: input.deliveryTime,
        userId: order?.userId ?? "",
        paymentStatus: "pending",
        paymentId: invoiceSend.hosted_invoice_url as string,
      },
      include: {
        user: true,
        order: true,
      },
    });

    return {
      invoice: invoiceDB,
    };
  }),
});
