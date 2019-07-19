"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = require("./src/routes/routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var app = (0, _express["default"])();
var port = process.env.PORT || 3000;
app.use('/', _routes.router);
app.listen(port, function () {
  console.log("Listening to ".concat(port));
});