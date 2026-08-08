import * as schema from "./schema";

let _db: any = null;

function getDb() {
  if (!_db) {
    const url = process.env.DATABASE_URL;
    if (!url) {
      throw new Error(
        "DATABASE_URL is not set. Make sure environment variables are configured."
      );
    }
    // Dynamic import to avoid bundling neon at build time
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { neon } = require("@neondatabase/serverless");
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { drizzle } = require("drizzle-orm/neon-http");
    const sql = neon(url);
    _db = drizzle(sql, { schema });
  }
  return _db;
}

export function getDbSafe() {
  try {
    return getDb();
  } catch {
    return null;
  }
}

export const db = new Proxy({} as any, {
  get(_target, prop) {
    return Reflect.get(getDb(), prop);
  },
});
