const express = require("express");

const books = require("./routes/books");

const app = express();
app.use("/books", books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server listening on port ${port}`));
