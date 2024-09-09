const express = require("express");
const book_controller = require("../controllers/bookController.js");
const review_controller = require("../controllers/reviewController.js");

let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();

public_users.post("/register", (req, res) => {
	//Write your code here
	const { username, password } = req.body;

	if (!username || !password) return res.status(404).json({ message: "cannot register! input missing." });
	if (isValid(username)) {
		users.push({ username, password });
		return res.status(200).json({ message: "a new user added!" });
	} else {
		return res.status(201).json({ message: "user name exists!" });
	}
});

// Get the book list available in the shop
public_users.get("/", book_controller.book_list);

// Get book details based on ISBN
public_users.get("/isbn/:isbn", book_controller.book_details_by_isbn);

// Get book details based on author
public_users.get("/author/:author", book_controller.book_details_by_author);

// Get all books based on title
public_users.get("/title/:title", book_controller.book_details_by_title);

//  Get book review
public_users.get("/review/:isbn", review_controller.review_list);

module.exports.general = public_users;
