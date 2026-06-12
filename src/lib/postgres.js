import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    const connectionString = process.env.DATABASE_URL;

    if (!connectionString) {
      throw new Error(
        "Please define DATABASE_URL in your .env.local (e.g. postgresql://user:password@localhost:5432/searchpvtltd)"
      );
    }

    pool = new Pool({
      connectionString,
      max: 10,                  // max pool connections
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
      ssl: connectionString.includes("localhost")
        ? false
        : { rejectUnauthorized: false },
    });

    pool.on("error", (err) => {
      console.error("Unexpected PostgreSQL pool error", err);
    });
  }
  return pool;
}

/**
 * Run a single query using the pool.
 * @param {string} text  - SQL statement
 * @param {any[]}  params - parameterized values
 */
export async function query(text, params = []) {
  const pool = getPool();
  const start = Date.now();
  const res = await pool.query(text, params);
  const duration = Date.now() - start;
  if (process.env.NODE_ENV === "development") {
    console.log("PG query:", { text: text.slice(0, 120), duration, rows: res.rowCount });
  }
  return res;
}

export default query;
