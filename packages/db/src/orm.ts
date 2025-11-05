import { MikroORM, EntityManager, RequestContext } from '@mikro-orm/core';
import config from './mikro-orm.config.js';
import { logger } from '@repo/logger';

let orm: MikroORM | null = null;

/**
 * Initialize the MikroORM instance
 */
export async function initORM(): Promise<MikroORM> {
  if (orm) {
    return orm;
  }

  try {
    orm = await MikroORM.init(config);
    logger.log('MikroORM initialized successfully');
    return orm;
  } catch (error) {
    logger.error('Failed to initialize MikroORM:', error);
    throw error;
  }
}

/**
 * Get the ORM instance (initializes if not already done)
 */
export async function getORM(): Promise<MikroORM> {
  if (!orm) {
    return await initORM();
  }
  return orm;
}

/**
 * Get the EntityManager instance
 */
export async function getEM(): Promise<EntityManager> {
  const ormInstance = await getORM();
  return ormInstance.em;
}

/**
 * Close the ORM connection
 */
export async function closeORM(): Promise<void> {
  if (orm) {
    await orm.close();
    orm = null;
    logger.log('MikroORM connection closed');
  }
}

/**
 * Fork the EntityManager for a new request context
 * Use this in serverless environments or for each request
 */
export async function forkEM(): Promise<EntityManager> {
  const ormInstance = await getORM();
  return ormInstance.em.fork();
}

/**
 * Wrap a function in a request context
 * This is useful for serverless functions and API routes
 */
export async function withRequestContext<T>(
  callback: (em: EntityManager) => Promise<T>
): Promise<T> {
  const ormInstance = await getORM();
  return RequestContext.create(ormInstance.em, callback);
}
