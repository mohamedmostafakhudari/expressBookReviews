const asyncHandler = require("express-async-handler");
const { getBooks, findBookByISBN, findBooksByProp } = require("../config/database.js");

exports.book_list = asyncHandler(async (req, res, next) => {
	const books = await getBooks();
	res.status(200).json({ books });
});

exports.book_details_by_isbn = asyncHandler(async (req, res, next) => {
	const { isbn } = req.params;
	const book = await findBookByISBN(isbn);

	return res.status(200).json({ ...book });
});

exports.book_details_by_author = asyncHandler(async (req, res, next) => {
	const { author } = req.params;
	const books = await findBooksByProp({ key: "author", value: author });

	return res.status(200).json({ books });
});

exports.book_details_by_title = asyncHandler(async (req, res, next) => {
	const { title } = req.params;
	const books = await findBooksByProp({ key: "title", value: title });

	return res.status(200).json({ books });
});
