import Stripe from "stripe"

let stripe: Stripe | null = null

export function getStripe(): Stripe {
  if (!stripe) {
    const key = process.env.STRIPE_SECRET_KEY
    if (!key) {
      throw new Error("Missing STRIPE_SECRET_KEY environment variable")
    }
    stripe = new Stripe(key, {
      apiVersion: "2024-04-10" as any,
      typescript: true,
    })
  }
  return stripe
}

export const STRIPE_PRO_LINK = process.env.STRIPE_PRO_PAYMENT_LINK || "https://buy.stripe.com/test_pro_placeholder"
export const STRIPE_ENTERPRISE_LINK = process.env.STRIPE_ENTERPRISE_PAYMENT_LINK || "https://buy.stripe.com/test_enterprise_placeholder"
