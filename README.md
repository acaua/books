# Books API

API to save books data using **Express** and **mongoose**.
It also includes scrapping for a list of books from <https://kotlinlang.org/docs/books.html> using **axios** and **cheerio**.

# Downloading and running instructions

## Pre-requisites

1.  Node.js: <https://nodejs.org/en/>
2.  Mongodb:<https://www.mongodb.com/> or you can get a free instance on <https://mlab.com/>
3.  (optional, for deployment) Now: <https://zeit.co/now>

## General

1.  Clone repository

```
git clone git@github.com:acaua/books.git
```

2.  cd into repo folder

```
cd books
```

3.  install server dependencies

```
npm install
```

4.  Crete .env file (based on .env.example) and input your mongodb host and credentials

## Run development enviroment

1.  run dev script

```
npm run dev
```

It will be listening at <http://localhost:5000/books>

# Enjoy it! :)

## Endpoints

```
GET /books
```

List all books in the database plus the scraped book data.

```
GET /books/:id
```

Get info for the book with provided :id

```
GET /books/:id
```

Get info for the book with provided :id

```
DELETE /books/:id
```

Delete the book with provided :id

```
POST /books
```

Add a book to the database. The body should be a JSON with the following format:

```
{
    "title": "Book title example",
    "description": "Book description example",
    "ISBN": "9781617293290",
    "language": "BR"
}
```

Example using the default server port:

```
http://localhost:5000/books
```

# Next steps / missing features

- Create tests

- Generalize ISBN scraping
