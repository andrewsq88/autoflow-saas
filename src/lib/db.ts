import { PrismaClient } from "@prisma/client"

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

function createPrismaClient() {
  try {
    return new PrismaClient()
  } catch {
    // Return a proxy that will retry on first actual use
    return new Proxy({} as PrismaClient, {
      get(_, prop) {
        return (...args: any[]) => {
          const client = globalForPrisma.prisma || new PrismaClient()
          return (client as any)[prop](...args)
        }
      },
    })
  }
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient()

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
