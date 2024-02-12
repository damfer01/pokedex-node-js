const { Router } = require('express');
const routes = Router();

const AuthRoutes = require('./routers/authRoutes');
const UserRoutes = require('./routers/userRoutes');
const pokemonRoutes = require('./routers/pokemonRoutes');
const { authenticate } = require('../config/auth');

routes.use('/auth', AuthRoutes );
routes.use('/user', UserRoutes );
routes.use('/pokemon', authenticate, pokemonRoutes );

module.exports = routes;
