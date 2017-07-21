var passport = require('passport');
var jwt = require('jsonwebtoken');
var passportJWT = require("passport-jwt");
var config = require('../config.json')[process.env.NODE_ENV || 'production'];

var passportConfig = function() {};

var ExtractJwt = passportJWT.ExtractJwt;
var JwtStrategy = passportJWT.Strategy;

var jwtOptions = {
	jwtFromRequest: ExtractJwt.fromAuthHeader(),
	secretOrKey: config.JWT_SECRET,
	passReqToCallback: true
};

passportConfig.prototype.strategy = new JwtStrategy(jwtOptions, function(req, jwt_payload, next) {
	if (config.USERS[jwt_payload.username]) {
		req.decodedToken = jwt_payload;
		next(null, true);
	}
	else {
		res.status(400).json({code: 400, message: "invalid token"});
	}
});


module.exports = new passportConfig();