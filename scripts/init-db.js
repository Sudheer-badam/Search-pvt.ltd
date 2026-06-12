/**
 * scripts/init-db.js
 *
 * Run once to create the PostgreSQL schema.
 * Usage:  node scripts/init-db.js
 *
 * Requires DATABASE_URL in .env.local or environment.
 */

import { readFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import pg from "pg";
import { config } from "dotenv";

// Load .env.local
config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const { Pool } = pg;

async function initDB() {
  const DATABASE_URL = process.env.DATABASE_URL;
  if (!DATABASE_URL) {
    console.error("❌  DATABASE_URL not set in .env.local");
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: DATABASE_URL,
    ssl: DATABASE_URL.includes("localhost") ? false : { rejectUnauthorized: false },
  });

  try {
    console.log("🔌 Connecting to PostgreSQL...");
    const client = await pool.connect();

    console.log("📜 Reading schema.sql...");
    const sql = readFileSync(join(__dirname, "schema.sql"), "utf8");

    console.log("🚀 Applying schema...");
    await client.query(sql);

    console.log("✅ Schema applied successfully!");
    console.log("   Tables: companies, directors");
    console.log("   Indexes: CIN, name (trigram), state, roc_code, status");

    client.release();
  } catch (err) {
    console.error("❌ Failed to initialise database:", err.message);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initDB();
