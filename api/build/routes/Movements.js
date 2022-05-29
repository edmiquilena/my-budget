"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _movements = require("../controllers/movements");

var router = (0, _express.Router)();
router.get('/', _movements.listMovements);
router.get('/balance', _movements.myBalance);
router.post('/', _movements.newMovement);
router.get('/:id', _movements.getMovement);
router.patch('/:id', _movements.updateMovement);
router["delete"]('/:id', _movements.removeMovement);
var _default = router;
exports["default"] = _default;
//# sourceMappingURL=Movements.js.map