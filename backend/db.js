// db.js
import pkg from 'pg';
const { Pool } = pkg;

const pool = new Pool({
  user: 'postgres',           // your pgAdmin username
  host: 'localhost',
  database: 'ayateke_hr',     // your actual database name
  password: 'postgres',   // match pgAdmin password
  port: 5432,
});

export default pool;
