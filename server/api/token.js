import { Router } from 'express'

var router = Router()
var jwt = require("jsonwebtoken");
var config = require("../config.json")[process.env.NODE_ENV || "prod"];

router.post("/token", function(req, res) {
	if (!req.body.username || !req.body.password) {
		res.status(400).json({code: 400, message: "No username or password provided."});
		return;
	}

	let username = req.body.username;
	let password = req.body.password;

	if (config.USERS[username]) {
		if (config.USERS[username].password === password) {
			let payload = {username: username, age: config.USERS[username].age};
			let token = jwt.sign(payload, config.JWT_SECRET);

			res.status(200).json({code: 200, message: "token created", token: "JWT "+token});
		}
		else {
			res.status(401).json({code: 401, message:"Invalid username or password"});
		}
	}
	else {
		res.status(401).json({code: 401, message:"Invalid username or password"});
	}
});

export default router