/* eslint-disable @typescript-eslint/no-var-requires */
import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'test') {
  prisma = require('./prisma.mock').prisma;
} else {
  prisma = new PrismaClient();
}

export { prisma };
