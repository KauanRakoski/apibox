"use strict";

var router = require('express').Router();

var Tasks = require('../models/task');

var Routes = require('../models/apiRoutes');

var _require = require('vm2'),
    NodeVM = _require.NodeVM; // User libraries


var axios = require('axios'); // Run a task


router.post('/:author/:taskId', function _callee(req, res) {
  var _req$params, author, taskId, origin, userRoutes, thisRoute, task, action, inBrowser, vm;

  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$params = req.params, author = _req$params.author, taskId = _req$params.taskId; // Check if origin is in allowed routes
          // If it is not, end request

          origin = req.get('origin');
          _context.next = 4;
          return regeneratorRuntime.awrap(Routes.find({
            author: author
          }));

        case 4:
          userRoutes = _context.sent;
          thisRoute = userRoutes.find(function (allowed) {
            return allowed.route == origin;
          });
          if (thisRoute == undefined) res.end(); // If route is available, search for task using id
          // Extract the action from the task

          _context.next = 9;
          return regeneratorRuntime.awrap(Tasks.findOne({
            _id: taskId
          }));

        case 9:
          task = _context.sent;
          action = task.action; // Create a vm instance to run the code in a safer way
          // Also, pass some variables and libraries

          inBrowser = false;
          vm = new NodeVM({
            console: 'off',
            sandbox: {
              res: res,
              axios: axios,
              inBrowser: inBrowser
            },
            require: {
              external: false
            }
          });
          vm.run("".concat(action));
          res.end();

        case 15:
        case "end":
          return _context.stop();
      }
    }
  });
});
module.exports = router;