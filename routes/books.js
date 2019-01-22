const express = require("express");
const Book = require("../models/Book");

const router = express.Router();

const formatBook = book => ({
  id: book.id,
  title: book.title,
  description: book.description,
  ISBN: book.ISBN,
  language: book.language
});

router.get("/", (req, res) => {
  Book.find().then(result => {
    const books = result.map(book => formatBook(book));
    res.json(books);
  });
});

router.get("/:id", (req, res) => {
  Book.findById(req.params.id)
    .then(book => {
      if (!book) {
        return res
          .status(404)
          .send(`Cannot find book with id ${req.params.id}`);
      }

      return res.json(formatBook(book));
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
