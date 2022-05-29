"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Handle404 = exports.APIVersion = void 0;
var version = process.env.npm_package_version;

var APIVersion = function APIVersion(req, res) {
  res.json({
    version: version
  });
};

exports.APIVersion = APIVersion;

var Handle404 = function Handle404(req, res) {
  res.status(404).send({
    error: true,
    message: "Not Found"
  });
};

exports.Handle404 = Handle404;
//# sourceMappingURL=misc.js.map