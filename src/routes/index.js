const {Router} = require('express');//atalho 
const routes = Router();

const AuthRoutes = require('./routers/authRoutes');
const UserRoutes = require('./routers/userRoutes');
const pokemonRoutes = require('./routers/PokemonRoutes');

routes.use('/auth', AuthRoutes );
routes.use('/user', UserRoutes );
routes.use('/pokemon', pokemonRoutes );

module.exports = routes;