"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var User = {
  uid: {
    type: String,
    required: true
  },
  routes: {
    type: Array,
    required: false
  },
  secrets: {
    type: Array,
    required: false
  }
};
module.exports = mongoose.model('User', User);