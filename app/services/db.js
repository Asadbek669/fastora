import pkg from "pg";
const { Pool } = pkg;

let pool;

if (!global._pool) {
  global._pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 1, // 🟢 Neon serverless uchun eng optimal
  });
}

pool = global._pool;

export { pool };
