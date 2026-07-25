import { Application } from 'express';

import { Collection, Db } from 'mongodb';

/**
 * Obtém uma referência tipada para uma coleção MongoDB.
 *
 * @param appOrDb Instância do ExpressJS ou da conexão MongoDB.
 * @param name Nome da coleção a ser acessada.
 * @returns Referência para a coleção MongoDB.
 */
export function getCollection<T extends Object>(
  appOrDb: (Application | Db),
  name: string,
): Collection<T> {
  const db: Db = appOrDb instanceof Db
  ? appOrDb
  : appOrDb.locals.db;
  return db.collection<T>(name);
}
