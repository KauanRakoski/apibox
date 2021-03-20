"use strict";

var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Routes = {
  author: {
    type: String,
    required: true
  },
  route: {
    type: String,
    required: true
  }
};
module.exports = mongoose.model('Routes', Routes);