# Book Library Web App

A web application to manage your book library, integrating with the Open Library Covers API and persisting data in a PostgreSQL database.

## Project Overview

- **Database:** PostgreSQL
- **Server-Side:** Node.js with Express.js
- **Frontend:** HTML, CSS, EJS templating
- **API Integration:** Open Library Covers API

## Project Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/Fardeeeeen/book-library.git
   cd book-library

Install dependencies:
npm install

Database Setup:
Install PostgreSQL on your machine.
Create a database and update the connection details in database.js.

Run the application:
npm start
Visit <http://localhost:3000> in your browser.

Project Structure

- /book-library
  - /public
    - style.css
  - /views
    - index.ejs
    - add.ejs
  - /routes
    - books.js
    - api.js
  - app.js
  - package.json
  - database.js
  - README.md

Routes
Home Page: <http://localhost:3000>

Displays the list of books from the database.
Provides a link to add a new book.
Add a Book Page: <http://localhost:3000/books/add>

Form to add a new book to the database.
API Endpoint: <http://localhost:3000/api/books>

Retrieves book covers from the Open Library Covers API.
Database Schema
Table: books
Columns: id, title, author, rating
Error Handling
Server-side errors are logged to the console.
An error handling middleware is included in app.js to handle unexpected errors.
Code Structure
Modular Approach:
app.js - Express app setup.
routes/books.js - Routes for book-related operations.
routes/api.js - Routes for API interactions.
database.js - Database setup.
views/ - EJS templates.
Contributing
If you'd like to contribute, please fork the repository and create a pull request. Feel free to open issues for any suggestions or bug reports.

License
This project is licensed under the MIT License - see the LICENSE file for details.
