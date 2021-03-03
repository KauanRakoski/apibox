"use strict";

var router = require('express').Router();

var Tasks = require('../models/task');

var Routes = require('../models/apiRoutes');

router.post('/get-routes', function _callee(req, res) {
  var author, userRoutes;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          author = req.body.author;
          _context.next = 3;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 3:
          userRoutes = _context.sent;
          res.json(userRoutes);

        case 5:
        case "end":
          return _context.stop();
      }
    }
  });
});
router.post('/register-route', function _callee2(req, res) {
  var _req$body, author, route, created, thisRoute;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$body = req.body, author = _req$body.author, route = _req$body.route;
          _context2.prev = 1;
          _context2.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          created = _context2.sent;
          thisRoute = created.find(function (r) {
            return r.route == route;
          });

          if (!(thisRoute == undefined)) {
            _context2.next = 9;
            break;
          }

          _context2.next = 9;
          return regeneratorRuntime.awrap(Routes.create({
            author: author,
            route: route
          }));

        case 9:
          res.end();
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2["catch"](1);
          console.log(_context2.t0);
          res.send({
            error: true
          });

        case 16:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post('/:author/:taskId', function _callee3(req, res) {
  var _req$params, author, taskId, origin, userRoutes, thisRoute, task, action, run;

  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _req$params = req.params, author = _req$params.author, taskId = _req$params.taskId;
          origin = req.get('origin');
          console.log(origin);
          _context3.next = 5;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 5:
          userRoutes = _context3.sent;
          thisRoute = userRoutes.find(function (allowed) {
            return allowed.route == origin;
          });
          if (thisRoute == undefined) res.end();
          _context3.next = 10;
          return regeneratorRuntime.awrap(Tasks.findOne({
            _id: taskId
          }));

        case 10:
          task = _context3.sent;
          action = task.action;
          run = eval(action);
          run();
          res.end();

        case 15:
        case "end":
          return _context3.stop();
      }
    }
  });
});
module.exports = router;