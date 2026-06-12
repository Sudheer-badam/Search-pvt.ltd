-- ============================================================
-- Search Pvt. Ltd — PostgreSQL Schema
-- ROC-wise Company Master Data (data.gov.in)
-- ============================================================

-- Enable fuzzy/trigram full-text search
CREATE EXTENSION IF NOT EXISTS pg_trgm;

-- --------------------------------------------------------
-- companies table
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS companies (
  id                    SERIAL PRIMARY KEY,
  cin                   VARCHAR(21)   UNIQUE NOT NULL,        -- Corporate Identity Number
  company_name          TEXT          NOT NULL,
  roc_code              VARCHAR(20),                          -- e.g. RoC-Mumbai
  registration_number   VARCHAR(20),
  company_category      VARCHAR(100),                         -- e.g. Company limited by Shares
  company_subcategory   VARCHAR(150),
  class_of_company      VARCHAR(50),                          -- Public / Private
  date_of_incorporation DATE,
  registered_state      VARCHAR(100),
  registered_address    TEXT,
  email_id              TEXT,
  authorized_capital    BIGINT,                               -- in INR
  paid_up_capital       BIGINT,
  number_of_members     INT,
  date_of_last_agm      DATE,
  date_of_balance_sheet DATE,
  company_status        VARCHAR(50)   DEFAULT 'Active',       -- Active / Strike Off / Dissolved
  active_compliance     VARCHAR(10),                          -- ACTIVE / INACTIVE
  industry              TEXT,                                 -- derived / manual
  website               TEXT,
  created_at            TIMESTAMPTZ   DEFAULT NOW(),
  updated_at            TIMESTAMPTZ   DEFAULT NOW()
);

-- --------------------------------------------------------
-- directors table (linked to companies)
-- --------------------------------------------------------
CREATE TABLE IF NOT EXISTS directors (
  id                SERIAL PRIMARY KEY,
  company_cin       VARCHAR(21) REFERENCES companies(cin) ON DELETE CASCADE,
  din               VARCHAR(20),                             -- Director Identification Number
  director_name     TEXT,
  designation       VARCHAR(100),
  begin_date        DATE,
  end_date          DATE
);

-- --------------------------------------------------------
-- Indexes for performance
-- --------------------------------------------------------

-- CIN already has UNIQUE index. Add B-tree for exact queries.
CREATE INDEX IF NOT EXISTS idx_companies_cin         ON companies (cin);

-- Company name: trigram GIN index for ILIKE / similarity search
CREATE INDEX IF NOT EXISTS idx_companies_name_trgm   ON companies USING GIN (company_name gin_trgm_ops);

-- State, ROC, status: fast filter columns
CREATE INDEX IF NOT EXISTS idx_companies_state        ON companies (registered_state);
CREATE INDEX IF NOT EXISTS idx_companies_roc          ON companies (roc_code);
CREATE INDEX IF NOT EXISTS idx_companies_status       ON companies (company_status);

-- Composite: state + status (common combined filter)
CREATE INDEX IF NOT EXISTS idx_companies_state_status ON companies (registered_state, company_status);

-- Directors DIN lookup
CREATE INDEX IF NOT EXISTS idx_directors_din          ON directors (din);
CREATE INDEX IF NOT EXISTS idx_directors_company_cin  ON directors (company_cin);

-- --------------------------------------------------------
-- updated_at trigger
-- --------------------------------------------------------
CREATE OR REPLACE FUNCTION trigger_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_timestamp ON companies;
CREATE TRIGGER set_timestamp
  BEFORE UPDATE ON companies
  FOR EACH ROW
  EXECUTE PROCEDURE trigger_set_timestamp();
