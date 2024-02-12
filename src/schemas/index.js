const { Router } = require('express');
const { validationResult } = require('express-validator');

const routes = Router();

const validateMiddleware = routes.all('*', (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(422).json({errors: errors.array()});
  } else next();
});

module.exports = validateMiddleware;