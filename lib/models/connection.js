import { Pool } from 'pg';

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'send_it',
  password: 'postgres',
  port: 5432,
});

export default pool;
