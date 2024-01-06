const { Router } = require('express');
const routes = Router();

const pokemonController = require('../../controllers/PokemonController');


routes.get('/', pokemonController.index);
routes.get('/:id', pokemonController.show);

module.exports = routes;