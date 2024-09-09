const express = require("express");
const jwt = require("jsonwebtoken");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();
app.set("json spaces", 2);

app.use(express.json());

app.use("/customer", session({ secret: "fingerprint_customer", resave: true, saveUninitialized: true }));

app.use("/customer/auth/*", function auth(req, res, next) {
	//Write the authenication mechanism here
	const { accessToken, username } = req.session.authorization;
	if (accessToken) {
		jwt.verify(accessToken, "access", (err, decoded) => {
			if (err) {
				res.status(201).json({ message: "you are not authenticated" });
			}
			req.user = username;
			next();
		});
	} else {
		res.status(201).json({ message: "you are not logged in." });
	}
});

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
