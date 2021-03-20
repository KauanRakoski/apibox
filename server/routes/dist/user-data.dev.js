"use strict";

var _require = require('../helpers/crypto'),
    encrypt = _require.encrypt;

var User = require('../models/user');

var router = require('express').Router();

router.post('/create', function _callee(req, res) {
  var uid;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          uid = req.body.uid;

          try {
            User.create({
              uid: uid
            });
          } catch (e) {
            res.send({
              error: true
            });
          }

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/secret', function _callee2(req, res) {
  var _req$body, name, key, uid;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, name = _req$body.name, key = _req$body.key, uid = _req$body.uid;

          try {
            secret = {
              name: name,
              key: encrypt(key)
            };
            user = User.find({
              uid: uid
            });
            user.secrets.push(secret);
            user.save();
            res.end();
          } catch (e) {
            res.json({
              error: true
            });
          }

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
});
router.post('/routes', function _callee3(req, res) {
  var author, userRoutes;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          author = req.body.author;
          _context3.next = 3;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 3:
          userRoutes = _context3.sent;
          res.json(userRoutes);

        case 5:
        case "end":
          return _context3.stop();
      }
    }
  });
}); // Register a router, with author id

router.post('/route', function _callee4(req, res) {
  var _req$body2, author, route, created, thisRoute;

  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _req$body2 = req.body, author = _req$body2.author, route = _req$body2.route;
          _context4.prev = 1;
          _context4.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          created = _context4.sent;
          thisRoute = created.find(function (r) {
            return r.route == route;
          });

          if (!(thisRoute == undefined)) {
            _context4.next = 9;
            break;
          }

          _context4.next = 9;
          return regeneratorRuntime.awrap(Routes.create({
            author: author,
            route: route
          }));

        case 9:
          res.end();
          _context4.next = 16;
          break;

        case 12:
          _context4.prev = 12;
          _context4.t0 = _context4["catch"](1);
          console.log(_context4.t0);
          res.send({
            error: true
          });

        case 16:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post('/del-route', function _callee5(req, res) {
  var id;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          id = req.body.id;
          _context5.prev = 1;
          _context5.next = 4;
          return regeneratorRuntime.awrap(Routes.deleteOne({
            _id: id
          }));

        case 4:
          res.end();
          _context5.next = 10;
          break;

        case 7:
          _context5.prev = 7;
          _context5.t0 = _context5["catch"](1);
          res.send({
            error: true,
            message: _context5.t0.message
          });

        case 10:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[1, 7]]);
});
module.exports = router;