"use strict";

var router = require('express').Router();

var Stripe = require('stripe');

var Tasks = require('../models/task');

require('dotenv').config();

var stripe = Stripe(process.env.STRIPE_KEY);
router.post('/list', function _callee(req, res) {
  var userList, users;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(stripe.customers.list());

        case 2:
          userList = _context.sent;
          users = userList.data;
          res.send(users);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/create-costumer/:email', function _callee2(req, res) {
  var costumer;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(stripe.customers.create({
            email: req.params.email
          }));

        case 2:
          costumer = _context2.sent;
          console.table(costumer);
          console.log(costumer);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/sub', function _callee3(req, res) {
  var _req$body, email, payment_method, customer, subscription, status;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body = req.body, email = _req$body.email, payment_method = _req$body.payment_method;
          _context3.next = 3;
          return regeneratorRuntime.awrap(stripe.customers.create({
            payment_method: payment_method,
            email: email,
            invoice_settings: {
              default_payment_method: payment_method
            }
          }));

        case 3:
          customer = _context3.sent;
          _context3.next = 6;
          return regeneratorRuntime.awrap(stripe.subscriptions.create({
            customer: customer.id,
            items: [{
              price: 'price_1Hv3bjJ1YBMak5vm5IxbuVZU'
            }]
          }));

        case 6:
          subscription = _context3.sent;
          status = subscription['status'];
          /* const client_secret = subscription['latest_invoice']['payment_intent']['client_secret'] */

          res.json({
            'client_secret': '',
            'status': status
          });

        case 9:
        case "end":
          return _context3.stop();
      }
    }
  });
});
router.post('/cancel/:cId/:uid', function _callee4(req, res) {
  var customerId, uid;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          customerId = req.params.cId;
          uid = req.params.uid;
          _context4.prev = 2;
          _context4.next = 5;
          return regeneratorRuntime.awrap(stripe.customers.del(customerId));

        case 5:
          _context4.next = 7;
          return regeneratorRuntime.awrap(Tasks.deleteMany({
            author: uid
          }));

        case 7:
          res.end();
          _context4.next = 13;
          break;

        case 10:
          _context4.prev = 10;
          _context4.t0 = _context4["catch"](2);
          console.log(_context4.t0);

        case 13:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[2, 10]]);
});
module.exports = router;