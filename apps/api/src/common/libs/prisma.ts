/* eslint-disable @typescript-eslint/no-require-imports */
import { PrismaClient } from '@prisma/client';

// Initialize based on environment
let prisma: PrismaClient;

// For development & staging, use standard PostgreSQL
// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'staging') {
  prisma = new PrismaClient();
}
// For production, use Neon with WebSocket connections
// eslint-disable-next-line turbo/no-undeclared-env-vars
else if (process.env.NODE_ENV === 'production') {
  // Import Neon-specific libraries only when needed
  const { neonConfig, Pool } = require('@neondatabase/serverless');

  const { PrismaNeon } = require('@prisma/adapter-neon');
  const ws = require('ws');

  neonConfig.webSocketConstructor = ws;
  // eslint-disable-next-line turbo/no-undeclared-env-vars
  const connectionString = process.env.DATABASE_URL as string;
  const pool = new Pool({ connectionString });
  const adapter = new PrismaNeon(pool);

  prisma = new PrismaClient({ adapter } as never);
}
// Fallback
else {
  prisma = new PrismaClient();
}

// Add global caching for development
// eslint-disable-next-line turbo/no-undeclared-env-vars
if (process.env.NODE_ENV !== 'production') {
  const globalForPrisma = global as unknown as { prisma: PrismaClient };
  if (!globalForPrisma.prisma) {
    globalForPrisma.prisma = prisma;
  }
}

export default prisma;
