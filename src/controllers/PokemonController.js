const pokemonService = require('../services/pokemonServices');

module.exports = {
    async index(req, res) {
        try {
            const {
                page,
                perPage
              } = req.query
            const response = await pokemonService.index(page , perPage);

            return res.json(response);

        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: 'erro de buscar pokemon' })
        }

    },

    async show(req, res) {
        try {
            const {
                id,
            } = req.params

            const response = await pokemonService.show(id);

            return res.json(response);
        } catch (error) {
            console.log(error);
            return res.json({ success: false, message: 'erro de buscar pokemon' })
        }
    },

};