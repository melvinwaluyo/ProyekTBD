// Get all books
const getBooks = 'SELECT * FROM "Book"';

// Get book by id
const getBooksById = 'SELECT * FROM "Book" WHERE "Id" = $1';

// Add book
const addBook = 'INSERT INTO "Book" ("Genre_Id", "Language_Id", "Publisher_Id", "Title", "Isbn", "Num_Pages", "Publication_Date", "Price") VALUES ($1, $2, $3, $4, $5, $6, $7, $8)';

// Check if ISBN already exists
const checkIsbn = 'SELECT b FROM "Book" b WHERE b."Isbn" = $1';

// Remove book
const removeBook = 'DELETE FROM "Book" Where "Id" = $1';

// Update book price
const updateBookPrice = 'UPDATE "Book" SET "Price" = $1 WHERE "Id" = $2';

// Search books by keywords
const searchBooksByKeywords = `SELECT * FROM "Book" WHERE "Title" ILIKE '%' || $1 || '%' ORDER BY "Id" ASC`;

// Get order by customer id
const getOrder = 'SELECT * FROM "Order" WHERE "Customer_Id" = $1';

// Add order
const addOrder = 'INSERT INTO "Order" ("Inventory_Id", "Customer_Id", "Date") VALUES ($1, $2, $3)';

// Remove order
const removeOrder = 'DELETE FROM "Order" WHERE "Id" = $1';

// Check if Order exists
const checkOrder = 'SELECT * FROM "Order" WHERE "Id" = $1';

module.exports = {
    getBooks,
    getBooksById,
    addBook,
    checkIsbn,
    removeBook,
    updateBookPrice,
    searchBooksByKeywords,
    getOrder,
    addOrder,
    removeOrder,
    checkOrder,
};