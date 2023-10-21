import { PrismaClient } from '@prisma/client';

// type assertion to access the Prisma Client
const globalForPrisma = global as unknown as {
  prisma: PrismaClient | undefined;
};

// hold instance of prisma client or create a new one
const client = globalForPrisma.prisma || new PrismaClient();

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = client;

export default client;
