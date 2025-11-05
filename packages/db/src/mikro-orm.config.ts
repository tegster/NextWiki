import { defineConfig } from '@mikro-orm/postgresql';
import { Migrator } from '@mikro-orm/migrations';
import { SeedManager } from '@mikro-orm/seeder';
import * as dotenv from 'dotenv';
import { logger } from '@repo/logger';
import * as entities from './entities/index.js';

// Load environment variables
dotenv.config({ path: ['.env.local', '.env'] });

// Define environment variables we check
const databaseUrl = process.env.DATABASE_URL;
const vercelPostgresUrl = process.env.POSTGRES_URL;
const runningOnVercel = !!process.env.VERCEL;

/**
 * Enum representing the different database connection types.
 */
export enum ConnectionType {
  VERCEL_POSTGRES = 'VERCEL_POSTGRES',
  NEON = 'NEON',
  VERCEL_EXTERNAL_POOL = 'VERCEL_EXTERNAL_POOL',
  STANDARD_POOL = 'STANDARD_POOL',
  INVALID = 'INVALID',
}

/**
 * Determines the database connection type based on environment variables.
 */
const getConnectionType = (
  dbUrl: string | undefined,
  vercelUrl: string | undefined,
  isOnVercel: boolean
): ConnectionType => {
  if (vercelUrl) {
    return ConnectionType.VERCEL_POSTGRES;
  }
  if (dbUrl && dbUrl.includes('.neon.tech')) {
    return ConnectionType.NEON;
  }
  if (isOnVercel && dbUrl) {
    return ConnectionType.VERCEL_EXTERNAL_POOL;
  }
  if (dbUrl) {
    return ConnectionType.STANDARD_POOL;
  }
  return ConnectionType.INVALID;
};

// Validate at least one URL is set
if (!databaseUrl && !vercelPostgresUrl) {
  throw new Error(
    'Please set DATABASE_URL or POSTGRES_URL in your environment (e.g., in .env file or in Vercel dashboard).'
  );
}

// Get connection type
const connectionType = getConnectionType(
  databaseUrl,
  vercelPostgresUrl,
  runningOnVercel
);

// Determine connection string and pool size
let connectionString: string;
let poolMin = 2;
let poolMax = 10;

switch (connectionType) {
  case ConnectionType.VERCEL_POSTGRES:
    logger.log('Using Vercel Postgres pool driver (POSTGRES_URL detected)');
    connectionString = vercelPostgresUrl!;
    break;

  case ConnectionType.NEON:
    logger.log('Using Neon database driver (DATABASE_URL contains .neon.tech)');
    connectionString = databaseUrl!;
    // Neon works well with default pool settings
    break;

  case ConnectionType.VERCEL_EXTERNAL_POOL:
    logger.warn(
      'Using PostgreSQL with external DATABASE_URL on Vercel. Ensure the URL points to a pooler.'
    );
    logger.warn(
      "[CRITICAL] Ensure the pooler mode is set to 'transaction' or that you have a very beefy database server."
    );
    connectionString = databaseUrl!;
    poolMin = 0;
    poolMax = 1; // Recommended for Vercel serverless functions
    break;

  case ConnectionType.STANDARD_POOL:
    logger.log(
      'Using standard PostgreSQL driver with DATABASE_URL (Not on Vercel/Neon)'
    );
    connectionString = databaseUrl!;
    poolMax = process.env.DATABASE_POOL_SIZE
      ? parseInt(process.env.DATABASE_POOL_SIZE, 10)
      : 10;
    break;

  case ConnectionType.INVALID:
  default:
    logger.error('Could not determine database connection method.');
    throw new Error('Invalid database configuration state.');
}

// Filter out non-entity exports (like enums)
const entityClasses = Object.values(entities).filter(
  (entity): entity is any =>
    typeof entity === 'function' && entity.prototype && 'constructor' in entity.prototype
);

// MikroORM configuration
export default defineConfig({
  entities: entityClasses,
  clientUrl: connectionString,
  pool: {
    min: poolMin,
    max: poolMax,
  },
  extensions: [Migrator, SeedManager],
  migrations: {
    path: './migrations',
    pathTs: './src/migrations',
    tableName: 'mikro_orm_migrations',
    transactional: true,
    disableForeignKeys: false,
    allOrNothing: true,
    dropTables: false,
    safe: true,
    emit: 'ts',
  },
  seeder: {
    path: './seeders',
    pathTs: './src/seeders',
    defaultSeeder: 'DatabaseSeeder',
    glob: '!(*.d).{js,ts}',
    emit: 'ts',
    fileName: (className: string) => className,
  },
  debug: process.env.NODE_ENV === 'development',
  allowGlobalContext: process.env.NODE_ENV === 'development',
});
