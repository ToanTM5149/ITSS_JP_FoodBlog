// ./middleware/unknownEndpoint.js
const { ErrorHandler } = require("../helpers/error");

const unknownEndpoint = (req, res, next) => {
  throw new ErrorHandler(401, "Unknown endpoint");
};

module.exports = unknownEndpoint;
