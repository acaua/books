const express = require("express");
const mongoose = require("mongoose");

const books = require("./routes/books");

const dbstring = `mongodb://dev:dev123@ds147821.mlab.com:47821/books`;

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
