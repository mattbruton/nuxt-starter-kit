import Nuxt from 'nuxt'
import express from 'express'
import api from './api'
import fs from 'fs'
import https from 'https'
import opn from 'opn'

var bodyParser = require('body-parser')
const session = require('express-session')
var app = express();
var host = process.env.HOST || 'localhost';
var port = 3001;
var serverConfig = require('./config.json')[process.env.NODE_ENV || 'development'];
var pkey = fs.readFileSync(serverConfig.HTTPS_KEY);
var pcert = fs.readFileSync(serverConfig.HTTPS_CERT);
var httpsOptions = {
    key: pkey,
    cert: pcert
};

if (process.env.NODE_ENV == 'development') {
    process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
}

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.set('port', port);

// Sessions to create req.session
app.use(session({
  secret: 'super-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: { maxAge: 60000 }
}))

app.post('/api/v1/login', function (req, res) {
  if (serverConfig.USERS[req.body.username] && serverConfig.USERS[req.body.username].password == req.body.password) {
    req.session.authUser = { username: serverConfig.USERS[req.body.username] }
    return res.json({ username: serverConfig.USERS[req.body.username] })
  }
  res.status(401).json({ error: 'Bad credentials' })
})

app.get('/api/v1/logout', function (req, res) {
  delete req.session.authUser
  res.redirect('/');
})

// Import API Routes
app.use('/api/v1', api);

// Start nuxt.js
// Import and Set Nuxt.js options
let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')
// Instanciate nuxt.js
const nuxt = new Nuxt(config)
// Add nuxt.js middleware
app.use(nuxt.render)
var server = https.createServer(httpsOptions, app);
// Listen the server
if (process.env.NODE_ENV !== "production" && process.env.NODE_ENV !== "testing") {
    opn("https://localhost:3001");
}

server.listen(3001);

console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console