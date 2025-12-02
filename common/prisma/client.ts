import { PrismaClient } from "../generated/prisma/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  adapter: PrismaBetterSqlite3;
};

const adapter =
  globalForPrisma.adapter ||
  new PrismaBetterSqlite3({ url: process.env.DATABASE_URL! });
export const prisma = globalForPrisma.prisma || new PrismaClient({ adapter });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.adapter = adapter;
  globalForPrisma.prisma = prisma;
}
