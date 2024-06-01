const { Router } = require("express");
const controller = require("./controller");

const router = Router();

// GET Method (Read)
router.get("/books", controller.getBooks);
router.get("/books/:id", controller.getBooksById);
router.get("/book-search", controller.searchBooksByKeywords);
router.get("/orders/:custId", controller.getOrder);

// POST Method (Create)
router.post("/books", controller.addBook);
router.post("/orders", controller.addOrder);
router.post("/books/addmultiplebooks", controller.addMultipleBooks);
router.post("/orders/addmultipleorders", controller.addMultipleOrders);

// PUT Method (Update)
router.put("/books/:id", controller.updateBookPrice);

// DELETE Method (Delete)
router.delete("/books/:id", controller.removeBook);
router.delete("/orders/:id", controller.removeOrder);

module.exports = router;