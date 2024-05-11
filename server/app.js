import express from 'express';
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url'; 
import path from 'path'; 
import booksRouter from './routes/books.js';
import apiRouter from './routes/api.js';
import methodOverride from 'method-override';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const viewsPath = path.join(__dirname, '..', 'client', 'views');
const publicPath = path.join(__dirname, '..', 'client', 'public');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));
app.set('views', viewsPath);
app.set('view engine', 'ejs');

app.use(methodOverride('_method'));

app.use('/books', booksRouter);
app.use('/api', apiRouter);

// Serve bookUtils.js using express.static
app.use('/bookUtils.js', express.static(path.join(__dirname, '..', 'Client', 'public', 'bookUtils.js')));

app.get('/', (req,res) => {
  res.render('index.ejs');
});

app.get('/searchPage', (req, res) => {
  res.render('search.ejs');
});

app.get('/library', (req, res) => {
  res.render('library.ejs');
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});