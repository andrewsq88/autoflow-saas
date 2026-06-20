// Prisma client singleton with lazy initialization
// Avoids connection issues during Next.js build time

import type { PrismaClient as PrismaClientType } from "@prisma/client"

const PrismaClientConstructor = (): typeof import("@prisma/client").PrismaClient => {
  return require("@prisma/client").PrismaClient
}

// Use a proxy to lazy-load the Prisma client only when actually used
const prismaClient = (() => {
  let client: PrismaClientType | null = null

  return new Proxy({} as PrismaClientType, {
    get(_target, prop) {
      if (!client) {
        const PC = PrismaClientConstructor()
        client = process.env.NODE_ENV === "production"
          ? new PC()
          : (globalThis as any).__prisma ??= new PC()
      }
      return (client as any)[prop]
    },
  })
})()

export { prismaClient as prisma }