import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DB_ELEPHANT;

const pool = new Pool({ connectionString });

export default pool;
