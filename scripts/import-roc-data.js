/**
 * scripts/import-roc-data.js
 *
 * Imports ROC-wise Company Master Data from data.gov.in into PostgreSQL.
 *
 * Data Source:
 *   https://www.data.gov.in/resource/registrars-companies-roc-wise-company-master-data
 *
 * The dataset is available as a downloadable CSV. Place the CSV at:
 *   scripts/roc-company-data.csv
 *
 * Usage:
 *   node scripts/import-roc-data.js
 *
 * Options:
 *   --limit=5000     Import only N rows (for testing)
 *   --file=path.csv  Use a custom CSV file path
 *
 * Requires: DATABASE_URL in .env.local
 */

import { createReadStream } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { existsSync } from "fs";
import pg from "pg";
import readline from "readline";
import { config } from "dotenv";

config({ path: ".env.local" });

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const { Pool } = pg;

// --- CLI args -----------------------------------------
const args = Object.fromEntries(
  process.argv.slice(2)
    .filter((a) => a.startsWith("--"))
    .map((a) => {
      const [k, v] = a.replace("--", "").split("=");
      return [k, v || true];
    })
);

const LIMIT = args.limit ? parseInt(args.limit) : Infinity;
const CSV_FILE = args.file
  ? args.file
  : join(__dirname, "roc-company-data.csv");

// Mapping from CSV header → DB column
const COLUMN_MAP = {
  "CIN": "cin",
  "COMPANY_NAME": "company_name",
  "ROC_CODE": "roc_code",
  "REGISTRATION_NUMBER": "registration_number",
  "COMPANY_CATEGORY": "company_category",
  "COMPANY_SUBCATEGORY": "company_subcategory",
  "CLASS_OF_COMPANY": "class_of_company",
  "DATE_OF_INCORPORATION": "date_of_incorporation",
  "REGISTERED_STATE": "registered_state",
  "REGISTERED_OFFICE_ADDRESS": "registered_address",
  "EMAIL_ID": "email_id",
  "AUTHORISEDCAPITAL": "authorized_capital",
  "PAIDUPCAPITAL": "paid_up_capital",
  "NUMBEROFMEMBERS": "number_of_members",
  "DATE_OF_LAST_AGM": "date_of_last_agm",
  "DATE_OF_BALANCE_SHEET": "date_of_balance_sheet",
  "COMPANY_STATUS": "company_status",
  "ACTIVE_COMPLIANCE": "active_compliance",
};

function parseDate(str) {
  if (!str || str.trim() === "" || str.trim() === "NA") return null;
  const d = new Date(str.trim());
  return isNaN(d.getTime()) ? null : d.toISOString().split("T")[0];
}

function parseNumber(str) {
  if (!str || str.trim() === "" || str.trim() === "NA") return null;
  const n = parseInt(str.replace(/,/g, ""), 10);
  return isNaN(n) ? null : n;
}

async function importCSV() {
  if (!process.env.DATABASE_URL) {
    console.error("❌  DATABASE_URL not set in .env.local");
    process.exit(1);
  }

  if (!existsSync(CSV_FILE)) {
    console.error(`❌  CSV file not found: ${CSV_FILE}`);
    console.error(`
  Please download the ROC Company Master Data CSV from:
  https://www.data.gov.in/resource/registrars-companies-roc-wise-company-master-data

  And place it at: scripts/roc-company-data.csv
  (or pass --file=<path>)
    `);
    process.exit(1);
  }

  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.DATABASE_URL.includes("localhost")
      ? false
      : { rejectUnauthorized: false },
    max: 5,
  });

  const client = await pool.connect();

  try {
    console.log(`📂  Reading: ${CSV_FILE}`);
    console.log(`📊  Limit:   ${LIMIT === Infinity ? "all rows" : LIMIT}`);

    const rl = readline.createInterface({
      input: createReadStream(CSV_FILE),
      crlfDelay: Infinity,
    });

    let headers = null;
    let batch = [];
    const BATCH_SIZE = 500;
    let totalInserted = 0;
    let totalSkipped = 0;
    let lineNo = 0;

    const flushBatch = async () => {
      if (batch.length === 0) return;

      // Build multi-row INSERT with ON CONFLICT DO NOTHING (idempotent)
      const placeholders = [];
      const values = [];
      let idx = 1;

      const cols = [
        "cin", "company_name", "roc_code", "registration_number",
        "company_category", "company_subcategory", "class_of_company",
        "date_of_incorporation", "registered_state", "registered_address",
        "email_id", "authorized_capital", "paid_up_capital",
        "number_of_members", "date_of_last_agm", "date_of_balance_sheet",
        "company_status", "active_compliance",
      ];

      for (const row of batch) {
        const placeholderRow = cols.map(() => `$${idx++}`).join(", ");
        placeholders.push(`(${placeholderRow})`);
        cols.forEach((col) => values.push(row[col] ?? null));
      }

      const sql = `
        INSERT INTO companies (${cols.join(", ")})
        VALUES ${placeholders.join(",\n")}
        ON CONFLICT (cin) DO UPDATE SET
          company_name          = EXCLUDED.company_name,
          roc_code              = EXCLUDED.roc_code,
          company_status        = EXCLUDED.company_status,
          active_compliance     = EXCLUDED.active_compliance,
          authorized_capital    = EXCLUDED.authorized_capital,
          paid_up_capital       = EXCLUDED.paid_up_capital,
          date_of_last_agm      = EXCLUDED.date_of_last_agm,
          date_of_balance_sheet = EXCLUDED.date_of_balance_sheet,
          updated_at            = NOW()
      `;

      const result = await client.query(sql, values);
      totalInserted += result.rowCount;
      batch = [];
    };

    for await (const line of rl) {
      lineNo++;
      if (lineNo === 1) {
        // Parse header row
        headers = line.split(",").map((h) => h.trim().replace(/"/g, "").toUpperCase());
        console.log(`📋  Columns detected: ${headers.length}`);
        continue;
      }

      if (totalInserted + batch.length >= LIMIT) break;

      // Simple CSV parse (handles basic quoted fields)
      const raw = [];
      let cur = "";
      let inQ = false;
      for (const ch of line) {
        if (ch === '"') { inQ = !inQ; }
        else if (ch === "," && !inQ) { raw.push(cur.trim()); cur = ""; }
        else { cur += ch; }
      }
      raw.push(cur.trim());

      if (raw.length < 5) { totalSkipped++; continue; }

      // Map CSV columns → DB row object
      const mapped = {};
      headers.forEach((h, i) => {
        const dbCol = COLUMN_MAP[h];
        if (dbCol) mapped[dbCol] = raw[i] || null;
      });

      if (!mapped.cin || !mapped.company_name) { totalSkipped++; continue; }

      // Type coercions
      mapped.date_of_incorporation = parseDate(mapped.date_of_incorporation);
      mapped.date_of_last_agm      = parseDate(mapped.date_of_last_agm);
      mapped.date_of_balance_sheet = parseDate(mapped.date_of_balance_sheet);
      mapped.authorized_capital    = parseNumber(mapped.authorized_capital);
      mapped.paid_up_capital       = parseNumber(mapped.paid_up_capital);
      mapped.number_of_members     = parseNumber(mapped.number_of_members);

      batch.push(mapped);

      if (batch.length >= BATCH_SIZE) {
        await flushBatch();
        process.stdout.write(`\r   ✅  Inserted: ${totalInserted.toLocaleString()} rows...`);
      }
    }

    await flushBatch();
    console.log(`\n\n🎉  Import complete!`);
    console.log(`   Inserted / Updated : ${totalInserted.toLocaleString()}`);
    console.log(`   Skipped (bad rows) : ${totalSkipped.toLocaleString()}`);

  } catch (err) {
    console.error("\n❌  Import failed:", err.message);
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

importCSV();
