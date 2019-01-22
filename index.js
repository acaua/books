const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const books = require("./routes/books");

const dbstring = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
  process.env.DB_HOST
}`;

const app = express();
app.use(express.json());
app.use("/books", books);

const port = process.env.PORT || 5000;

mongoose.connect(dbstring).then(
  () => {
    app.listen(port, () => console.log(`Server listening on port ${port}`));
  },
  err => {
    console.error("Cannot connect to db", err);
  }
);
