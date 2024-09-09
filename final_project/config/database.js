const books = require("../booksdb.js");
const { delay, slugify } = require("../utils/helpers.js");

async function getBooks() {
	await delay(500);
	return books;
}
async function findBookByISBN(isbn) {
	await delay(500);
	return books[isbn];
}
async function findBooksByProp({ key, value }) {
	await delay(500);

	const filteredBooks = Object.entries(books).reduce((acc, [isbn, bookDetails]) => {
		const currBook = books[isbn];
		if (slugify(currBook[key]) === slugify(value)) {
			acc[isbn] = currBook;
		}
		return acc;
	}, {});
	return filteredBooks;
}

module.exports = {
	getBooks,
	findBookByISBN,
	findBooksByProp,
};
