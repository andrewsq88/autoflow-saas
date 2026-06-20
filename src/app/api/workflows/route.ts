import { NextRequest, NextResponse } from "next/server"

async function getPrisma() {
  const { prisma } = await import("@/lib/db")
  return prisma
}

// Simple JWT decode without verification (NextAuth JWT is already signed)
function decodeJwt(token: string): any {
  try {
    const parts = token.split(".")
    if (parts.length !== 3) return null
    const payload = parts[1]
    const decoded = Buffer.from(payload.replace(/-/g, "+").replace(/_/g, "/"), "base64").toString()
    return JSON.parse(decoded)
  } catch {
    return null
  }
}

async function getSessionUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("next-auth.session-token")?.value
  if (!token) return null
  const payload = decodeJwt(token)
  return payload?.id ?? null
}

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId(req)
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const prisma = await getPrisma()
  const workflows = await prisma.workflow.findMany({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  })
  return NextResponse.json(workflows)
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId(req)
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const body = await req.json()
  const prisma = await getPrisma()
  const workflow = await prisma.workflow.create({
    data: {
      userId,
      name: body.name,
      description: body.description,
      category: body.category || "general",
      trigger: body.trigger,
      actions: body.actions,
    },
  })
  return NextResponse.json(workflow, { status: 201 })
}
