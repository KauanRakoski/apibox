"use strict";

var router = require('express').Router();

var Tasks = require('../models/task');

var Routes = require('../models/apiRoutes');

router.post('/register-route', function _callee(req, res) {
  var _req$body, author, route, created, thisRoute;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, author = _req$body.author, route = _req$body.route;
          _context.prev = 1;
          _context.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          created = _context.sent;
          thisRoute = created.find(function (r) {
            return r.route == route;
          });

          if (!(thisRoute == undefined)) {
            _context.next = 9;
            break;
          }

          _context.next = 9;
          return regeneratorRuntime.awrap(Routes.create({
            author: author,
            route: route
          }));

        case 9:
          res.end();
          _context.next = 16;
          break;

        case 12:
          _context.prev = 12;
          _context.t0 = _context["catch"](1);
          console.log(_context.t0);
          res.send({
            error: true
          });

        case 16:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 12]]);
});
router.post('/:author/:taskId', function _callee2(req, res) {
  var _req$params, author, taskId, origin, userRoutes, routes;

  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _req$params = req.params, author = _req$params.author, taskId = _req$params.taskId;
          origin = req.get('origin');
          _context2.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          userRoutes = _context2.sent;
          routes = userRoutes.find(function (router) {
            return router.route == origin;
          });
          console.log(routes);
          res.end();

        case 8:
        case "end":
          return _context2.stop();
      }
    }
  });
});
module.exports = router;