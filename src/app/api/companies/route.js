import { NextResponse } from "next/server";
import { MOCK_DATA, getCompanyLogo } from "@/lib/companyData";

// ─── PostgreSQL search ────────────────────────────────────────────────────────
async function searchPostgres(query, type, page, pageSize) {
  const { query: pgQuery } = await import("@/lib/postgres");
  const offset = (page - 1) * pageSize;

  let sql, countSql, mainParams, countParams;

  if (!query) {
    // No query — return all companies paginated
    sql = `
      SELECT cin, company_name, roc_code, registered_state,
             company_category, class_of_company, date_of_incorporation,
             company_status, authorized_capital, paid_up_capital,
             email_id, active_compliance
      FROM companies
      ORDER BY company_name
      LIMIT $1 OFFSET $2
    `;
    countSql = `SELECT COUNT(*) FROM companies`;
    mainParams = [pageSize, offset];
    countParams = [];
  } else if (type === "cin") {
    sql = `
      SELECT cin, company_name, roc_code, registered_state,
             company_category, class_of_company, date_of_incorporation,
             company_status, authorized_capital, paid_up_capital,
             email_id, active_compliance
      FROM companies
      WHERE cin ILIKE $1
      LIMIT $2 OFFSET $3
    `;
    countSql = `SELECT COUNT(*) FROM companies WHERE cin ILIKE $1`;
    mainParams = [`%${query}%`, pageSize, offset];
    countParams = [`%${query}%`];
  } else if (type === "state") {
    sql = `
      SELECT cin, company_name, roc_code, registered_state,
             company_category, class_of_company, date_of_incorporation,
             company_status, authorized_capital, paid_up_capital,
             email_id, active_compliance
      FROM companies
      WHERE registered_state ILIKE $1
      ORDER BY company_name
      LIMIT $2 OFFSET $3
    `;
    countSql = `SELECT COUNT(*) FROM companies WHERE registered_state ILIKE $1`;
    mainParams = [`%${query}%`, pageSize, offset];
    countParams = [`%${query}%`];
  } else if (type === "roc") {
    sql = `
      SELECT cin, company_name, roc_code, registered_state,
             company_category, class_of_company, date_of_incorporation,
             company_status, authorized_capital, paid_up_capital,
             email_id, active_compliance
      FROM companies
      WHERE roc_code ILIKE $1
      ORDER BY company_name
      LIMIT $2 OFFSET $3
    `;
    countSql = `SELECT COUNT(*) FROM companies WHERE roc_code ILIKE $1`;
    mainParams = [`%${query}%`, pageSize, offset];
    countParams = [`%${query}%`];
  } else {
    // Default: name search using ILIKE (works without pg_trgm extension too)
    sql = `
      SELECT cin, company_name, roc_code, registered_state,
             company_category, class_of_company, date_of_incorporation,
             company_status, authorized_capital, paid_up_capital,
             email_id, active_compliance
      FROM companies
      WHERE company_name ILIKE $1
      ORDER BY company_name
      LIMIT $2 OFFSET $3
    `;
    countSql = `SELECT COUNT(*) FROM companies WHERE company_name ILIKE $1`;
    mainParams = [`%${query}%`, pageSize, offset];
    countParams = [`%${query}%`];
  }

  const [rows, countResult] = await Promise.all([
    pgQuery(sql, mainParams),
    pgQuery(countSql, countParams),
  ]);

  const total = parseInt(countResult.rows[0]?.count || "0", 10);

  return {
    data: rows.rows.map((r) => ({
      id: r.cin,
      cin: r.cin,
      name: r.company_name,
      roc: r.roc_code,
      location: r.registered_state,
      industry: r.company_category,
      classOfCompany: r.class_of_company,
      estDate: r.date_of_incorporation,
      estYear: r.date_of_incorporation
        ? new Date(r.date_of_incorporation).getFullYear()
        : null,
      status: r.company_status?.toLowerCase() === "active" ? "Active" : "Inactive",
      authorizedCapital: r.authorized_capital,
      paidUpCapital: r.paid_up_capital,
      email: r.email_id,
      activeCompliance: r.active_compliance,
      logo: null,
      source: "postgresql",
    })),
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ─── Mock data search ─────────────────────────────────────────────────────────
function searchMockData(query, type, page, pageSize) {
  let filtered = MOCK_DATA;

  if (query) {
    const q = query.toLowerCase();
    if (type === "cin") {
      filtered = MOCK_DATA.filter((c) => c.cin.toLowerCase().includes(q));
    } else if (type === "state") {
      filtered = MOCK_DATA.filter((c) =>
        (c.location || "").toLowerCase().includes(q)
      );
    } else {
      // Default: name, cin, location
      filtered = MOCK_DATA.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.cin.toLowerCase().includes(q) ||
          (c.location || "").toLowerCase().includes(q)
      );
    }
  }

  const total = filtered.length;
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  const dataWithLogos = paginated.map((company) => ({
    ...company,
    logo: getCompanyLogo(company.id),
    source: "mock",
  }));

  return {
    data: dataWithLogos,
    total,
    page,
    pageSize,
    totalPages: Math.ceil(total / pageSize),
  };
}

// ─── GET handler ──────────────────────────────────────────────────────────────
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const query    = (searchParams.get("q") || "").trim();
  const type     = searchParams.get("type") || "company";
  const page     = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const pageSize = Math.min(100, Math.max(1, parseInt(searchParams.get("limit") || "20", 10)));

  // ── 1. Try PostgreSQL ────────────────────────────────────────────────────
  if (process.env.DATABASE_URL) {
    try {
      const result = await searchPostgres(query.toLowerCase(), type, page, pageSize);
      return NextResponse.json({ success: true, ...result, db: "postgresql" });
    } catch (pgErr) {
      console.error("[companies] PostgreSQL failed →", pgErr.message);
      // Fall through to mock data
    }
  }

  // ── 2. Try MongoDB ───────────────────────────────────────────────────────
  if (process.env.MONGODB_URI) {
    try {
      const { default: dbConnect } = await import("@/lib/db");
      const { default: Company }   = await import("@/models/Company");
      await dbConnect();

      let filter = {};
      const q = query.toLowerCase();
      if (q) {
        if (type === "company" || type === "all") {
          filter.$or = [
            { name: { $regex: q, $options: "i" } },
            { cin:  { $regex: q, $options: "i" } },
          ];
        } else if (type === "director") {
          filter["directors.name"] = { $regex: q, $options: "i" };
        } else if (type === "pincode") {
          filter.pincode = q;
        } else if (type === "state") {
          filter.location = { $regex: q, $options: "i" };
        }
      }

      const dbCompanies = await Company.find(filter).limit(pageSize).skip((page - 1) * pageSize);
      const total = await Company.countDocuments(filter);

      if (dbCompanies.length > 0) {
        const data = dbCompanies.map((company) => {
          const c = company.toObject();
          return { ...c, logo: getCompanyLogo(c._id?.toString()), source: "mongodb" };
        });
        return NextResponse.json({
          success: true,
          data,
          total,
          page,
          pageSize,
          totalPages: Math.ceil(total / pageSize),
          db: "mongodb",
        });
      }
    } catch (mongoErr) {
      console.error("[companies] MongoDB failed →", mongoErr.message);
    }
  }

  // ── 3. Mock data fallback (always works) ─────────────────────────────────
  const result = searchMockData(query.toLowerCase(), type, page, pageSize);
  return NextResponse.json({ success: true, ...result, db: "mock" });
}

// ─── POST handler ─────────────────────────────────────────────────────────────
export async function POST(request) {
  // PostgreSQL insert
  if (process.env.DATABASE_URL) {
    try {
      const { query: pgQuery } = await import("@/lib/postgres");
      const body = await request.json();

      const result = await pgQuery(
        `INSERT INTO companies
           (cin, company_name, roc_code, registered_state, company_category,
            class_of_company, date_of_incorporation, company_status,
            authorized_capital, paid_up_capital, email_id)
         VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
         ON CONFLICT (cin) DO UPDATE SET
           company_name   = EXCLUDED.company_name,
           company_status = EXCLUDED.company_status,
           updated_at     = NOW()
         RETURNING *`,
        [
          body.cin,
          body.company_name || body.name,
          body.roc_code,
          body.registered_state || body.location,
          body.company_category || body.industry,
          body.class_of_company,
          body.date_of_incorporation || body.estDate,
          body.company_status || body.status || "Active",
          body.authorized_capital,
          body.paid_up_capital,
          body.email_id || body.email,
        ]
      );
      return NextResponse.json({ success: true, data: result.rows[0] }, { status: 201 });
    } catch (err) {
      console.error("[companies POST] PostgreSQL failed →", err.message);
    }
  }

  // MongoDB insert fallback
  try {
    const { default: dbConnect } = await import("@/lib/db");
    const { default: Company }   = await import("@/models/Company");
    await dbConnect();
    const body    = await request.json();
    const company = await Company.create(body);
    return NextResponse.json({ success: true, data: company }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
