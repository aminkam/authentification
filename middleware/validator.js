let { check, validationResult } = require("express-validator");
exports.signUpRules = () => [
  check("firstName", "this field is fuking require").notEmpty(),
  check("email", "this field is funking require !!!").notEmpty(),
  check("email", "this should be a valid email").isEmail(),
  check("password", "this should be at least 5 digets").isLength({ min: 5 }),
  check("number", "this should be at least 5 digets").isLength({ min: 5 }),
];

exports.validator = (req, res, next) => {
  let errors = validationResult(req);
  return errors.isEmpty()
    ? next()
    : res.status(404).json({ errors: errors.array() });
};
