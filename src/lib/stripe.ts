import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  throw new Error("Missing STRIPE_SECRET_KEY environment variable")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: "2024-04-10" as any,
  typescript: true,
})

export const STRIPE_PRO_LINK = process.env.STRIPE_PRO_PAYMENT_LINK || "https://buy.stripe.com/test_pro_placeholder"
export const STRIPE_ENTERPRISE_LINK = process.env.STRIPE_ENTERPRISE_PAYMENT_LINK || "https://buy.stripe.com/test_enterprise_placeholder"
