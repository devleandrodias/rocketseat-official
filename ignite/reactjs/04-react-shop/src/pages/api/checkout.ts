import type { NextApiRequest, NextApiResponse } from "next";

import { stripe } from "../../lib/stripe";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const priceId = req.body.priceId;

  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed!" });
  }

  if (!priceId) {
    res.status(400).json({ error: "Price not found!" });
  }

  const cancelUrl = `${process.env.NEXT_URL}/`;
  const successUrl = `${process.env.NEXT_URL}/success?session_id={CHECKOUT_SESSION_ID}`;

  const checkoutSession = await stripe.checkout.sessions.create({
    mode: "payment",
    cancel_url: cancelUrl,
    success_url: successUrl,
    line_items: [
      {
        price: priceId,
        quantity: 1,
      },
    ],
  });

  res.status(201).json({ checkoutUrl: checkoutSession.url });
}
