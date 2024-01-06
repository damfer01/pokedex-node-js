const { Router } = require('express');
const routes = Router();

const userController = require('../../controllers/userControllers');

routes.post('/', userController.create);
routes.get('/', userController.index);
routes.get('/:id', userController.show);
routes.put('/:id', userController.update);
routes.delete('/:id', userController.delete);

module.exports = routes;