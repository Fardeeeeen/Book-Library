import express from 'express';
import db from '../database.js';
import { searchBookAndFetchCover } from '../bookUtils.js';

const router = express.Router();

// Middleware to parse the form data
router.use(express.urlencoded({ extended: true }));

router.get('/', async (req, res) => {
  try {
    const result = await db.query('SELECT * FROM books ORDER BY id ASC');
    const books = result.rows;

    // Iterate through books and fetch cover image URLs
    for (const book of books) {
      const bookDetails = await searchBookAndFetchCover(book.title);

      if (bookDetails) {
        book.coverImage = bookDetails.coverImage; // Add cover image to each book
        book.title = bookDetails.bookTitle; // Add book title to each book
      }
    }

    res.render('index', { listTitle: 'Book Library', listItems: books });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  let title = req.query.title;

  // Remove "Title: " prefix
  title = title.replace(/^Title:\s+/i, '');
  console.log('Received title:', title);

  try {
    // Call the function to search for the book and fetch ISBN and cover image
    const bookDetails = await searchBookAndFetchCover(title);

    if (bookDetails) {
      console.log('Sending response:', bookDetails);
      res.json(bookDetails);
    } else {
      console.log('Book not found');
      res.status(404).json({ error: 'Book not found' });
    }
  } catch (error) {
    console.error('Error searching book:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/add', (req, res) => {
  res.render('book-form', { formTitle: 'Add', formAction: '/books', book: {} });
});

router.get('/edit/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    const book = result.rows[0];
    if (book) {
      res.render('book-form', { formTitle: 'Edit', formAction: `/books/edit/${bookId}`, book });
    } else {
      res.status(404).render('error', { message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/notes/:id', async (req, res) => {
  const bookId = req.params.id;

  try {
    const result = await db.query('SELECT * FROM books WHERE id = $1', [bookId]);
    const book = result.rows[0];

    if (book) {
      const isbn = book.isbn;
      const coverImageUrl = `/api/book-covers/isbn/${isbn}`;

      res.render('notes', { book, coverImageUrl });
    } else {
      res.status(404).render('error', { message: 'Book not found' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/notebook', async (req, res) => {
  try {
    // Retrieve notes from the books table
    const result = await db.query(`SELECT title, notes FROM books ORDER BY id ASC`);

    const notes = result.rows;

    // Render the 'notebook' view with the notes data
    res.render('notebook', { notes });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.post('/edit/:id', async (req, res) => {
  const bookId = req.params.id;
  const { title, author, rating, isbn } = req.body;
  try {
    await db.query('UPDATE books SET title = $1, author = $2, rating = $3, isbn = $4 WHERE id = $5', [title, author, rating, isbn, bookId]);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});


router.post('/delete/:id', async (req, res) => {
  const bookId = req.params.id;
  try {
    await db.query('DELETE FROM books WHERE id = $1', [bookId]);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.post('/', async (req, res) => {
  const { title, author, rating, isbn } = req.body;
  try {
    await db.query('INSERT INTO books (title, author, rating, isbn) VALUES ($1, $2, $3, $4)', [title, author, rating, isbn]);
    res.redirect('/books');
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.post('/notes/:bookId', async (req, res) => {
  const bookId = req.body.bookId;
  const { summary, notes } = req.body;

  if (!bookId) {
    return res.status(400).render('error', { message: 'Invalid request. Missing bookId.' });
  }

  try {
    const result = await db.query('UPDATE books SET summary = $1, notes = $2 WHERE id = $3', [summary, notes, bookId]);
    res.redirect(`/books/notes/${bookId}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

export default router;