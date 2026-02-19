require('dotenv').config(); // pastikan env terbaca

const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false } // wajib buat Neon
});

module.exports = pool;
