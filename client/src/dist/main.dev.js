"use strict";

var _vue = _interopRequireDefault(require("vue"));

var _App = _interopRequireDefault(require("./App.vue"));

var _firebaseConfig = require("./helpers/firebaseConfig");

var _firebase = _interopRequireDefault(require("firebase"));

var _router = _interopRequireDefault(require("./router"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

_vue["default"].config.productionTip = false;
new _vue["default"]({
  router: _router["default"],
  created: function created() {
    var _this = this;

    _firebase["default"].initializeApp(_firebaseConfig.firebaseConfig);

    _firebase["default"].auth().onAuthStateChanged(function (user) {
      if (user) {
        _this.$router.push('/dashboard')["catch"](function () {});
      } else if (user == null) {
        _this.$router.push('/auth')["catch"](function () {});
      } else {
        _this.$router.push('/auth')["catch"](function () {});
      }
    });
  },
  render: function render(h) {
    return h(_App["default"]);
  }
}).$mount('#app');