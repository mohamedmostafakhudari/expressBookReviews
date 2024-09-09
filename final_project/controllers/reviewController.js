const asyncHandler = require("express-async-handler");
const { findBookByISBN } = require("../config/database.js");

exports.review_list = asyncHandler(async (req, res, next) => {
	const { isbn } = req.params;
	const book = await findBookByISBN(isbn);
	res.status(200).json({ ...book.reviews });
});

exports.review_update_put = asyncHandler(async (req, res, next) => {
	const { isbn } = req.params;
	const { review } = req.body;
	const { user: username } = req;

	const book = await findBookByISBN(isbn);
	const reviews = book.reviews;

	reviews[username] = review;

	res.status(200).json({ message: "a new review has been added." });
});

exports.review_delete = asyncHandler(async (req, res, next) => {
	const { isbn } = req.params;
	const { user: username } = req;

	const book = await findBookByISBN(isbn);
	const reviews = book.reviews;

	if (reviews[username]) {
		delete reviews[username];

		res.status(200).json({ message: "your review has been deleted." });
	} else {
		res.status(201).json({ message: "you have no reviews for this book." });
	}
});
