const express = require("express");
const Book = require("../models/Book");
const { formatBook } = require("../util/books");
const scrapBooks = require("../scraping/books");

const router = express.Router();

router.get("/", (req, res) => {
  Promise.all([Book.find(), scrapBooks()])
    .then(([dbBooksResult, scrapedBooks]) => {
      const dbBooks = dbBooksResult.map(book => formatBook(book));
      const books = [...dbBooks, ...scrapedBooks];

      res.json({
        numberBooks: books.length,
        books
      });
    })
    .catch(err => res.status(500).send(err));
});

router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book)
        return res
          .status(404)
          .send(`Cannot find book with id ${req.params.id}`);

      return res.json(formatBook(book));
    })
    .catch(err => res.status(500).send(err));
});

router.delete("/:id", (req, res) => {
  Book.findByIdAndDelete(req.params.id)
    .then(book => {
      if (!book)
        return res
          .status(404)
          .send(`Cannot find book with id ${req.params.id}`);

      return res.send(`Deleted book with id ${req.params.id}`);
    })
    .catch(err => res.status(500).send(err));
});

router.post("/", (req, res) => {
  let book = new Book({
    title: req.body.title,
    description: req.body.description,
    ISBN: req.body.ISBN,
    language: req.body.language
  });

  book.save(err => {
    if (err) return res.status(500).send(err);

    res.send("Product Created successfully");
  });
});

module.exports = router;
