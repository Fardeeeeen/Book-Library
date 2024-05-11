import express from 'express';
import Book from '../database.js';
import axios from 'axios';
import { searchBookAndFetchCover } from '../../client/public/js/bookUtils.js';

const router = express.Router();

// Middleware to parse the form data
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

router.get('/', async (req, res) => {
  try {
    const books = await Book.findAll({ order: [['id', 'ASC']] });

    // Iterate through books and fetch cover image URLs
    for (const book of books) {
      const bookDetails = await searchBookAndFetchCover(book.title);

      if (bookDetails) {
        book.coverImage = bookDetails.coverImage;
        book.title = bookDetails.bookTitle;
      }
    }

    res.render('yourBooks', { listTitle: 'Your Books', listItems: books });
  } catch (error) {
    console.error('Error fetching books:', error.message);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.get('/search', async (req, res) => {
  let title = req.query.title;

  // Remove "Title: " prefix
  title = title.replace(/^Title:\s+/i, '');

  try {
    // Call the function to search for the book and fetch ISBN and cover image
    const bookDetails = await searchBookAndFetchCover(title);

    if (bookDetails) {
      res.json(bookDetails);
    } else {
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
    const book = await Book.findByPk(bookId);
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
    const book = await Book.findByPk(bookId);

    if (book) {
      const isbn = book.isbn;

      res.render('notes', { book, isbn }); // Pass isbn to the view
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
    const notes = await Book.findAll({ attributes: ['title', 'notes'], order: [['id', 'ASC']] });
    res.render('notebook', { notes });
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

router.post('/searchPage', async (req, res) => {
  let title = req.body.title;
  try {
    const response = await axios.get(`https://openlibrary.org/search.json?q=${encodeURIComponent(title)}`);
    const data = response.data;
    res.json({ data });
  } catch (error) {
    console.error('Error searching for books:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/notes/:bookId', async (req, res) => {
  const bookId = req.body.bookId;
  const { summary, notes } = req.body;

  if (!bookId) {
    return res.status(400).render('error', { message: 'Invalid request. Missing bookId.' });
  }

  try {
    await Book.update({ summary, notes }, { where: { id: bookId } });
    res.redirect(`/books/notes/${bookId}`);
  } catch (error) {
    console.error(error);
    res.status(500).render('error', { message: 'Internal Server Error' });
  }
});

export default router;