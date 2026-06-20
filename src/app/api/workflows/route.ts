import { NextRequest, NextResponse } from "next/server"

async function getPrisma() {
  const { prisma } = await import("@/lib/db")
  return prisma
}

async function getSessionUserId(req: NextRequest): Promise<string | null> {
  const token = req.cookies.get("next-auth.session-token")?.value
  if (!token) return null
  try {
    const prisma = await getPrisma()
    const session = await prisma.session.findUnique({
      where: { sessionToken: token },
      select: { userId: true },
    })
    return session?.userId ?? null
  } catch {
    return null
  }
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
