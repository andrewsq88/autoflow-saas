import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export async function GET() {
  try {
    // Get all workflows for the authenticated user
    // For MVP, return all workflows (auth check in middleware)
    const workflows = await prisma.workflow.findMany({
      orderBy: { createdAt: "desc" },
      take: 50,
    })
    return NextResponse.json({ workflows })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, description, category } = await req.json()
    if (!name) return NextResponse.json({ error: "Name required" }, { status: 400 })

    const workflow = await prisma.workflow.create({
      data: {
        userId: "temp", // Will be replaced with actual user ID from session
        name,
        description,
        category: category || "general",
      },
    })
    return NextResponse.json({ workflow })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
