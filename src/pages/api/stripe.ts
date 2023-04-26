import { env } from '~/env.mjs';
import { buffer } from 'micro';
import type { NextApiHandler } from 'next';
import Stripe from 'stripe';
import { prisma } from '~/server/db';


const stripe = new Stripe(env.STRIPE_SECRET_KEY, {
  apiVersion: '2022-11-15'
});

const webhookSecret = env.STRIPE_WEBHOOK_ENDPOINT_SECRET;


export const config = {
  api: {
    bodyParser: false,
  },
};

const handler: NextApiHandler = async (req, res) => {
  if (req.method === 'POST') {
    const buf = await buffer(req);
    const sig = req.headers['stripe-signature'];

    let stripeEvent;

    try {
      stripeEvent = stripe.webhooks.constructEvent(buf, sig!, webhookSecret);
    } catch (err) {
      res.status(400).send(`Webhook Error`);
      return;
    }

    if (stripeEvent.type === 'invoice.payment_succeeded') {
      const invoice = stripeEvent.data.object as Stripe.Invoice;
      await prisma.invoice.update({
        where: { paymentId: invoice.id }, data: {
          paymentStatus: "paid",
          order: {
            update: {
              orderStatus: "inProduction",
            }
          }
        }
      })

    }
    res.json({ received: true });
  } else {
    res.setHeader('Allow', 'POST');
    res.status(405).end('Method Not Allowed');
  }
};

export default handler;
