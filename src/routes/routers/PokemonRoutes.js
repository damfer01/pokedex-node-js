const { Router } = require('express');
const routes = Router();

const pokemonController = require('../../controllers/pokemonController');

routes.get('/', pokemonController.index); // index
routes.get('/:id', pokemonController.show); // show

module.exports = routes;
