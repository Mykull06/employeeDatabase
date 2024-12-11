import dotenv from 'dotenv';
dotenv.config();

// Import and require Pool from node-postgres
import pg from 'pg';
const { Pool } = pg;

// Create a Connection Pool
const db = new Pool({
  host: 'localhost',
  database: process.env.DB_NAME, // Ensure DB_NAME is defined in your .env file
  port: 5432,                   // Default PostgreSQL port
});

// Connection Function
const connectToDb = async () => {
  try {
    await db.connect();
    console.log('Connected to the database.');
  } catch (err) {
    console.error('Error connecting to database:', err);
    process.exit(1);
  }
};

export { db, connectToDb }; // Export the db instance along with the connectToDb function
