import * as dotenv from 'dotenv';

// Load environment variables from .env file if present
dotenv.config({ path: ['.env.local', '.env'] });

// Export ORM utilities
export * from './orm.js';

// Export entities
export * from './entities/index.js';

// Export configuration
export { default as config } from './mikro-orm.config.js';
export { ConnectionType } from './mikro-orm.config.js';

// Re-export the seed function (will need to update later)
// export { seed } from './seeds/run.js';

// Re-export the registry as a namespace to avoid conflicts
export * as registry from './registry/index.js';

// Re-export the utils
export { runRawSqlMigration } from './utils.js';
