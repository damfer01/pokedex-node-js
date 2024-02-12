const { Router } = require('express');
const routes = Router();

const authController = require('../../controllers/authController');
const validateMiddleware = require('../../schemas');

const {
  loginValidator,
  registerValidator,
} = require('../../schemas/validators');

routes.post('/register', registerValidator, validateMiddleware, authController.create);
routes.post('/login', loginValidator, validateMiddleware, authController.login);

module.exports = routes;