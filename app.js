import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; // Import fileURLToPath from the url module
import path from 'path'; // Import the path module
import db from './database.js';
import booksRouter from './routes/books.js';
import apiRouter from './routes/api.js';
import methodOverride from 'method-override';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Use the method-override middleware
app.use(methodOverride('_method'));

// Use the books router for routes related to books
app.use('/books', booksRouter);

// Use the API router for book covers
app.use('/api', apiRouter);

app.get('/bookUtils.js', (req, res) => {
  res.sendFile(path.join(__dirname, 'bookUtils.js'));
});

// Root route, redirect to the books route
app.get('/', (req, res) => {
  res.redirect('/books');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});