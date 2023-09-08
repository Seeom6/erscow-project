const { validationResult } = require("express-validator");
// -2 middleware => catch errors from rules if exist

const validator = (req, res, next) => {
  // -3 finds the validation errors in this request and wraps them in an object with handy function
  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ error: result.array() });
  }
  next();
};

module.exports = validator;
