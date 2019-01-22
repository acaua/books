const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    title: "Book title example",
    description: "Book description example",
    ISBN: "9781617293290",
    language: "BR"
  });
});

module.exports = router;
