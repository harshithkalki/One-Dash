import { env } from "~/env.mjs";
import type { StripeError } from "@stripe/stripe-js";
import { buffer } from "micro";
import type { NextApiHandler } from "next";
import { prisma } from "~/server/db";
import Stripe from "stripe";
import type { paymentStatus } from "@prisma/client";

const stripe = new Stripe(env.STRIPE_SECRET_KEY, { apiVersion: "2022-11-15" });
// const webhookSecret = env;

// const updateOrder = async (status: OrderStatus, orderId: string) => {
//   return  prisma.order.update({
//     where: {
//       id: orderId,
//     },
//     data: {
//       orderStatus: status,
//     },
//   });
// };

export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === "POST") {
    const buf = await buffer(req);
    const sig = req.headers["stripe-signature"];

    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error: ${(err as StripeError)?.message}`);
      return;
    }

    if ("charge.succeeded" === stripeEvent.type) {
      const session = stripeEvent.data.object as {
        metadata: any;
      };

      try {
        const result = await updateOrder("CONFORMED", session.metadata.orderId);
        console.log(result);
      } catch (error) {
        await prisma.order.delete({
          where: {
            id: session.metadata.orderId,
          },
        });
      }
    }

    res.json({ received: true });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
};

export default handler;
