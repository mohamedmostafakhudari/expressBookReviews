const express = require("express");
const jwt = require("jsonwebtoken");
const regd_users = express.Router();
const review_controller = require("../controllers/reviewController.js");

let users = [];

const isValid = (username) => {
	//returns boolean
	//write code to check is the username is valid

	return users.every((user) => user.username != username);
};

const authenticatedUser = (username, password) => {
	//returns boolean
	//write code to check if username and password match the one we have in records.
	return users.some((user) => user.username === username && user.password === password);
};
//only registered users can login
regd_users.post("/login", (req, res) => {
	//Write your code here
	const { username, password } = req.body;
	if (!username || !password) return res.status(404).json({ message: "cannot log in!" });

	if (req.session.authorization) return res.status(201).json({ message: "you are already logged in." });

	if (authenticatedUser(username, password)) {
		const accessToken = jwt.sign({ password }, process.env.JWT_SECRET_KEY, { expiresIn: 60 * 60 });
		req.session.authorization = { accessToken, username };
		res.status(200).json({ message: `user ${username} has logged in successfully - ${Date.now()}` });
	} else {
		res.status(201).json({ message: "not registered user" });
	}
});

// logging out
regd_users.post("/auth/logout", (req, res) => {
	req.session.destroy();
	res.status(200).json({ message: "user logged out successfully - " + Date.now() });
});

// Add a book review
regd_users.put("/auth/review/:isbn", review_controller.review_update_put);

// Delete a book review
regd_users.delete("/auth/review/:isbn", review_controller.review_delete);

module.exports.authenticated = regd_users;
module.exports.isValid = isValid;
module.exports.users = users;
