import Nuxt from 'nuxt'
import express from 'express'
import api from './api'
import tokenApi from './api/token.js'
import fs from 'fs'
import https from 'https'
import opn from 'opn'

var bodyParser = require('body-parser')
var app = express();
var host = process.env.HOST || 'localhost';
var port = 3001;
var serverConfig = require('./config.json')[process.env.NODE_ENV || 'development'];
var passport = require("passport");
var passportConfig = require("./passport_config");
var pkey = fs.readFileSync(serverConfig.HTTPS_KEY);
var pcert = fs.readFileSync(serverConfig.HTTPS_CERT);
var httpsOptions = {
    key: pkey,
    cert: pcert
};

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('port', port);

passport.use(passportConfig.strategy);
app.use(passport.initialize());

// Import API Routes
app.use('/api/v1', passport.authenticate("jwt", {session: false, failureRedirect: "/401"}), api);
app.use('/api', tokenApi);
app.get("/401", function(req, res) {
	res.status(401).json({code: 401, message: "Unauthorized"});
});

var server = https.createServer(httpsOptions, app);

// Start nuxt.js
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
// Instanciate nuxt.js
const nuxt = new Nuxt(config)
// Add nuxt.js middleware
app.use(nuxt.render)
// Listen the server
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "testing") {
    opn("https://localhost:3001");
}

server.listen(3001);

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console