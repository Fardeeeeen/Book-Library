## 📚 Book Library

 The Book Library is a web application designed to help users manage their book collections effectively. It allows users to view, add, edit, and delete books from their library. Users can also add notes, summaries, and ratings for each book, enhancing their reading experience and organization. The application integrates with the Open Library Covers API to fetch book covers and provides a seamless experience for users to interact with their library.

### 🛠️ Tech Stack
- **Server-Side**: Node.js with Express.js
- **Database**: PostgreSQL
- **Frontend**: HTML, CSS, EJS templating
- **API Integration**: Open Library Covers API

### ✨ Features
- **Add Books**: Users can add books they've read by providing the title, author name, and rating. Upon submission, the book information is saved, and the cover image is automatically generated using the provided information, including the ISBN code.
- **Notes and Summary**: Users can add notes and a summary for each book, allowing them to personalize their reading experience.
- **View Notes**: A separate page is dedicated to displaying notes for each book, providing users with a convenient way to review their thoughts and insights.
- **Search Books**: Users can search for books using the integrated search feature, which fetches details of the searched book from the Open Library API.
- **Genre Library**: The library page categorizes books by genre, and users can explore each genre by clicking on it, leading them to an external website with books of the selected genre.

### 🔄 Process
The project follows a modular approach with Node.js and Express.js for the server-side functionality. PostgreSQL is used as the database to store book information. The integration with the Open Library Covers API allows fetching cover images for books. The frontend is built using HTML, CSS, and EJS templating to render dynamic content. The cover image generation process involves searching for the book and fetching the cover image using the ISBN code obtained from the search results. Continuous testing and debugging were conducted throughout the development process to ensure the application's functionality and stability :-

<strong>Detailed Process of Searching and Fetching Book Cover Image </strong>

The process of searching for a book and fetching its cover image involves multiple steps, including querying the Open Library API, extracting relevant data, and updating the DOM with the fetched information. Here's a breakdown of how this functionality is achieved:

#### 1. Search for Book Details
- When a user submits a search query for a book, the application sends a request to the Open Library API to search for books matching the provided title.
- The search URL is constructed by appending the search query to the Open Library API endpoint: `https://openlibrary.org/search.json?q=title:{title}`.
- The search request is made using the `fetch` API in JavaScript, with the method set to `GET`.

#### 2. Extract ISBN and Other Book Details
- Upon receiving a response from the Open Library API, the application parses the JSON data to extract the list of book documents (`docs`).
- The application then iterates through the list of book documents to find a document that contains a valid ISBN code.
- The ISBN code is extracted from the book document using a helper function (`extractISBN`).
- If a book document with a valid ISBN code is found, the ISBN code is stored for later use.

#### 3. Fetch Book Cover Image
- With the ISBN code obtained from the search results, the application constructs a URL to fetch the book cover image from the Open Library Covers API.
- The cover image URL is constructed by appending the ISBN code to the Open Library Covers API endpoint: `https://covers.openlibrary.org/b/isbn/{isbn}-M.jpg`.
- A request is made to fetch the cover image using the `fetch` API, with the method set to `GET`.
- The fetched cover image is converted into a Blob object, which is then converted into a base64-encoded string using a helper function (`convertBlobToBase64`).

#### 4. Update DOM with Book Details
- After successfully fetching the book cover image and other details, the application updates the DOM elements to display the fetched information.
- Each book item in the DOM contains elements such as the book cover image, title, author, and ISBN.
- The cover image element (`<img>`) is updated with the fetched cover image URL.
- The book title and ISBN elements are updated with the corresponding information obtained from the search results.
- Any errors encountered during the process are logged to the console for debugging purposes.

#### 5. Integration with Search Page
- The search functionality is integrated into the search page, allowing users to input a search query and submit it.
- Upon receiving a response from the Open Library API, the application renders the search results on the page, displaying book titles, authors, ISBNs, and publication dates.
- If no results are found for the search query, a message indicating no results found is displayed to the user.

This detailed process outlines how the application searches for books, fetches their cover images, and updates the DOM with the retrieved information, providing users with a seamless experience when interacting with the Book Library application.

### 📖 Learnings
- Enhanced understanding of server-side development with Node.js and Express.js.
- Improved proficiency in SQL database management using PostgreSQL.
- Practiced implementing CRUD operations (Create, Read, Update, Delete) in a web application.
-  Learned to integrate and utilize third-party APIs for fetching external data.
- The process of integrating and handling APIs in the Book Library application involved several key learning points and implementation strategies. Here's a deeper insight into how various APIs were utilized and managed within the project:

#### 1. Understanding API Usage
- **Open Library API**: Utilized for searching and retrieving book details based on user input. The API provides extensive documentation on its endpoints and parameters, allowing developers to query for specific information such as book titles, authors, and ISBN codes.

#### 2. Combining Multiple APIs
- **Search and Fetch Book Details**: The application combines the Open Library API for searching book titles with the Open Library Covers API for fetching book cover images. By integrating these APIs, users can input a book title, and the application automatically retrieves relevant book details along with the corresponding cover image.

#### 3. Handling API Responses
- **Error Handling**: Implemented robust error handling mechanisms to manage API responses effectively. Error messages and status codes are checked to ensure that the application gracefully handles scenarios such as network errors, invalid requests, or missing data.
- **Timeout Handling**: Implemented timeout mechanisms to prevent long-running API requests from impacting the user experience. If an API request exceeds a specified timeout period, the application gracefully handles the timeout and provides appropriate feedback to the user.

#### 4. Asynchronous Operations
- **Async/Await**: Leveraged async/await syntax in JavaScript to perform asynchronous API requests. This allowed the application to execute multiple API calls concurrently without blocking the main thread, ensuring smooth user interactions and responsiveness.

#### 5. Data Parsing and Manipulation
- **JSON Data Parsing**: Utilized JSON parsing techniques to extract relevant information from API responses. Upon receiving data from the Open Library API, the application parses the JSON response to extract book details such as titles, authors, and ISBN codes.
- **Blob and Base64 Conversion**: Employed Blob and base64 conversion techniques to handle and process cover images fetched from the Open Library Covers API. The fetched cover images are converted into Blob objects and subsequently encoded as base64 strings for display within the application.

#### 6. Testing and Debugging
- **Debugging API Requests**: Implemented logging mechanisms to debug API requests and responses. This facilitated the identification of errors or issues related to API integration, allowing for quick diagnosis and resolution.
- **Testing API Endpoints**: Conducted thorough testing of API endpoints to ensure that they return the expected data and handle various edge cases effectively. Unit tests and integration tests were performed to validate the functionality of API integration components.


### 🚀 Improvement
- Implement user authentication to secure user data and restrict access to certain features.
- Enhance search functionality with advanced filtering options and improved search algorithms.
- Integrate additional APIs to provide more comprehensive book information and recommendations.
- Improve the UI/UX design for a more visually appealing and user-friendly experience.

### 🏃‍♂️ Running the Project
1. Clone the repository:
    ```bash
    git clone https://github.com/Fardeeeeen/Book-Library.git
    cd book-library
    ```
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up a PostgreSQL database and update the `.env` file with the database connection details.
4. Start the server:
    ```bash
    npm start
    ```
5. Access the application in your web browser at `http://localhost:3000`.

### 🚀 Deployment Instructions
To deploy the application:
1. Set up a hosting provider (e.g., Heroku, Vercel).
2. Configure environment variables for the production environment.
3. Deploy the application using the hosting provider's deployment instructions.

### 🤝 Contributing Guidelines
1. Fork the repository.
2. Create a new branch for your feature or bug fix.
3. Make your changes and commit them with descriptive messages.
4. Push your changes to your fork.
5. Submit a pull request to the main repository's `main` branch.

### 📝 Dependencies
- axios: ^1.6.7
- body-parser: ^1.20.2
- dotenv: ^16.4.5
- ejs: ^3.1.9
- express: ^4.18.2
- method-override: ^3.0.0
- node-fetch: ^3.3.2
- pg: ^8.11.3
 
## Video or Image 📹🖼️
Images:
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%201.png" alt = "pages" />
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%202.png" alt = "pages" />
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%203.png" alt = "pages" />
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%204.png" alt = "pages" />
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%205.png" alt = "pages" />
<img src = "https://github.com/Fardeeeeen/Book-Library/blob/main/lib%207.png" alt = "pages" />

### 📧 Contact Information
For any inquiries or support, please contact [Fardeen Zubair](mailto:fardeenzubair@gmail.com).
