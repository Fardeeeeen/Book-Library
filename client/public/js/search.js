document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('searchForm').addEventListener('submit', async (event) => {
    event.preventDefault(); 
    const searchInput = document.getElementById('searchInput').value.trim();
    try {
      const response = await axios.post('books/searchPage', { title: searchInput });
      const searchData = response.data;
      renderSearchResults(searchData);
    } catch (error) {
      renderSearchResults(null);
    }
  });
});

// Function to render search results
const renderSearchResults = (searchData) => {
  const searchResultsDiv = document.getElementById('searchResults');
  searchResultsDiv.innerHTML = '';

  if (searchData && searchData.data && searchData.data.docs && Array.isArray(searchData.data.docs)) {
    searchData.data.docs.forEach((book) => {
      const bookTitle = book.title || 'Unknown Title';
      const author = book.author_name ? book.author_name.join(', ') : 'Unknown Author';
      const isbn = book.isbn ? book.isbn[0] : 'ISBN not available';
      const publishDate = book.publish_date ? book.publish_date[0] : 'Publish date not available';
      const resultItem = document.createElement('div');
      resultItem.classList.add('search-result');
      resultItem.innerHTML = `
        <h3>${bookTitle}</h3>
        <p>Author(s): ${author}</p>
        <p>ISBN: ${isbn}</p>
        <p>Publish Date: ${publishDate}</p>
        <hr>
      `;
      searchResultsDiv.appendChild(resultItem);
    });
    searchResultsDiv.style.display = 'block';
  } else {
    searchResultsDiv.innerHTML = '<p>No results found</p>';
    searchResultsDiv.style.display = 'none';
  }
};