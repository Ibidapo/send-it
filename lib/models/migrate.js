import pool from './connection';

const migration = [
  `DROP TABLE IF EXISTS users;
  CREATE TABLE users(
  user_id SERIAL PRIMARY KEY,
  first_name TEXT,
  last_name TEXT,
  email VARCHAR(40) UNIQUE NOT NULL,
  password VARCHAR(100) NOT NULL,
  is_admin BOOLEAN,
  joined VARCHAR NOT NULL
  );`,
  `DROP TABLE IF EXISTS parcels;
  CREATE TABLE parcels(
  parcel_id SERIAL PRIMARY KEY,
  sender_id INTEGER NOT NULL,
  parcel_kg VARCHAR(5) NOT NULL,
  sender_address VARCHAR(50) NOT NULL,
  recipient_address VARCHAR(40) NOT NULL,
  status VARCHAR(20) NOT NULL,
  present_location VARCHAR(50) NOT NULL,
  recipient_phone VARCHAR(11) NOT NULL,
  created VARCHAR NOT NULL
  );`,
];

migration.forEach(query => pool.query(query, error => console.log(error)));
