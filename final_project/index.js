require("dotenv").config();

const express = require("express");
const authenticationMiddleware = require("./middleware/authentication.js");
const session = require("express-session");
const customer_routes = require("./router/auth_users.js").authenticated;
const genl_routes = require("./router/general.js").general;

const app = express();
app.set("json spaces", 2);

app.use(express.json());

app.use("/customer", session({ secret: process.env.SESSION_SECRET_KEY, resave: true, saveUninitialized: true }));
app.use("/customer/auth/*", authenticationMiddleware);

const PORT = 5000;

app.use("/customer", customer_routes);
app.use("/", genl_routes);

app.listen(PORT, () => console.log("Server is running on port " + PORT));
