require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  connectionString:
    process.env.DATABASE_URL ||
    "postgresql://postgres:postgres@127.0.0.1:5432/stayhub",
  ssl: process.env.DATABASE_URL?.includes("neon.tech")
    ? { rejectUnauthorized: false }
    : false,
});

const createTables = async () => {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS homes (
      id SERIAL PRIMARY KEY,
      house_name TEXT NOT NULL,
      location TEXT NOT NULL,
      price NUMERIC NOT NULL DEFAULT 0,
      rating NUMERIC,
      description TEXT,
      image_url TEXT,
      image_urls TEXT[] DEFAULT '{}',
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  await pool.query(`
    ALTER TABLE homes
    ADD COLUMN IF NOT EXISTS image_urls TEXT[] DEFAULT '{}'
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS favourites (
      id SERIAL PRIMARY KEY,
      home_id INTEGER NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(home_id)
    )
  `);

  await pool.query(`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      home_id INTEGER NOT NULL REFERENCES homes(id) ON DELETE CASCADE,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      UNIQUE(home_id)
    )
  `);
};

const MongoConnect = async (callback) => {
  try {
    await pool.query("SELECT 1");
    await createTables();
    callback();
  } catch (err) {
    console.log("Error while connecting:", err);
  }
};

const getDb = () => pool;

exports.MongoConnect = MongoConnect;
exports.getDb = getDb;
