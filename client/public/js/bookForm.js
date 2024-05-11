/* This JavaScript code is responsible for updating the cover image, book title, and ISBN for each book
item on a webpage. Here's a breakdown of what the code does: */
//bookForm.js//

import { searchBookAndFetchCover } from './bookUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const updateBookCovers = async () => {
    const bookElements = document.querySelectorAll('.book-item');

    for (const bookElement of bookElements) {
      const titleElement = bookElement.querySelector('.book-title');
      const title = titleElement.textContent.trim();

      console.log('Searching for book with title:', title);

      try {
        const bookCoverDetails = await searchBookAndFetchCover(title);

        if (bookCoverDetails) {
          const { coverImage, bookTitle, isbn } = bookCoverDetails;

          // Update the cover image, book title, and ISBN in the DOM
          const coverElement = bookElement.querySelector('.cover');
          coverElement.src = coverImage;

          const bookTitleElement = bookElement.querySelector('.book-title');
          bookTitleElement.textContent = bookTitle;

          const isbnElement = bookElement.querySelector('.isbn');
          isbnElement.textContent = `ISBN: ${isbn || 'Not available'}`;

          console.log('Updated cover for book:', bookTitle);
        } else {
          console.error('No book cover details found.');
        }
      } catch (error) {
        console.error('Error updating book cover:', error.message);
      }
    }
  };
  updateBookCovers();
});