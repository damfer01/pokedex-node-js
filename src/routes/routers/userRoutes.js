const { Router } = require('express');
const routes = Router();

const userController = require('../../controllers/userController');

routes.post('/', userController.create); // create
routes.get('/', userController.index); // index
routes.get('/:id', userController.show); // show
routes.put('/:id', userController.update); // update
routes.delete('/:id', userController.delete); // delete

module.exports = routes;
