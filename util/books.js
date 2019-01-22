const formatBook = book => ({
  id: book.id,
  title: book.title,
  description: book.description,
  ISBN: book.ISBN,
  language: book.language
});

module.exports = { formatBook };
