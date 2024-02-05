//bookForm.js//

// Import the searchBookAndFetchCover function from bookUtils.js
import { searchBookAndFetchCover } from '../../bookUtils.js';

document.addEventListener('DOMContentLoaded', () => {
  const updateBookCovers = async () => {
    console.log('Updating book covers...');
    const bookElements = document.querySelectorAll('.book-item');

    bookElements.forEach(async (bookElement) => {
      const titleElement = bookElement.querySelector('.book-title');
      const title = titleElement.textContent.trim();

      console.log('Searching for book with title:', title);

      try {
        // Call the updated function to search for the book and fetch the cover
        const bookCoverDetails = await searchBookAndFetchCover(title);

        if (bookCoverDetails) {
          const { coverImage, bookTitle, isbn } = bookCoverDetails;

          // Update the cover image, book title, and ISBN in the DOM
          const coverElement = bookElement.querySelector('.cover');
          coverElement.src = coverImage;

          const bookTitleElement = bookElement.querySelector('.book-title');
          bookTitleElement.textContent = bookTitle;

          const isbnElement = bookElement.querySelector('.isbn'); // Add this line
          isbnElement.textContent = `ISBN: ${isbn || 'Not available'}`; // Add this line

          console.log('Updated cover for book:', bookTitle);
        } else {
          console.error('No book cover details found.');
          // Handle the case where book cover details are not available
        }
      } catch (error) {
        console.error('Error updating book cover:', error.message);
        // Handle errors as needed
      }
    });
  };

  // Trigger the update when the page loads
  updateBookCovers();
});