//bookUtils.js//


// Function to search for a book by title and fetch cover image
export const searchBookAndFetchCover = async (title) => {
  try {
    // Step 1: Search for a book by title
    const searchUrl = `https://openlibrary.org/search.json?q=title:${encodeURIComponent(title.replace(/^Title:\s+/i, ''))}`;
    const response = await axios.get(searchUrl, { timeout: 5000 });
    const docs = response.data.docs;

    // Function to extract ISBN from a result
    const extractISBN = (result) => {
      return result.isbn && result.isbn.find((code) => typeof code === 'string');
    };

    // Step 2: Find the first result with a valid ISBN
    const resultWithISBN = docs.find((result) => extractISBN(result));

    if (resultWithISBN) {
      // Extract the ISBN from the result
      const isbn = extractISBN(resultWithISBN);

      // Step 3: Fetch the cover image using the extracted ISBN
      const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`; // Use 'S', 'M', or 'L' for small, medium, or large size

      // Fetch the cover image
      const responseCover = await axios.get(coverImageUrl, { responseType: 'arraybuffer' });
      const base64Image = btoa(String.fromCharCode.apply(null, new Uint8Array(responseCover.data)));

      // Step 4: Display cover image and book title on the homepage
      return {
        coverImage: `data:image/jpeg;base64,${base64Image}`,
        bookTitle: resultWithISBN.title
      };
    } else {
      console.error('No result with valid ISBN found.');
      return null;
    }
  } catch (error) {
    console.error('Error searching book and fetching cover:', error.message);
    console.error('API Response:', error.response ? error.response.data : 'No response data');
    return null;
  }
};
