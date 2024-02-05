// database.js
import pkg from 'pg';
const { Client } = pkg;

const db = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'books',
  password: 'fardeen',
  port: 5432,
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
