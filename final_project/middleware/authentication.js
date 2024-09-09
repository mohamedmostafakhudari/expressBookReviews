const jwt = require("jsonwebtoken");

const authenticationMiddleware = (req, res, next) => {
	//Write the authentication mechanism here
	const { accessToken, username } = req.session.authorization;
	if (accessToken) {
		jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
			if (err) {
				res.status(201).json({ message: "you are not authenticated" });
			}
			req.user = username;
			next();
		});
	} else {
		res.status(201).json({ message: "you are not logged in." });
	}
};

module.exports = authenticationMiddleware;
