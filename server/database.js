// database.js
import dotenv from "dotenv";
import pkg from 'pg';

dotenv.config();
const { Client } = pkg;

const db = new Client({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

const initializeDatabase = async () => {
  try {
    await db.connect();
    console.log('Connected to PostgreSQL database');
  } catch (error) {
    console.error('Error connecting to PostgreSQL:', error);
  }
};

initializeDatabase();

export default db;
