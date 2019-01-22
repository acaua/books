const mongoose = require("mongoose");

var BookSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  ISBN: { type: String, required: true },
  language: { type: String, required: true }
});

const Book = mongoose.model("Book", BookSchema);

module.exports = Book;
