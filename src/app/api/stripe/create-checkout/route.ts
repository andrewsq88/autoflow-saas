import { NextRequest, NextResponse } from "next/server"
import { STRIPE_PRO_LINK, STRIPE_ENTERPRISE_LINK } from "@/lib/stripe"

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json()
    
    let url: string
    if (plan === "enterprise") {
      url = STRIPE_ENTERPRISE_LINK
    } else {
      url = STRIPE_PRO_LINK
    }

    return NextResponse.json({ url })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
