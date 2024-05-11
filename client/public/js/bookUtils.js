export const searchBookAndFetchCover = async (title) => {
  try {
    const searchUrl = `https://openlibrary.org/search.json?q=title:${encodeURIComponent(title.replace(/^Title:\s+/i, ''))}`;
    const response = await fetch(searchUrl, { method: 'GET', timeout: 5000 });

    if (!response.ok) {
      throw new Error('Failed to fetch book data');
    }

    const data = await response.json();
    const docs = data.docs;

    const extractISBN = (result) => {
      return result.isbn && result.isbn.find((code) => typeof code === 'string');
    };

    const resultWithISBN = docs.find((result) => extractISBN(result));

    if (resultWithISBN) {
      const isbn = extractISBN(resultWithISBN);

      const coverImageUrl = `https://covers.openlibrary.org/b/isbn/${isbn}-M.jpg`;
      const responseCover = await fetch(coverImageUrl);
      const blob = await responseCover.blob();
      const base64Image = await convertBlobToBase64(blob);

      return {
        coverImage: `data:image/jpeg;base64,${base64Image}`,
        bookTitle: resultWithISBN.title,
        isbn: isbn
      };
    } else {
      console.error('No result with valid ISBN found.');
      return null;
    }
  } catch (error) {
    console.error('Error searching book and fetching cover:', error.message);
    return null;
  }
};

const convertBlobToBase64 = (blob) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64data = reader.result.split(',')[1];
      resolve(base64data);
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsDataURL(blob);
  });
};