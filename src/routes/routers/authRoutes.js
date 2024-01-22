const { Router } = require('express');
const routes = Router();

const authController = require('../../controllers/authController');

routes.post('/register', authController.create);
routes.post('/login', authController.login);

module.exports = routes;