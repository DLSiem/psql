import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

const { DB_URL, DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const pool = new Pool({
  user: DB_USER,
  host: DB_HOST,
  database: DB_NAME,
  password: DB_PASSWORD,
  port: Number(DB_PORT),
});

export default pool;
