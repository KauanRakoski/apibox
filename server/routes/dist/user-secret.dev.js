"use strict";

var _require = require('../helpers/crypto'),
    encrypt = _require.encrypt;

var router = require('express').Router();

router.post('/create', function _callee(req, res) {
  var _req$body, name, key, uid;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, key = _req$body.key, uid = _req$body.uid;

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/get-routes', function _callee2(req, res) {
  var author, userRoutes;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          author = req.body.author;
          _context2.next = 3;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 3:
          userRoutes = _context2.sent;
          res.json(userRoutes);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
}); // Register a router, with author id

router.post('/register-route', function _callee3(req, res) {
  var _req$body2, author, route, created, thisRoute;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$body2 = req.body, author = _req$body2.author, route = _req$body2.route;
          _context3.prev = 1;
          _context3.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          created = _context3.sent;
          thisRoute = created.find(function (r) {
            return r.route == route;
          });

          if (!(thisRoute == undefined)) {
            _context3.next = 9;
            break;
          }

          _context3.next = 9;
          return regeneratorRuntime.awrap(Routes.create({
            author: author,
            route: route
          }));

        case 9:
          res.end();
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3["catch"](1);
          console.log(_context3.t0);
          res.send({
            error: true
          });

        case 16:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 12]]);
});