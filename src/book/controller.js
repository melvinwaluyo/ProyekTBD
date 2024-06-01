const pool = require("../../db");
const queries = require("./queries");

// Get all books
const getBooks = (req, res) => {
    pool.query(queries.getBooks, (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Get book by id
const getBooksById = (req, res) => {
    const id = parseInt(req.params.id);
    pool.query(queries.getBooksById, [id], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};

// Add book
const addBook = (req, res) => {
    const { Genre_Id, Language_Id, Publisher_Id, Title, Isbn, Num_Pages, Publication_Date, Price } = req.body;

    // Check if ISBN already exists
    pool.query(queries.checkIsbn, [Isbn], (error, results) => {
        if (results.rows.length) {
            res.send("ISBN already exists");
        }

        // Add book to db
        pool.query(queries.addBook, [Genre_Id, Language_Id, Publisher_Id, Title, Isbn, Num_Pages, Publication_Date, Price], (error, results) => {
            if (error) throw error;
            res.status(201).send("Book added successfully");
        });
    });
};

// Remove book
const removeBook = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if book exists
    pool.query(queries.getBooksById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Book does not exist in the database");
        }

        // Remove book from db
        pool.query(queries.removeBook, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book deleted with ID: ${id}`);
        });
    });
};


// Update book price
const updateBookPrice = (req, res) => {
    const id = parseInt(req.params.id);
    const { Price } = req.body;

    // Check if book exists
    pool.query(queries.getBooksById, [id], (error, results) => {
        const noBookFound = !results.rows.length;
        if (noBookFound) {
            res.send("Book does not exist in the database");
        }

        // Update book price
        pool.query(queries.updateBookPrice, [Price, id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Book price updated with ID: ${id}`);
        });
    });         
};


// Search books by keywords
const searchBooksByKeywords = (req, res) => {
    const { keywords } = req.query;
    
    // Check if keywords are valid
    if (!keywords || typeof keywords !== "string") {
        return res.status(400).json({ error: "Invalid input" });
    }

    pool.query(queries.searchBooksByKeywords, [keywords], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });
};


// Get order by customer id
const getOrder = (req, res) => {
    const custId = parseInt(req.params.custId);

    pool.query(queries.getOrder, [custId], (error, results) => {
        if (error) throw error;
        res.status(200).json(results.rows);
    });

};


// Add order
const addOrder = (req, res) => {
    const { Inventory_Id, Customer_Id, Date } = req.body;

    pool.query(queries.addOrder, [Inventory_Id, Customer_Id, Date], (error, results) => {
        if (error) throw error;
        res.status(201).send("Order added successfully");
    });
};


// Remove order
const removeOrder = (req, res) => {
    const id = parseInt(req.params.id);

    // Check if order exists
    pool.query(queries.checkOrder, [id], (error, results) => {
        const noOrderFound = !results.rows.length;
        if (noOrderFound) {
            res.send("Order does not exist in the database");
        }
    
        // Remove order from db
        pool.query(queries.removeOrder, [id], (error, results) => {
            if (error) throw error;
            res.status(200).send(`Order deleted with ID: ${id}`);
        });
    });
};

// Add Multiple Books with Transaction
const addMultipleBooks = (req, res) => {
    const { books } = req.body; // Array of book objects
  
    pool.connect((err, client, done) => {
      if (err) throw err;
  
      const handleError = (err) => {
        done();
        console.error(err);
        res.status(500).send("An error occurred");
      };
  
      // Start transaction
      client.query("BEGIN", (err) => {
        if (err) return handleError(err);
  
        const addBookPromises = books.map((book) => {
          const {Genre_Id, Language_Id, Publisher_Id, Title, Isbn, Num_Pages, Publication_Date, Price,} = book;
  
          return client.query(queries.addBook, [Genre_Id, Language_Id, Publisher_Id, Title, Isbn, Num_Pages, Publication_Date, Price]);
        });
  
        Promise.all(addBookPromises)
          .then(() => {
            // Commit transaction
            client.query("COMMIT", (err) => {
              if (err) return handleError(err);
              done();
              res.status(201).send("Books added successfully!");
            });
          })
          .catch((err) => {
            // Rollback transaction
            client.query("ROLLBACK", (rollbackErr) => {
              if (rollbackErr) return handleError(rollbackErr);
              handleError(err);
            });
          });
      });
    });
};

// Add Multiple Orders with Transaction
const addMultipleOrders = (req, res) => {
    const { orders } = req.body; // Array of order objects

    pool.connect((err, client, done) => {
        if (err) throw err;

        const handleError = (err) => {
            done();
            console.error(err);
            res.status(500).send("An error occurred");
        };

        // Start transaction
        client.query("BEGIN", (err) => {
            if (err) return handleError(err);

            const addOrderPromises = orders.map((order) => {
                const { Inventory_Id, Customer_Id, Date } = order;

                return client.query(queries.addOrder, [Inventory_Id, Customer_Id, Date]);
            });

            Promise.all(addOrderPromises)
                .then(() => {
                    // Commit transaction
                    client.query("COMMIT", (err) => {
                        if (err) return handleError(err);
                        done();
                        res.status(201).send("Orders added successfully!");
                    });
                })
                .catch((err) => {
                    // Rollback transaction
                    client.query("ROLLBACK", (rollbackErr) => {
                        if (rollbackErr) return handleError(rollbackErr);
                        handleError(err);
                    });
                });
        });
    });
}; 

module.exports = {
    getBooks,
    getBooksById,
    addBook,
    removeBook,
    updateBookPrice,
    searchBooksByKeywords,
    getOrder,
    addOrder,
    removeOrder,
    addMultipleBooks,
    addMultipleOrders,
};