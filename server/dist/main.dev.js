"use strict";

var express = require('express');

var cors = require('cors');

var app = express();

var dotenv = require('dotenv').config();

var mongoose = require('mongoose');
/* // Enabling cors
var corsOptions = {
  origin: ['https://8080-a70e1d88-51d5-4619-b26f-fa22337e2bdb.ws-us03.gitpod.io'],
  optionsSuccessStatus: 200
} */


app.use(cors()); // Body-parser

app.use(express.urlencoded({
  extended: false
}));
app.use(express.json()); // Connecting to MongoDB

var db = process.env.MONGO_URI;
mongoose.connect(db, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
}).then(function () {
  return console.log('✔️  Database connection established');
})["catch"](function (e) {
  return console.log('❌ Database connection failed');
});
app.get('/', function (req, res) {
  res.send('🚀 Running');
}); //Adding routes

var taskManagement = require('./routes/taskManagement');

app.use('/', taskManagement);

var Payment = require('./routes/payment');

app.use('/payment', Payment);

var Api = require('./routes/remoteAcess');

app.use('/api', Api); // Listening

app.listen(3030, function () {
  return console.log('\x1b[41m%s\x1b[0m', '🚀  Application starting...');
});