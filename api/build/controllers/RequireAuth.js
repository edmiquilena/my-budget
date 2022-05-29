"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _passport = _interopRequireDefault(require("passport"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var RequireAuth = function RequireAuth(req, res, next) {
  _passport["default"].authenticate('jwt', {
    session: false
  }, function (err, user, info) {
    if (err) return res.status(500).json({
      error: true,
      message: "whoops, something went wrong!"
    });
    if (info != undefined) return res.status(403).json({
      error: true,
      message: info.message,
      Auth: false
    });
    req.user = user;
    next();
  })(req, res, next);
};

var _default = RequireAuth;
exports["default"] = _default;
//# sourceMappingURL=RequireAuth.js.map