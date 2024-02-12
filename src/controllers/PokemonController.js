const PokemonService = require('../services/pokemonService');

module.exports = {
  async index( req, res ) {
    try {
      const {
        page,
        perPage,
      } = req.query;

      const response = await PokemonService.index(page, perPage);

      return res.json( response );
    } catch ( err ) {
      return res.json({ success: false, message: 'Failed to retrieve pokemon'});
    }
  },

  async show( req, res ) {
    try {
      const {
        id,
      } = req.params;

      const response = await PokemonService.show(id);

      return res.json( response );
    } catch ( err ) {
      console.log(err);
      return res.json({ success: false, message: 'Failed to retrieve pokemon'});
    }
  },
};
