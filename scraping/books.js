const axios = require("axios");
const cheerio = require("cheerio");

const scrapISBN = require("./isbn");

const booksUrl = "https://kotlinlang.org/docs/books.html";

const scrapBooks = async () => {
  const bookData = await scrapBooksData();

  const bookDataWithISBN = await Promise.all(
    bookData.map(async book => {
      return {
        id: book.id,
        title: book.title,
        description: book.description,
        ISBN: await scrapISBN(book.url),
        language: book.language
      };
    })
  );

  return bookDataWithISBN;
};

const scrapBooksData = async () => {
  const response = await axios.get(booksUrl);

  if (response.status !== 200) return [];

  const html = response.data;
  const $ = cheerio.load(html);

  const bookData = [];
  let currentBook;

  $("article")
    .children()
    .each((i, elem) => {
      if ($(elem).is("h2")) {
        if (currentBook) bookData.push(currentBook);
        currentBook = {
          title: $(elem).text(),
          id: i.toString().padStart(24, "0")
        };
      } else if ($(elem).is("p")) {
        const text = $(elem)
          .text()
          .trim()
          .replace(/\s\s+/g, " ");
        if (currentBook.description) {
          currentBook.description = `${currentBook.description}\n${text}`;
        } else {
          currentBook.description = text;
        }
      } else if ($(elem).is(".book-lang")) {
        currentBook.language = $(elem).text();
      } else if ($(elem).is("a")) {
        currentBook.url = $(elem).attr("href");
      }
    });
  bookData.push(currentBook);

  return bookData;
};

module.exports = scrapBooks;
