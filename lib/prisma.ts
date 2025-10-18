    // lib/prisma.ts
    import { PrismaClient } from '@/generated/prisma';

    declare global {
      var prisma: PrismaClient | undefined;
    }

    export const prisma = global.prisma || new PrismaClient({
      log: ['query'], // Optional: logs database queries
    });

    if (process.env.NODE_ENV !== 'production') {
      global.prisma = prisma;
    }