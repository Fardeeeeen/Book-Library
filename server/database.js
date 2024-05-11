import dotenv from "dotenv";
import Sequelize from 'sequelize';

dotenv.config();

let sequelize;

if (process.env.DB_URL) {
  sequelize = new Sequelize(process.env.DB_URL, {
    dialect: 'postgres',
    ssl: true,
  });
} else {
  console.error("DB_URL is not available. Please check your environment configuration.");
  process.exit(1); // Exit the application if DB_URL is not available
}

// Define the Book model
const Book = sequelize.define('book', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  title: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  author: {
    type: Sequelize.STRING(255),
    allowNull: false
  },
  rating: {
    type: Sequelize.INTEGER,
    allowNull: true
  },
  summary: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  notes: {
    type: Sequelize.TEXT,
    allowNull: true
  },
  isbn: {
    type: Sequelize.STRING(255),
    allowNull: true
  }
});

// Sync the Sequelize model with the database
sequelize.sync()
  .then(() => {
    console.log('Database synchronized successfully');
  })
  .catch(error => {
    console.error('Error synchronizing database:', error);
  });

export default Book;